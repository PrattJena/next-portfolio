import Name from "../../SVGR/Name";
import Surname from "../../SVGR/Surname";

export default function HeroSectionName() {
    return (
        <div className="flex flex-col gap-xs items-center mt-[50vw] mb-[18vw] w-full md:gap-sm md:mb-[14vw] md:mt-[30vw] lg:flex-row lg:justify-between lg:mb-[7vw] lg:mt-[7vw] xl:mt-[5vw]">
            <Name className="h-[14vw] max-w-full w-auto md:h-[14.66vw] lg:h-[9.1vw] " />
            <Surname className="h-[14vw] max-w-full w-auto md:h-[14.66vw] lg:h-[9.1vw]" />
        </div>
    )
}