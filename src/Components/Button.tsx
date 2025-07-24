import React from "react";
import { cn } from "../util/cn";

const DEFAULT_STYLES =
  "px-4 py-2 rounded-lg cursor-pointer text-green-700 transition-colors";
const BUTTON_TYPES = {
  primary: "text-white bg-green-500 hover:bg-green-700",
  secondary: "hover:bg-green-100",
  danger: "text-white bg-red-500 hover:bg-red-700",
};
type ButtonType = keyof typeof BUTTON_TYPES;

const Button = ({
  children,
  type = "secondary",
  className,
  onClick,
}: {
  children: React.ReactNode;
  type?: keyof typeof BUTTON_TYPES;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(DEFAULT_STYLES, BUTTON_TYPES[type], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
