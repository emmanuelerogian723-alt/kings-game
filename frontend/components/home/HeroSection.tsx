"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Zap, Users, Crown, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 30;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.06)_0%,_rgba(3,5,7,0)_70%)]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Floating decorative crowns */}
      <div
        className="absolute top-24 left-[10%] text-8xl opacity-10 animate-[float_8s_ease-in-out_infinite] select-none pointer-events-none"
        style={{ transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)` }}
      >
        👑
      </div>
      <div
        className="absolute top-32 right-[12%] text-6xl opacity-10 animate-[float_6s_ease-in-out_infinite_2s] select-none pointer-events-none"
        style={{ transform: `translate(${-parallaxX * 0.4}px, ${parallaxY * 0.4}px)` }}
      >
        👑
      </div>

      {/* Floating playing cards */}
      {[
        { suit: "♠", top: "20%", left: "6%", delay: "0s", rotate: "-15deg" },
        { suit: "♥", top: "60%", left: "4%", delay: "1s", rotate: "10deg" },
        { suit: "♦", top: "25%", right: "6%", delay: "0.5s", rotate: "18deg" },
        { suit: "♣", top: "65%", right: "5%", delay: "1.5s", rotate: "-12deg" },
      ].map((card, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex w-16 h-24 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-3xl backdrop-blur-sm select-none pointer-events-none animate-[float_7s_ease-in-out_infinite]"
          style={{
            top: card.top,
            left: card.left,
            right: (card as any).right,
            animationDelay: card.delay,
            transform: `rotate(${card.rotate}) translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px)`,
            color: card.suit === "♥" || card.suit === "♦" ? "#ef4444" : "#fff",
            boxShadow: "0 8px 32px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {card.suit}
        </div>
      ))}

      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)",
          transform: `translate(${parallaxX * 0.8}px, ${parallaxY * 0.8}px)`,
          transition: "transform 0.15s ease-out",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)",
          transform: `translate(${-parallaxX * 0.6}px, ${-parallaxY * 0.6}px)`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 badge-gold mb-8 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          Africa's #1 Gaming Platform
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
        </div>

        {/* Main headline */}
        <h1
          className={`font-['Cinzel'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 transition-all duration-1000 delay-200 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-white">THE FUTURE OF</span>
          <span className="block text-gold-gradient mt-1" style={{
            background: "linear-gradient(135deg, #fde68a, #f59e0b, #d97706, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(245,158,11,0.4))",
          }}>
            AFRICAN GAMING
          </span>
        </h1>

        {/* Sub headline */}
        <p
          className={`text-lg sm:text-xl text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-400 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Play Naija Whot. Compete in live tournaments. Win real rewards.
          <br />
          <span className="text-[rgba(245,158,11,0.8)]">Built for champions. Designed for legends.</span>
        </p>

        {/* Live stat chips */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 mb-10 transition-all duration-1000 delay-500 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {[
            { icon: "🟢", label: "2,847 Online Now" },
            { icon: "🏆", label: "₦50M+ Prizes Won" },
            { icon: "⚡", label: "Real-time Multiplayer" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(255,255,255,0.08)] text-sm text-[rgba(255,255,255,0.6)]"
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-600 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/register"
            className="btn-gold px-8 py-4 rounded-2xl text-lg font-700 flex items-center gap-2.5 min-w-[180px] justify-center"
          >
            <Zap className="w-5 h-5" />
            Play Now — Free
          </Link>

          <Link
            href="/register"
            className="btn-glass px-8 py-4 rounded-2xl text-lg font-600 flex items-center gap-2.5 min-w-[180px] justify-center"
          >
            <Users className="w-5 h-5" />
            Create Account
          </Link>

          <button
            onClick={() => setTrailerOpen(true)}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-lg font-600 text-[rgba(255,255,255,0.7)] hover:text-white transition-all hover:bg-[rgba(255,255,255,0.04)] border border-transparent hover:border-[rgba(255,255,255,0.08)] min-w-[180px] justify-center"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.3)] flex items-center justify-center">
              <Play className="w-3 h-3 ml-0.5" />
            </div>
            Watch Trailer
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-xs text-[rgba(255,255,255,0.4)] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[rgba(255,255,255,0.4)]" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030507] to-transparent pointer-events-none" />

      {/* Trailer Modal */}
      {trailerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          onClick={() => setTrailerOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 glass rounded-3xl border border-[rgba(245,158,11,0.2)] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#f59e0b]" />
                <span className="font-['Cinzel'] font-600 text-[#fbbf24]">Kings Game — Official Trailer</span>
              </div>
              <button
                onClick={() => setTrailerOpen(false)}
                className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.6)] hover:text-white transition-all"
              >
                ✕
              </button>
            </div>

            {/* Video placeholder */}
            <div className="relative aspect-video bg-[#060c14] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-[rgba(245,158,11,0.5)] flex items-center justify-center mx-auto mb-4 cursor-pointer hover:border-[#f59e0b] hover:bg-[rgba(245,158,11,0.08)] transition-all">
                  <Play className="w-8 h-8 text-[#f59e0b] ml-1" />
                </div>
                <p className="text-[rgba(255,255,255,0.4)] text-sm">Trailer Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
