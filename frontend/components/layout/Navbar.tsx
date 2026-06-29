"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Crown, Menu, X, ChevronDown, Gamepad2, Trophy, Users, Wallet, Bell } from "lucide-react";

const NAV_LINKS = [
  { label: "Games", href: "/games", icon: Gamepad2, children: [
    { label: "Naija Whot", href: "/games/naija-whot", badge: "LIVE" },
    { label: "Chess", href: "/games/chess", badge: "SOON" },
    { label: "Ludo", href: "/games/ludo", badge: "SOON" },
  ]},
  { label: "Tournaments", href: "/tournaments", icon: Trophy },
  { label: "Leaderboard", href: "/leaderboard", icon: Users },
  { label: "Rewards", href: "/rewards" },
  { label: "Marketplace", href: "/marketplace" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(3,5,7,0.95)] backdrop-blur-2xl border-b border-[rgba(245,158,11,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Crown className="w-8 h-8 text-[#f59e0b] animate-[crownGlow_3s_ease-in-out_infinite]" />
              <div className="absolute inset-0 blur-lg bg-[#f59e0b] opacity-30 group-hover:opacity-60 transition-opacity" />
            </div>
            <div>
              <span className="font-['Cinzel'] text-xl font-800 text-gold-gradient text-[#f59e0b]">
                KINGS
              </span>
              <span className="font-['Cinzel'] text-xl font-800 text-white ml-1">GAME</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 text-sm font-500"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </button>

                {link.children && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 glass-dark rounded-2xl border border-[rgba(245,158,11,0.15)] shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-2"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[rgba(245,158,11,0.08)] text-[rgba(255,255,255,0.8)] hover:text-[#fbbf24] transition-all text-sm"
                      >
                        {child.label}
                        {child.badge && (
                          <span className={`text-[10px] font-700 px-1.5 py-0.5 rounded-full ${
                            child.badge === "LIVE"
                              ? "bg-[rgba(16,185,129,0.2)] text-[#34d399] border border-[rgba(16,185,129,0.3)]"
                              : "bg-[rgba(245,158,11,0.1)] text-[#fbbf24] border border-[rgba(245,158,11,0.2)]"
                          }`}>
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification bell — shown when logged in */}
            <button className="relative p-2.5 rounded-xl glass hover:bg-[rgba(255,255,255,0.08)] transition-all">
              <Bell className="w-4 h-4 text-[rgba(255,255,255,0.6)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            </button>

            <Link
              href="/login"
              className="btn-glass px-5 py-2.5 rounded-xl text-sm font-600"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="btn-gold px-5 py-2.5 rounded-xl text-sm font-700"
            >
              Play Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl glass"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-[rgba(245,158,11,0.1)] px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" className="btn-glass px-4 py-3 rounded-xl text-center text-sm font-600">
              Sign In
            </Link>
            <Link href="/register" className="btn-gold px-4 py-3 rounded-xl text-center text-sm font-700">
              Play Now — It's Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
