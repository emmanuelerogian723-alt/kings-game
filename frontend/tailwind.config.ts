import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./games/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Black palette
        royal: {
          950: "#030507",
          900: "#060c14",
          800: "#0a1628",
          700: "#0f1f3d",
          600: "#152952",
        },
        // Gold palette
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          glow: "#ffcc00",
        },
        // Emerald accent
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          glow: "#00ff88",
        },
        // Neon Blue
        neon: {
          blue: "#00d4ff",
          purple: "#9b59b6",
          glow: "#4f46e5",
        },
        // UI surfaces
        surface: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.08)",
          active: "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(135deg, #030507 0%, #0a1628 50%, #030507 100%)",
        "gold-gradient": "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "card-glow": "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)",
        "hero-radial": "radial-gradient(ellipse at 50% 50%, rgba(245,158,11,0.08) 0%, rgba(3,5,7,0) 70%)",
        "neon-glow": "linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(79,70,229,0.1) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.15)",
        "gold-glow-sm": "0 0 10px rgba(245,158,11,0.3)",
        "neon-glow": "0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.1)",
        "emerald-glow": "0 0 20px rgba(16,185,129,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "card": "0 25px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        "premium": "0 0 0 1px rgba(245,158,11,0.2), 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(245,158,11,0.05)",
      },
      borderColor: {
        glass: "rgba(255,255,255,0.08)",
        gold: "rgba(245,158,11,0.3)",
        "gold-bright": "rgba(245,158,11,0.6)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "particle": "particle 4s ease-in-out infinite",
        "crown-glow": "crownGlow 3s ease-in-out infinite",
        "card-flip": "cardFlip 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "number-tick": "numberTick 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(2deg)" },
          "66%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,158,11,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245,158,11,0.7), 0 0 80px rgba(245,158,11,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        crownGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(245,158,11,0.6))", transform: "rotate(-2deg)" },
          "50%": { filter: "drop-shadow(0 0 20px rgba(245,158,11,1))", transform: "rotate(2deg)" },
        },
        cardFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(90deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        numberTick: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
