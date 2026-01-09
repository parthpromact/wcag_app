"use client";

import { useState } from "react";
import Icon from "../common/AppIcon";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  accessibilityFeatures: FilterOption[];
  priceRanges: FilterOption[];
  durations: FilterOption[];
  difficulties: FilterOption[];
  selectedCategory: string;
  selectedAccessibility: string[];
  selectedPriceRange: string;
  selectedDuration: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onAccessibilityChange: (features: string[]) => void;
  onPriceRangeChange: (range: string) => void;
  onDurationChange: (duration: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({
  categories,
  accessibilityFeatures,
  priceRanges,
  durations,
  difficulties,
  selectedCategory,
  selectedAccessibility,
  selectedPriceRange,
  selectedDuration,
  selectedDifficulty,
  onCategoryChange,
  onAccessibilityChange,
  onPriceRangeChange,
  onDurationChange,
  onDifficultyChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    category: true,
    accessibility: true,
    price: false,
    duration: false,
    difficulty: false,
  });
  

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAccessibilityToggle = (featureId: string) => {
    const newSelection = selectedAccessibility.includes(featureId)
      ? selectedAccessibility.filter((id) => id !== featureId)
      : [...selectedAccessibility, featureId];
    onAccessibilityChange(newSelection);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedAccessibility.length > 0 ||
    selectedPriceRange !== "all" ||
    selectedDuration !== "all" ||
    selectedDifficulty !== "all";

  return (
    // WCAG 2.4.1 (A): Bypass Blocks - Aside landmark for filter navigation
    // WCAG 1.3.1 (A): Info and Relationships - Semantic aside element
    <aside
      className="bg-card border border-border rounded-xl p-6 sticky top-24"
      aria-label="Experience filters"
    >
      <div className="mb-6 flex justify-between w-full">
        {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading for filter section */}
        <div>
          <h2 className="text-xl font-headline font-bold text-title mb-2">
            Filters
          </h2>
        </div>
        {/* WCAG 3.3.3 (AA): Error Suggestion - Clear action to reset filters */}
        {hasActiveFilters && (
          <div>
            <button
              onClick={onClearFilters}
              className="px-4 py-2  text-sm font-cta font-semibold text-destructive-foreground bg-destructive/40 hover:bg-destructive/60 cursor-pointer rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Clear all active filters"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Section */}
        {/* WCAG 1.3.1 (A): Info and Relationships - Grouped related filters */}
        <div>
          {/* WCAG 4.1.2 (A): Name, Role, Value - aria-expanded shows state */}
          {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring visible on keyboard focus */}
          <button
            onClick={() => toggleSection("category")}
            className="w-full flex items-center justify-between text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={expandedSections.category}
            aria-controls="category-section"
          >
            {/* WCAG 2.4.6 (AA): Headings and Labels - Descriptive section heading */}
            <h3 className="text-sm font-semibold text-title">Category</h3>
            <Icon
              name="ChevronDownIcon"
              size={16}
              className={`text-muted-background transition-transform duration-300 ${
                expandedSections.category ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.category && (
            // WCAG 1.3.1 (A): Info and Relationships - Fieldset groups related radio buttons
            <fieldset id="category-section" className="mt-3 space-y-2">
              <legend className="sr-only">Select experience category</legend>
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                >
                  {/* WCAG 2.1.1 (A): Keyboard - Radio button operable via keyboard */}
                  {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on radio button */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={() => onCategoryChange(category.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          onCategoryChange(category.id);
                        }
                      }}
                      className="w-4 h-4 text-ternary bg-background border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${category.label}${
                        category.count !== undefined
                          ? `, ${category.count} experiences`
                          : ""
                      }`}
                    />
                    {/* WCAG 1.4.3 (AA): Contrast - Text color meets contrast requirements */}
                    <span className="text-sm text-title group-hover:text-primary transition-colors duration-200">
                      {category.label}
                    </span>
                  </div>
                  {category.count !== undefined && (
                    <span
                      className="text-xs text-muted-background"
                      aria-hidden="true"
                    >
                      {category.count}
                    </span>
                  )}
                </label>
              ))}
            </fieldset>
          )}
        </div>

        {/* Accessibility Features Section */}
        <div>
          <button
            onClick={() => toggleSection("accessibility")}
            className="w-full flex items-center justify-between text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={expandedSections.accessibility}
            aria-controls="accessibility-section"
          >
            <h3 className="text-sm font-semibold text-title">Accessibility</h3>
            <Icon
              name="ChevronDownIcon"
              size={16}
              className={`text-muted-background transition-transform duration-300 ${
                expandedSections.accessibility ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.accessibility && (
            // WCAG 1.3.1 (A): Info and Relationships - role="group" associates options
            <div
              id="accessibility-section"
              className="mt-3 space-y-2"
              role="group"
              aria-label="Accessibility features"
            >
              {accessibilityFeatures.map((feature) => (
                // WCAG 2.5.5 (AAA): Target Size - Large clickable area
                <label
                  key={feature.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    {/* WCAG 2.1.1 (A): Keyboard - Checkbox operable via keyboard */}
                    {/* WCAG 1.4.11 (AA): Non-text Contrast - Checkbox border visible */}
                    <input
                      type="checkbox"
                      checked={selectedAccessibility.includes(feature.id)}
                      onChange={() => handleAccessibilityToggle(feature.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAccessibilityToggle(feature.id);
                        }
                      }}
                      className="w-4 h-4 text-ternary bg-background border-border rounded focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${feature.label}${
                        feature.count !== undefined
                          ? `, ${feature.count} experiences`
                          : ""
                      }`}
                    />
                    <span className="text-sm text-title group-hover:text-primary transition-colors duration-200">
                      {feature.label}
                    </span>
                  </div>
                  {feature.count !== undefined && (
                    <span
                      className="text-xs text-muted-background"
                      aria-hidden="true"
                    >
                      {feature.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={expandedSections.price}
            aria-controls="price-section"
          >
            <h3 className="text-sm font-semibold text-title">Price Range</h3>
            <Icon
              name="ChevronDownIcon"
              size={16}
              className={`text-muted-background transition-transform duration-300 ${
                expandedSections.price ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.price && (
            <fieldset id="price-section" className="mt-3 space-y-2">
              <legend className="sr-only">Select price range</legend>
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.id}
                      checked={selectedPriceRange === range.id}
                      onChange={() => onPriceRangeChange(range.id)}
                      className="w-4 h-4 text-ternary bg-background border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${range.label}${
                        range.count !== undefined
                          ? `, ${range.count} experiences`
                          : ""
                      }`}
                    />
                    <span className="text-sm text-title group-hover:text-primary transition-colors duration-200">
                      {range.label}
                    </span>
                  </div>
                  {range.count !== undefined && (
                    <span
                      className="text-xs text-muted-background"
                      aria-hidden="true"
                    >
                      {range.count}
                    </span>
                  )}
                </label>
              ))}
            </fieldset>
          )}
        </div>

        {/* Duration Section */}
        <div>
          <button
            onClick={() => toggleSection("duration")}
            className="w-full flex items-center justify-between text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={expandedSections.duration}
            aria-controls="duration-section"
          >
            <h3 className="text-sm font-semibold text-title">Duration</h3>
            <Icon
              name="ChevronDownIcon"
              size={16}
              className={`text-muted-background transition-transform duration-300 ${
                expandedSections.duration ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.duration && (
            <fieldset id="duration-section" className="mt-3 space-y-2">
              <legend className="sr-only">Select trip duration</legend>
              {durations.map((duration) => (
                <label
                  key={duration.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="duration"
                      value={duration.id}
                      checked={selectedDuration === duration.id}
                      onChange={() => onDurationChange(duration.id)}
                      className="w-4 h-4 text-ternary bg-background border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${duration.label}${
                        duration.count !== undefined
                          ? `, ${duration.count} experiences`
                          : ""
                      }`}
                    />
                    <span className="text-sm text-title group-hover:text-primary transition-colors duration-200">
                      {duration.label}
                    </span>
                  </div>
                  {duration.count !== undefined && (
                    <span
                      className="text-xs text-muted-background"
                      aria-hidden="true"
                    >
                      {duration.count}
                    </span>
                  )}
                </label>
              ))}
            </fieldset>
          )}
        </div>

        {/* Difficulty Section */}
        <div>
          <button
            onClick={() => toggleSection("difficulty")}
            className="w-full flex items-center justify-between text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={expandedSections.difficulty}
            aria-controls="difficulty-section"
          >
            <h3 className="text-sm font-semibold text-title">Difficulty</h3>
            <Icon
              name="ChevronDownIcon"
              size={16}
              className={`text-muted-background transition-transform duration-300 ${
                expandedSections.difficulty ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {expandedSections.difficulty && (
            <fieldset id="difficulty-section" className="mt-3 space-y-2">
              <legend className="sr-only">Select difficulty level</legend>
              {difficulties.map((difficulty) => (
                <label
                  key={difficulty.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="difficulty"
                      value={difficulty.id}
                      checked={selectedDifficulty === difficulty.id}
                      onChange={() => onDifficultyChange(difficulty.id)}
                      className="w-4 h-4 text-ternary bg-background border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${difficulty.label}${
                        difficulty.count !== undefined
                          ? `, ${difficulty.count} experiences`
                          : ""
                      }`}
                    />
                    <span className="text-sm text-title group-hover:text-primary transition-colors duration-200">
                      {difficulty.label}
                    </span>
                  </div>
                  {difficulty.count !== undefined && (
                    <span
                      className="text-xs text-muted-background"
                      aria-hidden="true"
                    >
                      {difficulty.count}
                    </span>
                  )}
                </label>
              ))}
            </fieldset>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
