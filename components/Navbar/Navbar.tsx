import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between w-full py-10 px-20">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer">Pachrukhi</h1>
      </Link>
      <Button text="Sign In" link="/login" />
    </div>
  );
};

export default Navbar;
