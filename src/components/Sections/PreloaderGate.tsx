'use client';

import { useEffect, useRef, useState } from 'react';
import { PRELOADER_DURATION } from '@/lib/constants';

// module-scoped flag persists across client-side navigations
let hasShownPreloader = false;

export default function PreloaderGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const [ready, setReady] = useState(hasShownPreloader);
    const showedRef = useRef(hasShownPreloader);

    useEffect(() => {
        if (showedRef.current) return; // already shown in this SPA session

        const t = setTimeout(() => {
            hasShownPreloader = true;
            showedRef.current = true;
            setReady(true);
        }, PRELOADER_DURATION); // e.g., 3000ms

        return () => clearTimeout(t);
    }, []);

    if (!ready) {
        // Fullscreen overlay while loading
        return (
            <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white'>
                <h1 className='title1-bold animate-pulse'>Loading…</h1>
            </div>
        );
    }

    // Children mount only AFTER preloader finishes
    return <>{children}</>;
}
