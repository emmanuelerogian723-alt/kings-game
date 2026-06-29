"use client";
import { useState } from "react";
import { Crown, TrendingUp, TrendingDown, Minus, Search, Filter } from "lucide-react";
import Link from "next/link";

type LeaderboardFilter = "global" | "nigeria" | "friends" | "weekly" | "monthly" | "all-time";

const PLAYERS = [
  { rank: 1, prev: 1, name: "KingSlayer_NG", avatar: "👑", wins: 1847, xp: 98420, country: "🇳🇬", badge: "Diamond", wr: "87.4%", streak: 12 },
  { rank: 2, prev: 3, name: "WhizKid_Abuja", avatar: "🦅", wins: 1623, xp: 87300, country: "🇳🇬", badge: "Platinum", wr: "84.1%", streak: 7 },
  { rank: 3, prev: 2, name: "CardMaster_PH", avatar: "⚡", wins: 1401, xp: 76100, country: "🇳🇬", badge: "Gold", wr: "81.2%", streak: 3 },
  { rank: 4, prev: 5, name: "NaijaLegend", avatar: "🔥", wins: 1289, xp: 65800, country: "🇳🇬", badge: "Gold", wr: "78.9%", streak: 9 },
  { rank: 5, prev: 4, name: "AcePlayer_LG", avatar: "💎", wins: 1156, xp: 59400, country: "🇳🇬", badge: "Silver", wr: "76.3%", streak: 2 },
  { rank: 6, prev: 6, name: "QueenBee_AK", avatar: "🌸", wins: 1044, xp: 52100, country: "🇳🇬", badge: "Silver", wr: "74.8%", streak: 5 },
  { rank: 7, prev: 9, name: "TopDeck_IB", avatar: "🎯", wins: 987, xp: 48700, country: "🇳🇬", badge: "Silver", wr: "72.1%", streak: 11 },
  { rank: 8, prev: 7, name: "GameKing_EN", avatar: "🎮", wins: 934, xp: 44300, country: "🇳🇬", badge: "Silver", wr: "71.5%", streak: 1 },
  { rank: 9, prev: 10, name: "CardShark_WA", avatar: "🦈", wins: 891, xp: 41200, country: "🇳🇬", badge: "Bronze", wr: "69.8%", streak: 4 },
  { rank: 10, prev: 8, name: "LuckyDraw_OS", avatar: "🍀", wins: 847, xp: 38900, country: "🇳🇬", badge: "Bronze", wr: "68.2%", streak: 0 },
];

