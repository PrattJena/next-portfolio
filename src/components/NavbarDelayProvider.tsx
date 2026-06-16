'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type NavbarDelayCtx = {
    navbarDelay: number;
    setNavbarDelay: (d: number) => void;
};

const NavbarDelayContext = createContext<NavbarDelayCtx>({
    navbarDelay: 0,
    setNavbarDelay: () => {},
});

export function useNavbarDelay() {
    return useContext(NavbarDelayContext);
}

export function SetNavbarDelay({ duration }: { duration: number }) {
    const { setNavbarDelay } = useNavbarDelay();

    useEffect(() => {
        setNavbarDelay(duration);
    }, [duration, setNavbarDelay]);

    return null;
}

export default function NavbarDelayProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [navbarDelay, setNavbarDelay] = useState(0);

    return (
        <NavbarDelayContext.Provider value={{ navbarDelay, setNavbarDelay }}>
            {children}
        </NavbarDelayContext.Provider>
    );
}
