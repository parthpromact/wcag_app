"use client";

import { useState, useEffect } from "react";
import Icon from "../common/AppIcon";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterPanelProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterPanel = ({
  onFilterChange,
  isMobileOpen,
  onMobileClose,
}: FilterPanelProps) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    accessibility: [],
    budget: [],
    duration: [],
  });

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    accessibility: true,
    experience: true,
    budget: false,
    duration: false,
  });

  const filterSections: Record<string, FilterSection> = {
    accessibility: {
      title: "Accessibility Features",
      options: [
        { id: "wheelchair", label: "Wheelchair Accessible", count: 12 },
        { id: "visual", label: "Visual Accommodations", count: 9 },
        { id: "cognitive", label: "Cognitive Support", count: 3 },
        { id: "mobility", label: "Mobility Assistance", count: 2 },
        { id: "service-animals", label: "Service Animals Welcome", count: 0 },
      ],
    },
    budget: {
      title: "Budget Range",
      options: [
        { id: "luxury", label: "Luxury ($$$$)", count: 4 },
        { id: "premium", label: "Premium ($$$)", count: 4 },
        { id: "moderate", label: "Moderate ($$)", count: 1 },
        { id: "budget", label: "Budget Friendly ($)", count: 0 },
      ],
    },
    duration: {
      title: "Trip Duration",
      options: [
        { id: "weekend", label: "Weekend (2-3 days)", count: 1 },
        { id: "week", label: "One Week (4-7 days)", count: 4 },
        { id: "extended", label: "Extended (8-14 days)", count: 0 },
      ],
    },
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterToggle = (category: string, filterId: string) => {
    setSelectedFilters((prev) => {
      const categoryFilters = prev[category] || [];

      return {
        ...prev,
        [category]: categoryFilters.includes(filterId)
          ? categoryFilters.filter((id) => id !== filterId)
          : [...categoryFilters, filterId],
      };
    });
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const clearAllFilters = () => {
    const cleared = {
      accessibility: [],
      budget: [],
      duration: [],
    };

    setSelectedFilters(cleared);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce(
      (sum, filters) => sum + filters.length,
      0
    );
  };

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMobileClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, onMobileClose]);

  // WCAG 1.3.1 (A): Info and Relationships - Semantic structure with nav and sections
  // WCAG 2.4.1 (A): Bypass Blocks - Landmarks allow easy navigation
  const panelContent = (
    <div className="h-full flex flex-col">
      {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading describes purpose */}
      {/* WCAG 1.4.3 (AA): Contrast - Text and background meet contrast ratio */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2 w-full">
          <div className="flex item-center justify-between w-full">
            <div className="flex item-center space-x-2">
              <Icon
                name="sliders-horizontal"
                size={20}
                className="text-primary mt-1"
                aria-hidden="true"
              />
              <h2 className="text-lg font-headline font-bold text-foreground">
                Filters
              </h2>
              {getActiveFilterCount() > 0 && (
                // WCAG 1.4.1 (A): Use of Color - Badge doesn't rely solely on color
                // WCAG 4.1.3 (AA): Status Messages - aria-live announces changes
                <span
                  className="my-1 px-2 py-1 text-xs font-body font-semibold text-accent-foreground bg-ternary/90 rounded-full"
                  role="status"
                  aria-live="polite"
                  aria-label={`${getActiveFilterCount()} filters applied`}
                >
                  {getActiveFilterCount()}
                </span>
              )}
            </div>

            {/* WCAG 3.3.3 (AA): Error Suggestion - Clear action to correct state */}
            {/* WCAG 2.5.3 (A): Label in Name - Button text matches accessible name */}
            {getActiveFilterCount() > 0 && (
              <div className="item-center">
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2  text-sm font-cta font-semibold text-destructive-foreground bg-destructive/40 hover:bg-destructive/60 cursor-pointer rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label={`Clear all Filters`}
                >
                  Clear all Filters
                </button>
              </div>
            )}
          </div>
        </div>
        {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on button */}
        {/* WCAG 2.5.3 (A): Label in Name - Accessible name includes visible text */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close filters panel"
        >
          <Icon name="X" size={20} aria-hidden="true" />
        </button>
      </div>

      {/* WCAG 2.1.1 (A): Keyboard - All filters accessible via keyboard */}
      {/* WCAG 2.4.3 (A): Focus Order - Logical tab order through filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(filterSections).map(([key, section]) => (
          // WCAG 1.3.1 (A): Info and Relationships - Grouped related filters
          <div key={key} className="space-y-3">
            {/* WCAG 4.1.2 (A): Name, Role, Value - aria-expanded shows state */}
            {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring visible on keyboard focus */}
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-ternary focus:ring-offset-2 rounded-lg p-2 -m-2"
              aria-expanded={expandedSections[key]}
              aria-controls={`filter-section-${key}`}
            >
              {/* WCAG 2.4.6 (AA): Headings and Labels - Descriptive section heading */}
              <h3 className="text-sm font-body font-semibold text-foreground">
                {section.title}
              </h3>
              <Icon
                name="ChevronDownIcon"
                size={16}
                className={`text-muted-foreground transition-transform duration-300 ${
                  expandedSections[key] ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {expandedSections[key] && (
              // WCAG 1.3.1 (A): Info and Relationships - role="group" associates options
              <div
                id={`filter-section-${key}`}
                className="space-y-2 mt-2"
                role="group"
                aria-label={section.title}
              >
                {section.options.map((option) => (
                  // WCAG 1.3.1 (A): Info and Relationships - label wraps input properly
                  // WCAG 2.5.5 (AAA): Target Size - Large clickable area
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200 group"
                  >
                    {/* WCAG 2.1.1 (A): Keyboard - Checkbox operable via keyboard */}
                    {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on checkbox */}
                    {/* WCAG 1.4.11 (AA): Non-text Contrast - Checkbox border visible */}
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters[key]?.includes(option.id) || false
                      }
                      onChange={() => handleFilterToggle(key, option.id)}
                      className="w-4 h-4 text-ternary bg-background border-border rounded focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                      aria-label={`${option.label}, ${option.count} destinations available`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleFilterToggle(key, option.id);
                        }
                      }}
                    />
                    {/* WCAG 1.4.3 (AA): Contrast - Text color meets contrast requirements */}
                    <span className="flex-1 text-sm font-body text-foreground group-hover:text-primary transition-colors duration-200">
                      {option.label}
                    </span>
                    <span
                      className="text-xs font-body text-muted-foreground"
                      aria-hidden="true"
                    >
                      {option.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* WCAG 2.4.1 (A): Bypass Blocks - Aside landmark for easy navigation */}
      {/* WCAG 1.3.1 (A): Info and Relationships - Semantic aside element */}
      <aside
        className="hidden lg:block w-80 bg-card h-full"
        aria-label="Filters"
      >
        {panelContent}
      </aside>

      {/* WCAG 2.4.3 (A): Focus Order - Overlay doesn't trap focus */}
      {/* WCAG 2.1.2 (A): No Keyboard Trap - ESC key closes modal */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={onMobileClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onMobileClose();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close filters overlay"
        />
      )}

      {/* WCAG 1.3.2 (A): Meaningful Sequence - Logical reading order */}
      {/* WCAG 2.4.3 (A): Focus Order - Focus moves logically within panel */}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-80 bg-card z-50 transform transition-transform duration-300 ease-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Filters panel"
        aria-hidden={!isMobileOpen}
      >
        {panelContent}
      </aside>
    </>
  );
};

export default FilterPanel;
