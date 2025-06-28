"use client";

import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  link?: string;
}

const Button = ({ link, text, className, ...rest }: CustomButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };
  return (
    <button
      onClick={handleClick}
      className={
        "flex items-center justify-center px-4 py-2 border rounded hover:bg-gray-100 transition hover:cursor-pointer"
      }
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
