"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    const handleLogin = () => {
        document.cookie = "token=dummy-token; path=/";
        router.push("/home");
    };

    // const setdatatostate = () => {
    //     setData({ name: "example", value: 42 });
    //     console.log("Data set to state:", data);
    // }

    // useEffect(() => {
    //     alert("Data changed: " + JSON.stringify(data));
    // },[data])

    return (
        <main>
            <h1 className="">Login</h1>
            {/* <button onClick={setdatatostate}>set data</button> */}
            <button onClick={handleLogin}>Login</button>
        </main>
    )
}
