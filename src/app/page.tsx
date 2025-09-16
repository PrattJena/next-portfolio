import Header from "@/components/Header";
import HeroSection from "@/components/Sections/HeroSection";
import BottomNavbar from "@/components/BottomNavbar";

export default function Home() {
  return (
    <div className="flex flex-col h-[100svh] px-4 py-2 lg:px-8 lg:py-4">
      <Header />
      <div className="flex flex-col items-center justify-end h-full">
        <HeroSection />
      </div>
      {/* <BottomNavbar /> */}
    </div>
  );
}
