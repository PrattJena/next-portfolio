import Header from "@/components/Header";
import ContactButton from "@/components/ContactButton";

export default function Projects() {
  return (
    <div className="px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6">
      <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] gap-x-4 h-full">
        
        <Header />
        <div className="sticky top-3 lg:top-6 z-0">
          <ContactButton />
        </div>

        <div className="col-span-2">
          <div className="flex flex-col items-center h-[150svh]">
            <h1 className="text-4xl font-bold text-amber-400">Projects Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

