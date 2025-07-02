"use client";

import PersonCard from "../PersonCard/PersonCard";

interface Props {
  personIds: string[];
  people: any;
  selectedPerson: string | null;
  onPersonClick: (id: string) => void;
}

export default function Generation({ personIds, people, selectedPerson, onPersonClick }: Props) {
  return (
    <div className="flex justify-center gap-4 my-4">
      {personIds.map((id) => (
        <div key={id} className="flex flex-col items-center">
          <PersonCard
            person={people[id]}
            isSelected={selectedPerson === id}
            onClick={() => onPersonClick(id)}
          />
        </div>
      ))}
    </div>
  );
}