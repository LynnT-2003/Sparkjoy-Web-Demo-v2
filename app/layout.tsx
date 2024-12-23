"use client";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import MobileSidebar from "@/components/mui-mobile-drawer";
import { AppSidebar } from "@/components/app-sidebar";
import localFont from "next/font/local";
import "./globals.css";
import { MobileSidebarItem } from "@/components/mui-mobile-drawer";

import {
  Edit,
  Settings,
  LogOut,
  HomeIcon,
  Image,
  History,
  LockIcon,
} from "lucide-react";
import Head from "next/head";

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
    <html lang="en" className="md:w-screen overflow-x-hidden bg-red-700">
      <head>
        <Head>
          {/* Global Metadata */}
          <title>PrismaForge.Ai</title>
          <meta name="description" content="Create your own AI Characters" />

          {/* Open Graph / Social Media Metadata */}
          <meta property="og:title" content="PrismaForge.Ai" />
          <meta
            property="og:description"
            content="Create your own AI Characters"
          />
          <meta
            property="og:image"
            content="https://yourwebsite.com/og-image.jpg"
          />
          <meta property="og:url" content="https://yourwebsite.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@yourTwitterHandle" />
          <meta name="twitter:title" content="PrismaForge.Ai" />
          <meta
            name="twitter:description"
            content="Create your own AI Characters"
          />
          <meta
            name="twitter:image"
            content="https://yourwebsite.com/og-image.jpg"
          />
        </Head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark `}
      >
        <div className="">
          <SidebarProvider>
            <AppSidebar />
            <div className="hidden md:block fixed mt-8 ml-4 hover:cursor-pointer transition-opacity duration-300 ease-in-out z-50">
              <SidebarTrigger className="absolute top-0 left-0" />
            </div>
            <main className="w-screen relative">
              <MobileSidebar>
                <div className="mt-5"></div>
                <MobileSidebarItem
                  icon={<HomeIcon />}
                  text="Home"
                  active={false}
                  alert={false}
                  route={"/"}
                  onClick={""}
                />
                {/* <MobileSidebarItem
                  icon={<Image />}
                  text="Templates"
                  active={false}
                  alert={false}
                  route={"/ImageUpload"}
                  onClick={""}
                /> */}
                <MobileSidebarItem
                  icon={<Image />}
                  text="Media"
                  active={false}
                  alert={false}
                  route={"/Test"}
                  onClick={""}
                />
                {/* <MobileSidebarItem
                  icon={<LockIcon />}
                  text="Prompt"
                  active={false}
                  alert={false}
                  route={""}
                  onClick={""}
                /> */}
                <MobileSidebarItem
                  icon={<History />}
                  text="History"
                  active={false}
                  alert={false}
                  route={"/history"}
                  onClick={""}
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
