import React from "react";
import Button from "../Button/Button";

const Hero = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-between gap-7 w-full mt-12 p-4">
        <h1 className="text-3xl font-bold text-center">Pachruki Family Tree</h1>
        <p className="text-center text-muted-foreground">
          Search the name of a family member
        </p>
      </div>
    </div>
  );
};

export default Hero;
