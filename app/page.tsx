"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SearchBar from "@/components/Searchbar/Searchbar";
import FamilyTree from "@/components/FamilyTree/FamilyTree";

export default function Home() {
  const [rootGeneration, setRootGeneration] = useState<string[]>([]);

  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <SearchBar setRootGeneration={setRootGeneration} />
      <FamilyTree rootGeneration={rootGeneration} />
    </main>
  );
}
