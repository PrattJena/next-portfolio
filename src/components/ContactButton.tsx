'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

export default function ContactButton({ delay = 0 }) {
    const element = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const duplicateTextRef = useRef<HTMLSpanElement>(null);
    const animationsReady = usePageReady();

    const { contextSafe } = useGSAP(
        () => {
            if (!animationsReady || !element.current) return;

            const elementRef = element.current;
            gsap.set(elementRef, {
                yPercent: 0,
                overflow: 'hidden',
            });
            gsap.from(elementRef, {
                duration: 1,
                yPercent: 100,
                ease: 'power4.out',
                delay: delay,
            });
            if (textRef.current && duplicateTextRef.current) {
                gsap.set(textRef.current, { y: 0 });
                gsap.set(duplicateTextRef.current, { y: '100%' });
            }
        },
        { scope: element, dependencies: [animationsReady, delay] }
    );

    const onMouseEnter = contextSafe(() => {
        if (textRef.current && duplicateTextRef.current) {
            const tl = gsap.timeline();
            tl.to(
                textRef.current,
                {
                    y: '-100%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );

            tl.to(
                duplicateTextRef.current,
                {
                    y: '0%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );
        }
    });

    const onMouseLeave = contextSafe(() => {
        if (textRef.current && duplicateTextRef.current) {
            const tl = gsap.timeline();
            tl.to(
                duplicateTextRef.current,
                {
                    y: '100%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );

            tl.to(
                textRef.current,
                {
                    y: '0%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );
        }
    });

    return (
        <span className='block overflow-y-hidden'>
            <div ref={element}>
                <Link
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    href='/contact'
                    className='px-md py-sm md:px-lg md:py-md relative flex items-center justify-center rounded-full bg-black'>
                    <div className='relative overflow-hidden'>
                        <span
                            ref={textRef}
                            className='contact caption md:heading lg:title3 block font-semibold text-white md:font-semibold lg:font-semibold'>
                            Get in Touch
                        </span>

                        <span
                            ref={duplicateTextRef}
                            className='contact caption md:heading lg:title3 absolute top-0 left-0 w-full font-semibold text-white md:font-semibold lg:font-semibold'
                            style={{ color: '#ff4c24' }}>
                            Get in Touch
                        </span>
                    </div>
                </Link>
            </div>
        </span>
    );
}
