"use client";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MobileSidebar from "@/components/mui-mobile-drawer";
import { AppSidebar } from "@/components/app-sidebar";
import localFont from "next/font/local";
import "./globals.css";
import { MobileSidebarItem } from "@/components/mui-mobile-drawer";

import { Edit, Settings, LogOut, HomeIcon, Image } from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="md:w-screen overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark `}
      >
        <div className="">
          <SidebarProvider>
            <AppSidebar />
            <main className="w-screen relative">
              <div className="hidden md:block fixed bg-red-800 py-1 opacity-50 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300 ease-in-out top-6 z-50">
                <SidebarTrigger className="" />
              </div>
              <MobileSidebar>
                <div className="mt-5"></div>
                <MobileSidebarItem
                  icon={<HomeIcon />}
                  text="Home"
                  active={false}
                  alert={false}
                  route={"/"}
                />
                <MobileSidebarItem
                  icon={<Edit />}
                  text="Text Prompt"
                  active={false}
                  alert={false}
                  route={"/Prompt"}
                />
                <MobileSidebarItem
                  icon={<Image />}
                  text="Templates"
                  active={false}
                  alert={false}
                  route={"/ImageUpload"}
                />
                <MobileSidebarItem
                  icon={<Settings />}
                  text="Settings"
                  active={false}
                  alert={false}
                  route={"/ImageUpload"}
                />
                <MobileSidebarItem
                  icon={<LogOut />}
                  text="Sign Out"
                  active={false}
                  alert={false}
                  route={"/"}
                />
              </MobileSidebar>
              {children}
            </main>
          </SidebarProvider>
        </div>
        {/* <div className="md:hidden w-screen bg-blue-500 h-screen"></div> */}
      </body>
    </html>
  );
}
