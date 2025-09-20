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
            document.fonts.ready.then(() => {
                const split = new SplitText(ref.current, {
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
                    delay: delay,
                });

                // Cleanup function
                return () => {
                    if (split) {
                        split.revert();
                    }
                };
            });
        },
        { dependencies: [delay, animationsReady] }
    );

    return (
        <div className='text-center lg:text-left'>
            <span
                ref={ref}
                className='title3 lg:title1 font-medium text-neutral-500 lg:font-medium'>
                I'm a{' '}
                <span className='text-[#ff4c24]'>Full Stack Developer</span>{' '}
                based in <br />
                United States. I love bringing ideas to life.
            </span>
        </div>
    );
}
