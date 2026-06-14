'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

gsap.registerPlugin(SplitText);

export default function HeroSectionDescription({
    delay = 0,
}: {
    delay?: number;
}) {
    const animationsReady = usePageReady();
    const ref = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!animationsReady || !ref.current) return;

            let split: SplitText | null = null;

            document.fonts.ready.then(() => {
                if (!ref.current) return;

                split = new SplitText(ref.current, {
                    type: 'lines',
                    linesClass: 'lines++',
                    mask: 'lines',
                    lineThreshold: 0.1,
                });

                gsap.from(split.lines, {
                    duration: 1,
                    yPercent: 100,
                    stagger: 0.13,
                    ease: 'power4.out',
                    delay,
                });
            });

            return () => {
                split?.revert();
            };
        },
        { dependencies: [delay, animationsReady] }
    );

    return (
        <div className='max-w-6xl text-center'>
            <span
                ref={ref}
                className='subheading lg:title3 !font-medium text-neutral-500'>
                I'm an{' '}
                <span className='text-[#ff4c24]'>AI Full Stack Engineer</span>{' '}
                building intelligent, beautiful digital experiences.
                <br />
                <span className='text-[#ff4c24]'>Animate your story.</span>
            </span>
        </div>
    );
}
