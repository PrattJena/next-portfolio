'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Branding from './SVGR/Branding';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

type HeaderProps = {
    delay?: number;
};

export default function Header({ delay = 0 }: HeaderProps) {
    const container = useRef<HTMLDivElement>(null);
    const animationsReady = usePageReady();

    useGSAP(
        () => {
            if (!animationsReady || !container.current) return;

            gsap.set('.branding', {
                yPercent: 0,
                overflow: 'hidden',
            });

            gsap.from('.branding', {
                duration: 1,
                yPercent: 100,
                ease: 'power4.out',
                delay,
            });
        },
        { scope: container, dependencies: [delay, animationsReady] }
    );

    return (
        <div ref={container} className='flex items-center'>
            <span className='block overflow-y-hidden'>
                <Branding className='branding block h-[4.5vw] w-auto md:h-[3.5vw] lg:h-[2vw]' />
            </span>
        </div>
    );
}
