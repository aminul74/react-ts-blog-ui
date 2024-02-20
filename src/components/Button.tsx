import React from "react";

type ButtonPropsType = {
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  dataTestId?: string;
};

const Button: React.FC<ButtonPropsType> = ({
  type = "button",
  children,
  className,
  id,
  onClick,
  dataTestId
}) => {
  return (
    <button id={id} type={type} className={className} onClick={onClick} data-testid={dataTestId}>
      {children}
    </button>
  );
};

export default Button;
