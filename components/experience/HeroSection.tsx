/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "../common/AppImage";
import Icon from "../common/AppIcon";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  alt: string;
  accessibility: string;
}

const mockDestinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description:
      "Experience breathtaking sunsets and accessible cliff-side villages with wheelchair-friendly pathways",
    image: "/experience/hero/hero-santorini.jpg",
    alt: "White-washed buildings with blue domes overlooking the Aegean Sea at sunset in Santorini",
    accessibility: "Wheelchair accessible pathways, audio guides available",
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description:
      "Discover ancient temples and serene gardens with accessible transportation and guided support",
    image: "/experience/hero/hero-kyoto.jpg",
    alt: "Traditional Japanese temple with red pagoda surrounded by cherry blossom trees in full bloom",
    accessibility: "Accessible public transport, sign language guides",
  },
  {
    id: 3,
    name: "Banff",
    country: "Canada",
    description:
      "Explore pristine mountain landscapes with accessible trails and adaptive outdoor equipment",
    image: "/experience/hero/hero-banff.jpg",
    alt: "Turquoise mountain lake surrounded by snow-capped peaks and evergreen forests in Canadian Rockies",
    accessibility: "Adaptive hiking equipment, accessible viewpoints",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  // WCAG 2.2.1 (A): Timing Adjustable - Store user's timing preference
  const [autoPlayDuration, setAutoPlayDuration] = useState(5000);
  const carouselRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // WCAG 2.2.1 (A): Timing Adjustable - User can control auto-play timing
  // WCAG 2.2.2 (A): Pause, Stop, Hide - User can control auto-playing carousel
  useEffect(() => {
    if (!isHydrated || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockDestinations.length);
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [isPlaying, isHydrated, autoPlayDuration]);

  // WCAG 1.4.4 (AA): Resize Text - Adjust zoom level based on user settings
  useEffect(() => {
  const updateZoomLevel = () => {
    const zoom = Math.round((window.outerWidth / window.innerWidth) * 100);
    setZoomLevel(zoom);
  };

  updateZoomLevel();
  window.addEventListener('resize', updateZoomLevel);
  return () => window.removeEventListener('resize', updateZoomLevel);
}, []);

  const handlePrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mockDestinations.length) % mockDestinations.length
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % mockDestinations.length);
  };

  // WCAG 2.2.2 (A): Pause, Stop, Hide - Toggle play/pause control
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // WCAG 2.1.4 (A): Character Key Shortcuts - Keyboard shortcuts for carousel control
  // Arrow keys for navigation, Space for play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only respond if focus is on carousel or no input is focused
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.tagName === "SELECT";

      if (isInputFocused) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case " ":
          // Only if focus is within carousel
          if (carouselRef.current?.contains(activeElement)) {
            e.preventDefault();
            togglePlayPause();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, isPlaying, togglePlayPause]);

  // WCAG 2.5.2 (A): Pointer Cancellation - Handlers on mouseup/click, not mousedown
  // WCAG 2.5.1 (A): Pointer Gestures - All controls use single-pointer actions (click)
  const handleButtonClick = (action: () => void) => {
    return (e: React.MouseEvent | React.TouchEvent) => {
      // Ensure action happens on up-event (click) not down-event
      action();
    };
  };

  if (!isHydrated) {
    return (
      // WCAG 4.1.3 (AA): Status Messages - Loading state announced to screen readers
      // WCAG 2.3.1 (A): Three Flashes or Below Threshold - Loading spinner doesn't flash
      <section
        className="relative h-screen bg-muted"
        aria-label="Hero destination carousel"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center" role="status" aria-live="polite">
            <div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
              aria-hidden="true"
            ></div>
            <p className="text-muted-foreground">Loading destinations...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentDestination = mockDestinations[currentSlide];

  return (
    // WCAG 1.3.1 (A): Info and Relationships - Semantic section with proper labeling
    // WCAG 2.4.1 (A): Bypass Blocks - Section landmark for navigation
    <section
      className="relative h-screen overflow-hidden"
      aria-label="Featured accessible destinations carousel"
      aria-roledescription="carousel"
      ref={carouselRef}
    >
      <div className="absolute inset-0">
        {/* WCAG 1.1.1 (A): Non-text Content - Image has meaningful alt text */}
        {/* WCAG 2.3.1 (A): Three Flashes or Below Threshold - Image transitions don't flash */}
        <AppImage
          key={currentDestination.id}
          src={currentDestination.image}
          alt={currentDestination.alt}
          className="w-full h-full object-cover transition-opacity duration-1000"
          priority
        />
        {/* WCAG 1.4.3 (AA): Contrast - Gradient overlay ensures text readability */}
        <div
          className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60"
          aria-hidden="true"
        ></div>
      </div>

      {/* WCAG 2.2.1 (A): Timing Adjustable - Controls to adjust carousel speed */}
      <div className={`absolute ${zoomLevel >= 175 ? 'top-1 right-1' : 'top-4 right-4'} z-20 bg-black/50 backdrop-blur-sm rounded-lg p-3`}
  >
        <div className="text-white text-sm mb-2">Carousel Speed</div>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoPlayDuration(3000)}
            className={`px-3 py-1 text-xs rounded ${
              autoPlayDuration === 3000
                ? "bg-accent text-accent-foreground"
                : "bg-white/20 text-white"
            } focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label="Set carousel speed to fast (3 seconds)"
            aria-pressed={autoPlayDuration === 3000}
          >
            Fast
          </button>
          <button
            onClick={() => setAutoPlayDuration(5000)}
            className={`px-3 py-1 text-xs rounded ${
              autoPlayDuration === 5000
                ? "bg-accent text-accent-foreground"
                : "bg-white/20 text-white"
            } focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label="Set carousel speed to normal (5 seconds)"
            aria-pressed={autoPlayDuration === 5000}
          >
            Normal
          </button>
          <button
            onClick={() => setAutoPlayDuration(8000)}
            className={`px-3 py-1 text-xs rounded ${
              autoPlayDuration === 8000
                ? "bg-accent text-accent-foreground"
                : "bg-white/20 text-white"
            } focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label="Set carousel speed to slow (8 seconds)"
            aria-pressed={autoPlayDuration === 8000}
          >
            Slow
          </button>
        </div>
        <div className="text-white text-xs mt-2 opacity-75">
          Keyboard: ← → arrows, Space to pause
        </div>
      </div>

      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading structure */}
          {/* WCAG 1.3.1 (A): Info and Relationships - Proper heading hierarchy */}
          <h2
            className={`lg:text-6xl font-headline font-bold text-white ${zoomLevel >= 175 ? 'mb-2 text-2xl' : 'mb-4 text-4xl' } drop-shadow-lg`}
            id="carousel-heading"
            tabIndex={0}
          >
            {currentDestination.name}, {currentDestination.country}
          </h2>
          {/* WCAG 1.4.3 (AA): Contrast - White text with shadow on dark background */}
          <p className={`lg:text-2xl text-white/90 ${zoomLevel >= 175 ? 'mb-2 text-sm' : 'mb-6 text-lg' } font-body drop-shadow-md max-w-2xl mx-auto`} tabIndex={0}>
            {currentDestination.description}
          </p>
          {/* WCAG 1.3.3 (A): Sensory Characteristics - Icon accompanies text, not standalone */}
          <div className={`flex items-center justify-center gap-2 ${zoomLevel >= 175 ? 'mb-3' : 'mb-8' }`}>
            <Icon
              name="circle-check"
              size={20}
              className="text-accent"
              variant="solid"
              aria-hidden="true"
            />
            <p className={`text-white/80 ${zoomLevel >= 175 ? 'text-xs' : 'text-lg' } font-body`} tabIndex={0}>
              {currentDestination.accessibility}
            </p>
          </div>
          {/* WCAG 2.4.4 (A): Link Purpose - Clear button labels describe action */}
          {/* WCAG 2.5.5 (AAA): Target Size - Large touch targets (48px height) */}
          {/* WCAG 2.5.2 (A): Pointer Cancellation - Click event, not mousedown */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/accessible-destinations"
              className="px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-accent/50"
              aria-label="Explore accessible destinations"
            >
              Explore Destinations
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-cta font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Contact us about your accessible trip"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* WCAG 2.1.1 (A): Keyboard - All controls keyboard accessible */}
      {/* WCAG 2.4.7 (AA): Focus Visible - Focus rings on all interactive elements */}
      {/* WCAG 2.5.1 (A): Pointer Gestures - Single-pointer click actions */}
      {/* WCAG 2.5.2 (A): Pointer Cancellation - onClick (up-event), not onMouseDown */}
      <div
        className={`absolute ${zoomLevel >= 150 ? 'bottom-1' : 'bottom-8' } left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10`}
        role="group"
        aria-label="Carousel controls"
      >
        <button
          ref={(el) => {
            if (el) {
              buttonRefs.current["prev"] = el;
            }
          }}
          onClick={handleButtonClick(handlePrevious)}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Previous destination"
        >
          <Icon
            name="ChevronLeftIcon"
            size={24}
            className="text-white"
            aria-hidden="true"
          />
        </button>

        {/* WCAG 2.2.2 (A): Pause, Stop, Hide - User control for auto-play */}
        {/* WCAG 4.1.2 (A): Name, Role, Value - Button state communicated via aria-label */}
        <button
          ref={(el) => {
            if (el) {
              buttonRefs.current["prev"] = el;
            }
          }}
          onClick={handleButtonClick(togglePlayPause)}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label={
            isPlaying
              ? "Pause carousel auto-rotation"
              : "Play carousel auto-rotation"
          }
          aria-pressed={isPlaying}
        >
          <Icon
            name={isPlaying ? "PauseIcon" : "PlayIcon"}
            size={20}
            className="text-white"
            variant="solid"
            aria-hidden="true"
          />
        </button>

        <button
          ref={(el) => {
            if (el) {
              buttonRefs.current["prev"] = el;
            }
          }}
          onClick={handleButtonClick(handleNext)}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/50"
          aria-label="Next destination"
        >
          <Icon
            name="ChevronRightIcon"
            size={24}
            className="text-white"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* WCAG 1.3.1 (A): Info and Relationships - Grouped pagination controls */}
      {/* WCAG 4.1.2 (A): Name, Role, Value - aria-current indicates active slide */}
      {/* WCAG 2.5.2 (A): Pointer Cancellation - Click handlers on up-event */}
      <div
        className={`absolute ${zoomLevel >= 150 ? 'bottom-14' : 'bottom-24' } left-1/2 transform -translate-x-1/2 flex gap-2 z-10`}
        role="group"
        aria-label="Carousel pagination"
      >
        {mockDestinations.map((destination, index) => (
          <button
            key={index}
            onClick={handleButtonClick(() => setCurrentSlide(index))}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70 w-3"
            }`}
            aria-label={`Go to ${destination.name}, ${destination.country}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* WCAG 4.1.3 (AA): Status Messages - Screen reader announcement for slide changes */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Slide {currentSlide + 1} of {mockDestinations.length}:{" "}
        {currentDestination.name}, {currentDestination.country}
      </div>
    </section>
  );
}
