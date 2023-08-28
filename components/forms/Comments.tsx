import React, { useState, useEffect } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  CommentValidation,
  // Ajoutez la validation pour le bouton de like
} from "@/lib/validations/thread";

import {
  addCommentToThread,
  addLikeToThread,
  // Ajoutez l'importation pour ajouter un like au commentaire
} from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
  likedBy: string[];
}

function Comment({ threadId, currentUserImg, currentUserId, likedBy }: Props) {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const [isLiked, setIsLiked] = useState(false); // Ajoutez l'état local pour le like
  const [likeCount, setLikeCount] = useState(0); // Ajoutez l'état local pour le nombre de likes

  useEffect(() => {
    // Effect pour mettre à jour l'état local des likes
    // Vous devrez récupérer les données du serveur, similairement à la récupération des commentaires
    // Utilisez les fonctions du backend pour obtenir les données des likes
  }, [threadId]); // Effect se déclenche lorsque threadId change

  const toggleLike = async () => {
    try {
      if (isLiked) {
        // Si déjà liké, retirer le like
        await addLikeToThread(threadId, currentUserId, likedBy); // Utilisez la fonction pour retirer un like
        setLikeCount(likeCount - 1);
      } else {
        // Sinon, ajouter le like
        await addLikeToThread(threadId, currentUserId, likedBy); // Utilisez la fonction pour ajouter un like
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Répondre
        </Button>

        <Button onClick={toggleLike} className="comment-like_btn">
          {isLiked ? "Unlike" : "Like"} ({likeCount})
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
