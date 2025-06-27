"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SearchBarProps {
  setRootGeneration: (ids: string[]) => void;
}

const SearchBar = ({ setRootGeneration }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      const { data, error } = await supabase
        .from("FamilyTree")
        .select("*")
        .ilike("Full name", `%${query}%`)
        .limit(5);

      if (error) {
        console.error("Supabase Error:", error.message);
        setResults([]);
        return;
      }

      setResults(data || []);
      setShowDropdown(true);
    };

    const timeoutId = setTimeout(fetchResults, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative max-w-md w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center border border-black rounded-full overflow-hidden shadow-sm bg-white/70 text-black"
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 hover:bg-gray-100 transition"
          aria-label="Search"
        >
          🔍
        </button>
      </form>

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {results.map((person) => (
            <div
              key={person.ID}
              className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
              onClick={() => {
                setQuery(person["Full name"]);
                setShowDropdown(false);
                setRootGeneration([person.ID]);
              }}
            >
              {person["Full name"]}
            </div>
          ))}
        </div>
      )}

      {showDropdown && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-300 rounded-md shadow-lg z-50 px-4 py-2 text-white">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
