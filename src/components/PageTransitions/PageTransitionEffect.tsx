'use client';

import { motion, AnimatePresence, type Variants } from 'motion/react';
import { usePathname } from 'next/navigation';
import FrozenRouter from './FrozenRouter';
import { slide, perspective, opacity } from './Anim';

const anim = (variants: Variants) => ({
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
});

export default function PageTransitionEffect({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode='wait'>
            <div key={pathname} className='relative bg-black'>
                <motion.div
                    {...anim(slide)}
                    className='fixed top-0 left-0 z-10 h-screen w-screen bg-white'
                    onAnimationComplete={() => {
                        requestAnimationFrame(() =>
                            window.scrollTo({ top: 0 })
                        );
                    }}
                />

                <motion.div {...anim(perspective)} className='bg-white'>
                    <motion.div {...anim(opacity)}>
                        <FrozenRouter>{children}</FrozenRouter>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
