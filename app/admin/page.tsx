"use client";

import { useState } from "react";
import SearchBar from "@/components/Searchbar/Searchbar";
import { useProtectedRoute } from "@/lib/hooks";
import FamilyTree from "@/components/FamilyTree/FamilyTree";

export default function Home() {
  const [rootGeneration, setRootGeneration] = useState<string[]>([]);
  const isAuthenticated = useProtectedRoute();

  if (!isAuthenticated) return null;

  return (
    <main className="flex flex-col items-center">
      <SearchBar setRootGeneration={setRootGeneration} />
      <FamilyTree rootGeneration={rootGeneration} showFamily={false} canAddRelations={true} />
    </main>
  );
}
