import Header from '@/components/Header';
import HeroSection from '@/components/Sections/HeroSection/HeroSectionName';
import ContactButton from '@/components/ContactButton';

export default function Contact() {
    return (
        <div className='h-[100svh] px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6'>
            <div className='grid h-full grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-4'>
                {/* Row 1: Header (L) + Button (R) */}
                <div className='col-span-2'>
                    <Header showResume={false} />
                </div>

                {/* Row 2: Hero section (spans both cols, fills rest of height) */}
                <div className='col-span-2'>
                    <div className='flex flex-col items-center'>
                        CONTACT PAGE
                    </div>
                </div>
            </div>
        </div>
    );
}
