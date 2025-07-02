"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Button from "../Button/Button";
import Generation from "./Generation";
import AddRelationBox from "./AddRelationBox";
import PersonCard from "../PersonCard/PersonCard";

interface Person {
  id: string;
  name: string;
  parents: string[];
  children: string[];
  partners?: string[];
  gender?: string;
}

interface FamilyTreeProps {
  rootGeneration: string[];
  showFamily?: boolean;
  canAddRelations?: boolean;
}

export default function FamilyTree({
  rootGeneration,
  showFamily,
  canAddRelations = false,
}: FamilyTreeProps) {
  const [people, setPeople] = useState<Record<string, Person>>({});
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [showFamilyState, setShowFamilyState] = useState(showFamily ?? true);
  const [showAddRelationBox, setShowAddRelationBox] = useState(false);
  const DEFAULT_PERSON_ID = "G6JMK";

  useEffect(() => {
    setShowFamilyState(showFamily ?? true);
  }, [showFamily]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedPerson(rootGeneration[0] ?? DEFAULT_PERSON_ID);
  }, [rootGeneration]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("FamilyTree").select("*");
    if (error) {
      console.error("Supabase Error:", error.message);
      return;
    }

    const peopleMap: Record<string, Person> = {};
    data?.forEach((p: any) => {
      peopleMap[p.ID] = {
        id: p.ID,
        name: p["Full name"],
        parents: [p["Father ID"], p["Mother ID"]].filter(Boolean),
        children: [],
        partners: [
          p["Partner ID"],
          ...(p["Extra partner IDs"]?.split(" ") || []),
        ].filter(Boolean),
        gender: p.Gender,
      };
    });

    Object.values(peopleMap).forEach((person) => {
      person.parents.forEach((parentId) => {
        if (peopleMap[parentId]) peopleMap[parentId].children.push(person.id);
      });
    });

    setPeople(peopleMap);
  };

  const generateUniqueId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    do {
      id = Array.from(
        { length: 5 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    } while (people[id]);
    return id;
  };

  const handleAddRelation = async (
    relationType: string,
    fullName: string,
    gender: string
  ) => {
    if (!selectedPerson) return;

    const newId = generateUniqueId();
    const current = people[selectedPerson];

    const newPerson: any = { ID: newId, "Full name": fullName, Gender: gender };
    const updateCurrent: any = {};

    if (relationType === "parent")
      updateCurrent[gender === "Male" ? "Father ID" : "Mother ID"] = newId;
    if (relationType === "spouse") {
      if (!current.partners?.length) updateCurrent["Partner ID"] = newId;
      else
        updateCurrent["Extra partner IDs"] = [
          ...(current.partners || []),
          newId,
        ].join(" ");
    }
    if (relationType === "child") {
      const [fatherId, motherId] = [
        current.gender?.toLowerCase() === "male" ? selectedPerson : null,
        current.gender?.toLowerCase() === "female" ? selectedPerson : null,
      ];
      const partner = current.partners?.length
        ? people[current.partners[0]]
        : null;
      if (partner?.gender?.toLowerCase() === "male" && !fatherId)
        newPerson["Father ID"] = partner.id;
      if (partner?.gender?.toLowerCase() === "female" && !motherId)
        newPerson["Mother ID"] = partner.id;
      if (fatherId) newPerson["Father ID"] = fatherId;
      if (motherId) newPerson["Mother ID"] = motherId;
    }

    const { error: insertError } = await supabase
      .from("FamilyTree")
      .insert([newPerson]);
    if (insertError) return alert("Error adding person.");

    if (Object.keys(updateCurrent).length) {
      const { error } = await supabase
        .from("FamilyTree")
        .update(updateCurrent)
        .eq("ID", selectedPerson);
      if (error) return alert("Error updating person.");
    }

    setShowAddRelationBox(false);
    fetchData();
  };

  if (!selectedPerson) return null;
  const person = people[selectedPerson];
  if (!person) return null;

  return (
    <div className="relative">
      <div className="flex justify-center py-20 gap-2 mb-4">
        <Button
          text="Reset"
          onClick={() => setSelectedPerson(DEFAULT_PERSON_ID)}
        />
        <Button
          text="Mohammad (SAW)"
          onClick={() => setSelectedPerson("UZ5HP")}
        />
        <Button
          text={showFamilyState ? "Hide Family" : "Show Family"}
          onClick={() => setShowFamilyState(!showFamilyState)}
        />
        {canAddRelations && (
          <Button
            text="Add Relations"
            onClick={() => setShowAddRelationBox(true)}
          />
        )}
      </div>

      <div className="overflow-auto p-4 min-h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          {showFamilyState && person.parents.length > 0 && (
            <>
              <div className="text-sm mb-2">Parents</div>
              <Generation
                personIds={person.parents}
                people={people}
                selectedPerson={selectedPerson}
                onPersonClick={setSelectedPerson}
              />
              <div className="h-8 w-px bg-gray-300" />
            </>
          )}

          <div className="z-10 flex items-center gap-4">
            <div className="flex flex-col items-center">
              <PersonCard person={person} isSelected onClick={() => {}} />
              {showAddRelationBox && canAddRelations && (
                <AddRelationBox
                  onAdd={handleAddRelation}
                  onClose={() => setShowAddRelationBox(false)}
                />
              )}
            </div>

            {showFamilyState &&
              (person.partners ?? []).length > 0 &&
              (person.partners ?? []).map((pid) =>
                people[pid] ? (
                  <div key={pid} className="flex items-center gap-4">
                    <div className="w-8 h-px bg-gray-300" />
                    <PersonCard
                      person={people[pid]}
                      isSelected={selectedPerson === pid}
                      onClick={() => setSelectedPerson(pid)}
                    />
                  </div>
                ) : null
              )}
          </div>

          {showFamilyState && person.children.length > 0 && (
            <>
              <div className="h-8 w-px bg-gray-300" />
              <Generation
                personIds={person.children}
                people={people}
                selectedPerson={selectedPerson}
                onPersonClick={setSelectedPerson}
              />
              <div className="text-sm mt-2">Children</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
