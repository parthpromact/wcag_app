"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState, useEffect } from "react";
import { LogOut, Menu, X, Search, Map } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);
  // WCAG 2.4.5 (AA): Multiple Ways - Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  // WCAG 2.4.5 (AA): Multiple Ways - Sitemap modal state
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allPages>([]);

  const navMenus = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "Experience", path: "/experiences" },
    { name: "Contact", path: "/contact" },
  ];

  // WCAG 2.4.5 (AA): Multiple Ways - Comprehensive site structure
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/home", description: "Welcome and overview" },
        { name: "Explore places", path: "/explore", description: "Browse accessible places" },
        { name: "Travel Experiences", path: "/experiences", description: "Discover curated experiences" },
        { name: "Explore destinations worldwide", path: "/accessible-destinations", description: "Find destinations worldwide" },
        { name: "Contact Us", path: "/contact", description: "Get in touch with our team" },
      ]
    },
  ];

  // WCAG 2.4.5 (AA): Multiple Ways - Flatten all pages for search
  const allPages = sitemapSections.flatMap(section => section.links);

  const logout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };

  // WCAG 2.4.5 (AA): Multiple Ways - Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = allPages.filter(page =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery]);

  // WCAG 2.1.4 (A): Character Key Shortcuts - Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSitemapOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // WCAG 2.5.2 (A): Pointer Cancellation - Click handlers
  const handleClick = (action: () => void) => {
    return () => action();
  };

  return (
    <>
      {/* WCAG 2.4.1 (A): Bypass Blocks - Skip link */}
      {/* WCAG 1.3.1 (A): Info and Relationships - Semantic nav element */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="top-0 left-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-border"
      >
        {/* WCAG 2.4.1 (A): Bypass Blocks - Skip to main content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-ternary/90 font-semibold transition-all"
        >
          Skip to main content
        </a>
        
        <div className="flex items-center justify-between p-3">
          {/* WCAG 1.1.1 (A): Non-text Content - Logo with alt text */}
          <Link
            href="/"
            aria-label="TRVL App logo, navigate to home page"
            className="focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <Image src="/trvl-logo.svg" alt="TRVL App logo" width={80} height={80} />
          </Link>

          <div className="flex items-center gap-2">
            {/* WCAG 2.4.5 (AA): Multiple Ways - Search button (Way 1) */}
            {/* WCAG 2.4.7 (AA): Focus Visible - Focus ring */}
            <button
              type="button"
              onClick={handleClick(() => setSearchOpen(true))}
              className="text-white p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white min-h-11 min-w-11 flex items-center justify-center"
              title="Open search (Ctrl+K)"
              aria-label="Open search (Ctrl+K)"
              aria-keyshortcuts="Control+K"
            >
              <Search size={20} aria-hidden="true" />
            </button>

            {/* WCAG 2.4.5 (AA): Multiple Ways - Sitemap button (Way 2) */}
            {!isMobile && (
              <button
                type="button"
                onClick={handleClick(() => setSitemapOpen(true))}
                className="text-white p-2 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white min-h-11 min-w-11 flex items-center justify-center"
                aria-label="Open site map"
                title="Open site map"
              >
                <Map size={20} aria-hidden="true" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="main-menu"
                onClick={handleClick(() => setMenuOpen(!menuOpen))}
                className="text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-white min-h-11 min-w-11 flex items-center justify-center"
              >
                {menuOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
              </button>
            )}
          </div>

          {/* WCAG 2.4.5 (AA): Multiple Ways - Primary navigation (Way 3) */}
          {/* Desktop Menu */}
          {!isMobile && (
            <ul className="flex items-center gap-2" role="list">
              {navMenus.map((menu) => {
                const active = isActive(menu.path);
                return (
                  <li key={menu.name}>
                    {/* WCAG 2.4.4 (A): Link Purpose - Clear link context */}
                    {/* WCAG 4.1.2 (A): Name, Role, Value - aria-current for active page */}
                    <Link
                      aria-current={active ? "page" : undefined}
                      href={menu.path}
                      className={`
                        block px-4 py-2 rounded min-h-11
                        font-semibold focus:outline-none focus:ring-2 focus:ring-white
                        ${active
                          ? "border underline underline-offset-8 text-white"
                          : "text-white hover:border"}
                      `}
                    >
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                {/* WCAG 2.5.5 (AAA): Target Size - Min 44x44px */}
                <Button
                  onClick={logout}
                  variant="outline"
                  className="flex items-center gap-2 min-h-11 cursor-pointer"
                  aria-label="Log out from the application"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Logout
                </Button>
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div id="main-menu">
            <ul className="flex flex-col gap-1 p-2" role="list">
              {navMenus.map((menu) => {
                const active = isActive(menu.path);
                return (
                  <li key={menu.name}>
                    <Link
                      href={menu.path}
                      aria-current={active ? "page" : undefined}
                      onClick={handleClick(() => setMenuOpen(false))}
                      className={`block px-4 py-3 rounded min-h-11 font-semibold focus:outline-none focus:ring-2 focus:ring-white 
                                  ${active
                          ? "border underline underline-offset-4 text-white"
                          : "text-white hover:border"}
                                `}
                    >
                      {menu.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={handleClick(() => setSitemapOpen(true))}
                  className="w-full text-left px-4 py-3 rounded min-h-11 font-semibold text-white hover:border focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="View site map"
                >
                  Site Map
                </button>
              </li>
              <li>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 min-h-11"
                  aria-label="Log out from the application"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* WCAG 2.4.5 (AA): Multiple Ways - Search Modal */}
      {/* WCAG 2.1.2 (A): No Keyboard Trap - Can close with ESC */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-start justify-center pt-20 px-4"
          onClick={handleClick(() => setSearchOpen(false))}
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
        >
          <div
            className="bg-card rounded-xl shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                {/* WCAG 2.4.6 (AA): Headings and Labels - Clear heading */}
                <h2 id="search-title" className="text-xl font-headline font-bold text-title">
                  Search Site
                </h2>
                <button
                  onClick={handleClick(() => setSearchOpen(false))}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Close search"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* WCAG 1.3.5 (AA): Identify Input Purpose */}
              <div className="relative mb-4">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages..."
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                  aria-label="Search pages"
                  autoFocus
                />
              </div>

              {/* WCAG 4.1.3 (AA): Status Messages - Search results announced */}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-96 overflow-y-auto" role="region" aria-live="polite">
                  <p className="text-sm text-muted-foreground mb-2">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                  {searchResults.map((result) => (
                    <Link
                      key={result.path}
                      href={result.path}
                      onClick={handleClick(() => setSearchOpen(false))}
                      className="block p-3 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <div className="font-semibold text-foreground">{result.name}</div>
                      <div className="text-sm text-muted-foreground">{result.description}</div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No results found for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WCAG 2.4.5 (AA): Multiple Ways - Sitemap Modal */}
      {sitemapOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-start justify-center pt-10 px-4 overflow-y-auto"
          onClick={handleClick(() => setSitemapOpen(false))}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sitemap-title"
        >
          <div
            className="bg-card rounded-xl shadow-2xl w-full max-w-4xl mb-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="sitemap-title" className="text-2xl font-headline font-bold text-title">
                  Site Map
                </h2>
                <button
                  onClick={handleClick(() => setSitemapOpen(false))}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="Close site map"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* WCAG 1.3.1 (A): Info and Relationships - Structured sitemap */}
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Site map navigation">
                {sitemapSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-headline font-bold text-title mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2" role="list">
                      {section.links.map((link) => (
                        <li key={link.path} role="listitem">
                          <Link
                            href={link.path}
                            onClick={handleClick(() => setSitemapOpen(false))}
                            className="block p-2 hover:bg-muted rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <div className="font-semibold text-foreground">{link.name}</div>
                            <div className="text-sm text-muted-foreground">{link.description}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Keyboard Shortcuts Guide */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-title mb-3">Keyboard Shortcuts</h3>
                <div className="flex gap-3 text-sm flex-wrap">
                  <div className="flex items-center justify-between p-2 bg-muted rounded min-w-[200px]">
                    <span className="text-foreground">Open Search</span>
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-sm">Ctrl+K</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded min-w-[200px]">
                    <span className="text-foreground">Close Modal</span>
                    <kbd className="px-2 py-1 bg-background border border-border rounded text-sm">Esc</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;