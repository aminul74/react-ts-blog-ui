import React from "react";
import Button from "./Button";

interface FloatButtonProps {
  onClick?: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({
  onClick,
}: FloatButtonProps) => {
  return (
    <div className="p-10">
      <Button
        type="button"
        onClick={onClick}
        className="fixed z-90 bottom-10 right-6 bg-indigo-900 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-indigo-900 hover:drop-shadow-2xl hover:animate-bounce duration-300 mb-10 "
      >
        &#9998;
      </Button>
    </div>
  );
};

export default FloatButton;
