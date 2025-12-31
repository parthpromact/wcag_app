import Image from "next/image";

const carouselItems = [
  { id: 1, src: "/river-rafting.jpg", name: "River Rafting" },
  { id: 2, src: "/squba-diving.jpg", name: "Scuba Diving" },
  { id: 3, src: "/para-gliding.jpg", name: "Paragliding" },
  { id: 4, src: "/spa.jpg", name: "Spa Retreat" },
  { id: 5, src: "/trekking.jpg", name: "Trekking Adventure" },
];

export default function DestinationCarousel() {
  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="carousel-heading"
      className="carousel-container w-full py-10"
    >
      <h3
        id="carousel-heading"
        className="mb-6 px-6 text-2xl font-bold"
      >
        Adventure Awaits: Explore Fun Activities
      </h3>

      <div
        tabIndex={0}
        className="carousel-track flex gap-6 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        {[...carouselItems, ...carouselItems].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            aria-hidden={index >= carouselItems.length}
            className="relative h-30 w-64 shrink-0 overflow-hidden rounded-full"
          >
            {/* Decorative image */}
            <Image
              src={item.src}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover"
            />

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
            />

            {/* Visible text = SINGLE source of meaning */}
            <div className="absolute bottom-0 left-0 right-0 p-3 ml-3">
              <p className="text-sm font-semibold text-white md:text-base">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
