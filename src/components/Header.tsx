import Branding from './SVGR/Branding';

export default function Header({ showResume = true }) {
    return (
        <div className='grid grid-cols-9 items-center'>
            <Branding className='col-span-3 h-[6vw] w-auto md:h-[4.8vw] lg:h-[2.5vw]' />

            <div className='col-span-4 col-start-6 h-full md:col-span-3 md:col-start-7 lg:col-span-2 lg:col-start-8'>
                {showResume && (
                    <div className='flex h-full flex-col justify-between'>
                        <span className='caption md:title3 font-medium text-black md:font-medium'>
                            Available for Work
                        </span>
                        <span className='caption md:title3 cursor-pointer font-medium text-stone-500 transition-colors duration-300 hover:text-[#ff4c24d0] md:font-medium'>
                            View Resume
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
