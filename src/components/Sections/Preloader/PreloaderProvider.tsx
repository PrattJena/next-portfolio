'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Ctx = { animationsReady: boolean };
const PreloaderContext = createContext<Ctx>({ animationsReady: false });

export function usePageReady() {
    return useContext(PreloaderContext).animationsReady;
}

export default function PreloaderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [show, setShow] = useState(true);
    const [animationsReady, setAnimationsReady] = useState(false);
    const playedRef = useRef(false);

    useEffect(() => {
        if (playedRef.current) return; // safety
        playedRef.current = true;

        const t = setTimeout(() => {
            // 1) finish preloader
            setShow(false);
            // 2) now mark the app "ready" so page animations can start
            //    (we gate animations on this flag)
            setAnimationsReady(true);
        }, 3000); // 3 seconds

        return () => clearTimeout(t);
    }, []);

    return (
        <PreloaderContext.Provider value={{ animationsReady }}>
            {children}

            {/* Preloader Overlay */}
            <AnimatePresence>
                {show && (
                    <motion.div
                        key='preloader'
                        initial={{ y: 0 }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className='fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white'>
                        {/* Preloader component*/}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='text-2xl font-semibold'>
                            Loading…
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PreloaderContext.Provider>
    );
}
