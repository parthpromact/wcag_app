"use client";

import Link from "next/link";
import AppImage from "../common/AppImage";
import Icon from "../common/AppIcon";

interface AccessibilityFeature {
  icon: string;
  label: string;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  accessibilityRating: number;
  priceRange: string;
  duration: string;
  description: string;
  accessibilityFeatures: AccessibilityFeature[];
  featured: boolean;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const renderStars = (rating: number) => {
    // WCAG 1.1.1 (A): Non-text Content - Stars convey info via aria-label on container
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? "solid" : "outline"}
        size={16}
        className={
          index < Math.floor(rating)
            ? "fill-current text-yellow-500"
            : "text-muted-foreground"
        }
        aria-hidden="true"
      />
    ));
  };

  const getAccessibilityColor = (rating: number) => {
    // WCAG 1.4.1 (A): Use of Color - Not relying solely on color, also showing text rating
    if (rating >= 4.5) return "text-ternary bg-ternary/10";
    if (rating >= 3.5) return "text-accent bg-accent/10";
    return "text-warning bg-warning/10";
  };

  const getAccessibilityLevel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Good";
    return "Moderate";
  };

  // WCAG 1.3.1 (A): Info and Relationships - Semantic article element for destination
  // WCAG 2.4.4 (A): Link Purpose - Link context clear from card content
  return (
    <article
      className="group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-border"
      aria-labelledby={`destination-${destination.id}-title`}
    >
      {/* WCAG 1.4.11 (AA): Non-text Contrast - Image has sufficient contrast with surroundings */}
      <div className="relative h-56 overflow-hidden">
        {/* WCAG 1.1.1 (A): Non-text Content - Meaningful alt text provided */}
        <AppImage
          src={destination.image}
          alt={destination.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {destination.featured && (
          // WCAG 1.4.1 (A): Use of Color - Badge includes icon and text, not just color
          // WCAG 1.4.3 (AA): Contrast - Badge text meets contrast requirements
          <div
            className="absolute top-4 left-4 px-3 py-1 bg-ternary/90 text-accent-foreground text-xs font-cta font-semibold rounded-full flex items-center space-x-1"
            role="status"
            aria-label="Featured destination"
          >
            <Icon name="SparklesIcon" size={14} aria-hidden="true" />
            <span>Featured</span>
          </div>
        )}
        {/* WCAG 1.3.3 (A): Sensory Characteristics - Duration shown with icon and text */}
        <div
          className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full flex items-center space-x-1"
          aria-label={`Trip duration: ${destination.duration}`}
        >
          <Icon
            name="ClockIcon"
            size={14}
            className="text-primary"
            aria-hidden="true"
          />
          <span className="text-xs font-body font-medium text-foreground">
            {destination.duration}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading identifies destination */}
              {/* WCAG 1.3.1 (A): Info and Relationships - Proper heading hierarchy */}
              <h3
                id={`destination-${destination.id}-title`}
                className="text-lg font-headline font-bold text-foreground group-hover:text-primary transition-colors duration-200"
              >
                {destination.name}
              </h3>
              {/* WCAG 1.1.1 (A): Non-text Content - Icon provides context with text */}
              <div className="flex items-center space-x-1 mt-1">
                <Icon
                  name="MapPinIcon"
                  size={14}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm font-body text-muted-foreground">
                  {destination.country}
                </span>
              </div>
            </div>
            {/* WCAG 1.4.3 (AA): Contrast - Price text meets contrast ratio */}
            <span
              className="text-lg font-headline font-bold text-primary"
              aria-label={`Price range: ${destination.priceRange}`}
            >
              {destination.priceRange}
            </span>
          </div>

          {/* WCAG 1.3.3 (A): Sensory Characteristics - Rating not conveyed by shape alone */}
          {/* WCAG 1.1.1 (A): Non-text Content - aria-label provides rating value */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center space-x-1"
              role="img"
              aria-label={`Rating: ${destination.rating} out of 5 stars`}
            >
              {renderStars(destination.rating)}
            </div>
            <span className="text-sm font-body text-muted-foreground">
              ({destination.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        {/* WCAG 1.3.1 (A): Info and Relationships - Paragraph conveys description */}
        {/* WCAG 1.4.8 (AAA): Visual Presentation - Line height and spacing adequate */}
        <p className="text-sm font-body text-foreground line-clamp-2">
          {destination.description}
        </p>

        <div className="space-y-3">
          {/* WCAG 1.4.1 (A): Use of Color - Info conveyed through text and icon, not just color */}
          {/* WCAG 1.3.1 (A): Info and Relationships - Semantic grouping of accessibility info */}
          <div
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
            role="status"
            aria-label={`Accessibility rating: ${getAccessibilityLevel(
              destination.accessibilityRating
            )}, ${destination.accessibilityRating.toFixed(1)} out of 5`}
          >
            <div className="flex items-center space-x-2">
              <Icon
                name="badge-check"
                size={18}
                className="text-primary"
                aria-hidden="true"
              />
              <span className="text-sm font-body font-medium text-foreground">
                Accessibility Rating
              </span>
            </div>
            {/* WCAG 1.4.3 (AA): Contrast - Badge text meets contrast requirements */}
            <div
              className={`px-2 py-1 rounded-full text-xs font-cta font-semibold ${getAccessibilityColor(
                destination.accessibilityRating
              )}`}
            >
              {destination.accessibilityRating.toFixed(1)}/5.0
            </div>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - List structure for features */}
          {/* WCAG 2.4.4 (A): Link Purpose - Feature labels are descriptive */}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Accessibility features"
          >
            {destination.accessibilityFeatures
              .slice(0, 3)
              .map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-2 py-1 bg-ternary/10 text-ternary rounded-full"
                  role="listitem"
                  aria-label={feature.label}
                >
                  <Icon
                    name={feature.icon as any}
                    size={14}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-body font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            {destination.accessibilityFeatures.length > 3 && (
              <div
                className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-body font-medium"
                role="listitem"
                aria-label={`${
                  destination.accessibilityFeatures.length - 3
                } more accessibility features available`}
              >
                +{destination.accessibilityFeatures.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* WCAG 2.4.4 (A): Link Purpose - Clear link text describes action */}
        {/* WCAG 2.5.5 (AAA): Target Size - Button meets touch target size */}
        {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring visible on keyboard focus */}
        <Link
          href={`/experiences?destination=${destination.id}`}
          className="block w-full px-4 py-3 text-center text-sm font-cta font-semibold text-accent-foreground bg-ternary/90 hover:bg-ternary/80 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label={`Explore experiences in ${destination.name}, ${
            destination.country
          }, ${
            destination.description
          }, This place has an accessibility rating of ${getAccessibilityLevel(
            destination.accessibilityRating
          )} with a score of ${destination.accessibilityRating.toFixed(
            1
          )} out of 5.0.`}
        >
          Explore Experiences
        </Link>
      </div>
    </article>
  );
};

export default DestinationCard;
