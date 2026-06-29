"use client";
import { useState } from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Shield, Plus, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

type WalletTab = "overview" | "deposit" | "withdraw" | "history";

const TRANSACTIONS = [
  { type: "win", desc: "Tournament Prize — Kings Grand Championship", amount: "+₦25,000", date: "Today 14:30", status: "completed", color: "#10b981" },
  { type: "deposit", desc: "Deposit via Paystack", amount: "+₦10,000", date: "Today 11:15", status: "completed", color: "#10b981" },
  { type: "entry", desc: "Tournament Entry — Weekend Warriors Cup", amount: "-₦500", date: "Yesterday", status: "completed", color: "#ef4444" },
  { type: "win", desc: "Match Win vs WhizKid_Abuja", amount: "+₦2,400", date: "Jun 28", status: "completed", color: "#10b981" },
  { type: "withdraw", desc: "Withdrawal to Bank — GTBank ****1234", amount: "-₦20,000", date: "Jun 27", status: "pending", color: "#f59e0b" },
];

const PAYMENT_METHODS = [
  { name: "Paystack", icon: "💳", desc: "Debit/Credit Card, Bank Transfer, USSD", countries: "🇳🇬" },
  { name: "Flutterwave", icon: "🌊", desc: "Cards, Mobile Money, Bank", countries: "🇳🇬🌍" },
  { name: "Bank Transfer", icon: "🏦", desc: "Direct bank transfer", countries: "🇳🇬" },
];

export default function WalletPage() {
  const [tab, setTab] = useState<WalletTab>("overview");
  const [amount, setAmount] = useState("");

  const walletBalance = 45200;
  const bonusBalance = 2500;
  const rewardBalance = 1800;

  return (
    <div className="min-h-screen bg-[#030507] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-[rgba(255,255,255,0.4)] text-sm hover:text-white transition-colors mb-4 inline-block">
            ← Dashboard
          </Link>
          <h1 className="font-['Cinzel'] text-3xl font-700 text-white flex items-center gap-3">
            <Wallet className="w-7 h-7 text-[#f59e0b]" /> My Wallet
          </h1>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Main Balance", value: walletBalance, icon: Wallet, color: "#f59e0b", main: true },
            { label: "Bonus Balance", value: bonusBalance, icon: TrendingUp, color: "#10b981", main: false },
            { label: "Reward Points", value: rewardBalance, icon: RefreshCw, color: "#9b59b6", main: false },
          ].map((wallet) => (
            <div
              key={wallet.label}
              className={`rounded-2xl p-5 border transition-all ${
                wallet.main
                  ? "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)]"
                  : "glass border-[rgba(255,255,255,0.06)]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[rgba(255,255,255,0.4)] text-xs uppercase tracking-wider">{wallet.label}</span>
                <wallet.icon className="w-4 h-4" style={{ color: wallet.color }} />
              </div>
              <div
                className="font-['Cinzel'] text-2xl font-700"
                style={{ color: wallet.main ? "#f59e0b" : "white" }}
              >
                ₦{wallet.value.toLocaleString()}
              </div>
              {wallet.main && (
                <div className="text-[rgba(255,255,255,0.3)] text-xs mt-1">Available to withdraw</div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setTab("deposit")}
            className="btn-gold flex-1 py-3.5 rounded-2xl font-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Deposit
          </button>
          <button
            onClick={() => setTab("withdraw")}
            className="btn-glass flex-1 py-3.5 rounded-2xl font-600 flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" /> Withdraw
          </button>
          <button
            onClick={() => setTab("history")}
            className="btn-glass flex-1 py-3.5 rounded-2xl font-600 flex items-center justify-center gap-2 hidden sm:flex"
          >
            <Clock className="w-4 h-4" /> History
          </button>
        </div>

        {/* Tab Content */}
        {(tab === "deposit" || tab === "overview") && (
          <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] p-6 mb-6">
            <h2 className="font-['Cinzel'] font-700 text-white text-lg mb-5 flex items-center gap-2">
              <ArrowDownLeft className="w-5 h-5 text-[#10b981]" /> Deposit Funds
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-[rgba(255,255,255,0.4)] text-xs uppercase tracking-wider block mb-2">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)] font-600">₦</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="input-royal pl-9 text-lg font-600"
                    min="500"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[1000, 2500, 5000, 10000].map(a => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className="flex-1 py-2 rounded-xl text-xs font-600 glass hover:bg-[rgba(245,158,11,0.08)] hover:border-[rgba(245,158,11,0.2)] hover:text-[#fbbf24] transition-all border border-transparent text-[rgba(255,255,255,0.4)]"
                    >
                      ₦{a.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[rgba(255,255,255,0.4)] text-xs uppercase tracking-wider block mb-2">Payment Method</label>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((pm, i) => (
                    <label key={pm.name} className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(245,158,11,0.2)] hover:bg-[rgba(245,158,11,0.04)] cursor-pointer transition-all">
                      <input type="radio" name="payment" defaultChecked={i === 0} className="accent-[#f59e0b]" />
                      <span className="text-2xl">{pm.icon}</span>
                      <div>
                        <div className="text-white text-sm font-600">{pm.name}</div>
                        <div className="text-[rgba(255,255,255,0.35)] text-xs">{pm.desc}</div>
                      </div>
                      <span className="ml-auto text-base">{pm.countries}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="btn-gold w-full py-4 rounded-2xl font-700 text-base">
                Proceed to Payment
              </button>

              <div className="flex items-center justify-center gap-2 text-[rgba(255,255,255,0.2)] text-xs">
                <Shield className="w-3 h-3" />
                <span>Secured by SSL · 256-bit encryption · PCI DSS compliant</span>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
          <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
            <h3 className="font-600 text-white">Transaction History</h3>
            <button className="text-[rgba(255,255,255,0.4)] text-xs hover:text-[#fbbf24] transition-colors">
              View All
            </button>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.03)]">
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: `${tx.color}15`, color: tx.color }}
                >
                  {tx.type === "win" ? "🏆" : tx.type === "deposit" ? "↓" : tx.type === "withdraw" ? "↑" : "🎮"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-500 truncate">{tx.desc}</div>
                  <div className="text-[rgba(255,255,255,0.3)] text-xs">{tx.date}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-600 text-sm" style={{ color: tx.color }}>{tx.amount}</div>
                  <div className={`text-[10px] ${tx.status === "pending" ? "text-[#f59e0b]" : "text-[rgba(255,255,255,0.3)]"}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
