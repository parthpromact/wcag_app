// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import FooterSection from "@/components/Footer";

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
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <main className="">
        {children}
      </main>

        <FooterSection />
    </div>
  );
}
