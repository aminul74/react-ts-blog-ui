import React from "react";

type ButtonPropsType = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({
  type,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
