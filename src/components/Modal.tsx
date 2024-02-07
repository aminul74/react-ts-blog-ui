import React, { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <div
      className={`fixed left-0 top-0 z-50 ${
        isOpen ? "" : "hidden"
      } h-full w-full overflow-y-auto overflow-x-hidden backdrop-blur-sm backdrop-filter backdrop-contrast-120 outline-none`}
    >
      <div className="relative w-auto mx-auto mt-20 max-w-[500px]">
        <div className="shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] relative flex flex-col rounded-md dark:bg-gray-600">
          <div className="flex-shrink-0 items-center justify-between rounded-t-md p-4 dark:border-opacity-50">
            <h5 className="text-xl font-medium leading-normal text-neutral-80">
              {title}
            </h5>
          </div>

          <div className="p-4">{children}</div>

          <div className="flex-shrink-0 flex-wrap items-center justify-end border-t-2 border-neutral-100 p-4 dark:border-opacity-50">
            <Button
              type="button"
              className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700"
              onClick={onClose}
            >
              Close
            </Button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
