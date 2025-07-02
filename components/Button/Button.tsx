"use client";

import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  link?: string;
  variant?: "default" | "red" | "white";
}

const Button = ({
  link,
  text,
  className,
  variant = "default",
  ...rest
}: CustomButtonProps) => {
  const baseClasses =
    "flex items-center justify-center px-10 py-2 rounded-full hover:cursor-pointer transition";
  const variantClasses =
    variant === "red"
      ? "bg-red-500/50 text-white hover:bg-red-600"
      : variant === "white"
      ? "bg-white text-black border hover:bg-white/80"
      : "hover:bg-gray-100 hover:text-black border";

  const combinedClasses = `${baseClasses} ${variantClasses} ${className || ""}`;

  if (link) {
    return (
      <Link href={link} className={combinedClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {text}
    </button>
  );
};

export default Button;
