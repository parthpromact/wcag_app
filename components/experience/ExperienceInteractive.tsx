"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import ExperienceCard from "./ExperienceCard";
import FilterSidebar from "./FilterSidebar";
import Icon from "../common/AppIcon";
import { experienceStaticData } from "@/constant/staticData";
import ExperienceDetailModal from "./ExperienceDetailModal";

const ExperiencesInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock data from staticData.ts
  const mockExperiences = experienceStaticData.experiences;
  const categories = experienceStaticData.categories;
  const accessibilityFeatures = experienceStaticData.accessibilityFeatures;
  const priceRanges = experienceStaticData.priceRanges;
  const durations = experienceStaticData.durations;
  const difficulties = experienceStaticData.difficulties;
  const sortOptions = experienceStaticData.sortOptions;

  // Filtering logic
  const filterExperiences = () => {
    let filtered = [...mockExperiences];

    if (selectedCategory !== "all") {
      const categoryMap: { [key: string]: string } = {
        nature: "Nature & Wildlife",
        food: "Food & Culture",
        adventure: "Adventure",
        wellness: "Wellness",
        culture: "Culture & History",
      };
      filtered = filtered.filter(
        (exp) => exp.category === categoryMap[selectedCategory]
      );
    }

    if (selectedAccessibility.length > 0) {
      filtered = filtered.filter((exp) =>
        selectedAccessibility.every((feature) =>
          exp.accessibilityFeatures.some((f) =>
            f.label
              .toLowerCase()
              .includes(feature.replace("wheelchair", "wheelchair accessible"))
          )
        )
      );
    }

    if (selectedPriceRange !== "all") {
      filtered = filtered.filter((exp) => {
        if (selectedPriceRange === "budget") return exp.price < 100;
        if (selectedPriceRange === "moderate")
          return exp.price >= 100 && exp.price <= 200;
        if (selectedPriceRange === "premium") return exp.price > 200;
        return true;
      });
    }

    if (selectedDuration !== "all") {
      filtered = filtered.filter((exp) => {
        const hours = parseInt(exp.duration);
        if (selectedDuration === "short") return hours < 3;
        if (selectedDuration === "half") return hours >= 3 && hours <= 5;
        if (selectedDuration === "full") return hours > 5;
        return true;
      });
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (exp) => exp.difficulty.toLowerCase() === selectedDifficulty
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  };

  // Handle view details of an experience
  const handleViewDetails = (id: string) => {
    const experience = mockExperiences.find((exp) => exp.id === id);
    if (experience) {
      setSelectedExperience(experience);
      setIsModalOpen(true);
    }
  };

  const handleBook = (id: string) => {
    if (!isHydrated) return;

    alert(`Booking experience ${id}. This would redirect to booking page.`);
    setIsModalOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedAccessibility([]);
    setSelectedPriceRange("all");
    setSelectedDuration("all");
    setSelectedDifficulty("all");
    setSearchQuery("");
  };

  const filteredExperiences = filterExperiences();

  if (!isHydrated) {
    return (
      // WCAG 4.1.3 (AA): Status Messages - Loading state announced
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse" role="status" aria-live="polite">
            <div className="h-12 bg-muted rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-muted rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-96 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <span className="sr-only">Loading experiences...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    // WCAG 1.3.1 (A): Info and Relationships - Proper document structure
    // WCAG 2.4.1 (A): Bypass Blocks - Skip links and landmarks
    <div className="min-h-screen bg-background pt-20">
      <HeroSection />

      {/* WCAG 2.4.1 (A): Bypass Blocks - Main landmark for primary content */}
      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* WCAG 2.4.6 (AA): Headings and Labels - Clear page heading */}
        {/* WCAG 1.3.1 (A): Info and Relationships - Proper heading hierarchy */}
        <div className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-title mb-4" tabIndex={0}>
            Accessible Travel Experiences
          </h1>
          <p className="text-lg text-muted-background max-w-3xl" tabIndex={0}>
            Discover curated tours and adventures designed for all abilities.
            Every experience features detailed accessibility information and
            inclusive accommodations.
          </p>
        </div>

        {/* WCAG 1.3.1 (A): Info and Relationships - Search and sort controls grouped */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            {/* WCAG 1.1.1 (A): Non-text Content - Decorative icon with aria-hidden */}
            <Icon
              name="search"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-background"
              aria-hidden="true"
            />
            {/* WCAG 3.3.2 (A): Labels or Instructions - Clear placeholder text */}
            {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on input */}
            {/* WCAG 1.3.5 (AA): Identify Input Purpose - type="search" */}
            <input
              type="search"
              placeholder="Search experiences, locations, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-title"
              aria-label="Search experiences, locations, or activities"
            />
          </div>
          <div className="flex gap-4">
            {/* WCAG 1.3.1 (A): Info and Relationships - Label associated with select */}
            <label htmlFor="sort-experiences" className="sr-only">
              Sort experiences by
            </label>
            <select
              id="sort-experiences"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-1 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-title"
              aria-label="Sort experiences by"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* WCAG 2.4.4 (A): Link Purpose - Clear button label */}
            {/* WCAG 4.1.2 (A): Name, Role, Value - Button state communicated */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-4 py-3 bg-ternary/90 text-primary-background rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring flex items-center space-x-2"
              aria-label={showMobileFilters ? "Hide filters" : "Show filters"}
              aria-expanded={showMobileFilters}
            >
              <Icon name="sliders-horizontal" size={20} aria-hidden="true" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* WCAG 1.3.1 (A): Info and Relationships - Grid layout for content structure */}
        {/* WCAG 1.4.10 (AA): Reflow - Responsive grid adapts to viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div
            className={`lg:col-span-1 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <FilterSidebar
              categories={categories}
              accessibilityFeatures={accessibilityFeatures}
              priceRanges={priceRanges}
              durations={durations}
              difficulties={difficulties}
              selectedCategory={selectedCategory}
              selectedAccessibility={selectedAccessibility}
              selectedPriceRange={selectedPriceRange}
              selectedDuration={selectedDuration}
              selectedDifficulty={selectedDifficulty}
              onCategoryChange={setSelectedCategory}
              onAccessibilityChange={setSelectedAccessibility}
              onPriceRangeChange={setSelectedPriceRange}
              onDurationChange={setSelectedDuration}
              onDifficultyChange={setSelectedDifficulty}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="lg:col-span-3">
            {/* WCAG 4.1.3 (AA): Status Messages - Result count announced */}
            <div className="mb-6 flex items-center justify-between">
              <p
                className="text-muted-background"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                Showing {filteredExperiences.length} of {mockExperiences.length}{" "}
                experiences
              </p>
            </div>

            {filteredExperiences.length === 0 ? (
              // WCAG 3.3.1 (A): Error Identification - Clear message for no results
              // WCAG 3.3.3 (AA): Error Suggestion - Guidance on how to find results
              <div
                className="text-center py-16"
                role="status"
                aria-live="polite"
              >
                <Icon
                  name="FaceFrownIcon"
                  size={64}
                  className="mx-auto text-muted-background mb-4"
                  aria-hidden="true"
                />
                <h2 className="text-xl font-semibold text-title mb-2">
                  No experiences found
                </h2>
                <p className="text-muted-background mb-6">
                  Try adjusting your filters or search query to find more
                  experiences
                </p>
                {/* WCAG 2.4.4 (A): Link Purpose - Clear action button */}
                {/* WCAG 2.5.5 (AAA): Target Size - Large button target */}
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-ternary/90 text-accent-background font-semibold rounded-lg hover:bg-ternary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Clear all filters to show all experiences"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // WCAG 1.3.1 (A): Info and Relationships - Grid structure for cards
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                role="list"
                aria-label="Experience listings"
              >
                {filteredExperiences.map((experience) => (
                  <div key={experience.id} role="listitem">
                    <ExperienceCard
                      {...experience}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* WCAG 2.1.2 (A): No Keyboard Trap - Modal can be closed with keyboard */}
      {/* WCAG 2.4.3 (A): Focus Order - Focus management in modal */}
      <ExperienceDetailModal
        experience={selectedExperience}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBook}
      />
    </div>
  );
};

export default ExperiencesInteractive;
