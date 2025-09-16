import Header from "@/components/Header";
import BottomNavbar from "@/components/BottomNavbar";

export default function Projects() {
  return (
    <div className="flex flex-col h-[200svh] px-4 py-2 lg:px-8 lg:py-4">
      <Header />
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-blue-400">Project Page</h1>
      </div>
      {/* <BottomNavbar /> */}
    </div>
  );
}
