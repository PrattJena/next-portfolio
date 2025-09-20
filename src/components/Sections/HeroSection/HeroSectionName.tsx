'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Name from '../../SVGR/Name';
import Surname from '../../SVGR/Surname';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

export default function HeroSectionName({ delay = 0 }: { delay?: number }) {
    const container = useRef<HTMLDivElement>(null);
    const animationsReady = usePageReady();

    useGSAP(
        () => {
            if (!animationsReady || !container.current) return;

            gsap.set('.name', { yPercent: 0, overflow: 'hidden' });

            gsap.from('.name', {
                duration: 1,
                yPercent: 100,
                stagger: 0.13,
                ease: 'power4.out',
                delay: delay,
            });
        },
        { scope: container, dependencies: [delay, animationsReady] }
    );

    return (
        <div
            ref={container}
            className='gap-xs md:gap-sm mb-[18vw] flex w-full flex-col items-center md:mb-[14vw] lg:mb-[7vw] lg:flex-row lg:justify-between'>
            <span className='block overflow-y-hidden'>
                <Name className='name block h-[14vw] w-auto max-w-full md:w-fit lg:h-[9.1vw]' />
            </span>
            <span className='block overflow-y-hidden'>
                <Surname className='name block h-[14vw] w-auto max-w-full md:w-fit lg:h-[9.1vw]' />
            </span>
        </div>
    );
}
