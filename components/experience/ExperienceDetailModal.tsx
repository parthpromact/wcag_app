"use client";

import { useEffect, useRef } from "react";
import AppImage from "../common/AppImage";
import Icon from "../common/AppIcon";

interface AccessibilityFeature {
  icon: string;
  label: string;
  description: string;
}

interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

interface Experience {
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
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Itinerary[];
  meetingPoint: string;
  cancellationPolicy: string;
  languages: string[];
}

interface ExperienceDetailModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (id: string) => void;
}

const ExperienceDetailModal = ({
  experience,
  isOpen,
  onClose,
  onBook,
}: ExperienceDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // WCAG 2.1.2 (A): No Keyboard Trap - Focus management in modal
  // WCAG 2.4.3 (A): Focus Order - Proper focus order within modal
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Move focus to close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";

      // Return focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // WCAG 2.1.1 (A): Keyboard - ESC key closes modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // WCAG 2.4.3 (A): Focus Order - Trap focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  if (!isOpen || !experience) return null;

  return (
    // WCAG 2.4.3 (A): Focus Order - Overlay prevents interaction with background
    // WCAG 1.4.3 (AA): Contrast - Semi-transparent overlay provides contrast
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={onClose}
    >
      {/* WCAG 1.3.1 (A): Info and Relationships - Proper dialog structure */}
      {/* WCAG 2.1.1 (A): Keyboard - All content keyboard accessible */}
      <div
        ref={modalRef}
        className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WCAG 2.4.6 (AA): Headings and Labels - Clear modal heading */}
        <div className="sticky top-0 bg-background z-10 flex items-center justify-between p-6 border-b border-border">
          <h2
            id="modal-title"
            className="text-2xl font-headline font-bold text-title"
            tabIndex={0}
            role="heading"
          >
            Experience Details
          </h2>
          {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on close button */}
          {/* WCAG 2.4.4 (A): Link Purpose - Clear close button label */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close experience details modal"
          >
            <Icon name="X" size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          {/* WCAG 1.1.1 (A): Non-text Content - Meaningful alt text for image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-6">
            <AppImage
              src={experience.image}
              alt={experience.alt}
              className="w-full h-full object-cover"
            />
            {/* WCAG 1.4.1 (A): Use of Color - Category badge uses text, not just color */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-block px-3 py-1 bg-ternary/90 text-accent-background text-sm font-semibold rounded-full"
                role="status"
              >
                {experience.category}
              </span>
            </div>
            {/* WCAG 1.1.1 (A): Non-text Content - Rating info via aria-label */}
            <div
              className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 px-3 py-2 rounded-lg"
              role="img"
              aria-label={`Rating: ${experience.rating} out of 5 stars, ${experience.reviewCount} reviews`}
            >
              <Icon
                name="StarIcon"
                size={20}
                className="fill-current text-yellow-500"
                variant="solid"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-title">
                {experience.rating}
              </span>
              <span className="text-sm text-muted-background">
                ({experience.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - Semantic structure */}
          <div className="mb-6" id="modal-description">
            {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading hierarchy */}
            <h3 className="text-3xl font-headline font-bold text-title mb-4" role="heading" tabIndex={0}>
              {experience.title}
            </h3>
            {/* WCAG 1.4.3 (AA): Contrast - Text meets contrast requirements */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-background mb-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="MapPinIcon"
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>{experience.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="ClockIcon"
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="Users"
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>{experience.groupSize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="ChartBarIcon"
                  size={18}
                  className="text-primary"
                  aria-hidden="true"
                />
                <span>{experience.difficulty}</span>
              </div>
            </div>
            <p className="text-title leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - Grouped accessibility features */}
          <div className="mb-6">
            <h4 className="text-xl font-headline font-bold text-title mb-4" role="heading" tabIndex={0}>
              Accessibility Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experience.accessibilityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-ternary/10 rounded-lg"
                >
                  <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-primary shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-title mb-1">
                      {feature.label}
                    </p>
                    <p className="text-sm text-muted-background">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - List structure for highlights */}
          <div className="mb-6">
            <h4 className="text-xl font-headline font-bold text-title mb-4" role="heading" tabIndex={0}>
              Experience Highlights
            </h4>
            <ul className="space-y-2" role="list">
              {experience.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3"
                  role="listitem"
                >
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="text-ternary shrink-0 mt-0.5"
                    variant="solid"
                    aria-hidden="true"
                  />
                  <span className="text-title">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - Structured included/excluded items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xl font-headline font-bold text-title mb-4" role="heading"tabIndex={0}>
                What&apos;s Included
              </h4>
              <ul className="space-y-2" role="list">
                {experience.included.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3"
                    role="listitem"
                  >
                    <Icon
                      name="CheckIcon"
                      size={18}
                      className="text-ternary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-title text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-headline font-bold text-title mb-4">
                Not Included
              </h4>
              <ul className="space-y-2" role="list">
                {experience.notIncluded.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3"
                    role="listitem"
                  >
                    <Icon
                      name="X"
                      size={18}
                      className="text-destructive shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-title text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - Structured itinerary */}
          <div className="mb-6">
            <h4 className="text-xl font-headline font-bold text-title mb-4">
              Itinerary
            </h4>
            <div className="space-y-4">
              {experience.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="border border-border rounded-lg p-4"
                >
                  <h5 className="font-semibold text-title mb-2">
                    Day {day.day}: {day.title}
                  </h5>
                  <p className="text-sm text-muted-background mb-3">
                    {day.description}
                  </p>
                  <ul className="space-y-1" role="list">
                    {day.activities.map((activity, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                        role="listitem"
                      >
                        <span className="text-primary mt-1" aria-hidden="true">
                          •
                        </span>
                        <span className="text-title">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* WCAG 1.3.1 (A): Info and Relationships - Structured additional info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-title mb-2">
                Meeting Point
              </h4>
              <p className="text-sm text-muted-background">
                {experience.meetingPoint}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-title mb-2">
                Languages
              </h4>
              <p className="text-sm text-muted-background">
                {experience.languages.join(", ")}
              </p>
            </div>
          </div>

          {/* WCAG 1.4.1 (A): Use of Color - Important policy info not relying on color alone */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h4 className="text-lg font-semibold text-title mb-2">
              Cancellation Policy
            </h4>
            <p className="text-sm text-muted-background">
              {experience.cancellationPolicy}
            </p>
          </div>

          {/* WCAG 2.5.5 (AAA): Target Size - Large booking button */}
          {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on button */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div>
              <p className="text-sm text-muted-background">From</p>
              <p
                className="text-3xl font-bold text-primary"
                aria-label={`Price: $${experience.price} per person`}
              >
                ${experience.price}
              </p>
              <p className="text-sm text-muted-background">per person</p>
            </div>
            {/* WCAG 2.4.4 (A): Link Purpose - Clear button text */}
            <button
              onClick={() => onBook(experience.id)}
              className="px-8 py-4 bg-ternary/90 text-accent-background font-semibold rounded-lg hover:bg-ternary/90 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`Book ${experience.title} experience for $${experience.price} per person`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailModal;
