"use client";
import Link from "next/link";
import { Trophy, Clock, Users, ArrowRight, Zap } from "lucide-react";

const TOURNAMENTS = [
  {
    id: "wt-001",
    name: "Kings Grand Championship",
    game: "Naija Whot",
    emoji: "🃏",
    prize: "₦500,000",
    entry: "₦2,000",
    players: "64/128",
    status: "REGISTRATION OPEN",
    startsIn: "2d 14h 30m",
    color: "#f59e0b",
  },
  {
    id: "wt-002",
    name: "Weekend Warriors Cup",
    game: "Naija Whot",
    emoji: "⚔️",
    prize: "₦150,000",
    entry: "₦500",
    players: "87/100",
    status: "FILLING FAST",
    startsIn: "18h 45m",
    color: "#10b981",
  },
  {
    id: "wt-003",
    name: "Rookie Rumble",
    game: "Naija Whot",
    emoji: "🌟",
    prize: "₦50,000",
    entry: "Free",
    players: "210/256",
    status: "ALMOST FULL",
    startsIn: "5h 20m",
    color: "#00d4ff",
  },
];

export function TournamentPreview() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="badge-gold inline-block mb-4">Live Tournaments</div>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-800 text-white">
              Compete for{" "}
              <span style={{
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Real Prizes
              </span>
            </h2>
          </div>
          <Link
            href="/tournaments"
            className="btn-glass px-6 py-3 rounded-2xl font-600 flex items-center gap-2 text-sm self-start md:self-auto"
          >
            All Tournaments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {TOURNAMENTS.map((t) => (
            <div key={t.id} className="game-card p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Icon + Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}20, ${t.color}08)`,
                      border: `1px solid ${t.color}30`,
                      boxShadow: `0 0 20px ${t.color}20`,
                    }}
                  >
                    {t.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-600 text-white text-base truncate">{t.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-700 uppercase flex-shrink-0"
                        style={{
                          background: `${t.color}20`,
                          color: t.color,
                          border: `1px solid ${t.color}30`,
                        }}
                      >
                        {t.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.35)]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {t.players}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Starts in {t.startsIn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prize + Entry */}
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-center">
                    <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-wider mb-0.5">Prize Pool</div>
                    <div className="font-['Cinzel'] font-700 text-[#f59e0b] text-lg" style={{ textShadow: "0 0 10px rgba(245,158,11,0.4)" }}>
                      {t.prize}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-wider mb-0.5">Entry</div>
                    <div className="font-600 text-white text-sm">
                      {t.entry === "Free" ? (
                        <span className="text-[#34d399]">FREE</span>
                      ) : t.entry}
                    </div>
                  </div>
                  <Link
                    href={`/tournaments/${t.id}`}
                    className="btn-gold px-5 py-2.5 rounded-xl text-sm font-700 flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Join
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
