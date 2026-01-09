import AppImage from "../common/AppImage";
import Icon from "../common/AppIcon";

interface AccessibilityFeature {
  icon: string;
  label: string;
}

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  category: string;
  accessibilityFeatures: AccessibilityFeature[];
  groupSize: string;
  difficulty: string;
  onViewDetails: (id: string) => void;
}

const ExperienceCard = ({
  id,
  title,
  location,
  duration,
  price,
  image,
  alt,
  rating,
  reviewCount,
  category,
  accessibilityFeatures,
  groupSize,
  difficulty,
  onViewDetails,
}: ExperienceCardProps) => {
  return (
    // WCAG 1.3.1 (A): Info and Relationships - Semantic article element for experience
    // WCAG 2.4.4 (A): Link Purpose - Card context clear from content
    <article
      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring"
      aria-labelledby={`experience-${id}-title`}
    >
      {/* WCAG 1.4.11 (AA): Non-text Contrast - Image has sufficient contrast with surroundings */}
      <div className="relative h-64 overflow-hidden">
        {/* WCAG 1.1.1 (A): Non-text Content - Meaningful alt text provided */}
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {/* WCAG 1.4.1 (A): Use of Color - Badge includes text, not just color */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 bg-ternary/90 text-accent-background text-xs font-semibold rounded-full"
            role="status"
            aria-label={`Category: ${category}`}
          >
            {category}
          </span>
        </div>
        {/* WCAG 1.3.3 (A): Sensory Characteristics - Rating shown with icon and text */}
        {/* WCAG 1.1.1 (A): Non-text Content - Rating communicated via aria-label */}
        <div
          className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-lg"
          role="img"
          aria-label={`Rating: ${rating} out of 5 stars, based on ${reviewCount} reviews`}
        >
          <Icon
            name="StarIcon"
            size={16}
            className="fill-current text-yellow-500"
            variant="solid"
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-title">{rating}</span>
          <span className="text-xs text-muted-background">({reviewCount})</span>
        </div>
      </div>

      <div className="p-6">
        {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading identifies experience */}
        {/* WCAG 1.3.1 (A): Info and Relationships - Proper heading hierarchy */}
        <h3
          id={`experience-${id}-title`}
          className="text-xl font-headline font-bold text-title mb-2 line-clamp-2"
        >
          {title}
        </h3>

        {/* WCAG 1.1.1 (A): Non-text Content - Icon provides context with text */}
        <div className="flex items-center text-sm text-muted-background mb-4">
          <Icon
            name="MapPinIcon"
            size={16}
            className="mr-1"
            aria-hidden="true"
          />
          <span>{location}</span>
        </div>

        {/* WCAG 1.3.1 (A): Info and Relationships - Structured information display */}
        {/* WCAG 1.4.3 (AA): Contrast - Text and icons meet contrast requirements */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon
              name="clock"
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="text-title" aria-label={`Duration: ${duration}`}>
              {duration}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon
              name="users"
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span
              className="text-title"
              aria-label={`Group size: ${groupSize}`}
            >
              {groupSize}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon
              name="chart-no-axes-column-increasing"
              size={16}
              className="text-primary"
              aria-hidden="true"
            />
            <span
              className="text-title"
              aria-label={`Difficulty: ${difficulty}`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {/* WCAG 2.4.6 (AA): Headings and Labels - Descriptive label for features */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-muted-background mb-2">
            Accessibility Features:
          </p>
          {/* WCAG 1.3.1 (A): Info and Relationships - List structure for features */}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Accessibility features"
          >
            {accessibilityFeatures.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-ternary/10 font-semibold px-2 py-1 rounded-md"
                role="listitem"
                aria-label={feature.label}
              >
                <Icon
                  name={feature.icon as any}
                  size={14}
                  className="text-ternary"
                  aria-hidden="true"
                />
                <span className="text-xs text-ternary">{feature.label}</span>
              </div>
            ))}
            {accessibilityFeatures.length > 3 && (
              <span
                className="text-xs text-muted-background px-2 py-1"
                role="listitem"
                aria-label={`${
                  accessibilityFeatures.length - 3
                } more accessibility features available`}
              >
                +{accessibilityFeatures.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* WCAG 1.3.1 (A): Info and Relationships - Semantic structure for pricing */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-background">From</p>
            {/* WCAG 1.4.3 (AA): Contrast - Price text meets contrast ratio */}
            <p
              className="text-2xl font-bold text-primary"
              aria-label={`Price: $${price} per person`}
            >
              ${price}
            </p>
            <p className="text-xs text-muted-background">per person</p>
          </div>
          {/* WCAG 2.4.4 (A): Link Purpose - Clear button text describes action */}
          {/* WCAG 2.5.5 (AAA): Target Size - Button meets touch target size */}
          {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring visible on keyboard focus */}
          <button
            onClick={() => onViewDetails(id)}
            className="px-6 py-3 bg-ternary/90 text-accent-background font-semibold rounded-lg hover:bg-ternary/90 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`View details for ${title}`}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
