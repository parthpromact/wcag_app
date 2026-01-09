import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms & Conditions and Privacy Policy - TRVL",
  description: "Terms and Conditions and Privacy Policy for TRVL travel application",
};

export default function TermsPrivacyPage() {
  return (
    <>
      {/* Skip to main content link (WCAG 2.4.1) */}
      <a 
        href="#page-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main 
        id="main-content" 
        className="min-h-screen bg-background"
        role="main"
      >
        {/* Header */}
          <header className="bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <Link
                href="/"
                aria-label="TRVL App logo, navigate to home page"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              >
                <Image 
                  src="/trvl-logo.svg" 
                  alt="TRVL App" 
                  width={100} 
                  height={100}
                />
              </Link>
            </div>
          </header>

        {/* Content */}
        <div id="page-content" className="container mx-auto px-4 py-8 max-w-4xl" tabIndex={-1}>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Terms & Conditions and Privacy Policy
          </h1>

          <div className="space-y-6">
            {/* Terms and Conditions Section */}
            <section aria-labelledby="terms-heading">
              <h2 id="terms-heading" className="text-2xl font-bold mb-4 text-foreground">
                Terms and Conditions
              </h2>
              <p className="text-muted-foreground text-lg">
                By using TRVL, you agree to use our service responsibly and in accordance with applicable laws and regulations.
              </p>
            </section>

            {/* Privacy Policy Section */}
            <section aria-labelledby="privacy-heading">
              <h2 id="privacy-heading" className="text-2xl font-bold mb-4 text-foreground">
                Privacy Policy
              </h2>
              <p className="text-muted-foreground text-lg">
                We respect your privacy and protect your personal information. We only collect and use data necessary to provide our travel services.
              </p>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-8 pt-8 border-t border-border">
            <Link
              href="/register"
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
            >
              ← Back to Registration
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

