import Link from "next/link";

export default function Header() {
    return(
        <div className="flex justify-between items-center">
            <h1 className="title2 font-semibold">PRATYUSH Jena</h1>
            <div className="flex gap-md">
                <Link href="/" className="title2">HOME</Link>
                <Link href="/about" className="title2">About</Link>
            </div>
        </div>
    )
}