"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addLikeToThread, fetchThreadById } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string; // Ajoutez cette prop pour stocker le nombre initial de likes
}

const LikeButton = ({ threadId, userId }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const thread = await fetchThreadById(threadId); // Utilisez la fonction pour obtenir les détails du fil de discussion
        setLike(thread.likes.length); // Mettez à jour avec la longueur du tableau de likes
        setIsLiked(thread.likes.includes(userId));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [threadId, userId]);

  const handleLike = async () => {
    try {
      await addLikeToThread(threadId, userId);
      setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };

  return (
    <div className="">
      <div onClick={handleLike}>
        <Image
          src={`/assets/heart.png`} // Utilisez '.png' pour l'image liked et '.svg' pour l'image not liked
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>
      <div className=" absolute ">
        <p className="text-gray-1 mt-[5px] text-subtle-medium">
          {like} lik{like > 1 ? "s" : "e"}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
