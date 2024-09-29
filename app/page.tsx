import Image from "next/image";
import { Input } from "@/components/ui/input";
import InputSection from "@/components/sections/InputSection";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <InputSection />
    </div>
  );
}
