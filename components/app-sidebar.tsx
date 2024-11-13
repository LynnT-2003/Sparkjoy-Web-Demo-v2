"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Home,
  Search,
  Settings,
  Heart,
  LogOut,
  ChevronDown,
  Bookmark,
  User2,
  Edit,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

import {
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
  User,
} from "@/lib/firebase";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function AppSidebar() {
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
    <Sidebar>
      <SidebarContent className="mx-4">
        <SidebarGroup className="">
          <div
            className="flex items-center mb-3 mt-1 hover:cursor-pointer ml-[-0.5rem]"
            onClick={() => router.push("/")}
          >
            <img
              src="/logo_clear.png"
              alt="Anim8"
              className="w-14 h-14 rounded-full object-cover opacity-88"
            />
            <SidebarGroupLabel className="text-2xl text-white font-bold font-sans mt-0 ml-0">
              PrismaForge
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent className="mt-0">
            <SidebarMenu>
              <SidebarMenuItem
                className="py-4 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear"
                onClick={() => router.push("/")}
              >
                <SidebarMenuButton
                  asChild
                  className="text-lg text-[#d9d9d9] space-x-2"
                >
                  <a>
                    <Home className="w-64 h-64" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="py-4 w-full flex items-center text-lg text-[#d9d9d9] hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                  <Edit className="ml-2 w-5 h-5" />
                  <span className="ml-4">Studio</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <SidebarMenu>
                    <div className="mb-1">
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear"
                        onClick={() => router.push("/Prompt")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-[#d9d9d9] space-x-2"
                        >
                          <a>
                            <span className="text-base text-[#d9d9d9] ml-7">
                              Text Prompt
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear"
                        onClick={() => router.push("/ImageUpload")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-[#d9d9d9] space-x-2"
                        >
                          <a>
                            <span className="text-base text-[#d9d9d9] ml-7">
                              Image Upload
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="py-4 w-full flex items-center text-lg text-[#d9d9d9] hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                  <Bookmark className="ml-2 w-5 h-5" />
                  <span className="ml-4">My Collections</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <SidebarMenu>
                    <div className="mb-1">
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear"
                        onClick={() => router.push("/Templates")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-[#d9d9d9] space-x-2"
                        >
                          <a>
                            <span className="text-base text-[#d9d9d9] ml-7">
                              Templates
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem className="my-2 py-1 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-[#d9d9d9] space-x-2"
                        >
                          <a href={""}>
                            <span className="text-base text-[#d9d9d9] ml-7">
                              Favorites
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem className="my-2 py-1 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-[#d9d9d9] space-x-2"
                          onClick={() => router.push("/History")}
                        >
                          <a>
                            <span className="text-base text-[#d9d9d9] ml-7">
                              Image History
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
              <SidebarMenuItem className="py-4 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                <SidebarMenuButton
                  asChild
                  className="text-lg text-[#d9d9d9] space-x-2"
                >
                  <a href={""}>
                    <Settings className="w-64 h-64" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user ? (
                <SidebarMenuItem className="py-4 hover:cursor-pointer hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                  <SidebarMenuButton
                    asChild
                    className="text-lg text-[#d9d9d9] space-x-2"
                    onClick={handleSignOut}
                  >
                    <a>
                      <LogOut className="w-64 h-64" />
                      <span>Sign Out</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Button
                  className="w-full mt-4 py-2 mb-3"
                  onClick={handleSignIn}
                >
                  <h1 className="text-lg">Sign In</h1>
                </Button>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 mb-2 flex gap-0 items-center">
          {user ? (
            <div className="w-full flex items-center">
              <Image
                src={user.photoURL || "/default.png"} // Fallback if photoURL is not available
                alt={user.displayName || "User"}
                width={36} // Set desired width
                height={36} // Set desired height
                className="rounded-full"
                onClick={() => router.push("/Profile")}
              />
              <h1 className="text-lg text-[#d9d9d9] ml-4">
                {user.displayName}
              </h1>
            </div>
          ) : (
            <div className="flex space-x-4 items-center justify-start mb-3">
              <User2 className="w-6 h-6" />
              <h1 className="text-base text-[#d9d9d9] ml-4">
                User not signed in
              </h1>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
