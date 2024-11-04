"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
  User,
} from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const navLists = ["Buy", "Rent"];

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    await signInWithGoogle();
    console.log("Sign-in successful!");
  };

  const handleSignOut = async () => {
    await signOutUser();
    console.log("Sign-out successful!");
  };

  return (
    <div className="w-screen flex items-center justify-center">
      <header className="md:px-0 px-0 w-[90vw] py-2 flex justify-between items-center">
        <nav className="flex w-full screen-max-width">
          <div className="flex flex-1 items-center ">
            <div className="md:pr-15 py-1 pr-5 cursor-pointer">
              {/* <img
                  src="/logo.png"
                  width={128}
                  onClick={() => router.push("/")}
                /> */}
            </div>
            {user ? (
              <div className="pl-0 font-thin text-sm cursor-pointer text-gray hover:font-light hover:text-base hover:text-slate-500 transition-all">
                {/* Using Next.js Image component */}
                <span className="text-md">Welcome {user.displayName}</span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </nav>
        <div className="flex gap-0 justify-center items-center">
          {user ? (
            <div className="flex items-center">
              {/* Using Next.js Image component */}
              <Image
                src={user.photoURL || "/default-avatar.png"} // Fallback if photoURL is not available
                alt={user.displayName || "User"}
                width={40} // Set desired width
                height={40} // Set desired height
                className="rounded-full"
                onClick={() => router.push("/Profile")}
              />
              <Button onClick={handleSignOut} className="text-sm ml-4">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
