"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        document.cookie = "token=dummy-token; path=/";
        router.push("/dashboard");
    };

    return (
        <main>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </main>
    )
}
