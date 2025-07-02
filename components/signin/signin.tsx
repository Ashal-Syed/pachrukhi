"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20"
    >
      {error && (
        <div className="bg-red-400/50 text-white py-2 px-4 text-sm rounded-full">
          {error}
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-full border py-2 px-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="rounded-full border py-2 px-4"
      />
      <button
        type="submit"
        className="bg-white/70 text-black rounded-full py-2 px-4"
      >
        Sign In
      </button>
    </form>
  );
}

// import React from 'react'

// const signin = () => {
//   return (
//     <div>signin</div>
//   )
// }

// export default signin