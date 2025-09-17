// BottomNavbar.tsx
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cubicBezier, LayoutGroup, motion } from "motion/react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

const BottomNavbar = () => {
  const pathname = usePathname();
  return (
    <LayoutGroup>
      <nav className={`fixed z-[100] bottom-md left-1/2 transform -translate-x-1/2 md:bottom-lg`}>
        <div className="flex flex-row items-center p-xs rounded-full bg-neutral-400/30 backdrop-blur-xl ring-1 ring-neutral-600/3 shadow-xl relative isolate">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              className="caption font-semibold relative px-md py-sm rounded-full transition-colors duration-200 isolate z-30 md:title3 md:font-semibold cursor-pointer"
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 z-20 bg-[#ff4c24] border-2 border-black rounded-full"
                  transition={{
                    type: "tween",
                    ease: cubicBezier(0.76, 0, 0.24, 1),
                    duration: 0.5
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}
                />
              )}
              <span className={`relative z-30 uppercase ${pathname === item.href ? "text-white" : "text-black"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </LayoutGroup>
  );
};

export default BottomNavbar;