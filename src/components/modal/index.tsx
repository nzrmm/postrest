import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import { cn } from "@/utils/style";

type IModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  title?: string;
  onClose: () => void;
}>;

const Modal = ({ isOpen, onClose, children, ...props }: IModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 p-4",
        "overflow-x-hidden overflow-y-auto",
        "w-full min-h-screen bg-neutral-900/30",
        "flex justify-center items-center"
      )}
    >
      <div
        className={cn(
          "relative bg-white rounded-lg shadow",
          "sm:w-3/4 md:w-2/4 xl:w-1/4"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between border-b border-b-neutral-200 p-4"
          )}
        >
          <p className="text-xl font-semibold text-gray-900">{props.title}</p>
          <div
            className={cn(
              "rounded-md cursor-pointer hover:bg-neutral-200 p-0.5"
            )}
            onClick={onClose}
          >
            <MdClose size={24} />
          </div>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  return isOpen && mounted
    ? createPortal(
        modalContent,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

export default Modal;
