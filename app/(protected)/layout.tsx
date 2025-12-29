// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    <div className="min-h-screen flex">
      {/* Navbar */}
      
      {/* Main Content */}
      <main className="">
        {children}
      </main>
    </div>
  );
}
