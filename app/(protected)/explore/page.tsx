import type { Metadata } from "next";
import ExploreInteractive from "@/components/explore/ExploreInteractive";

export const metadata: Metadata = {
  title: "Explore Destinations - TRVL",
  description:
    "Discover accessible travel destinations worldwide with comprehensive accessibility information, verified accommodations, and inclusive experiences for all travelers.",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex pt-16">
        <ExploreInteractive />
      </div>
    </div>
  );
}
