"use client";

import { ReactElement } from "react";
import { XMark, XCircleSolid, Checkmark } from "@/components/icons";

type Props = {
  type: "success" | "error";
  title: ReactElement | string;
  body: ReactElement | string;
  onClose: () => void;
};

export default function Notification({ type, title, body, onClose }: Props) {
  return (
    <div className="fixed w-screen h-[calc(100dvh)] z-50 top-0 left-0">
      <div className="absolute h-fit w-fit bottom-6 md:right-6 right-0 mx-2 sm:mx-0 flex rounded-lg bg-white dark:bg-base-dark dark:shadow-card-hover-dark p-5 animate-fadeIn">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between gap-5">
            {type === "success" ? (
              <Checkmark className="self-start" />
            ) : (
              <XCircleSolid className="self-start" />
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-base-dark">{title}</h2>
              <p className="text-subtle-dark">{body}</p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="self-start cursor-pointer"
            >
              <XMark />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
