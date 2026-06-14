import { useState, useCallback, useRef } from 'react';

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const triggerRef = useRef<HTMLElement>(null);

    const openModal = useCallback((element?: HTMLElement) => {
        const targetElement = element || triggerRef.current;
        if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            setTriggerRect(rect);
            setIsOpen(true);
        }
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Keep the rect for the exit animation, clear it after animation completes
        setTimeout(() => setTriggerRect(null), 750);
    }, []);

    const toggleModal = useCallback(
        (element?: HTMLElement) => {
            if (isOpen) {
                closeModal();
            } else {
                openModal(element);
            }
        },
        [isOpen, openModal, closeModal]
    );

    return {
        isOpen,
        triggerRect,
        triggerRef,
        openModal,
        closeModal,
        toggleModal,
    };
}
