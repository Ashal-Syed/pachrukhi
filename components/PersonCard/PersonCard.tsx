"use client";

interface Person {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  occupation?: string;
  avatar?: string;
  parents: string[];
  children: string[];
  partners?: string[];
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
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("");

    return (
    <div
      onClick={onClick}
      className={`w-36 h-36 flex flex-col items-center justify-center rounded-lg ${
        isSelected ? "bg-white" : "bg-white/70"
      } shadow hover:shadow-lg cursor-pointer p-2 text-center`}
    >
      {person.avatar ? (
        <img
          src={person.avatar}
          alt={person.name}
          className="w-16 h-16 rounded-full object-cover mb-2"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-lg mb-2">
          {initials}
        </div>
      )}

      <div className="text-black font-medium">{person.name}</div>

    </div>
  );
}
