import React from "react";

type ButtonPropsType = {
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
};

const Button: React.FC<ButtonPropsType> = ({
  type = "button",
  children,
  className,
  id,
  onClick,
}) => {
  return (
    <button id={id} type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
