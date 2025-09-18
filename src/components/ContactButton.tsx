import Link from 'next/link';

export default function ContactButton() {
    return (
        <Link
            href='/contact'
            className='flex items-center justify-center rounded-full bg-black'>
            <span className='caption md:title3 my-sm mx-md font-semibold text-white md:font-semibold'>
                Get in Touch
            </span>
        </Link>
    );
}
