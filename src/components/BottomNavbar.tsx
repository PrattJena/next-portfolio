'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';
import { useNavbarDelay } from '@/components/NavbarDelayProvider';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

const SLIDE_DURATION = 0.45;
const HOVER_DURATION = 0.22;

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
] as const;

type TabPosition = { left: number; width: number };

const TAB_LABEL_CLASS =
    'caption md:callout lg:subheading block !font-semibold whitespace-nowrap px-md';

const CONTAINER_RADIUS =
    'rounded-[0.25rem] md:rounded-[0.265rem] lg:rounded-[0.285rem]';

const BottomNavbar = () => {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const linksRowRef = useRef<HTMLDivElement>(null);
    const hoverPillRef = useRef<HTMLDivElement>(null);
    const activePillRef = useRef<HTMLDivElement>(null);
    const whiteRowRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const positionsRef = useRef<TabPosition[]>([]);
    const prevActiveIndex = useRef(-1);
    const activeIndexRef = useRef(-1);
    const isSlidingRef = useRef(false);
    const hasEnteredRef = useRef(false);
    const animationsReady = usePageReady();
    const { navbarDelay } = useNavbarDelay();
    const prefersReducedMotion = usePrefersReducedMotion();

    const activeIndex = navItems.findIndex((item) => item.href === pathname);
    activeIndexRef.current = activeIndex;

    const measureTabs = useCallback((): TabPosition[] => {
        const next = tabRefs.current.map((tab) => {
            if (!tab) return { left: 0, width: 0 };
            return { left: tab.offsetLeft, width: tab.offsetWidth };
        });

        positionsRef.current = next;
        return next;
    }, []);

    const setPillPosition = useCallback(
        (index: number, measured: TabPosition[], animate: boolean) => {
            const pos = measured[index];
            const pill = activePillRef.current;
            const whiteRow = whiteRowRef.current;

            if (!pos || !pill || !whiteRow || pos.width === 0) return;

            gsap.killTweensOf([pill, whiteRow]);

            if (animate && !prefersReducedMotion) {
                isSlidingRef.current = true;

                gsap
                    .timeline({
                        onComplete: () => {
                            isSlidingRef.current = false;
                        },
                        defaults: {
                            duration: SLIDE_DURATION,
                            ease: 'power3.inOut',
                        },
                    })
                    .to(
                        pill,
                        { left: pos.left, width: pos.width },
                        0
                    )
                    .to(whiteRow, { x: -pos.left }, 0);
                return;
            }

            if (isSlidingRef.current) return;

            gsap.set(pill, { left: pos.left, width: pos.width });
            gsap.set(whiteRow, { x: -pos.left });
        },
        [prefersReducedMotion]
    );

    useLayoutEffect(() => {
        if (activeIndex < 0) return;

        const measured = measureTabs();
        if (!measured[activeIndex]?.width) return;

        if (hoverPillRef.current) {
            gsap.set(hoverPillRef.current, { scale: 0, opacity: 0 });
        }

        const shouldAnimate =
            prevActiveIndex.current >= 0 &&
            prevActiveIndex.current !== activeIndex &&
            !prefersReducedMotion;

        setPillPosition(activeIndex, measured, shouldAnimate);
        prevActiveIndex.current = activeIndex;
    }, [pathname, activeIndex, measureTabs, setPillPosition, prefersReducedMotion]);

    useLayoutEffect(() => {
        const row = linksRowRef.current;
        if (!row) return;

        const handleResize = () => {
            const index = activeIndexRef.current;
            if (index < 0 || isSlidingRef.current) return;

            const measured = measureTabs();
            if (!measured[index]?.width) return;

            setPillPosition(index, measured, false);
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(row);

        return () => observer.disconnect();
    }, [measureTabs, setPillPosition]);

    useLayoutEffect(() => {
        const syncAfterFonts = () => {
            const index = activeIndexRef.current;
            if (index < 0 || isSlidingRef.current) return;

            const measured = measureTabs();
            if (!measured[index]?.width) return;

            if (prevActiveIndex.current < 0) {
                setPillPosition(index, measured, false);
                prevActiveIndex.current = index;
            }
        };

        document.fonts?.ready.then(syncAfterFonts);
    }, [measureTabs, setPillPosition]);

    useGSAP(
        () => {
            if (hoverPillRef.current) {
                gsap.set(hoverPillRef.current, {
                    scale: 0,
                    opacity: 0,
                    transformOrigin: 'center center',
                });
            }

            if (!animationsReady || !navRef.current) return;

            if (hasEnteredRef.current || prefersReducedMotion) {
                gsap.set(navRef.current, { opacity: 1, y: 0 });
                hasEnteredRef.current = true;
                return;
            }

            if (navbarDelay === 0) return;

            gsap.killTweensOf(navRef.current);
            gsap.set(navRef.current, { opacity: 0, y: 8 });

            gsap.to(navRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: navbarDelay,
                onComplete: () => {
                    hasEnteredRef.current = true;
                },
            });
        },
        {
            dependencies: [animationsReady, prefersReducedMotion, navbarDelay],
            revertOnUpdate: false,
        }
    );

    const handleTabEnter = (index: number) => {
        if (index === activeIndex || prefersReducedMotion) return;

        const pos = positionsRef.current[index];
        const hoverPill = hoverPillRef.current;
        if (!pos || !hoverPill || pos.width === 0) return;

        gsap.killTweensOf(hoverPill);
        gsap.set(hoverPill, {
            left: pos.left,
            width: pos.width,
            transformOrigin: 'center center',
        });

        gsap.fromTo(
            hoverPill,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: HOVER_DURATION,
                ease: 'power2.out',
            }
        );
    };

    const handleRowLeave = () => {
        const hoverPill = hoverPillRef.current;
        if (!hoverPill || prefersReducedMotion) return;

        gsap.killTweensOf(hoverPill);
        gsap.to(hoverPill, {
            scale: 0,
            opacity: 0,
            duration: HOVER_DURATION,
            ease: 'power2.in',
        });
    };

    return (
        <nav
            ref={navRef}
            style={{ willChange: 'transform' }}
            className='bottom-md md:bottom-lg fixed left-1/2 z-[100] -translate-x-1/2 transform'>
            <div
                className={`relative p-2xs ring-neutral-600/10 ${CONTAINER_RADIUS} bg-neutral-200`}>
                <div
                    ref={linksRowRef}
                    className='relative flex flex-row items-center'
                    onMouseLeave={handleRowLeave}>
                    <div
                        ref={hoverPillRef}
                        aria-hidden
                        className={`pointer-events-none absolute top-0 bottom-0 z-0 bg-black/5 ${CONTAINER_RADIUS}`}
                    />

                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                ref={(el) => {
                                    tabRefs.current[index] = el;
                                }}
                                href={item.href}
                                scroll={false}
                                aria-current={isActive ? 'page' : undefined}
                                onMouseEnter={() => handleTabEnter(index)}
                                className={`${TAB_LABEL_CLASS} relative z-10 cursor-pointer text-black`}>
                                {item.label}
                            </Link>
                        );
                    })}

                    <div
                        ref={activePillRef}
                        aria-hidden
                        className={`pointer-events-none absolute top-0 bottom-0 z-20 overflow-hidden bg-[#ff4c24] ${CONTAINER_RADIUS}`}>
                        <div
                            ref={whiteRowRef}
                            className='flex flex-row items-center'>
                            {navItems.map((item) => (
                                <span
                                    key={item.href}
                                    className={`${TAB_LABEL_CLASS} text-white`}>
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default BottomNavbar;
