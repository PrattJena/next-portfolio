import Link from "next/link";

export default function Navbar() {
    return(
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">Pratyush Jena</h1>
            <div className="flex gap-4">
                <Link href="/" className="text-xl font-medium">Home</Link>
                <Link href="/about" className="text-xl font-medium">About</Link>
            </div>
        </div>
    )
}