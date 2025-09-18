import Link from "next/link";

export default function ContactButton() {
    return(
        <Link href="/contact" className="bg-black rounded-full flex items-center justify-center">
            <span className="caption font-semibold md:title3 md:font-semibold my-sm mx-md text-white">
                Get in Touch
            </span>
        </Link>
    )
}
