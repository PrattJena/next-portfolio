'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroName, { letterIds } from '@/components/SVGR/HeroName';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export default function HeroSectionName({ delay = 0 }: { delay?: number }) {
    const container = useRef<HTMLDivElement>(null);
    const animationsReady = usePageReady();
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (!animationsReady || !container.current) return;

            const letters = letterIds.map((id) => `#${id}`);

            if (prefersReducedMotion) {
                gsap.set(letters, { opacity: 1, yPercent: 0 });
                return;
            }

            gsap.set(letters, {
                // opacity: 0,
                yPercent: 110,
                transformOrigin: '50% 100%',
            });

            gsap.to(letters, {
                // opacity: 1,
                yPercent: 0,
                duration: 0.65,
                stagger: 0.065,
                ease: 'power4.out',
                delay,
            });
        },
        { scope: container, dependencies: [delay, animationsReady, prefersReducedMotion] }
    );

    return (
        <div
            ref={container}
            className='mb-[18vw] flex w-full items-center justify-center md:mb-[14vw] lg:mb-[7vw]'>
            <HeroName
                className='block h-[14vw] w-auto max-w-full md:h-[12vw] lg:h-[15vw]'
                color='black'
            />
        </div>
    );
}
