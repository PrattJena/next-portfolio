import Header from '@/components/Header';
import HeroSection from '@/components/Sections/HeroSection/HeroSectionName';
import HeroSectionDescription from '@/components/Sections/HeroSection/HeroSectionDescription';
import ContactButton from '@/components/ContactButton';

export default function Home() {
    const startDelay = 0.5;
    return (
        <div className='h-[100svh] px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6'>
            <div className='grid h-full grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4'>
                {/* Row 1: Header (L) + Button (R) */}
                <Header delay={startDelay + 0.5} />
                <div className='sticky top-3 z-0 lg:top-6'>
                    <ContactButton delay={startDelay + 0.5} />
                </div>

                {/* Row 2: Hero section (spans both cols, fills rest of height) */}
                <div className='col-span-2 min-h-0'>
                    <div className='flex h-full flex-col items-center justify-end lg:items-start'>
                        <HeroSectionDescription delay={startDelay + 0.3} />
                        <HeroSection delay={startDelay} />
                    </div>
                </div>
            </div>
        </div>
    );
}
