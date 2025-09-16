// PageTransitionEffect.tsx
"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"
import FrozenRouter from "./FrozenRouter"
import { slide, perspective, opacity } from "./Anim"

// helper to wire variants
const anim = (variants: Variants) => ({
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants,
})

// Map routes to indices (keep in one place)
const pathToIndex = (path: string) => {
  switch (path) {
    case "/":
      return 1 // Home = 1
    case "/about":
      return 2 // About = 2
    case "/projects":
      return 3 // Projects = 3
    default:
      return 1
  }
}

export default function PageTransitionEffect({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="bg-black">
        {/* overlay slide */}
        <motion.div
          {...anim(slide)}
          className="fixed top-0 left-0 w-screen h-screen bg-white z-30"
        />

        {/* perspective wrapper */}
        <motion.div {...anim(perspective)} className="bg-white">
          {/* fade content */}
          <motion.div {...anim(opacity)}>
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
