"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  role: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, role, username, imgUrl, personType }: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <div className=" flex items-center">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            {role === "verified" && (
              <Image
                className=" w-6 h-6"
                src="/assets/verified-svg.svg"
                alt="verified image"
                width={16}
                height={16}
              />
            )}
          </div>

          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => {
          if (isCommunity) {
            router.push(`/communautes/${id}`);
          } else {
            router.push(`/profil/${id}`);
          }
        }}
      >
        Voir
      </Button>
    </article>
  );
}

export default UserCard;
