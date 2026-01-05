import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - WCAG Compliant App",
  description: "Accessible login page for WCAG compliant application",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

