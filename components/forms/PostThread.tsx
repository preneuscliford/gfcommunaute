"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { ClerkLoading, useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import Image from "next/image";
import { userInfo } from "os";

interface Props {
  userId: string;
  theadImage: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Ajoutez cet état

  const displayErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      theadImage: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      setIsLoading(true); // Activer isLoading lors de la soumission

      const blob = values.theadImage;

      const hasImageChanged = isBase64Image(blob);
      if (hasImageChanged) {
        const imgRes = await startUpload(files);

        if (imgRes && imgRes[0].fileUrl) {
          values.theadImage = imgRes[0].fileUrl;
        }
      }

      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
        theadImage: values.theadImage || "",
        role: "",
      });

      router.push("/");
    } catch (error) {
      console.error("Error creating thread:", error);
      displayErrorMessage(
        "Une erreur s'est produite lors de la création du thread. Veuillez réessayer plus tard."
      );
    } finally {
      setIsLoading(false); // Désactiver isLoading après la soumission
    }
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageThread = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string | undefined) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
        setPreviewImage(imageDataUrl); // Mettez à jour previewImage ici
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Contenu
              </FormLabel>
              <FormControl className="no-focus border-t-dark-1 border-x-dark-1 bg-dark-1 text-light-1 border-b-gray-200">
                <Textarea rows={1} {...field} placeholder="votre message" />
              </FormControl>
              <Input
                type="file"
                accept="image/*"
                placeholder="Add profile photo"
                className="account-form_image-input"
                onChange={(e) =>
                  handleImageThread(e, (value) =>
                    form.setValue("theadImage", value ?? "")
                  )
                }
              />
              {previewImage && (
                <div>
                  <Image
                    src={previewImage}
                    alt="Preview"
                    layout="responsive"
                    width={230}
                    height={100}
                    className="rounded-md"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary-500"
          disabled={isLoading} // Désactiver le bouton lors du chargement
        >
          {isLoading ? "Chargement..." : "Créer"}
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
