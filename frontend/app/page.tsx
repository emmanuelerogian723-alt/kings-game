import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { StatsSection } from "@/components/home/StatsSection";
import { TournamentPreview } from "@/components/home/TournamentPreview";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/layout/Footer";
import { ParticleField } from "@/components/effects/ParticleField";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#030507] overflow-hidden">
      {/* Global particle background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Hero — Cinematic fullscreen */}
      <HeroSection />

      {/* Live Stats */}
      <StatsSection />

      {/* Featured Games */}
      <FeaturedGames />

      {/* Active Tournaments */}
      <TournamentPreview />

      {/* Top Players */}
      <LeaderboardPreview />

      {/* Platform Features */}
      <FeaturesSection />

      {/* Final CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
