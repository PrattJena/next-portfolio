'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Name from '../../SVGR/Name';
import Surname from '../../SVGR/Surname';
import { useRef } from 'react';

export default function HeroSectionName({ delay = 0 }: { delay?: number }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!container.current) return;

            gsap.set('.name', { yPercent: 0, overflow: 'hidden' });

            gsap.from('.name', {
                duration: 1,
                yPercent: 100,
                stagger: 0.13,
                ease: 'power4.out',
                delay: delay,
            });
        },
        { scope: container, dependencies: [delay] }
    );

    return (
        <div
            ref={container}
            className='gap-xs md:gap-sm mt-[50vw] mb-[18vw] flex w-full flex-col items-center md:mt-[10vw] md:mb-[14vw] lg:mt-[7vw] lg:mb-[7vw] lg:flex-row lg:justify-between xl:mt-[5vw]'>
            <span className='block overflow-y-hidden'>
                <Name className='name block h-[14vw] w-auto max-w-full md:h-[14.66vw] lg:h-[9.1vw]' />
            </span>
            <span className='block overflow-y-hidden'>
                <Surname className='name block h-[14vw] w-auto max-w-full md:h-[14.66vw] lg:h-[9.1vw]' />
            </span>
        </div>
    );
}
