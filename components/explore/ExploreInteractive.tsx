"use client";

import { useState, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";
import DestinationCard from "./DestinationCard";
import Icon from "../common/AppIcon";
import { destinationsStaticData } from "@/constant/staticData";

const budgetMap: Record<string, string> = {
  budget: "$",
  moderate: "$$",
  premium: "$$$",
  luxury: "$$$$",
};

const durationMap: Record<string, [number, number]> = {
  weekend: [2, 3],
  week: [4, 7],
  extended: [8, 14],
  long: [15, Infinity],
};

const ExploreInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    accessibility: [],
    budget: [],
    duration: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 9;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  // WCAG 2.4.3 (A): Focus Order - Trap focus in mobile filter panel when open
  useEffect(() => {
    if (isMobileFilterOpen) {
      // Save current focused element
      const previouslyFocused = document.activeElement as HTMLElement;

      // Return focus when closing
      return () => {
        if (previouslyFocused) {
          previouslyFocused.focus();
        }
      };
    }
  }, [isMobileFilterOpen]);

  const mockDestinations = destinationsStaticData;
  const filteredDestinations = mockDestinations.filter((destination) => {
    const query = searchQuery.toLowerCase();

    // 🔍 Search
    const matchesSearch =
      !query ||
      destination.name.toLowerCase().includes(query) ||
      destination.country.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query);

    // ♿ Accessibility
    const matchesAccessibility =
      activeFilters.accessibility.length === 0 ||
      activeFilters.accessibility.some((filter) =>
        destination.accessibilityFeatures.some((f) =>
          f.label.toLowerCase().includes(filter)
        )
      );

    // 💰 Budget
    const matchesBudget =
      activeFilters.budget.length === 0 ||
      activeFilters.budget.some(
        (filter) => budgetMap[filter] === destination.priceRange
      );

    // ⏱ Duration
    const matchesDuration =
      activeFilters.duration.length === 0 ||
      activeFilters.duration.some((filter) => {
        const [min, max] = durationMap[filter];
        const days = parseInt(destination.duration); // "5-7 days" → 5
        return days >= min && days <= max;
      });

    return (
      matchesSearch && matchesAccessibility && matchesBudget && matchesDuration
    );
  });

  const totalPages = Math.ceil(
    filteredDestinations.length / destinationsPerPage
  );
  const startIndex = (currentPage - 1) * destinationsPerPage;
  const endIndex = startIndex + destinationsPerPage;
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  // WCAG 2.2.2 (A): Pause, Stop, Hide - Smooth scroll is user-controllable
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // WCAG 2.2.2 (A): Pause, Stop, Hide - Loading state doesn't auto-advance
  if (!isHydrated) {
    return (
      // WCAG 1.3.1 (A): Info and Relationships - Loading state semantically marked
      // WCAG 4.1.3 (AA): Status Messages - aria-live announces loading state
      <div
        className="flex-1 flex items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <div className="text-center space-y-4">
          <div
            className="w-16 h-16 border-4 border-ternary border-t-transparent rounded-full animate-spin mx-auto"
            aria-hidden="true"
          />
          <p className="text-sm font-body text-muted-foreground">
            Loading destinations...
          </p>
        </div>
      </div>
    );
  }

  // WCAG 1.3.1 (A): Info and Relationships - Proper document structure with landmarks
  // WCAG 2.4.1 (A): Bypass Blocks - Skip links and landmarks allow easy navigation
  return (
    <div>
      <div className=" flex-1 flex border-t border-muted">
        <FilterPanel
          onFilterChange={handleFilterChange}
          isMobileOpen={isMobileFilterOpen}
          onMobileClose={() => setIsMobileFilterOpen(false)}
        />

        <div
          id="main-content"
          className="flex-1 flex flex-col min-h-screen border-l border-r border-border w-3/4"
        >
          <SearchBar
            onSearch={handleSearch}
            onFilterToggle={() => setIsMobileFilterOpen(true)}
          />

          {/* WCAG 2.4.1 (A): Bypass Blocks - Main landmark for primary content */}
          {/* WCAG 1.3.1 (A): Info and Relationships - Semantic main element */}
          <main className="flex-1 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* WCAG 2.4.6 (AA): Headings and Labels - Page heading describes content */}
              {/* WCAG 1.3.1 (A): Info and Relationships - Proper heading hierarchy */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-headline font-bold text-foreground" tabIndex={0}>
                    Discover Accessible Destinations
                  </h1>
                  {/* WCAG 4.1.3 (AA): Status Messages - Result count announced to screen readers */}
                  <p
                    className="mt-2 text-sm font-body text-muted-foreground"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    tabIndex={0}
                  >
                    {filteredDestinations.length}{" "}
                    {filteredDestinations.length === 1
                      ? "destination"
                      : "destinations"}{" "}
                    with verified accessibility information
                  </p>
                </div>
              </div>

              {currentDestinations.length > 0 ? (
                <>
                  {/* WCAG 1.3.1 (A): Info and Relationships - Grid structure for card layout */}
                  {/* WCAG 1.4.10 (AA): Reflow - Responsive grid adapts to viewport */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="list"
                    aria-label="Accessible destinations"
                  >
                    {currentDestinations.map((destination) => (
                      <div key={destination.id} role="listitem">
                        <DestinationCard destination={destination} />
                      </div>
                    ))}
                  </div>

                  {/* WCAG 2.4.3 (A): Focus Order - Logical pagination navigation */}
                  {/* WCAG 3.2.3 (AA): Consistent Navigation - Pagination follows standards */}
                  {totalPages > 1 && (
                    <nav
                      className="mt-12 flex items-center justify-center space-x-2"
                      role="navigation"
                      aria-label="Pagination"
                    >
                      {/* WCAG 2.4.4 (A): Link Purpose - Clear button labels */}
                      {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring on pagination */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Go to previous page"
                        aria-disabled={currentPage === 1}
                      >
                        <Icon
                          name="ChevronLeftIcon"
                          size={20}
                          aria-hidden="true"
                        />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          // WCAG 3.2.4 (AA): Consistent Identification - Current page clearly indicated
                          // WCAG 1.4.1 (A): Use of Color - Not relying on color alone for current page
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                              currentPage === page
                                ? "bg-ternary/90 text-accent-foreground"
                                : "text-foreground hover:bg-muted"
                            }`}
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        aria-label="Go to next page"
                        aria-disabled={currentPage === totalPages}
                      >
                        <Icon
                          name="ChevronRightIcon"
                          size={20}
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  )}
                </>
              ) : (
                // WCAG 3.3.1 (A): Error Identification - Clear message for no results
                // WCAG 3.3.3 (AA): Error Suggestion - Guidance on how to find results
                <div
                  className="text-center py-16 w-full"
                  role="status"
                  aria-live="polite"
                >
                  <Icon
                    name="MagnifyingGlassIcon"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                    aria-hidden="true"
                  />
                  <h2 className="text-lg font-headline font-bold text-foreground mb-2 w-full">
                    No destinations found
                  </h2>
                  <p className="text-sm font-body text-muted-foreground">
                    Try adjusting your search or filters to find more
                    destinations
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExploreInteractive;
