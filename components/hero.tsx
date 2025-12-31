import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { MountainSnow } from "lucide-react";

export default function Hero() {
    return (
        <>
            <section
                role="region"
                aria-label="Hero section with travel inspiration"
                className="relative min-h-screen w-full overflow-hidden"
            >
                {/* Background Image */}
                <Image
                    src="/hero-image.jpg"
                    alt="Scenic view of road through dense forest"
                    aria-hidden="true"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

                {/* Content */}
                <div className="relative z-10 flex min-h-screen items-center px-6 py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 tabIndex={0} className="text-white text-4xl font-bold leading-tight md:text-6xl">
                            Dream Big - Travel Far
                        </h1>

                        <h2 tabIndex={0} className="mt-4 text-xl text-white md:text-2xl">
                            Your Gateway to Unforgettable Journeys
                        </h2>

                        <p tabIndex={0} id="hero-description" className="mt-6 text-base text-white md:text-xl">
                            Discover your next escape with TRVL. Explore handpicked destinations,
                            curated stays, and seamless travel planning—all in one place.
                        </p>

                        {/* Buttons */}
                        <div role="group" aria-label="Primary actions" className="mt-10 flex flex-wrap justify-center gap-4">
                            <Button
                                asChild
                                className="bg-linear-to-br from-primary-light to-primary-dark px-8 py-4 text-black focus-visible:ring-2 focus-visible:ring-white hover:bg-linear-to-br hover:from-primary-dark hover:to-primary-light"
                            >
                                <Link href="/explore" aria-label="Explore travel destinations" className="flex items-center gap-2">
                                    Explore more places
                                    <MountainSnow aria-hidden="true" focusable="false" />
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="ghost"
                                aria-label="Learn more about TRVL"
                                className="border border-white px-8 py-4 text-white hover:bg-white hover:text-black focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Link href="/about">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
