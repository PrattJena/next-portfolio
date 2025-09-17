import Name from "../SVGR/Name";
import Surname from "../SVGR/Surname";

export default function HeroSection() {
    return (
        <div className="flex flex-col gap-xs items-center mb-[18vw] w-full md:gap-sm md:mb-[14vw] lg:flex-row lg:justify-between lg:mb-[8vw] ">
            <Name className="h-[14vw] w-auto md:h-[14.55vw] lg:h-[9.1vw]" />
            <Surname className="h-[14vw] w-auto md:h-[14.55vw] lg:h-[9.1vw]" />
        </div>
    )
}