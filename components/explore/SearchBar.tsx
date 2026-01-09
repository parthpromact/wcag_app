"use client";

import { useState } from "react";
import Icon from "../common/AppIcon";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
}

const SearchBar = ({ onSearch, onFilterToggle }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    // WCAG 2.1.1 (A): Keyboard - All functionality available via keyboard
    // WCAG 1.4.3 (AA): Contrast - Using theme colors with sufficient contrast
    <div className="bg-card border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* WCAG 3.3.2 (A): Labels or Instructions - Form has clear purpose */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          role="search"
          aria-label="Search destinations"
        >
          <div className="flex items-center space-x-3">
            {/* WCAG 2.4.6 (AA): Headings and Labels - Descriptive button label */}
            {/* WCAG 2.5.5 (AAA): Target Size - 48x48px touch target */}
            <button
              type="button"
              onClick={onFilterToggle}
              className="lg:hidden flex items-center justify-center w-12 h-12 bg-ternary/90 text-accent-foreground rounded-lg hover:bg-ternary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Toggle filters"
              aria-expanded={false}
            >
              <Icon name="sliders-horizontal" size={20} />
            </button>

            <div className="flex-1 relative">
              <div className="relative">
                {/* WCAG 1.1.1 (A): Non-text Content - Decorative icon with aria-hidden */}
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                {/* WCAG 1.3.5 (AA): Identify Input Purpose - autocomplete attribute */}
                {/* WCAG 3.3.2 (A): Labels or Instructions - Clear placeholder text */}
                {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring styles */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, experiences, or accessibility features..."
                  className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  aria-label="Search destinations, experiences, or accessibility features"
                  autoComplete="off"
                  role="searchbox"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      handleClear();
                    }
                  }}
                />
                {searchQuery && (
                  // WCAG 2.4.6 (AA): Headings and Labels - Descriptive label
                  // WCAG 2.4.7 (AA): Focus Visible - Focus ring on interactive element
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring rounded"
                    aria-label="Clear search query"
                  >
                    <Icon name="X" size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* WCAG 1.3.1 (A): Info and Relationships - Information icon provides context */}
        {/* WCAG 1.4.3 (AA): Contrast - Text meets contrast requirements */}
        <div
          className="mt-4 flex items-center space-x-2 text-sm font-body text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Icon name="Info" size={16} aria-hidden="true" />
          <span>
            All destinations are verified for accessibility information accuracy
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
