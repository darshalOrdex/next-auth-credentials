import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1>Next Auth</h1>
            <Link href="/register">Register</Link>
            <Link href="/login">Login Page</Link>
        </main>
    );
}
