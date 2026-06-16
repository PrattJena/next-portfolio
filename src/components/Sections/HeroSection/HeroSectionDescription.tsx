'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export default function HeroSectionDescription({
    delay = 0,
}: {
    delay?: number;
}) {
    const container = useRef<HTMLDivElement>(null);
    const animationsReady = usePageReady();
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (!animationsReady || !container.current) return;

            const lines = gsap.utils.toArray<HTMLElement>(
                '.hero-description-line',
                container.current
            );

            if (prefersReducedMotion) {
                gsap.set(lines, { opacity: 1, yPercent: 0 });
                return;
            }

            gsap.set(lines, {
                opacity: 0,
                yPercent: 100,
                transformOrigin: '50% 100%',
            });

            gsap.to(lines, {
                opacity: 1,
                yPercent: 0,
                duration: 0.8,
                stagger: 0.13,
                ease: 'power4.out',
                delay,
            });
        },
        {
            scope: container,
            dependencies: [delay, animationsReady, prefersReducedMotion],
        }
    );

    return (
        <div ref={container} className='max-w-6xl text-center'>
            <p className='subheading lg:title3 !font-medium text-neutral-500'>
                <span className='block overflow-y-hidden'>
                    <span className='hero-description-line block'>
                        I&apos;m an{' '}
                        <span className='text-[#ff4c24]'>
                            AI Full Stack Engineer
                        </span>
                    </span>
                </span>
                <span className='block overflow-y-hidden'>
                    <span className='hero-description-line block'>
                        working in{' '}
                        <span className='text-[#ff4c24]'>
                            Roseville, California
                        </span>
                    </span>
                </span>
                <span className='block overflow-y-hidden'>
                    <span className='hero-description-line block'>
                        crafting beautiful, intelligent experiences.
                    </span>
                </span>
            </p>
        </div>
    );
}
