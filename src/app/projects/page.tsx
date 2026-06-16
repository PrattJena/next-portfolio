import Header from '@/components/Header';
import ContactButton from '@/components/Sections/ContactSection/ContactButton';
import { SetNavbarDelay } from '@/components/NavbarDelayProvider';

export default function Projects() {
    return (
        <div className='px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6'>
            <SetNavbarDelay duration={1.0} />
            <div className='grid h-full grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4'>
                <Header />
                <div className='sticky top-3 z-0 lg:top-6'>
                    <ContactButton />
                </div>

                <div className='col-span-2'>
                    <div className='flex h-[150svh] flex-col items-center'>
                        <h1 className='text-4xl font-bold text-amber-400'>
                            Projects Page
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
