'use client';

import { motion } from 'motion/react';

export default function HeroSectionDescription() {
    const hello = 'hello';
    return (
        <div className='text-center lg:text-left'>
            <span className='title3 md:title1 font-medium text-neutral-500 md:font-medium'>
                I'm a{' '}
                <span className='text-[#ff4c24]'>Full Stack Developer</span>{' '}
                based in <br />
                United States. I love bringing ideas to life.
            </span>
        </div>
    );
}
