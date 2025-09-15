import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-[100svh] px-4 py-2 lg:px-8 lg:py-4">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold text-blue-400">About Page</h1>
      </div>
    </div>
  );
}
