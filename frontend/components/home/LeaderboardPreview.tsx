"use client";
import Link from "next/link";
import { Crown, ArrowRight, TrendingUp } from "lucide-react";

const PLAYERS = [
  { rank: 1, name: "KingSlayer_NG", avatar: "👑", wins: 1847, xp: 98420, country: "🇳🇬", badge: "Diamond", trend: "+12" },
  { rank: 2, name: "WhizKid_Abuja", avatar: "🦅", wins: 1623, xp: 87300, country: "🇳🇬", badge: "Platinum", trend: "+5" },
  { rank: 3, name: "CardMaster_PH", avatar: "⚡", wins: 1401, xp: 76100, country: "🇳🇬", badge: "Gold", trend: "-1" },
  { rank: 4, name: "NaijaLegend", avatar: "🔥", wins: 1289, xp: 65800, country: "🇳🇬", badge: "Gold", trend: "+3" },
  { rank: 5, name: "AcePlayer_LG", avatar: "💎", wins: 1156, xp: 59400, country: "🇳🇬", badge: "Silver", trend: "+8" },
];

const RANK_MEDALS: Record<number, { color: string; bg: string; shadow: string }> = {
  1: { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", shadow: "rgba(245,158,11,0.4)" },
  2: { color: "#c0c0c0", bg: "rgba(192,192,192,0.12)", shadow: "rgba(192,192,192,0.3)" },
  3: { color: "#cd7f32", bg: "rgba(205,127,50,0.12)", shadow: "rgba(205,127,50,0.3)" },
};

export function LeaderboardPreview() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="badge-gold inline-block mb-4">Hall of Fame</div>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl font-800 text-white">
              Top{" "}
              <span style={{
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Champions
              </span>
            </h2>
          </div>
          <Link href="/leaderboard" className="btn-glass px-6 py-3 rounded-2xl font-600 flex items-center gap-2 text-sm self-start md:self-auto">
            Full Leaderboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {PLAYERS.map((player) => {
            const medal = RANK_MEDALS[player.rank];
            return (
              <div
                key={player.rank}
                className={`game-card px-5 py-4 flex items-center gap-4 ${
                  player.rank === 1 ? "border-[rgba(245,158,11,0.25)]" : ""
                }`}
                style={player.rank <= 3 ? { background: `linear-gradient(135deg, ${medal.bg}, transparent)` } : {}}
              >
                {/* Rank */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-['Cinzel'] font-800 text-sm flex-shrink-0"
                  style={medal ? {
                    color: medal.color,
                    background: medal.bg,
                    border: `1px solid ${medal.color}40`,
                    boxShadow: `0 0 15px ${medal.shadow}`,
                  } : {
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {player.rank === 1 ? <Crown className="w-4 h-4" /> : `#${player.rank}`}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  player.rank === 1 ? "avatar-ring" : "bg-[rgba(255,255,255,0.06)]"
                }`}>
                  {player.avatar}
                </div>

                {/* Name + badge */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-600 text-white text-sm truncate">{player.name}</span>
                    <span className="text-base">{player.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-gold text-[10px]">{player.badge}</span>
                    <span className="text-[rgba(255,255,255,0.3)] text-xs">{player.xp.toLocaleString()} XP</span>
                  </div>
                </div>

                {/* Wins */}
                <div className="text-right hidden sm:block">
                  <div className="font-['Cinzel'] font-700 text-white text-base">{player.wins.toLocaleString()}</div>
                  <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-wider">wins</div>
                </div>

                {/* Trend */}
                <div
                  className="flex items-center gap-0.5 text-xs font-600 flex-shrink-0"
                  style={{ color: player.trend.startsWith("+") ? "#34d399" : "#ef4444" }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {player.trend}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
