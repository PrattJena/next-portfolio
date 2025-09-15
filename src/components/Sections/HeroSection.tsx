import Image from "next/image";
import name from "@/images/PRATYUSH.svg"
import surname from "@/images/JENA.svg"

export default function HeroSection() {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <Image src={name} alt="Pratyush" className="h-[8.4vw] sm:h-[8.7vw] w-auto" />
            <Image src={surname} alt="Jena" className="h-[8.4vw] sm:h-[8.7vw] w-auto" />
        </div>
    )
}