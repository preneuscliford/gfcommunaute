"use client";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import axios from "axios";

function SignaledUsers({ username }: { username: string }) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleContinue = async () => {
    setIsSendingEmail(true);
    try {
      const response = await axios.post("/api/send-email", { username });
      console.log(response.data);
      // Afficher un message à l'utilisateur indiquant que l'e-mail a été envoyé
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail", error);
      // Afficher un message d'erreur à l'utilisateur
    } finally {
      setIsSendingEmail(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-white">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        {/* <DropdownMenuItem>Copy payment ID</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={isSendingEmail}>
              signaler
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Voulez-vous vraiment signaler cet utilisateur?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will notify the administrators for further action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSendingEmail}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isSendingEmail}
                onClick={handleContinue}
              >
                Continuer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SignaledUsers;
