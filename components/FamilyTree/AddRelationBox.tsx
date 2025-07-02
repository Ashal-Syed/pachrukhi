"use client";

import Button from "../Button/Button";
import { useState } from "react";

interface Props {
  onAdd: (relationType: string, fullName: string, gender: string) => void;
  onClose: () => void;
}

export default function AddRelationBox({ onAdd, onClose }: Props) {
  const [relationType, setRelationType] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");

  const handleAdd = () => {
    if (!relationType || !fullName || !gender) {
      alert("Please fill all fields.");
      return;
    }
    onAdd(relationType, fullName, gender);
    setRelationType("");
    setFullName("");
    setGender("");
    onClose();
  };

  return (
    <div className="flex flex-col bg-black/50 p-4 border rounded-md mt-2 w-full max-w-xs relative gap-5">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-white font-bold"
        onClick={onClose}
      >
        X
      </button>

      <h3 className="text-base font-medium mb-2">Add Relation</h3>

      <input
        type="text"
        placeholder="Full Name"
        className="border py-2 px-4 mb-2 w-full rounded-full"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <select
        className="p-2 mb-2 w-full rounded-full"
        value={relationType}
        onChange={(e) => setRelationType(e.target.value)}
      >
        <option value="">Select Relation</option>
        <option value="parent">Parent</option>
        <option value="spouse">Spouse</option>
        <option value="child">Child</option>
      </select>

      <select
        className="p-2 mb-2 w-full"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <Button text="Add" onClick={handleAdd} variant="white" />
    </div>
  );
}
