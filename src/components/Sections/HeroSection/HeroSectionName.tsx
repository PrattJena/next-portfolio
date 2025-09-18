import Name from '../../SVGR/Name';
import Surname from '../../SVGR/Surname';

export default function HeroSectionName() {
    return (
        <div className='gap-xs md:gap-sm mt-[50vw] mb-[18vw] flex w-full flex-col items-center md:mt-[30vw] md:mb-[14vw] lg:mt-[7vw] lg:mb-[7vw] lg:flex-row lg:justify-between xl:mt-[5vw]'>
            <Name className='h-[14vw] w-auto max-w-full md:h-[14.66vw] lg:h-[9.1vw]' />
            <Surname className='h-[14vw] w-auto max-w-full md:h-[14.66vw] lg:h-[9.1vw]' />
        </div>
    );
}
