'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

export default function HeroSectionDescription({
    delay = 0,
}: {
    delay?: number;
}) {
    const ref = useRef<HTMLElement>(null);
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // if (!container.current || !ref.current) return;
            document.fonts.ready.then(() => {
                let split;
                SplitText.create(ref.current, {
                    type: 'lines',
                    linesClass: 'lines++',
                    autoSplit: true,
                    lineThreshold: 0.1,
                    mask: 'lines',
                    onSplit: (self) => {
                        split = gsap.from(self.lines, {
                            duration: 1,
                            yPercent: 100,
                            stagger: 0.13,
                            ease: 'power4.out',
                            delay: delay,
                        });
                        return split;
                    },
                });
            });
        },
        { dependencies: [delay] }
    );

    return (
        <div className='text-center lg:text-left'>
            <span
                ref={ref}
                className='title3 md:title1 font-medium text-neutral-500 md:font-medium'>
                I'm a{' '}
                <span className='text-[#ff4c24]'>Full Stack Developer</span>{' '}
                based in <br />
                United States. I love bringing ideas to life.
            </span>
        </div>
    );
}
