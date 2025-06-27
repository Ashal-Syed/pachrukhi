"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import PersonCard from "../PersonCard/PersonCard";
import Button from "../Button/Button";

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

interface FamilyTreeProps {
  rootGeneration: string[];
}

export default function FamilyTree({ rootGeneration }: FamilyTreeProps) {
  const [people, setPeople] = useState<Record<string, Person>>({});
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showParents, setShowParents] = useState(true);
  const [showChildren, setShowChildren] = useState(true);
  const [showSpouse, setShowSpouse] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("FamilyTree").select("*");
      if (error) {
        console.error("Supabase Error:", JSON.stringify(error, null, 2));
        return;
      }

      const peopleMap: Record<string, Person> = {};

      data?.forEach((person: any) => {
        const partners: string[] = [];

        if (person["Partner ID"]) {
          partners.push(person["Partner ID"]);
        }

        if (person["Extra partner IDs"]) {
          const extraPartners = person["Extra partner IDs"]
            .split(" ")
            .map((id: string) => id.trim())
            .filter(Boolean); // removes empty values
          partners.push(...extraPartners);
        }
        peopleMap[person["ID"]] = {
          id: person["ID"],
          name: person["Full name"],
          birthYear: 2000,
          parents: [],
          children: [],
          partners: partners,
        };

        if (person["Mother ID"]) {
          peopleMap[person["ID"]].parents.push(person["Mother ID"]);
        }
        if (person["Father ID"]) {
          peopleMap[person["ID"]].parents.push(person["Father ID"]);
        }
      });

      Object.values(peopleMap).forEach((person) => {
        person.parents.forEach((parentId) => {
          if (peopleMap[parentId]) {
            peopleMap[parentId].children.push(person.id);
          }
        });
      });

      const root = ["G6JMK"];

      setPeople(peopleMap);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rootGeneration.length > 0) {
      setSelectedPerson(rootGeneration[0]);
    } else {
      setSelectedPerson("G6JMK");
    }
  }, [rootGeneration]);

  const handlePersonClick = (personId: string) => {
    setSelectedPerson(personId);
  };

  //   const zoomIn = () => {
  //     setZoomLevel((prev) => Math.min(prev + 0.1, 1.5));
  //   };

  //   const zoomOut = () => {
  //     setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  //   };

  const resetView = () => {
    setSelectedPerson("G6JMK");
    setShowParents(true);
    setShowChildren(true);
    setZoomLevel(1);
  };

  //   const toggleParents = () => {
  //     setShowParents((prev) => !prev);
  //   };

  //   const toggleChildren = () => {
  //     setShowChildren((prev) => !prev);
  //   };

  const renderPerson = (personId: string) => {
    const person = people[personId];
    if (!person) return null;

    return (
      <div key={personId} className="flex flex-col items-center">
        <PersonCard
          person={person}
          isSelected={selectedPerson === personId}
          onClick={() => handlePersonClick(personId)}
        />
      </div>
    );
  };

  const renderGeneration = (personIds: string[]) => {
    return (
      <div className="flex justify-center gap-4 my-4">
        {personIds.map((id) => renderPerson(id))}
      </div>
    );
  };

  const renderFamilyTree = () => {
    const rootIds = rootGeneration.length > 0 ? rootGeneration : ["G6JMK"];
    if (!selectedPerson) {
      return (
        <div className="flex flex-col items-center">
          {renderGeneration(rootIds)}
        </div>
      );
    }

    const person = people[selectedPerson];
    if (!person) return null;

    return (
      <div className="flex flex-col items-center gap-8">
        {showParents && person.parents.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Parents
            </div>
            {renderGeneration(person.parents)}
            <div className="h-8 w-px bg-gray-300"></div>
          </div>
        )}
        <div className="z-10 flex items-center gap-4">
          {renderPerson(selectedPerson)}

          {showSpouse &&
  person.partners &&
  person.partners.length > 0 &&
  (
    <>
      {person.partners.map((partnerId) =>
        people[partnerId] ? (
          <div key={partnerId} className="flex items-center gap-4">
            <div className="w-8 h-px bg-gray-300"></div>
            {renderPerson(partnerId)}
          </div>
        ) : null
      )}
    </>
  )
}

        </div>
        {showChildren && person.children.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="h-8 w-px bg-gray-300"></div>
            {renderGeneration(person.children)}
            <div className="mt-2 text-sm font-medium text-muted-foreground">
              Children
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-center py-20 gap-2 mb-4">
        {/* <Button variant="outline" size="sm" onClick={toggleParents}>
          <ChevronUp className="mr-1 h-4 w-4" />
          {showParents ? "Hide Parents" : "Show Parents"}
        </Button>
        <Button variant="outline" size="sm" onClick={toggleChildren}>
          <ChevronDown className="mr-1 h-4 w-4" />
          {showChildren ? "Hide Children" : "Show Children"}
        </Button>
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button> */}
        <Button text="Reset" onClick={resetView}>
          {/* <Home className="h-4 w-4" /> */}
        </Button>
        <Button text="Mohammad (SAW)" onClick={() => setSelectedPerson("UZ5HP")} />
      </div>
      <div
        className="overflow-auto p-4 min-h-[500px] flex items-center justify-center"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "center center",
        }}
      >
        {renderFamilyTree()}
      </div>
    </div>
  );
}
