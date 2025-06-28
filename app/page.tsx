"use client";

import { useState } from "react";
import Hero from "@/components/Hero/Hero";
import SearchBar from "@/components/Searchbar/Searchbar";
import FamilyTree from "@/components/FamilyTree/FamilyTree";

export default function Home() {
  const [rootGeneration, setRootGeneration] = useState<string[]>([]);

  return (
    <main className="flex flex-col items-center">
      <Hero />
      <SearchBar setRootGeneration={setRootGeneration} />
      <FamilyTree rootGeneration={rootGeneration} />
    </main>
  );
}
