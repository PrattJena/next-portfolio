'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SplittextAnimations({
    children,
    animateOnScroll = true,
    delay = 0,
}: {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
}) {
    const containerRef = useRef<HTMLElement | null>(null);
    const elementsRef = useRef<HTMLElement[]>([]);
    const splitRefs = useRef<SplitText[]>([]);
    const lines = useRef<HTMLElement[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        elementsRef.current = [];
        splitRefs.current = [];
        lines.current = [];

        let elements = [];
        if (containerRef.current.hasAttribute('data-copy-wrapper')) {
            elements = Array.from(containerRef.current.children);
        } else {
            elements = [containerRef.current];
        }

        elements.forEach((element) => {
            elementsRef.current.push(element as HTMLElement);
        });

        document.fonts.ready.then(() => {
            elementsRef.current.forEach((element) => {});
        });
    });
}
