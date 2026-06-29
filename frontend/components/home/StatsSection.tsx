"use client";
import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Gamepad2, DollarSign } from "lucide-react";

const STATS = [
  { icon: Users, label: "Active Players", value: 48291, suffix: "+", prefix: "", color: "#f59e0b" },
  { icon: Trophy, label: "Tournaments Held", value: 3847, suffix: "+", prefix: "", color: "#10b981" },
  { icon: Gamepad2, label: "Games Played", value: 1.2, suffix: "M+", prefix: "", color: "#00d4ff" },
  { icon: DollarSign, label: "Total Prizes", value: 50, suffix: "M+", prefix: "₦", color: "#9b59b6" },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 2000;
          const steps = 60;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(parseFloat((value * eased).toFixed(1)));
            if (step >= steps) {
              setDisplay(value);
              clearInterval(interval);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <span ref={ref}>
      {prefix}{display >= 1 && Number.isInteger(value) ? Math.round(display) : display}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="game-card p-6 text-center group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                  border: `1px solid ${stat.color}30`,
                  boxShadow: `0 0 20px ${stat.color}20`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div
                className="text-3xl md:text-4xl font-black font-['Cinzel'] mb-1"
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                {stat.suffix}
              </div>
              <div className="text-[rgba(255,255,255,0.4)] text-xs font-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
