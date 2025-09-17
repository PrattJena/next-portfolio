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
  
// Orignal Slide
export const slide = {
    initial: {
      x: "100vw" // start off-screen
    },
    enter: {
      x: "100vw", // animate into view
    },
    exit: {
      x: "0vw", // animate out upwards
      transition: {
        duration: 1,
        ease: cubicBezier(0.76, 0, 0.24, 1)
      }
    }
}

// export const slideFromLeft = {
//     initial: {
//       x: "-100vw" // start off-screen
//     },
//     enter: {
//       x: "-100vw", // animate into view
//     },
//     exit: {
//       x: "0vw", // animate out upwards
//       transition: {
//         duration: 1,
//         ease: cubicBezier(0.76, 0, 0.24, 1)
//       }
//     }
// }

// Original Perspective
export const perspective = {
    initial: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)"
    },
    enter: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: {
      x: -100,
      opacity: 0,
      filter: "blur(25px)", // Add blur on exit
      transition: {
        duration: 1.2,
        ease: cubicBezier(0.76, 0, 0.24, 1)
      }
    }
}

// export const perspectiveLeft = {
//     initial: {
//       x: 0,
//       scale: 1,
//       opacity: 1,
//       filter: "blur(0px)"
//     },
//     enter: {
//       x: 0,
//       scale: 1,
//       opacity: 1,
//       filter: "blur(0px)"
//     },
//     exit: {
//       x: 100,
//       opacity: 0.3,
//       filter: "blur(8px)", // Add blur on exit
//       transition: {
//         duration: 1.2,
//         ease: cubicBezier(0.76, 0, 0.24, 1)
//       }
//     }
// }

// --- Direction-aware wrappers (keep your original variants untouched) ---
// dir > 0  => moving forward (navbar index increases; you wanted Left->Right slide)
// dir < 0  => moving backward (navbar index decreases)

// at bottom of Anim.ts
// export type Dir = -1 | 0 | 1;

// const pickSlide = (dir: Dir) => (dir > 0 ? slideFromLeft : slideFromRight);
// const pickPerspective = (dir: Dir) => (dir > 0 ? perspectiveLeft : perspectiveRight);

// export const slideDir = {
//   initial: (dir: Dir) => pickSlide(dir).initial,
//   enter:   (dir: Dir) => pickSlide(dir).enter,
//   exit:    (dir: Dir) => pickSlide(dir).exit,
// };

// export const perspectiveDir = {
//   initial: (dir: Dir) => pickPerspective(dir).initial,
//   enter:   (dir: Dir) => pickPerspective(dir).enter,
//   exit:    (dir: Dir) => pickPerspective(dir).exit,
// };

// export const opacityDir = {
//   initial: (_: Dir) => opacity.initial,
//   enter:   (_: Dir) => opacity.enter,
//   exit:    (_: Dir) => opacity.exit,
// };


