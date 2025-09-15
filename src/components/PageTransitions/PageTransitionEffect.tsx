'use client';

import {motion, AnimatePresence, Variants} from "motion/react";
import { usePathname } from "next/navigation";
import FrozenRouter from "./FrozenRouter";
import { opacity, slide, perspective } from "./Anim";
  
const anim = (variants: Variants) => { // The variants type here is Variants from motion
  return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants
  }
}
  
export default function PageTransitionEffect ({ children }: { children: React.ReactNode }) {
    // The `key` is tied to the url using the `usePathname` hook.
    const key = usePathname();
  
    return (
      <AnimatePresence mode="wait">
        <div className="bg-black" key={key}>
          <motion.div {...anim(slide)} className="fixed top-0 left-0 w-screen h-screen bg-white z-30"/>
          <motion.div {...anim(perspective)} className="bg-white">
            <motion.div {...anim(opacity)}>
              <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
};