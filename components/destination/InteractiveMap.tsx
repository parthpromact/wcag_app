"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "../common/AppIcon";
import { Map as LeafletMap } from "leaflet";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/useIsMobile";
const RealWorldMap = dynamic(() => import("./RealWordMap.client"), {
  ssr: false,
});
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  country: string;
  position: { x: number; y: number };
  accessible: boolean;
  lat: number;
  lng: number;
  description: string;
}

const InteractiveMap = () => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const isMobile = useIsMobile();

  const [pan, setPan] = useState({ x: 0, y: 0 });
  // WCAG 2.5.4 (A): Motion Actuation - Toggle for motion-based features
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [map, setMap] = useState<LeafletMap | null>(null);

  // Real world destinations with accurate coordinates
  const destinations: Destination[] = [
    {
      id: "1",
      name: "Paris",
      country: "France",
      position: { x: 50.5, y: 35 }, // Europe
      lat: 48.8566,
      lng: 2.3522,
      accessible: true,
      description: "Fully accessible museums, metro, and attractions",
    },
    {
      id: "2",
      name: "Tokyo",
      country: "Japan",
      position: { x: 78, y: 42 }, // Asia
      lat: 35.6762,
      lng: 139.6503,
      accessible: true,
      description: "World-class accessibility infrastructure",
    },
    {
      id: "3",
      name: "New York",
      country: "USA",
      position: { x: 22, y: 38 }, // North America
      lat: 40.7128,
      lng: -74.006,
      accessible: true,
      description: "ADA compliant attractions and services",
    },
    {
      id: "4",
      name: "Sydney",
      country: "Australia",
      position: { x: 82, y: 75 }, // Australia
      lat: -33.8688,
      lng: 151.2093,
      accessible: true,
      description: "Accessible beaches and landmarks",
    },
    {
      id: "5",
      name: "London",
      country: "UK",
      position: { x: 48, y: 32 }, // Europe
      lat: 51.5074,
      lng: -0.1278,
      accessible: true,
      description: "Accessible public transport and museums",
    },
    {
      id: "6",
      name: "Dubai",
      country: "UAE",
      position: { x: 58, y: 48 }, // Middle East
      lat: 25.2048,
      lng: 55.2708,
      accessible: true,
      description: "Modern accessibility features throughout",
    },
    {
      id: "7",
      name: "Barcelona",
      country: "Spain",
      position: { x: 49, y: 39 }, // Europe
      lat: 41.3851,
      lng: 2.1734,
      accessible: true,
      description: "Accessible beaches and Gaudí attractions",
    },
    {
      id: "8",
      name: "Singapore",
      country: "Singapore",
      position: { x: 72, y: 58 }, // Southeast Asia
      lat: 1.3521,
      lng: 103.8198,
      accessible: true,
      description: "Asia's most accessible city",
    },
  ];

  // WCAG 2.3.1 (A): Three Flashes or Below Threshold - Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // WCAG 2.5.4 (A): Motion Actuation - Device motion as enhancement, not requirement
  useEffect(() => {
    if (!motionEnabled || reducedMotion) return;

    const handleMotion = (event: DeviceOrientationEvent) => {
      const tiltX = event.beta || 0;
      const tiltY = event.gamma || 0;

      const newPanX = Math.max(-50, Math.min(50, (tiltY / 90) * 50));
      const newPanY = Math.max(-50, Math.min(50, (tiltX / 180) * 50));

      setPan({ x: newPanX, y: newPanY });
    };

    window.addEventListener("deviceorientation", handleMotion);
    return () => window.removeEventListener("deviceorientation", handleMotion);
  }, [motionEnabled, reducedMotion]);

  useEffect(() => {
    if (motionEnabled || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setPan({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [motionEnabled, reducedMotion]);

  // WCAG 2.5.1 (A): Pointer Gestures - Single-pointer alternative to multi-touch gestures
  const handleZoomIn = () => map?.zoomIn();
  const handleZoomOut = () => map?.zoomOut();
  const handleResetView = () => map?.setView([20, 0], 2);

  // WCAG 2.5.2 (A): Pointer Cancellation - Drag completes on up-event
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPan({
      x: Math.max(-300, Math.min(300, newX)),
      y: Math.max(-200, Math.min(200, newY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    setPan({
      x: Math.max(-300, Math.min(300, newX)),
      y: Math.max(-200, Math.min(200, newY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // WCAG 2.1.4 (A): Character Key Shortcuts - Keyboard navigation for map
  useEffect(() => {
    if (!map) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!mapRef.current?.contains(document.activeElement)) return;

      const step = 100;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          map.panBy([0, -step]);
          break;

        case "ArrowDown":
          e.preventDefault();
          map.panBy([0, step]);
          break;

        case "ArrowLeft":
          e.preventDefault();
          map.panBy([-step, 0]);
          break;

        case "ArrowRight":
          e.preventDefault();
          map.panBy([step, 0]);
          break;

        case "+":
        case "=":
          e.preventDefault();
          map.zoomIn();
          break;

        case "-":
        case "_":
          e.preventDefault();
          map.zoomOut();
          break;

        case "0":
          e.preventDefault();
          map.setView([20, 0], 2);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [map]);

  const selectedDest = destinations.find((d) => d.id === selectedDestination);

  return (
    <div className={`bg-card rounded-xl shadow-lg p-6 ${isMobile ? '' : 'mx-16'}`} >
      {/* WCAG 2.4.6 (AA): Headings and Labels - Clear section heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-headline font-bold text-title mb-2" tabIndex={0}>
          Explore Accessible Destinations Worldwide
        </h1>
        <p className="text-sm text-muted-foreground" >
          Click destinations on the map or use the list below. Navigate with
          keyboard arrows.
        </p>
      </div>

      {/* WCAG 2.5.4 (A): Motion Actuation - Toggle for device motion features */}
      {isMobile && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={motionEnabled}
              onChange={(e) => setMotionEnabled(e.target.checked)}
              disabled={reducedMotion}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Enable device motion for map tilting"
            />
            <div className="flex-1">
              <span className="text-sm font-semibold text-title">
                Device Motion Control{" "}
                {reducedMotion && "(Disabled - Reduced Motion Preference)"}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Tilt your device to pan the map
              </p>
            </div>
          </label>
        </div>
      )}

      {/* WCAG 2.5.1 (A): Pointer Gestures - Button controls as alternative to gestures */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={handleZoomIn}
          className="cursor-pointer px-4 py-2 bg-ternary/90 text-primary rounded-lg hover:bg-ternary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring flex items-center space-x-2"
          aria-label="Zoom in (Keyboard: +)"
        >
          <Icon name="PlusIcon" size={16} aria-hidden="true" />
          <span>Zoom In</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="cursor-pointer px-4 py-2 bg-ternary/90 text-primary rounded-lg hover:bg-ternary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring flex items-center space-x-2"
          aria-label="Zoom out (Keyboard: -)"
        >
          <Icon name="MinusIcon" size={16} aria-hidden="true" />
          <span>Zoom Out</span>
        </button>
        <button
          onClick={handleResetView}
          className="cursor-pointer px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring flex items-center space-x-2"
          aria-label="Reset view (Keyboard: 0)"
        >
          <Icon name="refresh-cw" size={16} aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {/* Interactive World Map */}
      <div
        ref={mapRef}
        className="relative w-full h-125 z-10 rounded-lg overflow-hidden border-2 border-border cursor-grab active:cursor-grabbing bg-blue-50"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="application"
        aria-label="Interactive world map of accessible destinations. Use arrow keys to pan, +/- to zoom"
        tabIndex={0}
      >
        <RealWorldMap
          destinations={destinations}
          selected={selectedDest}
          onMapReady={setMap}
        />

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-semibold text-title shadow-md">
          Zoom: {map?.getZoom() ?? 2}
        </div>

        {/* Compass */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            <path d="M 20 8 L 23 20 L 20 22 L 17 20 Z" fill="#EF4444" />
            <text
              x="20"
              y="7"
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#1F2937"
            >
              N
            </text>
          </svg>
        </div>
      </div>

      {/* WCAG 2.4.5 (AA): Multiple Ways - List view as alternative to map */}
      <div className="mt-6">
        <h2 className="text-lg font-headline font-bold text-title mb-4">
          Destination List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestination(dest.id)}
              className={`text-left cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ternary ${
                selectedDestination === dest.id
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-primary hover:bg-muted"
              }`}
              aria-label={`View ${dest.name}, ${dest.country}`}
              aria-pressed={selectedDestination === dest.id}
            >
              <div className="flex items-start space-x-3">
                <Icon
                  name={dest.accessible ? "CheckCircleIcon" : "MapPinIcon"}
                  size={24}
                  className="text-ternary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-title">{dest.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {dest.country}
                  </div>
                </div>
                {dest.accessible && (
                  <span className="text-sm px-2 py-1 bg-ternary/10 text-ternary rounded-full whitespace-nowrap">
                    Accessible
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected destination details */}
      {selectedDest && (
        <div
          className="mt-6 p-6 bg-accent/10 border-2 border-accent rounded-lg"
          role="region"
          aria-live="polite"
        >
          <h3 className="text-xl font-headline font-bold text-title mb-2">
            {selectedDest.name}, {selectedDest.country}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
            <Icon
              name="CheckCircleIcon"
              size={18}
              className="text-ternary"
              aria-hidden="true"
            />
            <span>{selectedDest.description}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Icon name="MapPinIcon" size={14} aria-hidden="true" />
            <span>
              Coordinates: {selectedDest.lat.toFixed(4)}°N,{" "}
              {Math.abs(selectedDest.lng).toFixed(4)}°
              {selectedDest.lng > 0 ? "E" : "W"}
            </span>
          </div>
          <Link
            href={`/experiences`}
            className="px-6 py-3 bg-ternary/90 text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`View experiences in ${selectedDest.name}`}
          >
            View Experiences
          </Link>
        </div>
      )}

      {/* Keyboard shortcuts guide */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="text-md font-semibold text-title mb-3">
          Keyboard Navigation
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm font-semibold">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-background border border-border rounded">
              ←→↑↓
            </kbd>
            <span className="text-black">Pan</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-background border border-border rounded">
              +/-
            </kbd>
            <span className="text-black">Zoom</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-background border border-border rounded">
              0
            </kbd>
            <span className="text-black">Reset</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-background border border-border rounded">
              Tab
            </kbd>
            <span className="text-black">Navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
