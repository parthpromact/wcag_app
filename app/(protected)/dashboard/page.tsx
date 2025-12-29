"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const logout = () => {
    // remove cookie
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };
  return (
    <div className="bg-primary">
      Dashboard Page
      <button onClick={logout}>Logout</button>
    </div>

  )
}
