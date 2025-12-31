import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import DestinationCarousel from './destinationcarousel';
const destinations = [
  {
    id: 1,
    name: "Paris, France",
    description:
      "Experience romantic streets, historic landmarks, and world-famous art museums.",
    image: "/paris.jpg",
    alt: "Eiffel Tower overlooking Paris cityscape",
    link: "/paris.jpg",
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    description:
      "Relax on tropical beaches surrounded by lush forests and ancient temples.",
    image: "/bali.jpg",
    alt: "Tropical beach with palm trees in Bali",
    link: "/bali.jpg",
  },
  {
    id: 3,
    name: "Ladakh, India",
    description:
      "Explore snow-capped mountains, scenic trains, and peaceful alpine villages.",
    image: "/ladakh.jpg",
    alt: "Snow-covered mountains in Ladakh",
    link: "/ladakh.jpg",
  },
];

export default function TopDestination() {
  return (
    <section
      aria-labelledby="destinations-heading"
      className="px-6 py-6 min-h-screen overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="destinations-heading"
          className="mb-10 text-3xl font-bold md:text-4xl"
        >
          Top Visited Destinations
        </h2>

        <ul
          role="list"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {destinations.map((place) => (
            <li key={place.id}>
              <article
                className="h-full overflow-hidden rounded-lg border bg-white shadow-sm focus-within:ring-2 focus-within:ring-black"
              >
                {/* Image */}
                <Image
                  src={place.image}
                  alt={place.alt}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="flex h-full flex-col p-6">
                  <h3 className="text-xl font-semibold">
                    {place.name}
                  </h3>

                  <p className="mt-2 text-gray-700">
                    {place.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4">
                    <Button asChild
                      aria-label={`View details about ${place.name}`}
                      className="inline-block font-medium text--700 underline underline-offset-4 decoration-app-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-black hover:bg-linear-to-br hover:from-primary-dark hover:to-primary-light"
                      variant="outline">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={place.link}
                      >
                        View destination
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      {/* Destination carousel section */}
      <DestinationCarousel />

    </section>
  );
}