// app/about/page.tsx (your page)
import Header from '@/components/Header';
import ContactButton from '@/components/Sections/ContactSection/ContactButton';
import { SetNavbarDelay } from '@/components/NavbarDelayProvider';

export default function About() {
    const hello = 'hello';
    return (
        <div className='px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6'>
            <SetNavbarDelay duration={1.6} />
            <div className='grid h-full grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4'>
                <Header delay={0.6} />
                <div className='sticky top-3 z-0 lg:top-6'>
                    <ContactButton delay={0.6} />
                </div>

                <div className='col-span-2'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-4xl font-bold text-blue-400'>
                            About Page
                        </h1>
                    </div>
                    <div className='h-[150svh] rounded-xl bg-red-400' />
                </div>
            </div>
        </div>
    );
}
