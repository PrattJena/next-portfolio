'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    buttonRect?: DOMRect | null;
}

const modalVariants = {
    closed: {
        width: 0,
        height: 0,
        top: '0px',
        left: '0px',
        transition: {
            duration: 0.75,
            type: 'tween',
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
    open: {
        width: '400px',
        height: '600px',
        top: '20px',
        left: '-380px', // Adjust to position from button
        transition: {
            duration: 0.75,
            type: 'tween',
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
} satisfies Variants;

const overlayVariants = {
    closed: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    open: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
} as const;

const contentVariants = {
    closed: {
        opacity: 0,
    },
    open: {
        opacity: 1,
        transition: {
            duration: 0.35,
            delay: 0.35,
            type: 'tween',
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
} satisfies Variants;

export default function ContactModal({
    isOpen,
    onClose,
    buttonRect,
}: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className='fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm'
                        variants={overlayVariants}
                        initial='closed'
                        animate='open'
                        exit='closed'
                        onClick={handleOverlayClick}
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        className='fixed z-[9999] overflow-hidden rounded-2xl bg-white shadow-2xl'
                        variants={modalVariants}
                        initial='closed'
                        animate='open'
                        exit='closed'
                        style={{
                            top: buttonRect ? `${buttonRect.top}px` : '20px',
                            left: buttonRect
                                ? `${buttonRect.right}px`
                                : 'calc(100vw - 20px)',
                            transformOrigin: 'top right',
                        }}>
                        <motion.div
                            className='h-full w-full p-8'
                            variants={contentVariants}
                            initial='closed'
                            animate='open'
                            exit='closed'>
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className='absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800'>
                                <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'>
                                    <line x1='18' y1='6' x2='6' y2='18'></line>
                                    <line x1='6' y1='6' x2='18' y2='18'></line>
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <div className='flex h-full flex-col'>
                                <div className='mb-8'>
                                    <h2 className='mb-2 text-3xl font-bold text-gray-900'>
                                        Get in Touch
                                    </h2>
                                    <p className='text-gray-600'>
                                        Let's discuss your project and bring
                                        your ideas to life.
                                    </p>
                                </div>

                                {/* Contact Form */}
                                <form className='flex flex-1 flex-col gap-6'>
                                    <div>
                                        <label
                                            htmlFor='name'
                                            className='mb-2 block text-sm font-medium text-gray-700'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            id='name'
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#ff4c24]'
                                            placeholder='Your name'
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='mb-2 block text-sm font-medium text-gray-700'>
                                            Email
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#ff4c24]'
                                            placeholder='your@email.com'
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='project'
                                            className='mb-2 block text-sm font-medium text-gray-700'>
                                            Project Type
                                        </label>
                                        <select
                                            id='project'
                                            className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#ff4c24]'>
                                            <option value=''>
                                                Select project type
                                            </option>
                                            <option value='web-development'>
                                                Web Development
                                            </option>
                                            <option value='mobile-app'>
                                                Mobile App
                                            </option>
                                            <option value='ui-design'>
                                                UI/UX Design
                                            </option>
                                            <option value='consulting'>
                                                Consulting
                                            </option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </div>

                                    <div className='flex-1'>
                                        <label
                                            htmlFor='message'
                                            className='mb-2 block text-sm font-medium text-gray-700'>
                                            Message
                                        </label>
                                        <textarea
                                            id='message'
                                            rows={6}
                                            className='w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#ff4c24]'
                                            placeholder='Tell me about your project...'
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        className='w-full rounded-lg bg-[#ff4c24] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#ff4c24]/90'>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
