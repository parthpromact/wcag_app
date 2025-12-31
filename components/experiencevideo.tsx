import Link from "next/link";
import React from "react";

export default function ExperienceVideo() {
    return (
        <section
            role="region"
            aria-labelledby="experience-video-heading"
            className="bg-black px-6 py-20 min-h-screen text-white"
        >
            <div className="mx-auto max-w-5xl">
                {/* Heading */}
                <h2
                    tabIndex={0}
                    id="experience-video-heading"
                    className="mb-6 text-3xl font-bold md:text-4xl"
                >
                    Let's Hear From Our Tourists
                </h2>

                {/* Supporting text */}
                <p tabIndex={0} className="mb-10 max-w-3xl text-lg text-gray-300">
                    Watch real travelers share their unforgettable experiences and stories
                    from journeys planned with us.
                </p>

                {/* Video */}
                <div className="relative overflow-hidden rounded-lg">
                    <video
                        controls
                        preload="metadata"
                        className="w-full h-auto"
                        aria-describedby="experience-video-description"
                    >
                        {/* Video source */}
                        <source tabIndex={0} src="/videos/beach-video.mp4" type="video/mp4" />

                        {/* Captions (required for 1.2.2) */}
                        <track
                            kind="captions"
                            src="/videos/beach-video-caption.vtt"
                            srcLang="en"
                            label="English captions"
                            default
                        />

                        <track
                            kind="descriptions"
                            src="/videos/beach-video-desc.vtt"
                            srcLang="en"
                            label="Audio descriptions"
                        />

                        {/* Fallback text */}
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Description / transcript link */}
                <p
                    id="experience-video-description"
                    className="mt-6 text-sm text-gray-400"
                >
                    This video includes spoken testimonials from tourists describing their
                    travel experiences.{" "}
                    <Link
                        href="/video-transcript"
                        className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Read the full transcript
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
