"use client";

import { useState } from "react";
import clsx from "clsx";
import NextImage from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
};

const EnlargableImage = ({ src, alt, width, height, sizes }: Props) => {
  const [enlarged, setEnlarged] = useState(false);

  const handleClick = () => {
    setEnlarged(!enlarged);
  };

  const blurDataURL = src.replace("/", "/blur-");

  return (
    <div
      className={clsx(
        "relative rounded-xl overflow-hidden my-4 shadow-card-rest-dark cursor-pointer w-fit",
        enlarged && "z-20"
      )}
    >
      <div
        className={clsx(
          "flex justify-center items-center h-screentransition-all duration-300 ease-in-out",
          enlarged ? "fixed inset-0 bg-black bg-opacity-50" : ""
        )}
        onClick={handleClick}
      >
        {enlarged && (
          <div className="">
            <NextImage
              className="rounded-xl object-contain max-h-screen"
              placeholder="blur"
              blurDataURL={blurDataURL}
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
            />
          </div>
        )}
      </div>
      <NextImage
        className={clsx("rounded-xl", enlarged && "cursor-pointer")}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={handleClick}
      />
    </div>
  );
};

export default EnlargableImage;
