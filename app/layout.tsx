import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "PrismaForge.Ai",
  description: "Create your own AI Characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-screen relative bg-[#111112]">
            <div className="fixed bg-red-800 py-1 opacity-50 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300 ease-in-out top-4 z-50">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
