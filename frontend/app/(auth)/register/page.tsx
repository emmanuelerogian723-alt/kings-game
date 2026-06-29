"use client";
import { useState } from "react";
import Link from "next/link";
import { Crown, Mail, Lock, User, Eye, EyeOff, AlertCircle, Shield, Check } from "lucide-react";
import { getPasswordStrength, sanitizeInput, sanitizeUsername } from "@/lib/security/rateLimit";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    username: "", email: "", phone: "", password: "", confirmPassword: "",
    agreeTerms: false, agreeAge: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pwStrength = getPasswordStrength(form.password);

  const handleNext = async () => {
    setError("");
    if (step === 1) {
      if (!form.username || form.username.length < 3) {
        setError("Username must be at least 3 characters."); return;
      }
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
        setError("Enter a valid email address."); return;
      }
      setStep(2);
    } else if (step === 2) {
      if (pwStrength.score < 2) {
        setError("Please choose a stronger password."); return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match."); return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!form.agreeTerms || !form.agreeAge) {
        setError("Please accept all agreements to continue."); return;
      }
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 1500));
        // TODO: POST /api/auth/register
        alert("Account created! Check your email to verify.");
      } catch (err: any) {
        setError(err.message ?? "Registration failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030507] flex items-center justify-center px-4 py-12 relative overflow-hidden">
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
          <h1 className="font-['Cinzel'] text-2xl font-700 text-white mb-2">Create Your Account</h1>
          <p className="text-[rgba(255,255,255,0.4)] text-sm">Join 48,000+ champions on Kings Game</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-700 transition-all duration-300 flex-shrink-0"
                style={step >= s ? {
                  background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                  color: "#030507",
                  boxShadow: "0 0 15px rgba(245,158,11,0.4)",
                } : {
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className="flex-1 h-px transition-all duration-500"
                  style={{ background: step > s ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.06)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl border border-[rgba(255,255,255,0.08)] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <div className="space-y-4">
            {/* Step 1: Identity */}
            {step === 1 && (
              <>
                <h2 className="font-600 text-white mb-4">Your Identity</h2>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type="text"
                    placeholder="Username (e.g. KingSlayer_NG)"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: sanitizeUsername(e.target.value) })}
                    className="input-royal pl-11"
                    maxLength={30}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: sanitizeInput(e.target.value) })}
                    className="input-royal pl-11"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)] text-sm">🇳🇬</span>
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 15) })}
                    className="input-royal pl-11"
                  />
                </div>
              </>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <>
                <h2 className="font-600 text-white mb-4">Secure Password</h2>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Create password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-royal pl-11 pr-11"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.3)] hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength */}
                {form.password && (
                  <div>
                    <div className="flex gap-1 mb-2">
                      {[0,1,2,3,4].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            background: i < pwStrength.score ? pwStrength.color : "rgba(255,255,255,0.08)",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: pwStrength.color }}>{pwStrength.label}</p>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      {Object.entries(pwStrength.checks).map(([key, ok]) => (
                        <div key={key} className="flex items-center gap-1.5 text-xs" style={{
                          color: ok ? "#34d399" : "rgba(255,255,255,0.3)",
                        }}>
                          <Check className="w-3 h-3" />
                          {key === "length" ? "8+ chars" : key === "uppercase" ? "Uppercase" :
                           key === "lowercase" ? "Lowercase" : key === "number" ? "Number" : "Special char"}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="input-royal pl-11"
                    autoComplete="new-password"
                  />
                </div>
              </>
            )}

            {/* Step 3: Agreements */}
            {step === 3 && (
              <>
                <h2 className="font-600 text-white mb-4">Almost There!</h2>
                <div className="space-y-3">
                  {[
                    { key: "agreeTerms", label: "I agree to the Terms of Service and Privacy Policy" },
                    { key: "agreeAge", label: "I confirm I am 18 years of age or older" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-all">
                      <div
                        className="w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center flex-shrink-0 transition-all"
                        style={form[item.key as keyof typeof form] as boolean ? {
                          background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                          border: "none",
                        } : { borderColor: "rgba(255,255,255,0.2)" }}
                        onClick={() => setForm({ ...form, [item.key]: !form[item.key as keyof typeof form] })}
                      >
                        {form[item.key as keyof typeof form] && <Check className="w-3 h-3 text-[#030507]" />}
                      </div>
                      <span className="text-[rgba(255,255,255,0.5)] text-sm leading-relaxed">{item.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={loading}
              className="btn-gold w-full py-4 rounded-2xl font-700 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#030507] border-t-transparent animate-spin" />
                  Creating account...
                </span>
              ) : step === 3 ? "Create Account" : "Continue →"}
            </button>
          </div>

          <p className="text-center text-[rgba(255,255,255,0.35)] text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#fbbf24] hover:text-[#f59e0b] font-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-[rgba(255,255,255,0.2)] text-xs">
          <Shield className="w-3 h-3" />
          <span>Your data is encrypted and never sold</span>
        </div>
      </div>
    </div>
  );
}