const BADGE_CONFIG: Record<string, { color: string; bg: string }> = {
  Diamond: { color: "#00d4ff", bg: "rgba(0,212,255,0.15)" },
  Platinum: { color: "#e2e8f0", bg: "rgba(226,232,240,0.15)" },
  Gold: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  Silver: { color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
  Bronze: { color: "#cd7f32", bg: "rgba(205,127,50,0.15)" },
};

const FILTERS: { key: LeaderboardFilter; label: string }[] = [
  { key: "global", label: "Global" },
  { key: "nigeria", label: "Nigeria 🇳🇬" },
  { key: "friends", label: "Friends" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "all-time", label: "All Time" },
];

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<LeaderboardFilter>("global");
  const [search, setSearch] = useState("");

  const filtered = PLAYERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030507] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-[rgba(255,255,255,0.4)] text-sm hover:text-white transition-colors mb-4 inline-block">
            ← Home
          </Link>
          <h1 className="font-['Cinzel'] text-4xl font-800 text-white mb-2">
            Hall of{" "}
            <span style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Fame
            </span>
          </h1>
          <p className="text-[rgba(255,255,255,0.4)] text-sm">The best players in Africa's gaming kingdom</p>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-3 mb-10">
          {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((p, i) => {
            const heights = ["h-24", "h-32", "h-20"];
            const isFirst = i === 1;
            return (
              <div key={p.rank} className="flex flex-col items-center gap-2" style={{ width: "100px" }}>
                {isFirst && <Crown className="w-6 h-6 text-[#f59e0b] animate-[crownGlow_3s_ease-in-out_infinite]" />}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${isFirst ? "avatar-ring" : "avatar-ring-neon"}`}>
                  {p.avatar}
                </div>
                <div className="text-white text-xs font-600 text-center truncate w-full text-center">{p.name}</div>
                <div className={`w-full rounded-t-xl flex items-start justify-center pt-2 font-['Cinzel'] font-900 text-lg ${heights[i]}`} style={{
                  background: i === 1
                    ? "linear-gradient(180deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))"
                    : i === 0
                    ? "linear-gradient(180deg, rgba(192,192,192,0.2), rgba(192,192,192,0.05))"
                    : "linear-gradient(180deg, rgba(205,127,50,0.2), rgba(205,127,50,0.05))",
                  border: "1px solid",
                  borderColor: i === 1 ? "rgba(245,158,11,0.4)" : i === 0 ? "rgba(192,192,192,0.25)" : "rgba(205,127,50,0.25)",
                  color: i === 1 ? "#f59e0b" : i === 0 ? "#c0c0c0" : "#cd7f32",
                }}>
                  #{i === 1 ? 1 : i === 0 ? 2 : 3}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-1.5 overflow-x-auto pb-1 flex-1">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm font-600 whitespace-nowrap transition-all ${
                  filter === f.key
                    ? "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.25)]"
                    : "glass text-[rgba(255,255,255,0.45)] hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
            <input
              placeholder="Search player..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-royal pl-9 text-sm py-2.5 w-full sm:w-48"
            />
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_80px_80px_80px_70px] px-4 py-3 border-b border-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.3)] text-xs uppercase tracking-wider font-600">
            <span>Rank</span>
            <span>Player</span>
            <span className="hidden sm:block text-center">Wins</span>
            <span className="hidden md:block text-center">Win Rate</span>
            <span className="hidden md:block text-center">Streak</span>
            <span className="text-center">Badge</span>
          </div>

          {filtered.map((player) => {
            const badge = BADGE_CONFIG[player.badge];
            const rankChange = player.prev - player.rank;

            return (
              <div
                key={player.rank}
                className={`grid grid-cols-[48px_1fr_80px_80px_80px_70px] items-center px-4 py-3.5 border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors ${
                  player.rank <= 3 ? "leaderboard-row-" + player.rank : ""
                }`}
              >
                {/* Rank */}
                <div className="flex items-center gap-1">
                  <span className="font-['Cinzel'] font-700 text-sm" style={{
                    color: player.rank === 1 ? "#f59e0b" : player.rank === 2 ? "#c0c0c0" : player.rank === 3 ? "#cd7f32" : "rgba(255,255,255,0.4)"
                  }}>
                    {player.rank === 1 ? "👑" : `#${player.rank}`}
                  </span>
                </div>

                {/* Player */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 ${
                    player.rank <= 3 ? "avatar-ring" : "bg-[rgba(255,255,255,0.06)]"
                  }`}>
                    {player.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-600 truncate flex items-center gap-1.5">
                      {player.name}
                      <span className="text-base">{player.country}</span>
                    </div>
                    <div className="text-[rgba(255,255,255,0.3)] text-xs">{player.xp.toLocaleString()} XP</div>
                  </div>
                  {/* Trend indicator */}
                  <div className="flex-shrink-0">
                    {rankChange > 0 ? <TrendingUp className="w-3 h-3 text-[#34d399]" /> :
                     rankChange < 0 ? <TrendingDown className="w-3 h-3 text-[#ef4444]" /> :
                     <Minus className="w-3 h-3 text-[rgba(255,255,255,0.2)]" />}
                  </div>
                </div>

                {/* Wins */}
                <div className="hidden sm:block text-center font-['Cinzel'] font-700 text-white text-sm">
                  {player.wins.toLocaleString()}
                </div>

                {/* Win rate */}
                <div className="hidden md:block text-center text-sm font-600" style={{
                  color: parseFloat(player.wr) >= 80 ? "#34d399" : parseFloat(player.wr) >= 70 ? "#f59e0b" : "rgba(255,255,255,0.5)"
                }}>
                  {player.wr}
                </div>

                {/* Streak */}
                <div className="hidden md:block text-center">
                  {player.streak > 0 ? (
                    <span className="text-sm font-600 text-[#f59e0b]">🔥 {player.streak}</span>
                  ) : (
                    <span className="text-sm text-[rgba(255,255,255,0.2)]">—</span>
                  )}
                </div>

                {/* Badge */}
                <div className="flex justify-center">
                  <span className="text-[10px] font-700 px-2 py-0.5 rounded-full" style={{
                    background: badge.bg,
                    color: badge.color,
                    border: `1px solid ${badge.color}40`,
                  }}>
                    {player.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[rgba(255,255,255,0.2)] text-xs mt-6">
          Updated every 5 minutes · Based on {filter === "weekly" ? "this week's" : filter === "monthly" ? "this month's" : "all"} results
        </p>
      </div>
    </div>
  );
}
