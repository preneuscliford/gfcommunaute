import Image from "next/image";
import Link from "next/link";

import { utcToZonedTime } from "date-fns-tz";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import LikeButton from "../forms/LikeButton";
import ShowImage from "../forms/ShowImage";
import SignaledUsers from "../forms/SignaledUsers";
import { log } from "console";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  theadImage: string;
  author: {
    name: string;
    image: string;
    id: string;
    role: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;

  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: number;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  theadImage,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
}: Props) {
  const dateInGuyaneTimezone = utcToZonedTime(
    new Date(createdAt),
    "America/Cayenne"
  );

  console.log(author.role);

  const formattedDate = formatDateString(dateInGuyaneTimezone.toISOString());

  return (
    <article
      className={`flex w-full flex-col rounded-xl  ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-4"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-2">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            {/* threads, currentUserId */}
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col relative">
            {author.id !== currentUserId && (
              <div className=" absolute right-0">
                <SignaledUsers username={author.name} />
              </div>
            )}
            <div className=" flex items-center  mt-2.5">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>
              {author.role === "verified" && (
                <Image
                  className=" w-6 h-6"
                  src="/assets/verified-svg.svg"
                  alt="verified image"
                  width={16}
                  height={16}
                />
              )}
            </div>
            <p className="mt-2 text-small-regular text-light-2 ">{content}</p>

            {!isComment && (
              <div className="mt-3">
                {theadImage && <ShowImage theadImage={theadImage} />}
              </div>
            )}

            {/* <ShowImage theadImage={theadImage} /> */}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-10">
                {/* like button */}

                <LikeButton
                  threadId={id}
                  userId={currentUserId}
                  likedBy={currentUserId}
                  likes={likes}
                />

                <Link
                  href={`/thread/${id}`}
                  className="flex justify-center items-center"
                >
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className=" cursor-pointer object-contain"
                  />
                  <p className=" text-subtle-medium text-gray-1">
                    {comments.length} {comments.length > 1 ? "" : ""}
                  </p>
                </Link>
                {/* <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                /> */}
                {/* <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                /> */}
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  {formatDateString(createdAt)}
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} répons
                    {comments.length > 1 ? "es" : "e"}
                  </p>
                </Link>
              )}
              {/* <p className="text-subtle-medium text-lime-50">like</p> */}
            </div>
          </div>
          {/* signale button */}
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <div className=" ">
              <p className="mt-1 text-subtle-medium text-gray-1">
                {/* {comments.length} commentair{comments.length > 1 ? "e" : "s"} */}
              </p>

              {/* <p className="text-subtle-medium text-gray-1">like</p> */}
            </div>
          </Link>
        </div>
      )}
      <br />
      {!community && !isComment && (
        <p className="text-subtle-medium text-light-1">{formattedDate}</p>
      )}
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-light-1">
            {formattedDate}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
