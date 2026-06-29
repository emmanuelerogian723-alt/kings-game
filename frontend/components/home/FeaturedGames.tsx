"use client";
import Link from "next/link";
import { Users, Clock, Star, Lock, ArrowRight } from "lucide-react";

const GAMES = [
  {
    id: "naija-whot",
    name: "Naija Whot",
    emoji: "🃏",
    description: "Africa's most beloved card game. Play real-time multiplayer, climb the ranks, and win big.",
    players: "2,847",
    rating: 4.9,
    status: "LIVE",
    href: "/games/naija-whot",
    gradient: "from-[#f59e0b] to-[#d97706]",
    glow: "rgba(245,158,11,0.3)",
    tag: "FEATURED",
  },
  {
    id: "chess",
    name: "Chess Royal",
    emoji: "♟️",
    description: "Classic chess with a royal twist. Premium boards, ELO ranking, and global tournaments.",
    players: "Coming Soon",
    rating: null,
    status: "SOON",
    href: "/games/chess",
    gradient: "from-[#6366f1] to-[#4f46e5]",
    glow: "rgba(99,102,241,0.3)",
    tag: "COMING SOON",
  },
  {
    id: "ludo",
    name: "Royal Ludo",
    emoji: "🎲",
    description: "The classic Ludo reimagined. Play with friends, enter tournaments, win prizes.",
    players: "Coming Soon",
    rating: null,
    status: "SOON",
    href: "/games/ludo",
    gradient: "from-[#10b981] to-[#059669]",
    glow: "rgba(16,185,129,0.3)",
    tag: "COMING SOON",
  },
  {
    id: "car-racing",
    name: "Street Kings",
    emoji: "🏎️",
    description: "High-octane multiplayer car racing. Customize your ride, race live, claim the crown.",
    players: "Coming Soon",
    rating: null,
    status: "SOON",
    href: "/games/car-racing",
    gradient: "from-[#ef4444] to-[#dc2626]",
    glow: "rgba(239,68,68,0.3)",
    tag: "COMING SOON",
  },
];

export function FeaturedGames() {
  return (
    <section className="relative z-10 py-20 px-4">
      {/* Section heading */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="badge-gold inline-block mb-4">Game Library</div>
          <h2 className="font-['Cinzel'] text-3xl md:text-5xl font-800 text-white mb-4">
            Choose Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Battle
            </span>
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] max-w-xl mx-auto">
            Premium games crafted for African champions. Real multiplayer, real tournaments, real prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game) => (
            <Link
              key={game.id}
              href={game.status === "LIVE" ? game.href : "#"}
              className={`game-card p-6 block ${game.status !== "LIVE" ? "cursor-not-allowed" : ""}`}
            >
              <div className="flex items-start gap-4">
                {/* Game icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${game.glow.replace("0.3", "0.15")}, ${game.glow.replace("0.3", "0.05")})`,
                    border: `1px solid ${game.glow}`,
                    boxShadow: `0 0 20px ${game.glow}`,
                  }}
                >
                  {game.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-['Cinzel'] font-700 text-lg text-white">{game.name}</h3>
                    <span
                      className={`text-[10px] font-700 px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        game.status === "LIVE"
                          ? "bg-[rgba(16,185,129,0.2)] text-[#34d399] border border-[rgba(16,185,129,0.3)]"
                          : "bg-[rgba(245,158,11,0.1)] text-[rgba(245,158,11,0.7)] border border-[rgba(245,158,11,0.2)]"
                      }`}
                    >
                      {game.tag}
                    </span>
                  </div>

                  <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed mb-3">
                    {game.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.35)]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {game.players}
                    </span>
                    {game.rating && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#f59e0b]" />
                        {game.rating}
                      </span>
                    )}
                    {game.status === "LIVE" && (
                      <span className="flex items-center gap-1 text-[#34d399]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                        Playing Now
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mt-1">
                  {game.status === "LIVE" ? (
                    <ArrowRight className="w-5 h-5 text-[rgba(255,255,255,0.2)] group-hover:text-[#f59e0b] transition-colors" />
                  ) : (
                    <Lock className="w-4 h-4 text-[rgba(255,255,255,0.15)]" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/games"
            className="btn-glass px-8 py-3.5 rounded-2xl font-600 inline-flex items-center gap-2"
          >
            View All Games
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
