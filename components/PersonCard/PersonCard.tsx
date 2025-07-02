"use client";

import Image from "next/image";

interface Person {
  id: string;
  name: string;
  parents: string[];
  children: string[];
  partners?: string[];
  gender?: string;
  avatar?: string;
}

interface PersonCardProps {
  person: Person;
  isSelected: boolean;
  onClick: () => void;
}

export default function PersonCard({
  person,
  isSelected,
  onClick,
}: PersonCardProps) {
  const initials = person?.name
    ? person.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div
      onClick={onClick}
      className={`w-44 h-30 flex flex-col items-center justify-center rounded-lg ${
        isSelected ? "bg-white/80" : "bg-white/40"
      } shadow hover:shadow-lg cursor-pointer p-2 text-center`}
    >
      <Image src="/person.svg" alt="icon" height={70} width={70} />

      <div
        className={`h-15 font-medium text-sm ${
          isSelected ? "text-black" : "text-white"
        }`}
      >
        {person?.name || "Unnamed"}
      </div>
    </div>
  );
}
