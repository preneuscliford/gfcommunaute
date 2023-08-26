"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addLikeToThread, fetchThreadById } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string;
  likedBy: string[];
}

const LikeButton = ({ threadId, userId, likedBy }: Props) => {
  const [isLiked, setIsLiked] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`likeStatus-${threadId}`) === "liked"
      : false
  );
  const [like, setLike] = useState(likedBy.length);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const thread = await fetchThreadById(threadId);

        // Vérifier si l'utilisateur actuel (userId) est dans le tableau likedBy
        setIsLiked(thread.likedBy.includes(userId));

        // Mettre à jour le nombre total de likes
        setLike(thread.likedBy.length);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [threadId, userId]);

  const handleLike = async () => {
    try {
      const updatedThread = await addLikeToThread(threadId, userId, likedBy);

      // Mettre à jour le nombre de likes affiché en utilisant la propriété "likes" de "updatedThread"
      setLike(updatedThread.likes);

      // Inverser l'état "isLiked"
      setIsLiked(!isLiked);

      // Mettre à jour le stockage local avec l'état de like actuel
      localStorage.setItem(
        `likeStatus-${threadId}`,
        !isLiked ? "liked" : "unliked"
      );

      console.log("Like added to thread", threadId, userId, likedBy);
    } catch (error) {
      console.error("Error while handling like:", error);
    }
  };

  return (
    <div className="">
      <div onClick={handleLike}>
        <Image
          src={`/assets/heart.png`}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </div>
      <div className=" absolute ">
        <p className="text-gray-1 mt-[5px] text-subtle-medium">
          {like} lik{like > 1 ? "es" : "e"}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
