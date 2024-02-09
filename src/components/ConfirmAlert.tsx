import React from "react";
import Button from "./Button";

interface ConfirmAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const overlayStyles = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50 "
    : "hidden";
  const modalStyles = isOpen
    ? "transition-opacity ease-in-out duration-300 opacity-100"
    : "transition-opacity ease-in-out duration-300 opacity-0";

  return (
    <div
      className={`${overlayStyles} fixed h-full w-full overflow-y-auto overflow-x-hidden backdrop-blur-md backdrop-filter backdrop-contrast-120 outline-none`}
    >
      <div className={modalStyles}>
        <div className="w-full p-10 bg-white dark:bg-gray-700 rounded-lg">
          <div className="space-y-4 text-center dark:text-white">
            <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            <p className="text-gray-300 pb-5">{message}</p>
          </div>

          <div className="border-t dark:border-gray-700 pt-3">
            <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <Button
                type="button"
                className="btn-cancel inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="btn-confirm inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors  min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
