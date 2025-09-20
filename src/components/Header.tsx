'use client';

import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Branding from './SVGR/Branding';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

export default function Header({ showResume = true, delay = 0 }) {
    const container = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLElement>(null);
    const animationsReady = usePageReady();

    useGSAP(
        () => {
            if (!animationsReady || !container.current || !ref.current) return;
            gsap.set('.branding', {
                yPercent: 0,
                overflow: 'hidden',
            });
            gsap.from('.branding', {
                duration: 1,
                yPercent: 100,
                ease: 'power4.out',
                delay: delay,
            });

            document.fonts.ready.then(() => {
                const split = SplitText.create(ref.current, {
                    type: 'lines',
                    linesClass: 'lines++',
                    lineThreshold: 0.1,
                    mask: 'lines',
                });

                gsap.from(split.lines, {
                    duration: 1,
                    yPercent: 100,
                    stagger: 0.13,
                    ease: 'power4.out',
                    delay: delay,
                });

                return () => {
                    if (split) {
                        split.revert();
                    }
                };
            });
        },
        { scope: container, dependencies: [delay, animationsReady] }
    );

    return (
        <div ref={container} className='grid grid-cols-9 items-center'>
            <span className='block overflow-y-hidden'>
                <Branding className='branding col-span-3 block h-[5.3vw] w-auto md:h-[4.3vw] lg:h-[2.5vw]' />
            </span>

            <div className='col-span-4 col-start-6 md:col-span-3 md:col-start-7 lg:col-span-2 lg:col-start-8'>
                {showResume && (
                    <span
                        ref={ref}
                        className='caption md:subheading lg:title3 font-medium text-black md:font-medium lg:font-medium'>
                        Available for Work <br />
                        <span className='cursor-pointer font-medium text-stone-500 transition-colors duration-300 hover:text-[#ff4c24d0] md:font-medium lg:font-medium'>
                            View Resume
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}
