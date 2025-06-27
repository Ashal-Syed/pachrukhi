"use client";

import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ text, className, ...rest }: CustomButtonProps) => {
  return (
    <button
      className={
        "flex items-center justify-center px-4 py-2 border rounded hover:bg-gray-100 transition"
      }
      {...rest}
    >
        {text}
    </button>
  );
};

export default Button;
