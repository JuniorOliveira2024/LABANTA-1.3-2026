import { LeftSection } from "@/components/registro/left-section";
import { RightSection } from "@/components/registro/right-section";

export default function RegistroPage() {
  return (
    <div className="bg-gray-200 h-screen flex justify-between">
      <LeftSection />
      <RightSection />
    </div>
  );
}
