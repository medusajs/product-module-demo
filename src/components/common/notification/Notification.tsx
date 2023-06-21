"use client"

import { Checkmark, XCircleSolid, XMark } from "@/components/icons"

import { ReactElement } from "react"

type Props = {
  type: "success" | "error"
  title: ReactElement | string
  body: ReactElement | string
  onClose: () => void
}

export default function Notification({ type, title, body, onClose }: Props) {
  return (
    <div className="fixed h-fit w-fit bottom-6 md:right-6 right-0 mx-2 sm:mx-0 flex z-50 rounded-lg bg-white dark:bg-base-dark dark:shadow-card-hover-dark p-5 animate-fadeIn">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between gap-5">
          {type === "success" ? (
            <Checkmark className="self-start min-w-[20px] min-h-[20px]" />
          ) : (
            <XCircleSolid className="self-start min-w-[20px] min-h-[20px]" />
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
  )
}
