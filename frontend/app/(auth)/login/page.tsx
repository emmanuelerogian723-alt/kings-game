"use client";
import { useState } from "react";
import Link from "next/link";
import { Crown, Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from "lucide-react";
import { checkRateLimit, sanitizeInput } from "@/lib/security/rateLimit";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [twoFACode, setTwoFACode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side rate limiting (5 attempts per 15 minutes)
    const rl = checkRateLimit(`login_${form.email}`, 5, 15 * 60 * 1000);
    if (!rl.allowed) {
      const mins = Math.ceil(rl.remainingMs / 60000);
      setError(`Too many attempts. Try again in ${mins} minute${mins > 1 ? "s" : ""}.`);
      return;
    }

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // TODO: call /api/auth/login
      await new Promise((r) => setTimeout(r, 1200)); // simulate
      setStep("2fa"); // proceed to 2FA
    } catch (err: any) {
      setError(err.message ?? "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030507] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
      }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Crown className="w-8 h-8 text-[#f59e0b]" />
            <span className="font-['Cinzel'] text-2xl font-700 text-white">KINGS GAME</span>
          </Link>
          <h1 className="font-['Cinzel'] text-2xl font-700 text-white mb-2">
            {step === "2fa" ? "Two-Factor Auth" : "Welcome Back"}
          </h1>
          <p className="text-[rgba(255,255,255,0.4)] text-sm">
            {step === "2fa" ? "Enter the 6-digit code from your authenticator app" : "Sign in to your Kings Game account"}
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl border border-[rgba(255,255,255,0.08)] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          {step === "credentials" ? (
            <>
              {/* OAuth buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: "G", label: "Google", bg: "rgba(234,67,53,0.1)", border: "rgba(234,67,53,0.2)" },
                  { icon: "f", label: "Facebook", bg: "rgba(24,119,242,0.1)", border: "rgba(24,119,242,0.2)" },
                ].map((p) => (
                  <button
                    key={p.label}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-600 text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: p.bg, border: `1px solid ${p.border}` }}
                  >
                    <span className="font-bold">{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                <span className="text-[rgba(255,255,255,0.25)] text-xs uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: sanitizeInput(e.target.value) })}
                    className="input-royal pl-11"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-royal pl-11 pr-11"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#f59e0b]"
                    />
                    <span className="text-[rgba(255,255,255,0.45)] text-sm">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-[#fbbf24] text-sm hover:text-[#f59e0b] transition-colors">
                    Forgot password?
                  </Link>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-4 rounded-2xl text-base font-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-[#030507] border-t-transparent animate-spin" />
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </button>
              </form>
            </>
          ) : (
            /* 2FA Step */
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <div className="flex gap-2 justify-center mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-11 h-14 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-center text-xl font-700 text-white outline-none focus:border-[rgba(245,158,11,0.5)] focus:bg-[rgba(245,158,11,0.04)] transition-all"
                    onInput={(e) => {
                      const v = (e.target as HTMLInputElement).value;
                      if (v && i < 5) {
                        const next = document.querySelectorAll("[data-otp]")[i + 1] as HTMLInputElement;
                        if (next) next.focus();
                      }
                    }}
                    data-otp
                  />
                ))}
              </div>
              <button className="btn-gold w-full py-4 rounded-2xl font-700 mb-4">
                Verify & Sign In
              </button>
              <button
                onClick={() => setStep("credentials")}
                className="text-[rgba(255,255,255,0.4)] text-sm hover:text-white transition-colors"
              >
                ← Back to login
              </button>
            </div>
          )}

          {/* Register link */}
          {step === "credentials" && (
            <p className="text-center text-[rgba(255,255,255,0.35)] text-sm mt-6">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#fbbf24] hover:text-[#f59e0b] font-600 transition-colors">
                Create account
              </Link>
            </p>
          )}
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[rgba(255,255,255,0.2)] text-xs">
          <Shield className="w-3 h-3" />
          <span>256-bit SSL encrypted • Rate limited • 2FA protected</span>
        </div>
      </div>
    </div>
  );
}
