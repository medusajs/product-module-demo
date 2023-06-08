"use client";

import { Button, Tag, XMark } from "@/components";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";

type Props = PropsWithChildren<{}> & {
  cta?: string;
  icon?: React.ReactNode;
  href?: string;
};

const Modal = ({ cta, icon, href, children }: Props) => {
  const overlay = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [overlay, onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="relative w-full h-full bg-overlay-light dark:bg-overlay-dark p-2"
        ref={overlay}
        onClick={onClick}
      >
        <div className="bg-base-light dark:bg-base-dark w-full h-full rounded-lg flex flex-col items-center">
          <div className="flex flex-row justify-between p-4 border-b w-full border-base-light dark:border-base-dark">
            <div className="flex items-center gap-x-2">
              <button onClick={onDismiss} type="button" className="p-[5px]">
                <XMark />
              </button>
              <Tag size="small">esc</Tag>
            </div>
            {cta && (
              <div className="flex items-center gap-x-2">
                <Button>
                  <a className="flex flex-row gap-2" href={href}>
                    {icon} {cta}
                  </a>
                </Button>
              </div>
            )}
          </div>
          <div className="w-full flex items-start justify-center py-10 md:py-16 overflow-auto">
            <div className="w-full max-w-7xl h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
