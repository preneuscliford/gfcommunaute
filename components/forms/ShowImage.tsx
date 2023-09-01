"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  theadImage: string;
}

function ShowImage({ theadImage }: Props) {
  const [fullscreen, setFullscreen] = useState(false);
  const [fullimg, setFullimg] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    setFullimg(!fullimg);
  };

  return (
    <div
      className={`cursor-pointe ${fullscreen ? "fullScreen bg-black  " : ""}`}
      onClick={toggleFullscreen}
    >
      <div>
        <Image
          src="/assets/close.png"
          width={24}
          height={24}
          alt="close"
          className={`cursor-pointer ${
            fullscreen ? " block absolute right-10 top-10  " : "hidden "
          }`}
          onClick={toggleFullscreen}
        />
      </div>
      <Image
        className={`rounded-md mt-2 ${fullscreen ? "test  " : ""}`}
        width={100}
        height={100}
        src={theadImage}
        alt="thread_image"
        layout="responsive"
      />
    </div>
  );
}

export default ShowImage;
