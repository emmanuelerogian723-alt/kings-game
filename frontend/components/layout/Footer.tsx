import Link from "next/link";
import { Crown } from "lucide-react";

const LINKS = {
  Play: [
    { label: "Naija Whot", href: "/games/naija-whot" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Marketplace", href: "/marketplace" },
  ],
  Account: [
    { label: "Register", href: "/register" },
    { label: "Login", href: "/login" },
    { label: "Profile", href: "/profile" },
    { label: "Wallet", href: "/wallet" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Support", href: "/support" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Fair Play", href: "/fair-play" },
    { label: "Responsible Gaming", href: "/responsible-gaming" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-[#f59e0b]" />
              <span className="font-['Cinzel'] font-700 text-white">KINGS GAME</span>
            </Link>
            <p className="text-[rgba(255,255,255,0.35)] text-sm leading-relaxed mb-4">
              Africa's most premium online gaming platform. Built for champions.
            </p>
            <div className="flex gap-3">
              {["𝕏", "📘", "📸", "🎮"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl glass hover:bg-[rgba(245,158,11,0.08)] hover:border-[rgba(245,158,11,0.2)] transition-all text-sm flex items-center justify-center"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[rgba(255,255,255,0.5)] text-xs font-600 uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[rgba(255,255,255,0.4)] text-sm hover:text-[rgba(245,158,11,0.8)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(255,255,255,0.2)] text-xs">
            © 2025 Kings Game. All rights reserved. Designed and built in Nigeria 🇳🇬
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[rgba(255,255,255,0.25)] text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
