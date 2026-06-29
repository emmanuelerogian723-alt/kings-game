"use client";
import { useState, useEffect, useCallback } from "react";
import { Crown, Users, Clock, MessageSquare, Volume2, VolumeX, Settings, Home, Smile } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type CardSuit = "circle" | "triangle" | "cross" | "square" | "star" | "whot";
type GamePhase = "lobby" | "dealing" | "playing" | "won";

interface WhotCard {
  suit: CardSuit;
  value: number;
  id: string;
}

// ─── Card Suit Config ─────────────────────────────────────────────────────────
const SUIT_CONFIG: Record<CardSuit, { symbol: string; color: string; bg: string }> = {
  circle:   { symbol: "●", color: "#3b82f6", bg: "#dbeafe" },
  triangle: { symbol: "▲", color: "#10b981", bg: "#d1fae5" },
  cross:    { symbol: "✚", color: "#ef4444", bg: "#fee2e2" },
  square:   { symbol: "■", color: "#f59e0b", bg: "#fef3c7" },
  star:     { symbol: "★", color: "#8b5cf6", bg: "#ede9fe" },
  whot:     { symbol: "W", color: "#f97316", bg: "#fff7ed" },
};

// ─── Card Generator ───────────────────────────────────────────────────────────
function generateDeck(): WhotCard[] {
  const suits: CardSuit[] = ["circle","triangle","cross","square","star"];
  const cards: WhotCard[] = [];
  let id = 0;

  suits.forEach(suit => {
    [1,2,3,4,5,7,8,10,11,12,13,14].forEach(v => {
      cards.push({ suit, value: v, id: `${suit}-${v}-${id++}` });
    });
  });
  // 5 Whot cards
  for (let i = 0; i < 5; i++) {
    cards.push({ suit: "whot", value: 20, id: `whot-${id++}` });
  }
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Single Card Component ────────────────────────────────────────────────────
function Card({ card, selected, playable, onClick, size = "md" }: {
  card: WhotCard;
  selected?: boolean;
  playable?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const cfg = SUIT_CONFIG[card.suit];
  const dims = { sm: "w-12 h-16", md: "w-16 h-24", lg: "w-20 h-30" }[size];

  return (
    <div
      onClick={onClick}
      className={`whot-card ${selected ? "selected" : ""} ${
        !playable && !selected ? "opacity-50 cursor-not-allowed" : ""
      } ${dims} flex flex-col items-center justify-center relative`}
      style={{
        background: cfg.bg,
        cursor: playable || selected ? "pointer" : "not-allowed",
      }}
    >
      {/* Top corner */}
      <div className="absolute top-1.5 left-2" style={{ color: cfg.color }}>
        <div className="text-[10px] font-900 leading-none">{card.value === 20 ? "W" : card.value}</div>
        <div className="text-[10px] leading-none">{cfg.symbol}</div>
      </div>

      {/* Center symbol */}
      <div className="text-2xl" style={{ color: cfg.color }}>
        {card.suit === "whot" ? "WHOT" : cfg.symbol}
      </div>
      <div className="text-sm font-900" style={{ color: cfg.color }}>
        {card.value === 20 ? "" : card.value}
      </div>

      {/* Bottom corner (rotated) */}
      <div className="absolute bottom-1.5 right-2 rotate-180" style={{ color: cfg.color }}>
        <div className="text-[10px] font-900 leading-none">{card.value === 20 ? "W" : card.value}</div>
        <div className="text-[10px] leading-none">{cfg.symbol}</div>
      </div>

      {/* Glow when playable */}
      {playable && !selected && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
          style={{ boxShadow: `inset 0 0 12px ${cfg.color}40` }} />
      )}
    </div>
  );
}

function CardBack({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "w-12 h-16", md: "w-16 h-24", lg: "w-20 h-30" }[size];
  return (
    <div className={`whot-card back ${dims} flex items-center justify-center`}>
      <div className="text-white opacity-40 text-xl">👑</div>
    </div>
  );
}

// ─── Chat Panel ───────────────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [msg, setMsg] = useState("");
  const messages = [
    { from: "KingSlayer", text: "Good game!", time: "14:32", self: false },
    { from: "You", text: "Thanks! Well played 🔥", time: "14:33", self: true },
    { from: "WhizKid", text: "My turn watch out lol", time: "14:33", self: false },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        <span className="font-600 text-white text-sm">Game Chat</span>
        <button onClick={onClose} className="text-[rgba(255,255,255,0.4)] hover:text-white text-lg">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.self ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
              m.self ? "bg-[rgba(245,158,11,0.2)] text-white" : "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.8)]"
            }`}>
              {!m.self && <div className="text-[10px] text-[rgba(255,255,255,0.4)] mb-0.5">{m.from}</div>}
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-[rgba(255,255,255,0.06)] flex gap-2">
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Say something..."
          className="input-royal py-2 text-sm flex-1"
          onKeyDown={e => { if (e.key === "Enter" && msg.trim()) setMsg(""); }}
        />
        <button className="btn-gold px-3 py-2 rounded-xl text-sm">→</button>
      </div>
    </div>
  );
}

// ─── Main Game Page ───────────────────────────────────────────────────────────
export default function NaijaWhotPage() {
  const [phase, setPhase] = useState<GamePhase>("lobby");
  const [playerHand, setPlayerHand] = useState<WhotCard[]>([]);
  const [opponentCards, setOpponentCards] = useState(7);
  const [pile, setPile] = useState<WhotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showEmoji, setShowEmoji] = useState<string | null>(null);

  const EMOJIS = ["🔥","😂","👑","😤","🎉","💀"];

  const startGame = useCallback(() => {
    const deck = shuffle(generateDeck());
    setPlayerHand(deck.slice(0, 7));
    setPile([deck[14]]);
    setPhase("playing");
    setIsMyTurn(true);
  }, []);

  const topCard = pile[pile.length - 1];

  const isPlayable = (card: WhotCard): boolean => {
    if (!topCard) return true;
    if (card.suit === "whot" || topCard.suit === "whot") return true;
    return card.suit === topCard.suit || card.value === topCard.value;
  };

  const playCard = (card: WhotCard) => {
    if (!isMyTurn || !isPlayable(card)) return;
    if (selectedCard === card.id) {
      // Confirm play
      setPile(prev => [...prev, card]);
      setPlayerHand(prev => prev.filter(c => c.id !== card.id));
      setSelectedCard(null);
      setIsMyTurn(false);

      // Check win
      if (playerHand.length === 1) {
        setPhase("won");
        return;
      }

      // Simulate opponent turn
      setTimeout(() => {
        setOpponentCards(prev => Math.max(1, prev - 1));
        setIsMyTurn(true);
      }, 1500);
    } else {
      setSelectedCard(card.id);
    }
  };

  const sendEmoji = (emoji: string) => {
    setShowEmoji(emoji);
    setTimeout(() => setShowEmoji(null), 2000);
  };

  // ─── LOBBY ─────────────────────────────────────────────────────────────────
  if (phase === "lobby") {
    return (
      <div className="min-h-screen bg-[#030507] flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 text-[rgba(255,255,255,0.4)] hover:text-white transition-colors text-sm">
              ← Back to Home
            </Link>
            <h1 className="font-['Cinzel'] text-4xl font-800" style={{
              background: "linear-gradient(135deg, #fde68a, #f59e0b, #d97706)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Naija Whot
            </h1>
            <p className="text-[rgba(255,255,255,0.4)] mt-2">Africa's favourite card game. Multiplayer.</p>
          </div>

          <div className="space-y-3">
            {[
              { label: "Quick Match", desc: "Random opponent in <10 seconds", action: startGame, primary: true, icon: "⚡" },
              { label: "Private Room", desc: "Invite a friend with a room code", action: () => {}, primary: false, icon: "🔒" },
              { label: "Tournament", desc: "Enter a live tournament", action: () => {}, primary: false, icon: "🏆" },
              { label: "Vs AI", desc: "Practice against the computer", action: startGame, primary: false, icon: "🤖" },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={opt.action}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all text-left ${
                  opt.primary ? "btn-gold" : "game-card hover:border-[rgba(245,158,11,0.2)]"
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div>
                  <div className={`font-600 text-base ${opt.primary ? "text-[#030507]" : "text-white"}`}>{opt.label}</div>
                  <div className={`text-sm ${opt.primary ? "text-[rgba(3,5,7,0.6)]" : "text-[rgba(255,255,255,0.35)]"}`}>{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 glass rounded-2xl p-4 text-center">
            <div className="text-[rgba(255,255,255,0.35)] text-xs mb-2">🟢 Active games</div>
            <div className="font-['Cinzel'] text-2xl font-700 text-[#f59e0b]">1,847</div>
          </div>
        </div>
      </div>
    );
  }

  // ─── WON ───────────────────────────────────────────────────────────────────
  if (phase === "won") {
    return (
      <div className="min-h-screen bg-[#030507] flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">👑</div>
          <h1 className="font-['Cinzel'] text-5xl font-900 mb-4" style={{
            background: "linear-gradient(135deg, #fde68a, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            VICTORY!
          </h1>
          <p className="text-[rgba(255,255,255,0.5)] mb-2">You played like a King</p>
          <p className="text-[#34d399] font-600 mb-8">+250 XP · +₦500 earned</p>
          <div className="flex gap-3 justify-center">
            <button onClick={startGame} className="btn-gold px-8 py-3.5 rounded-2xl font-700">
              Play Again
            </button>
            <button onClick={() => setPhase("lobby")} className="btn-glass px-8 py-3.5 rounded-2xl font-600">
              Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PLAYING ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#030507] flex flex-col">
      {/* Game top bar */}
      <div className="h-14 border-b border-[rgba(255,255,255,0.05)] glass-dark flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)]">
            <Home className="w-4 h-4 text-[rgba(255,255,255,0.4)]" />
          </Link>
          <div className="badge-gold text-[10px]">NAIJA WHOT</div>
        </div>

        <div className="flex items-center gap-2">
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass">
            <Clock className="w-3 h-3 text-[#f59e0b]" />
            <span className={`text-sm font-600 font-mono ${isMyTurn ? "text-[#f59e0b]" : "text-[rgba(255,255,255,0.4)]"}`}>
              {isMyTurn ? "YOUR TURN" : "WAITING..."}
            </span>
          </div>

          <button onClick={() => setMuted(!muted)} className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)]">
            {muted ? <VolumeX className="w-4 h-4 text-[rgba(255,255,255,0.3)]" /> : <Volume2 className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />}
          </button>
          <button onClick={() => setChatOpen(!chatOpen)} className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)]">
            <MessageSquare className="w-4 h-4 text-[rgba(255,255,255,0.5)]" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Game Board ───────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-between py-6 px-4 relative overflow-hidden">

          {/* Floating emoji reaction */}
          {showEmoji && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl animate-[float_2s_ease-in-out] z-30 pointer-events-none">
              {showEmoji}
            </div>
          )}

          {/* Opponent area */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="avatar-ring-neon">
                <div className="w-9 h-9 rounded-full bg-[rgba(99,102,241,0.2)] flex items-center justify-center text-base">
                  🦅
                </div>
              </div>
              <div>
                <div className="font-600 text-white text-sm">WhizKid_Abuja</div>
                <div className="text-[rgba(255,255,255,0.35)] text-xs">{opponentCards} cards</div>
              </div>
            </div>
            {/* Opponent's hidden cards */}
            <div className="flex gap-[-4px]" style={{ gap: "-6px" }}>
              {Array.from({ length: Math.min(opponentCards, 7) }).map((_, i) => (
                <div key={i} style={{ marginLeft: i > 0 ? "-10px" : "0", zIndex: i }}>
                  <CardBack size="sm" />
                </div>
              ))}
              {opponentCards > 7 && (
                <div className="w-12 h-16 rounded-xl glass border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-xs text-[rgba(255,255,255,0.4)]" style={{ marginLeft: "-10px" }}>
                  +{opponentCards - 7}
                </div>
              )}
            </div>
          </div>

          {/* Center pile */}
          <div className="flex items-center gap-8">
            {/* Draw pile */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative cursor-pointer hover:scale-105 transition-transform">
                {[2, 1, 0].map(offset => (
                  <div key={offset} className="absolute" style={{ top: -offset * 2, left: -offset * 2, zIndex: offset === 0 ? 3 : offset === 1 ? 2 : 1 }}>
                    <CardBack />
                  </div>
                ))}
                <CardBack />
              </div>
              <span className="text-[rgba(255,255,255,0.3)] text-xs mt-1">Draw</span>
            </div>

            {/* Top of pile */}
            {topCard && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl blur-xl opacity-30" style={{
                    background: SUIT_CONFIG[topCard.suit].color,
                  }} />
                  <Card card={topCard} playable={false} />
                </div>
                <span className="text-[rgba(255,255,255,0.3)] text-xs">Active Card</span>
              </div>
            )}
          </div>

          {/* Player area */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              <div className="avatar-ring">
                <div className="w-9 h-9 rounded-full bg-[rgba(245,158,11,0.2)] flex items-center justify-center text-base">
                  👑
                </div>
              </div>
              <div>
                <div className="font-600 text-white text-sm">You</div>
                <div className="text-[rgba(255,255,255,0.35)] text-xs">{playerHand.length} cards</div>
              </div>

              {/* Emoji reactions */}
              <div className="ml-4 flex items-center gap-1">
                <Smile className="w-4 h-4 text-[rgba(255,255,255,0.3)]" />
                {EMOJIS.map(em => (
                  <button
                    key={em}
                    onClick={() => sendEmoji(em)}
                    className="w-7 h-7 rounded-lg hover:bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-base transition-all hover:scale-125"
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>

            {/* Player's hand */}
            <div className="flex flex-wrap justify-center" style={{ gap: "8px" }}>
              {playerHand.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  selected={selectedCard === card.id}
                  playable={isMyTurn && isPlayable(card)}
                  onClick={() => playCard(card)}
                  size="md"
                />
              ))}
            </div>

            {selectedCard && (
              <div className="text-[#f59e0b] text-sm animate-pulse">
                Click the same card again to play it ↑
              </div>
            )}

            {!isMyTurn && (
              <div className="flex items-center gap-2 text-[rgba(255,255,255,0.35)] text-sm">
                <span className="w-3 h-3 rounded-full border-2 border-[rgba(255,255,255,0.3)] border-t-transparent animate-spin" />
                Opponent is thinking...
              </div>
            )}
          </div>
        </div>

        {/* ── Chat Panel ───────────────────────────────────────────────── */}
        {chatOpen && (
          <div className="w-72 border-l border-[rgba(255,255,255,0.05)] glass-dark flex-shrink-0">
            <ChatPanel onClose={() => setChatOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
