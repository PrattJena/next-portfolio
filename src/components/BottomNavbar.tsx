// BottomNavbar.tsx
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cubicBezier, motion } from "motion/react"

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
];

const BottomNavbar = () => {
  const pathname = usePathname();
  
  return (
    <nav className="fixed z-50 bottom-lg left-1/2 transform -translate-x-1/2">
      <div className="flex flex-row items-center p-xs rounded-full bg-neutral-400/30 backdrop-blur-xl ring-1 ring-neutral-600/3 shadow-xl relative isolate">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="title3 font-semibold relative px-md py-sm rounded-full transition-colors duration-200 hover:bg-neutral-600/10 isolate z-10"
          >
            {pathname === item.href && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-[#ff4c24] border-3 border-black rounded-full"
                transition={{
                  type: "tween",
                  ease: cubicBezier(0.76, 0, 0.24, 1),
                  duration: 0.5
                }}
              />
            )}
            <span className={`relative z-10 uppercase ${pathname === item.href ? "text-white" : "text-black"}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;