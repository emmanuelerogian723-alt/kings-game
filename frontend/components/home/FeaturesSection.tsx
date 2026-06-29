"use client";
import { Shield, Zap, Globe, Gift, Users, Lock } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Multiplayer",
    description: "Sub-100ms latency powered by Socket.IO and Redis. Play with anyone, anywhere in Nigeria and beyond.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "End-to-end encryption, 2FA, anti-cheat engine, and fraud detection protect your account and wallet 24/7.",
    color: "#10b981",
  },
  {
    icon: Globe,
    title: "Global Tournaments",
    description: "Automated brackets, live standings, countdown timers, and instant prize distribution.",
    color: "#00d4ff",
  },
  {
    icon: Gift,
    title: "Real Rewards Daily",
    description: "Daily spins, login streaks, XP levels, achievement badges, and real cash prizes.",
    color: "#9b59b6",
  },
  {
    icon: Users,
    title: "Social Gaming",
    description: "Friends, guilds, messaging, game invites, achievements sharing, and community leaderboards.",
    color: "#ec4899",
  },
  {
    icon: Lock,
    title: "Secure Wallet",
    description: "Deposit, withdraw, and transfer with multiple payment providers. Transaction history always available.",
    color: "#f97316",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="badge-gold inline-block mb-4">Why Kings Game</div>
          <h2 className="font-['Cinzel'] text-3xl md:text-5xl font-800 text-white mb-4">
            Built for{" "}
            <span style={{
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Champions
            </span>
          </h2>
          <p className="text-[rgba(255,255,255,0.45)] max-w-xl mx-auto">
            Every feature is engineered for performance, security, and an experience that feels like a billion-dollar platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="game-card p-6 group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${feat.color}20, ${feat.color}08)`,
                  border: `1px solid ${feat.color}30`,
                  boxShadow: `0 0 20px ${feat.color}15`,
                }}
              >
                <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
              </div>
              <h3 className="font-700 text-white text-base mb-2">{feat.title}</h3>
              <p className="text-[rgba(255,255,255,0.45)] text-sm leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
