/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "../ui/button";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  role: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  role,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {accountId === authUserId && (
            <div className="top-7 left-8">
              <UserButton />
            </div>
          )}
          {accountId !== authUserId && (
            <div className="relative h-20 w-20 object-cover">
              <Image
                src={imgUrl}
                alt="logo"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-center items-center">
              <h2 className="text-left text-heading3-bold text-light-1">
                {name}
              </h2>
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

            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>

        {accountId === authUserId && type !== "Community" && (
          <Link href="/profil/edit">
            <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
              <Image
                src="/assets/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className="text-light-2 max-sm:hidden">Éditer</p>
            </div>
          </Link>
        )}
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
}

export default ProfileHeader;
