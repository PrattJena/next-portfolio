'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ContactButton({ delay = 0 }) {
    const element = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            if (!element.current) return;
            gsap.set(element.current, {
                yPercent: 0,
                overflow: 'hidden',
            });
            gsap.from(element.current, {
                duration: 1,
                yPercent: 100,
                ease: 'power4.out',
                delay: delay,
            });
        },
        { dependencies: [delay] }
    );
    return (
        <span className='block overflow-y-hidden'>
            <div ref={element}>
                <Link
                    href='/contact'
                    className='flex items-center justify-center rounded-full bg-black'>
                    <span className='caption md:title3 my-sm mx-md font-semibold text-white md:font-semibold'>
                        Get in Touch
                    </span>
                </Link>
            </div>
        </span>
    );
}
