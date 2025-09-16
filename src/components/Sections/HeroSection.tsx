import Image from "next/image";
import name from "@/images/PRATYUSH.svg"
import surname from "@/images/JENA.svg"

export default function HeroSection() {
    return (
        <div className="flex flex-col gap-xs items-center mb-[25vw] w-full md:gap-sm md:mb-[14vw] lg:flex-row lg:justify-between lg:mb-[8vw] ">
            <Image src={name} priority={true} alt="Pratyush" className="h-[14vw] w-auto md:h-[15vw] lg:h-[9.1vw]" />
            <Image src={surname} priority={true} alt="Jena" className="h-[14vw] w-auto md:h-[15vw] lg:h-[9.1vw]" />
        </div>
    )
}