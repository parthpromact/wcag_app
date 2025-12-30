// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 🔒 If not authenticated → redirect
  if (!token) {
    redirect("/login");
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="">
        {children}
      </main>
    </div>
  );
}
