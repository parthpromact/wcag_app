import { Metadata } from "next";
import InteractiveMap from "@/components/destination/InteractiveMap";

export const metadata: Metadata = {
  title: "Accessible Destinations - TRVL",
  description:
    "Explore accessible travel destinations worldwide on our interactive map, featuring detailed accessibility information.",
};

export default function AccessibleDestinationPage() {
  return (
    <>
      {/* 
          WCAG 2.4.5 (AA): Multiple Ways - Interactive Map 
          WCAG 2.5.1 (A): Pointer Gestures - Single-pointer alternatives
          WCAG 2.5.4 (A): Motion Actuation - Optional device motion
        */}
      <section
        className="mb-12 border-t border-muted pt-16"
        role="region"
        aria-labelledby="map-heading"
      >
        <InteractiveMap />
      </section>
    </>
  );
}
