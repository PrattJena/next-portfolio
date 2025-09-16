import Header from "@/components/Header"
import BottomNavbar from "@/components/BottomNavbar"

export default function About() {
  return (
    <div className="flex flex-col gap-lg px-4 py-2 lg:px-8 lg:py-4">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-400">About Page</h1>
      </div>
      <div className="bg-red-400 rounded-xl h-[150svh]"></div>
      {/* <BottomNavbar /> */}
    </div>
  )
}