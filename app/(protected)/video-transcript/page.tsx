import React from "react";
import Link from "next/link";

export default function VideoTranscript() {
  return (
    <section
      role="region"
      aria-labelledby="video-transcript-heading"
      className="mx-auto max-w-4xl px-6 py-16"
    >
      {/* Top Back button */}
      <nav aria-label="Transcript navigation" className="mb-8">
        <Link
          href="/"
          className="inline-block rounded-md border px-4 py-2 text-sm font-medium underline underline-offset-4
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          ← Back to previous page
        </Link>
      </nav>

      <h1
        id="video-transcript-heading"
        className="mb-8 text-3xl font-bold"
      >
        Video Transcript: Tourist Beach Experience
      </h1>

      <div className="space-y-6 text-base leading-relaxed">
        <p><strong>[Soft acoustic music begins]</strong></p>

        <p><strong>[Sound of gentle ocean waves]</strong></p>

        <p>
          <strong>Narrator:</strong> Walking along this beautiful beach feels
          incredibly peaceful. The golden sand beneath my feet is warm, and the
          sound of the waves instantly relaxes me.
        </p>

        <p><strong>[Footsteps on sand]</strong></p>

        <p>
          <strong>Narrator:</strong> As I move forward, the turquoise water
          stretches endlessly ahead, and palm trees sway gently in the breeze.
        </p>

        <p><strong>[Waves grow slightly louder]</strong></p>

        <p>
          <strong>Narrator:</strong> The sunlight reflects off the ocean, making
          everything glow in shades of gold and blue. It feels like time slows
          down here.
        </p>

        <p><strong>[Music continues softly]</strong></p>

        <p>
          <strong>Narrator:</strong> Moments like this remind me why traveling is
          so special. It allows you to disconnect from routine and truly enjoy
          the present.
        </p>

        <p><strong>[Music fades]</strong></p>

        <hr className="my-10" />

        <h2 className="text-2xl font-semibold">
          Visual Description (Audio Description)
        </h2>

        <p>
          A first-person view shows a traveler walking steadily along a wide
          beach with golden sand. Gentle waves roll onto the shore as palm trees
          move slowly in the background.
        </p>

        <p>
          The camera pans toward the horizon, revealing turquoise water meeting
          a clear blue sky. Sunlight reflects across the ocean, creating a calm
          and peaceful atmosphere.
        </p>
      </div>

      {/* Bottom Back button */}
      <nav aria-label="Transcript navigation" className="mt-12">
        <Link
          href="/"
          className="inline-block rounded-md border px-4 py-2 text-sm font-medium underline underline-offset-4
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          ← Back to previous page
        </Link>
      </nav>
    </section>
  );
}
