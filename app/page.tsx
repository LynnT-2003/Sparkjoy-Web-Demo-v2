import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";

export default function Home() {
  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <InputSection />
      <HistoryImagesSection />
    </div>
  );
}
