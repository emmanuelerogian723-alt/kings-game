"use client";
import { useState } from "react";
import {
  Users, Trophy, Wallet, Shield, BarChart3, Settings,
  AlertTriangle, GamepadIcon, Crown, LogOut, Bell,
  TrendingUp, TrendingDown, Eye, Ban, CheckCircle,
  RefreshCw, Search, Filter, Download, Activity,
  Lock, Key, FileText, Flag, Zap, DollarSign
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type AdminSection =
  | "overview" | "users" | "games" | "tournaments" | "wallet"
  | "security" | "reports" | "rewards" | "content" | "settings" | "audit";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const OVERVIEW_STATS = [
  { label: "Total Players", value: "48,291", change: "+842", up: true, icon: Users, color: "#f59e0b" },
  { label: "Active Now", value: "2,847", change: "+124", up: true, icon: Activity, color: "#10b981" },
  { label: "Revenue Today", value: "₦1.2M", change: "+18%", up: true, icon: DollarSign, color: "#00d4ff" },
  { label: "Open Reports", value: "14", change: "+3", up: false, icon: Flag, color: "#ef4444" },
  { label: "Active Tournaments", value: "23", change: "+5", up: true, icon: Trophy, color: "#9b59b6" },
  { label: "Fraud Alerts", value: "2", change: "-8", up: true, icon: Shield, color: "#f97316" },
];

const RECENT_USERS = [
  { id: "u001", name: "KingSlayer_NG", email: "king@example.com", status: "active", wallet: "₦45,200", joined: "Jun 27", role: "player", flag: false },
  { id: "u002", name: "WhizKid_Abuja", email: "whiz@example.com", status: "active", wallet: "₦12,800", joined: "Jun 26", role: "player", flag: false },
  { id: "u003", name: "SuspectUser99", email: "sus@example.com", status: "flagged", wallet: "₦200", joined: "Jun 29", role: "player", flag: true },
  { id: "u004", name: "AcePlayer_LG", email: "ace@example.com", status: "banned", wallet: "₦0", joined: "Jun 20", role: "player", flag: false },
  { id: "u005", name: "CardMaster_PH", email: "card@example.com", status: "active", wallet: "₦88,400", joined: "Jun 15", role: "vip", flag: false },
];

const AUDIT_LOGS = [
  { time: "08:42:01", actor: "System", action: "Anti-cheat triggered", target: "SuspectUser99", severity: "high" },
  { time: "08:38:14", actor: "Admin", action: "User banned", target: "AcePlayer_LG", severity: "high" },
  { time: "08:30:00", actor: "System", action: "Tournament auto-started", target: "Kings Grand Championship", severity: "info" },
  { time: "08:15:33", actor: "Moderator", action: "Report resolved", target: "Report #2847", severity: "info" },
  { time: "08:02:17", actor: "System", action: "Wallet withdrawal approved", target: "CardMaster_PH (₦50,000)", severity: "info" },
  { time: "07:58:44", actor: "Admin", action: "2FA bypassed (support)", target: "WhizKid_Abuja", severity: "medium" },
];

const FRAUD_ALERTS = [
  { id: "fa001", user: "SuspectUser99", type: "Rapid win pattern", score: 94, status: "open" },
  { id: "fa002", user: "MultiAcc_Test", type: "Multiple accounts", score: 87, status: "investigating" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ stat }: { stat: typeof OVERVIEW_STATS[0] }) {
  return (
    <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-5 hover:border-[rgba(245,158,11,0.15)] transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}>
          <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-600 ${stat.up ? "text-[#34d399]" : "text-[#ef4444]"}`}>
          {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {stat.change}
        </span>
      </div>
      <div className="font-['Cinzel'] text-2xl font-700 text-white mb-0.5">{stat.value}</div>
      <div className="text-[rgba(255,255,255,0.35)] text-xs uppercase tracking-wider">{stat.label}</div>
    </div>
  );
}

function UsersSection() {
  const [search, setSearch] = useState("");
  const filtered = RECENT_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="font-['Cinzel'] text-xl font-700 text-white">User Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
            <input
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-royal pl-9 text-sm py-2.5 w-56"
            />
          </div>
          <button className="btn-glass px-3 py-2.5 rounded-xl flex items-center gap-1.5 text-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-glass px-3 py-2.5 rounded-xl flex items-center gap-1.5 text-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)]">
              {["Player", "Email", "Status", "Wallet", "Joined", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[rgba(255,255,255,0.35)] text-xs font-600 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] flex items-center justify-center text-sm">
                      {u.name[0]}
                    </div>
                    <div>
                      <div className="text-white text-sm font-500 flex items-center gap-1.5">
                        {u.name}
                        {u.flag && <Flag className="w-3 h-3 text-[#ef4444]" />}
                        {u.role === "vip" && <Crown className="w-3 h-3 text-[#f59e0b]" />}
                      </div>
                      <div className="text-[rgba(255,255,255,0.3)] text-xs">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[rgba(255,255,255,0.5)] text-sm">{u.email}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-xs font-600 px-2.5 py-1 rounded-full ${
                    u.status === "active" ? "bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.2)]" :
                    u.status === "flagged" ? "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.2)]" :
                    "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 font-600 text-white text-sm">{u.wallet}</td>
                <td className="px-4 py-3.5 text-[rgba(255,255,255,0.4)] text-sm">{u.joined}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)] hover:text-white transition-all" title="View">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[rgba(16,185,129,0.1)] text-[rgba(255,255,255,0.4)] hover:text-[#34d399] transition-all" title="Approve">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[rgba(239,68,68,0.1)] text-[rgba(255,255,255,0.4)] hover:text-[#ef4444] transition-all" title="Ban">
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
          <span className="text-[rgba(255,255,255,0.3)] text-xs">Showing {filtered.length} of 48,291 users</span>
          <div className="flex gap-1">
            {[1,2,3,"...","next"].map((p, i) => (
              <button key={i} className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-all ${
                p === 1 ? "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.2)]" :
                "text-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
              }`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <h2 className="font-['Cinzel'] text-xl font-700 text-white">Security Center</h2>

      {/* Fraud Alerts */}
      <div className="glass rounded-2xl border border-[rgba(239,68,68,0.15)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
          <h3 className="font-600 text-white">Active Fraud Alerts</h3>
          <span className="badge-gold text-[10px] bg-[rgba(239,68,68,0.15)] text-[#ef4444] border-[rgba(239,68,68,0.3)]">
            {FRAUD_ALERTS.length} OPEN
          </span>
        </div>
        <div className="space-y-3">
          {FRAUD_ALERTS.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.1)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center text-xs font-700 text-[#ef4444]">
                  {a.score}
                </div>
                <div>
                  <div className="text-white text-sm font-500">{a.user}</div>
                  <div className="text-[rgba(255,255,255,0.4)] text-xs">{a.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.2)]">
                  {a.status}
                </span>
                <button className="btn-glass px-3 py-1.5 rounded-lg text-xs font-600">Review</button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-600 bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.2)] hover:bg-[rgba(239,68,68,0.25)] transition-all">
                  Ban
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Rate Limiting", status: "Active", desc: "200 req/min per IP", icon: Zap, ok: true },
          { label: "2FA Enforcement", status: "Optional", desc: "Recommend enabling for all", icon: Key, ok: false },
          { label: "Anti-Cheat Engine", status: "Active", desc: "ML model v3.2 running", icon: Shield, ok: true },
          { label: "SSL Certificate", status: "Valid", desc: "Expires Dec 2025", icon: Lock, ok: true },
          { label: "CSRF Protection", status: "Active", desc: "Token rotation enabled", icon: RefreshCw, ok: true },
          { label: "Audit Logging", status: "Active", desc: "All admin actions logged", icon: FileText, ok: true },
        ].map((item) => (
          <div key={item.label} className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-4">
            <div className="flex items-start justify-between mb-3">
              <item.icon className="w-5 h-5 text-[rgba(255,255,255,0.4)]" />
              <span className={`text-[10px] font-700 px-2 py-0.5 rounded-full ${
                item.ok ? "bg-[rgba(16,185,129,0.15)] text-[#34d399] border border-[rgba(16,185,129,0.2)]" :
                "bg-[rgba(245,158,11,0.15)] text-[#fbbf24] border border-[rgba(245,158,11,0.2)]"
              }`}>
                {item.status}
              </span>
            </div>
            <div className="font-600 text-white text-sm mb-1">{item.label}</div>
            <div className="text-[rgba(255,255,255,0.35)] text-xs">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Cinzel'] text-xl font-700 text-white">Audit Logs</h2>
        <button className="btn-glass px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" /> Export Logs
        </button>
      </div>
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
        <div className="space-y-0">
          {AUDIT_LOGS.map((log, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-3.5 border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              <span className="font-mono text-[rgba(255,255,255,0.3)] text-xs flex-shrink-0">{log.time}</span>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                log.severity === "high" ? "bg-[#ef4444]" :
                log.severity === "medium" ? "bg-[#f59e0b]" : "bg-[#10b981]"
              }`} />
              <span className="text-[rgba(255,255,255,0.6)] text-xs font-500 flex-shrink-0 w-20">{log.actor}</span>
              <span className="text-white text-sm flex-1">{log.action}</span>
              <span className="text-[rgba(255,255,255,0.35)] text-xs truncate max-w-[200px]">{log.target}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-600 flex-shrink-0 ${
                log.severity === "high" ? "bg-[rgba(239,68,68,0.12)] text-[#ef4444]" :
                log.severity === "medium" ? "bg-[rgba(245,158,11,0.12)] text-[#fbbf24]" :
                "bg-[rgba(16,185,129,0.12)] text-[#34d399]"
              }`}>
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
const NAV_ITEMS: { key: AdminSection; label: string; icon: any; badge?: string; danger?: boolean }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "Users", icon: Users, badge: "48.2K" },
  { key: "games", label: "Games", icon: GamepadIcon },
  { key: "tournaments", label: "Tournaments", icon: Trophy, badge: "23" },
  { key: "wallet", label: "Wallet & Payments", icon: Wallet },
  { key: "security", label: "Security", icon: Shield, badge: "2", danger: true },
  { key: "reports", label: "Reports", icon: Flag, badge: "14", danger: true },
  { key: "rewards", label: "Rewards", icon: Zap },
  { key: "audit", label: "Audit Logs", icon: FileText },
  { key: "content", label: "Content", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [section, setSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ─── Security gate: In production, check JWT role==="admin" server-side ────
  // For demo: show admin UI directly
  // Real implementation: middleware.ts checks httpOnly JWT cookie

  return (
    <div className="min-h-screen bg-[#030507] flex">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} flex-shrink-0 transition-all duration-300 border-r border-[rgba(255,255,255,0.05)] bg-[rgba(6,12,20,0.8)] backdrop-blur-xl flex flex-col h-screen sticky top-0 z-30`}>
        {/* Logo */}
        <div className="px-4 py-5 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[rgba(245,158,11,0.15)] border border-[rgba(245,158,11,0.25)] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-[#f59e0b]" />
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-['Cinzel'] text-sm font-700 text-[#fbbf24]">KINGS GAME</div>
              <div className="text-[rgba(255,255,255,0.3)] text-[10px] uppercase tracking-widest">Admin Portal</div>
            </div>
          )}
        </div>

        {/* Admin identity */}
        {sidebarOpen && (
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[rgba(245,158,11,0.06)]">
              <div className="w-7 h-7 rounded-full bg-[rgba(245,158,11,0.2)] flex items-center justify-center text-xs font-700 text-[#f59e0b]">A</div>
              <div>
                <div className="text-white text-xs font-600">Super Admin</div>
                <div className="text-[rgba(255,255,255,0.3)] text-[10px]">admin@kingsgame.ng</div>
              </div>
              <span className="ml-auto w-2 h-2 rounded-full bg-[#10b981] animate-pulse flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`admin-nav-item w-full text-left ${section === item.key ? "active" : ""}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-700 px-1.5 py-0.5 rounded-full ${
                      item.danger ? "bg-[rgba(239,68,68,0.15)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]" :
                      "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)]"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 pb-4 border-t border-[rgba(255,255,255,0.04)] pt-3 space-y-1">
          <button className="admin-nav-item w-full text-left text-[rgba(239,68,68,0.6)] hover:text-[#ef4444] hover:bg-[rgba(239,68,68,0.06)]">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(6,12,20,0.6)] backdrop-blur-xl flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-all"
            >
              <div className="space-y-1">
                <span className="block w-4 h-0.5 bg-[rgba(255,255,255,0.5)] rounded" />
                <span className="block w-4 h-0.5 bg-[rgba(255,255,255,0.5)] rounded" />
              </div>
            </button>
            <div>
              <h1 className="font-['Cinzel'] font-700 text-white text-sm capitalize">
                {NAV_ITEMS.find(n => n.key === section)?.label}
              </h1>
              <div className="text-[rgba(255,255,255,0.3)] text-xs">Kings Game Admin Portal</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* System status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#34d399] text-xs font-500">All Systems Normal</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl glass hover:bg-[rgba(255,255,255,0.06)] transition-all">
              <Bell className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
            </button>

            {/* Refresh */}
            <button className="p-2.5 rounded-xl glass hover:bg-[rgba(255,255,255,0.06)] transition-all">
              <RefreshCw className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── OVERVIEW ─────────────────────────────────────────────── */}
          {section === "overview" && (
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {OVERVIEW_STATS.map((s) => <StatCard key={s.label} stat={s} />)}
              </div>

              {/* Charts placeholder + Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Revenue chart */}
                <div className="lg:col-span-2 glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-600 text-white">Revenue (7 days)</h3>
                    <div className="flex gap-2">
                      {["7D", "30D", "90D"].map(p => (
                        <button key={p} className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                          p === "7D" ? "bg-[rgba(245,158,11,0.15)] text-[#fbbf24]" : "text-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.06)]"
                        }`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  {/* Simulated bar chart */}
                  <div className="flex items-end gap-2 h-32">
                    {[65, 80, 45, 90, 75, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-lg transition-all hover:opacity-80"
                          style={{
                            height: `${h}%`,
                            background: i === 6 ? "linear-gradient(180deg, #f59e0b, #d97706)" : "rgba(245,158,11,0.25)",
                            boxShadow: i === 6 ? "0 0 12px rgba(245,158,11,0.4)" : "none",
                          }}
                        />
                        <span className="text-[rgba(255,255,255,0.3)] text-[9px]">{["M","T","W","T","F","S","S"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-5">
                  <h3 className="font-600 text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Send Platform Announcement", icon: Bell, color: "#f59e0b" },
                      { label: "Create Tournament", icon: Trophy, color: "#10b981" },
                      { label: "Process Withdrawal Queue", icon: Wallet, color: "#00d4ff" },
                      { label: "Export User Report", icon: Download, color: "#9b59b6" },
                      { label: "Trigger Maintenance Mode", icon: Settings, color: "#ef4444", danger: true },
                    ].map((a) => (
                      <button
                        key={a.label}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-all text-left"
                        style={{ borderLeft: `3px solid ${a.color}40` }}
                      >
                        <a.icon className="w-4 h-4 flex-shrink-0" style={{ color: a.color }} />
                        <span className={`text-sm ${(a as any).danger ? "text-[#ef4444]" : "text-[rgba(255,255,255,0.65)]"}`}>
                          {a.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Users preview */}
              <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-600 text-white">Recent Registrations</h3>
                  <button onClick={() => setSection("users")} className="text-[#fbbf24] text-xs hover:text-[#f59e0b] transition-colors">
                    View all →
                  </button>
                </div>
                <div className="space-y-2.5">
                  {RECENT_USERS.slice(0, 4).map(u => (
                    <div key={u.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.15)] flex items-center justify-center text-sm text-[#f59e0b] font-600">
                        {u.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-500 flex items-center gap-1.5">
                          {u.name}
                          {u.flag && <Flag className="w-3 h-3 text-[#ef4444]" />}
                        </div>
                        <div className="text-[rgba(255,255,255,0.3)] text-xs">{u.email}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-600 ${
                        u.status === "active" ? "bg-[rgba(16,185,129,0.12)] text-[#34d399]" :
                        u.status === "flagged" ? "bg-[rgba(245,158,11,0.12)] text-[#fbbf24]" :
                        "bg-[rgba(239,68,68,0.12)] text-[#ef4444]"
                      }`}>
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section === "users" && <UsersSection />}
          {section === "security" && <SecuritySection />}
          {section === "audit" && <AuditSection />}

          {/* Placeholder for other sections */}
          {["games","tournaments","wallet","reports","rewards","content","settings"].includes(section) && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                {(() => {
                  const item = NAV_ITEMS.find(n => n.key === section);
                  const Icon = item?.icon ?? Settings;
                  return <Icon className="w-7 h-7 text-[rgba(255,255,255,0.3)]" />;
                })()}
              </div>
              <h3 className="font-['Cinzel'] font-700 text-white text-lg mb-2 capitalize">{section} Panel</h3>
              <p className="text-[rgba(255,255,255,0.3)] text-sm max-w-xs">
                Full {section} management system. Backend integration required to display live data.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
