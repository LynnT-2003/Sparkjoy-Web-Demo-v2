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
  History,
  ImageIcon,
  LockIcon,
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
    <Sidebar className="">
      <SidebarContent className="mx-4">
        <SidebarGroup className="">
          <div
            className="flex items-center mb-3 mt-5 hover:cursor-pointer ml-[-0.5rem]"
            onClick={() => router.push("/")}
          >
            {/* <img
              src="/logo_clear.png"
              alt="Anim8"
              className="w-14 h-14 rounded-full object-cover opacity-88"
            /> */}
            <SidebarTrigger className="absolute w-[24px] h-[24px] rounded-full bg-[#121212] flex items-center justify-center z-50" />
            <SidebarGroupLabel className="text-2xl text-white font-medium font-sans mt-0 ml-0">
              PrismaForge
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent className="mt-0">
            <SidebarMenu>
              <SidebarMenuItem
                className="py-5 ml-[-0.4rem] hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                onClick={() => router.push("/")}
              >
                <SidebarMenuButton
                  asChild
                  className="text-lg text-red-200 space-x-1 active:text-gray-700"
                >
                  <a>
                    {/* <Home className="w-64 h-64" /> */}
                    <img src="/logo.png" alt="PrismaForge" className="w-8" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* <SidebarMenuItem
                className="py-5 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                onClick={() => router.push("/Prompt")}
              >
                <SidebarMenuButton
                  asChild
                  className="text-lg text-red-200 space-x-2"
                >
                  <a>
                    <Edit className="w-64 h-64" />
                    <span>Prompt</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              {/* <SidebarMenuItem
                className="py-5 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                onClick={() => router.push("/Test")}
              >
                <SidebarMenuButton
                  asChild
                  className="text-lg text-red-200 space-x-2"
                >
                  <a>
                    <ImageIcon className="w-64 h-64" />
                    <span>Custom</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="py-5 w-full flex items-center text-lg text-red-200 hover:bg-red-900 transition-all duration-150 ease-linear">
                  <Edit className="ml-2 w-5 h-5" />
                  <span className="ml-4">Studio</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 transition-all duration-150 ease-linear">
                  <SidebarMenu>
                    <div className="mb-1">
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer transition-all duration-150 ease-linear"
                        // onClick={() => router.push("/Prompt")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-red-200 space-x-2"
                        >
                          <a>
                            <span className="text-base hover:text-red-500 text-red-200 ml-7 flex">
                              Text Prompt <LockIcon className="w-5 h-5 ml-2" />
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                        onClick={() => router.push("/Test")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-red-200 space-x-2"
                        >
                          <a>
                            <span className="text-base text-red-200 ml-7">
                              Image Upload
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>

              {/* <Collapsible defaultOpen>
                <CollapsibleTrigger className="py-5 w-full flex items-center text-lg text-red-200 hover:bg-red-900 transition-all duration-150 ease-linear">
                  <Bookmark className="ml-2 w-5 h-5" />
                  <span className="ml-4">My Collections</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <SidebarMenu>
                    <div className="mb-1">
                      <SidebarMenuItem
                        className="my-2 py-1 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                        onClick={() => router.push("/Templates")}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-red-200 space-x-2"
                        >
                          <a>
                            <span className="text-base text-red-200 ml-7">
                              Templates
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem className="my-2 py-1 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear">
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-red-200 space-x-2"
                        >
                          <a href={""}>
                            <span className="text-base text-red-200 ml-7">
                              Favorites
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem className="my-2 py-1 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear">
                        <SidebarMenuButton
                          asChild
                          className="text-lg text-red-200 space-x-2"
                          onClick={() => router.push("/history")}
                        >
                          <a>
                            <span className="text-base text-red-200 ml-7">
                              Image History
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible> */}

              <SidebarMenuItem
                className="py-5 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear"
                onClick={() => router.push("/history")}
              >
                <SidebarMenuButton
                  asChild
                  className="text-lg text-red-200 space-x-2"
                >
                  <a>
                    <History className="w-64 h-64" />
                    <span>History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user ? (
                <SidebarMenuItem className="py-5 hover:cursor-pointer hover:bg-red-900 transition-all duration-150 ease-linear">
                  <SidebarMenuButton
                    asChild
                    className="text-lg text-red-200 space-x-2"
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

      <SidebarFooter className="border-t-2 border-red-900">
        <div className="w-full mb-0 flex gap-0 items-center justify-center">
          {user ? (
            <div className="w-full flex items-center py-2 ml-4">
              <Image
                src={user.photoURL || "/default.png"} // Fallback if photoURL is not available
                alt={user.displayName || "User"}
                width={36} // Set desigreen width
                height={36} // Set desigreen height
                className="rounded-full border border-white"
                onClick={() => router.push("/Profile")}
              />
              <h1 className="text-base text-gray-300 ml-4">
                {user.displayName}
              </h1>
            </div>
          ) : (
            <div className="flex h-full items-center justify-start my-3">
              {/* <User2 className="w-6 h-6 text-[#101010]" /> */}
              <h1 className="text-base text-red-200 opacity-75">
                User not signed in
              </h1>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
