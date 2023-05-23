"use client";

import { XMark, Checkmark } from "@/components/icons";

type Props = {
  type: "success" | "error";
  title: string;
  body: string;
  showNotification?: boolean;
  onClose: () => void;
};

export default function Notification({
  type,
  title,
  body,
  showNotification,
  onClose,
}: Props) {
  return showNotification ? (
    <div className="fixed h-fit w-fit bottom-6 mr-1 flex rounded-lg bg-white dark:bg-base-dark dark:shadow-card-hover-dark p-5 animate-fadeIn">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-5">
          <Checkmark className="self-start" />
          <div className="flex flex-col gap-2">
            <h2 className="text-base-dark">{title}</h2>
            <p className="text-subtle-dark">{body}</p>
          </div>
          <button onClick={onClose} type="button" className="self-start">
            <XMark />
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
