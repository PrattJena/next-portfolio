'use client';

import { useEffect, useRef } from 'react';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';

const CHARS = ' .:-=+*#%@'.split('');

const ORANGE: [number, number, number] = [255, 160, 122];
const WHITE: [number, number, number] = [255, 255, 255];

const FADE_DURATION = 2500;

function colorFor(p: number): [number, number, number] {
    const c = Math.max(0, Math.min(1, p));
    return [
        Math.round(ORANGE[0] + (WHITE[0] - ORANGE[0]) * c),
        Math.round(ORANGE[1] + (WHITE[1] - ORANGE[1]) * c),
        Math.round(ORANGE[2] + (WHITE[2] - ORANGE[2]) * c),
    ];
}

function hash(x: number, y: number): number {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
}

function smooth(t: number): number {
    return (1 - Math.cos(t * Math.PI)) / 2;
}

function valueNoise(x: number, y: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;

    const v00 = hash(xi, yi);
    const v10 = hash(xi + 1, yi);
    const v01 = hash(xi, yi + 1);
    const v11 = hash(xi + 1, yi + 1);

    const sx = smooth(xf);
    const sy = smooth(yf);

    const top = v00 + (v10 - v00) * sx;
    const bottom = v01 + (v11 - v01) * sx;
    return top + (bottom - top) * sy;
}

type AsciiHeroBackgroundProps = {
    delay?: number;
};

export default function AsciiHeroBackground({
    delay = 1.8,
}: AsciiHeroBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationsReady = usePageReady();
    const fadeStartTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (animationsReady && fadeStartTimeRef.current === null) {
            fadeStartTimeRef.current = performance.now() + delay * 1000;
        }
    }, [animationsReady, delay]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const cell = 16;
        const fontSize = 15;

        let width = 0;
        let height = 0;
        let cols = 0;
        let rows = 0;
        let dpr = 1;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(width / cell);
            rows = Math.ceil(height / cell);
            ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
        };

        resize();
        window.addEventListener('resize', resize);

        let raf = 0;
        let t = 0;
        const scale = 0.08;

        const render = () => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            const fadeStart = fadeStartTimeRef.current;
            let fadeAlpha = 0;

            if (fadeStart !== null) {
                const elapsed = performance.now() - fadeStart;
                const fade = Math.max(
                    0,
                    Math.min(1, elapsed / FADE_DURATION)
                );
                fadeAlpha = 1 - Math.pow(1 - fade, 3);
            }

            const pulse = 0.12 * Math.sin(t * 0.9);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const n = valueNoise(
                        x * scale + t * 0.3,
                        y * scale - t * 0.22
                    );

                    const n2 = valueNoise(
                        x * scale * 2.3 - t * 0.16,
                        y * scale * 2.3 + t * 0.12
                    );

                    const wave =
                        0.5 + 0.5 * Math.sin((x + y) * 0.12 - t * 1.4);

                    let intensity = n * 0.55 + n2 * 0.25 + wave * 0.2 + pulse;

                    if (intensity < 0.3) continue;

                    let norm = (intensity - 0.3) / 0.7;
                    norm = Math.max(0, Math.min(1, norm));
                    const shaped = norm * norm * (3 - 2 * norm);
                    const charIndex = Math.min(
                        CHARS.length - 1,
                        Math.floor(shaped * CHARS.length)
                    );
                    const char = CHARS[charIndex];
                    if (char === ' ') continue;

                    const [r, g, b] = colorFor(1 - shaped);
                    const alpha = (0.18 + shaped * 0.82) * fadeAlpha;
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.fillText(
                        char,
                        x * cell + cell / 2,
                        y * cell + cell / 2
                    );
                }
            }

            t += prefersReducedMotion ? 0 : 0.06;
            raf = requestAnimationFrame(render);
        };

        if (prefersReducedMotion) {
            render();
        } else {
            raf = requestAnimationFrame(render);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden='true'
            className='block h-full w-full'
        />
    );
}
