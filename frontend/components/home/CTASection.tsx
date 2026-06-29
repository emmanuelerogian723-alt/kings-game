"use client";
import Link from "next/link";
import { Zap, Crown } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      {/* Glow bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full" style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)",
        }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 mb-6">
          <Crown className="w-8 h-8 text-[#f59e0b] animate-[crownGlow_3s_ease-in-out_infinite]" />
        </div>

        <h2 className="font-['Cinzel'] text-4xl md:text-6xl font-900 text-white mb-6 leading-tight">
          Ready to{" "}
          <span style={{
            background: "linear-gradient(135deg, #fde68a, #f59e0b, #d97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(245,158,11,0.4))",
          }}>
            Reign?
          </span>
        </h2>

        <p className="text-[rgba(255,255,255,0.5)] text-lg mb-10 max-w-xl mx-auto">
          Join 48,000+ players already competing. Create your free account in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="btn-gold px-10 py-4.5 rounded-2xl text-lg font-800 flex items-center gap-2.5 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
            style={{ padding: "18px 40px" }}
          >
            <Zap className="w-5 h-5" />
            Start Playing — It's Free
          </Link>
          <Link
            href="/tournaments"
            className="btn-glass px-8 py-4 rounded-2xl text-base font-600 flex items-center gap-2"
          >
            Browse Tournaments
          </Link>
        </div>

        <p className="mt-6 text-[rgba(255,255,255,0.2)] text-xs">
          No credit card required • Instant access • Play in 30 seconds
        </p>
      </div>
    </section>
  );
}
