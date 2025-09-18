import Header from "@/components/Header";
import HeroSection from "@/components/Sections/HeroSection/HeroSectionName";
import HeroSectionDescription from "@/components/Sections/HeroSection/HeroSectionDescription";
import ContactButton from "@/components/ContactButton";

export default function Home() {
  return (

    <div className="px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6 h-[100svh]">
      <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] gap-x-4 h-full">

        {/* Row 1: Header (L) + Button (R) */}
        <Header />
        <div className="sticky top-3 lg:top-6 z-0">
          <ContactButton />
        </div>

        {/* Row 2: Hero section (spans both cols, fills rest of height) */}
        <div className="col-span-2 min-h-0">
          <div className="flex flex-col justify-end h-full items-center lg:items-start">
            <HeroSectionDescription />
            <HeroSection />
          </div>
        </div>
      </div>
    </div>
  );
}
