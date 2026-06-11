import { Hero } from "@/components/Hero";
import { LivePanel } from "@/components/LivePanel";
import { Stats } from "@/components/Stats";
import { Gallery } from "@/components/Gallery";
import { Tracks } from "@/components/Tracks";
import { Speakers } from "@/components/Speakers";
import { QuickAccess } from "@/components/QuickAccess";
import { Sponsors } from "@/components/Sponsors";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LivePanel />
      <Stats />
      <Gallery />
      <Tracks />
      <Speakers />
      <QuickAccess />
      <Sponsors />
      <CTA />
    </>
  );
}
