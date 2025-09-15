import { cubicBezier } from "motion/react"

export const opacity = {
    initial:{
      opacity: 0
    },
    enter:{
      opacity: 1,
    },
    exit:{
      opacity: 1
    }
}
  
export const slide = {
    initial: {
      y: "100vh" // start off-screen
    },
    enter: {
      y: "100vh", // animate into view
    },
    exit: {
      y: "0vh", // animate out upwards
      transition: {
        duration: 1,
        ease: cubicBezier(0.76, 0, 0.24, 1)
      }
    }
  }
  
export const perspective = {
    initial: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    enter: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    exit: {
      y: -100,
      scale: 0.9,
      opacity: 0.5,
      transition: {
        duration: 1.2,
        ease: cubicBezier(0.76, 0, 0.24, 1)
      }
    }
}