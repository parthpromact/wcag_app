import type { Metadata } from "next";
// import Header from '@/components/common/Header';
import ExperiencesInteractive from "@/components/experience/ExperienceInteractive";

export const metadata: Metadata = {
  title: "Accessible Travel Experiences - TRVL",
  description:
    "Discover curated tours and adventures designed for all abilities with detailed accessibility accommodations, inclusive planning tools, and transformative travel experiences.",
};

export default function ExperiencesPage() {
  return (
    <>
      {/* <Header /> */}
      <ExperiencesInteractive />
    </>
  );
}
