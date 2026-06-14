import Header from '@/components/Header';
import HeroSectionName from '@/components/Sections/HeroSection/HeroSectionName';
import HeroSectionDescription from '@/components/Sections/HeroSection/HeroSectionDescription';
import ContactButton from '@/components/Sections/ContactSection/ContactButton';
import AsciiHeroBackground from '@/components/AsciiHeroBackground';

export default function Home() {
    const startDelay = 0;

    return (
        <div className='relative h-[100svh] overflow-hidden'>
            <div className='fixed inset-0 -z-10'>
                <AsciiHeroBackground delay={startDelay + 1.8} />
            </div>

            <div className='relative grid h-full grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4 px-4 py-3 md:px-6 md:py-6 lg:px-10 lg:py-5'>
                <Header delay={startDelay + 1.0} />
                <div className='sticky top-3 z-10 flex items-center justify-center self-start lg:top-3.5'>
                    <ContactButton delay={startDelay + 1.0} />
                </div>

                <div className='col-span-2 flex min-h-0 flex-1 flex-col items-center'>
                    <div className='flex flex-1 items-center justify-center'>
                        <HeroSectionDescription delay={startDelay + 1.0} />
                    </div>
                    <div>
                        <HeroSectionName delay={startDelay} />
                    </div>
                </div>
            </div>
        </div>
    );
}
