"use client";
import { useState } from "react";
import { Trophy, Users, Clock, Zap, Filter, Search, Plus } from "lucide-react";
import Link from "next/link";

type TournamentStatus = "all" | "open" | "live" | "completed";

const TOURNAMENTS = [
  {
    id: "t001",
    name: "Kings Grand Championship",
    game: "Naija Whot",
    emoji: "🃏",
    prize: "₦500,000",
    entry: "₦2,000",
    players: 64,
    maxPlayers: 128,
    status: "open",
    startsIn: "2d 14h",
    type: "Single Elimination",
    sponsored: true,
  },
  {
    id: "t002",
    name: "Weekend Warriors Cup",
    game: "Naija Whot",
    emoji: "⚔️",
    prize: "₦150,000",
    entry: "₦500",
    players: 87,
    maxPlayers: 100,
    status: "open",
    startsIn: "18h 45m",
    type: "Round Robin",
    sponsored: false,
  },
  {
    id: "t003",
    name: "Rookie Rumble",
    game: "Naija Whot",
    emoji: "🌟",
    prize: "₦50,000",
    entry: "Free",
    players: 210,
    maxPlayers: 256,
    status: "open",
    startsIn: "5h 20m",
    type: "Swiss",
    sponsored: false,
  },
  {
    id: "t004",
    name: "Friday Night Frenzy",
    game: "Naija Whot",
    emoji: "🔥",
    prize: "₦80,000",
    entry: "₦1,000",
    players: 32,
    maxPlayers: 32,
    status: "live",
    startsIn: "LIVE NOW",
    type: "Double Elimination",
    sponsored: false,
  },
  {
    id: "t005",
    name: "Monthly Masters",
    game: "Naija Whot",
    emoji: "👑",
    prize: "₦1,000,000",
    entry: "₦5,000",
    players: 0,
    maxPlayers: 64,
    status: "open",
    startsIn: "6d 12h",
    type: "Single Elimination",
    sponsored: true,
  },
];

const STATUS_CONFIG = {
  open: { label: "Registration Open", color: "#10b981", bg: "rgba(16,185,129,0.15)" },
  live: { label: "LIVE", color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  completed: { label: "Ended", color: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.06)" },
};

export default function TournamentsPage() {
  const [filter, setFilter] = useState<TournamentStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = TOURNAMENTS.filter(t => {
    const matchesFilter = filter === "all" || t.status === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030507] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-[rgba(255,255,255,0.4)] text-sm hover:text-white transition-colors mb-4 inline-block">← Home</Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-['Cinzel'] text-4xl font-800 text-white mb-2">
                Live{" "}
                <span style={{
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Tournaments
                </span>
              </h1>
              <p className="text-[rgba(255,255,255,0.4)] text-sm">Compete for real prizes. Beat the best.</p>
            </div>
            <button className="btn-gold px-5 py-3 rounded-2xl font-700 flex items-center gap-2 self-start sm:self-auto">
              <Plus className="w-4 h-4" /> Create Tournament
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Active Tournaments", value: "23", color: "#f59e0b" },
            { label: "Total Prize Pool", value: "₦12.5M", color: "#10b981" },
            { label: "Players Competing", value: "1,847", color: "#00d4ff" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center border border-[rgba(255,255,255,0.06)]">
              <div className="font-['Cinzel'] text-xl font-700 mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[rgba(255,255,255,0.3)] text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-1.5">
            {(["all","open","live","completed"] as TournamentStatus[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-600 capitalize transition-all ${
                  filter === f
                    ? "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.25)]"
                    : "glass text-[rgba(255,255,255,0.45)] hover:text-white"
                }`}
              >
                {f === "live" ? "🔴 LIVE" : f}
              </button>
            ))}
          </div>
          <div className="relative flex-1 sm:max-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
            <input
              placeholder="Search tournaments..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-royal pl-9 text-sm py-2.5 w-full"
            />
          </div>
        </div>

        {/* Tournament cards */}
        <div className="space-y-4">
          {filtered.map((t) => {
            const status = STATUS_CONFIG[t.status as keyof typeof STATUS_CONFIG];
            const fillPct = Math.round((t.players / t.maxPlayers) * 100);

            return (
              <div key={t.id} className="game-card p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Icon + main info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 glass border border-[rgba(245,158,11,0.15)]">
                      {t.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-['Cinzel'] font-700 text-white">{t.name}</h3>
                        {t.sponsored && (
                          <span className="badge-gold text-[10px]">SPONSORED</span>
                        )}
                        <span
                          className="text-[10px] font-700 px-2 py-0.5 rounded-full"
                          style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}
                        >
                          {t.status === "live" ? "🔴 LIVE NOW" : status.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[rgba(255,255,255,0.35)] mb-3 flex-wrap">
                        <span>🃏 {t.game}</span>
                        <span>📋 {t.type}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.status === "live" ? <span className="text-[#ef4444] font-600">LIVE NOW</span> : `Starts in ${t.startsIn}`}
                        </span>
                      </div>

                      {/* Fill progress */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${fillPct}%`,
                              background: fillPct >= 90 ? "#ef4444" : fillPct >= 70 ? "#f59e0b" : "#10b981",
                            }}
                          />
                        </div>
                        <span className="text-[rgba(255,255,255,0.35)] text-xs whitespace-nowrap">
                          <Users className="w-3 h-3 inline mr-1" />
                          {t.players}/{t.maxPlayers}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prize + Entry + CTA */}
                  <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-wider mb-0.5">Prize</div>
                      <div className="font-['Cinzel'] font-700 text-[#f59e0b] text-lg" style={{ textShadow: "0 0 10px rgba(245,158,11,0.3)" }}>
                        {t.prize}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-wider mb-0.5">Entry</div>
                      <div className="font-600 text-white text-sm">
                        {t.entry === "Free" ? <span className="text-[#34d399]">FREE</span> : t.entry}
                      </div>
                    </div>
                    <Link
                      href={`/tournaments/${t.id}`}
                      className={`px-5 py-2.5 rounded-xl text-sm font-700 flex items-center gap-1.5 whitespace-nowrap ${
                        t.status === "live"
                          ? "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.25)]"
                          : "btn-gold"
                      } transition-all`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {t.status === "live" ? "Watch" : "Register"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[rgba(255,255,255,0.3)]">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No tournaments found</p>
          </div>
        )}
      </div>
    </div>
  );
}
