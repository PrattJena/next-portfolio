'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cubicBezier, LayoutGroup, motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const NAV_FADE_DELAY = 1.8;

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
];

const BottomNavbar = () => {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const animationsReady = usePageReady();
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (!animationsReady || !navRef.current) return;

            if (prefersReducedMotion) {
                gsap.set(navRef.current, { opacity: 1 });
                return;
            }

            gsap.set(navRef.current, { opacity: 0 });

            gsap.to(navRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: NAV_FADE_DELAY,
            });
        },
        { dependencies: [animationsReady, prefersReducedMotion] }
    );

    return (
        <LayoutGroup>
            <nav
                ref={navRef}
                className='bottom-md md:bottom-lg fixed left-1/2 z-[100] -translate-x-1/2 transform'>
                <div className='p-xs relative isolate flex flex-row items-center rounded-full bg-neutral-400/30 shadow-xl ring-1 ring-neutral-600/3 backdrop-blur-xl'>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            scroll={false}
                            className='caption px-md py-sm md:subheading lg:title3 relative isolate z-30 cursor-pointer rounded-full font-semibold transition-colors duration-200 md:font-semibold lg:font-semibold'>
                            {pathname === item.href && (
                                <motion.div
                                    layoutId='activeBackground'
                                    className='absolute inset-0 z-20 rounded-full border-2 border-black bg-[#ff4c24]'
                                    transition={{
                                        type: 'tween',
                                        ease: cubicBezier(0.76, 0, 0.24, 1),
                                        duration: prefersReducedMotion ? 0 : 0.5,
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                            )}
                            <span
                                className={`relative z-30 uppercase ${pathname === item.href ? 'text-white' : 'text-black'}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </LayoutGroup>
    );
};

export default BottomNavbar;
