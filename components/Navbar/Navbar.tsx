"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSignedIn(!!data.session);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSignedIn(!!session);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between w-full py-10 px-20">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer">Pachrukhi</h1>
      </Link>
      {signedIn ? (
        <Button text="Sign Out" onClick={handleLogout} variant="red" />
      ) : (
        <Button text="Sign In" link="/login" />
      )}
    </div>
  );
};

export default Navbar;
