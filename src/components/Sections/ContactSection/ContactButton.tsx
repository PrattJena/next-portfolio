'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePageReady } from '@/components/Sections/Preloader/PreloaderProvider';
import ContactModal from './ContactModal';

export default function ContactButton({ delay = 0 }) {
    const element = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const duplicateTextRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const animationsReady = usePageReady();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

    const { contextSafe } = useGSAP(
        () => {
            if (!animationsReady || !element.current) return;

            const elementRef = element.current;
            gsap.set(elementRef, {
                yPercent: 0,
                overflow: 'hidden',
            });
            gsap.from(elementRef, {
                duration: 1,
                yPercent: 100,
                ease: 'power4.out',
                delay: delay,
            });
            if (textRef.current && duplicateTextRef.current) {
                gsap.set(textRef.current, { y: 0 });
                gsap.set(duplicateTextRef.current, { y: '100%' });
            }
        },
        { scope: element, dependencies: [animationsReady, delay] }
    );

    const onMouseEnter = contextSafe(() => {
        if (textRef.current && duplicateTextRef.current) {
            const tl = gsap.timeline();
            tl.to(
                textRef.current,
                {
                    y: '-100%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );

            tl.to(
                duplicateTextRef.current,
                {
                    y: '0%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );
        }
    });

    const onMouseLeave = contextSafe(() => {
        if (textRef.current && duplicateTextRef.current) {
            const tl = gsap.timeline();
            tl.to(
                duplicateTextRef.current,
                {
                    y: '100%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );

            tl.to(
                textRef.current,
                {
                    y: '0%',
                    duration: 0.4,
                    ease: 'power2.out',
                },
                0
            );
        }
    });

    const handleClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setTriggerRect(rect);
            console.log('Button position:', rect);
        }
        console.log('Button clicked, opening modal');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Closing modal');
        setIsModalOpen(false);
    };

    return (
        <>
            <span className='block overflow-y-hidden'>
                <div ref={element}>
                    <button
                        ref={buttonRef}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={handleClick}
                        className='relative flex h-full shrink-0 cursor-pointer items-center justify-center rounded-[0.25rem] md:rounded-[0.265rem] lg:rounded-[0.285rem] bg-black'>
                        <div className='relative overflow-hidden '>
                            <span
                                ref={textRef}
                                className='contact caption md:callout lg:subheading block !font-semibold text-white whitespace-nowrap'>
                                Get in Touch
                            </span>

                            <span
                                ref={duplicateTextRef}
                                className='contact caption md:callout lg:subheading absolute top-0 left-0 w-full !font-semibold text-white whitespace-nowrap'
                                style={{ color: '#ff4c24' }}>
                                Get in Touch
                            </span>
                        </div>
                    </button>
                </div>
            </span>

            <ContactModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                buttonRect={triggerRect}
            />
        </>
    );
}
