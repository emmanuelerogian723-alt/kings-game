/**
 * Kings Game — Client-Side Rate Limiting & Security Utilities
 *
 * NOTE: All critical rate limiting is enforced server-side (backend).
 * This client layer provides UX-level throttling + input sanitation.
 */

// ─── Rate Limit Store ─────────────────────────────────────────────────────────
const attempts: Map<string, { count: number; resetAt: number }> = new Map();

export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remainingMs: number; remaining: number } {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now >= record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remainingMs: 0, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remainingMs: record.resetAt - now, remaining: 0 };
  }

  record.count++;
  return {
    allowed: true,
    remainingMs: 0,
    remaining: maxAttempts - record.count,
  };
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}

// ─── Input Sanitization ───────────────────────────────────────────────────────
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // XSS prevention
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
    .slice(0, 2000); // max length
}

export function sanitizeUsername(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9_.-]/g, "") // only safe chars
    .slice(0, 30);
}

// ─── CSRF Token (client) ──────────────────────────────────────────────────────
export function generateCSRFToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function getCSRFToken(): string {
  let token = sessionStorage.getItem("csrf_token");
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem("csrf_token", token);
  }
  return token;
}

// ─── Password Strength ────────────────────────────────────────────────────────
export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
  color: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function getPasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length as 0 | 1 | 2 | 3 | 4;

  const labels: PasswordStrength["label"][] = [
    "Very Weak", "Weak", "Fair", "Strong", "Very Strong",
  ];
  const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#10b981"];

  return {
    score,
    label: labels[score] ?? "Very Weak",
    color: colors[score] ?? "#ef4444",
    checks,
  };
}

// ─── JWT Helpers (client-side only — no secret) ───────────────────────────────
export function parseJWTPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJWTPayload(token);
  if (!payload || typeof payload.exp !== "number") return true;
  return Date.now() / 1000 >= payload.exp;
}

// ─── Secure Storage ───────────────────────────────────────────────────────────
// Never store JWT in localStorage — use httpOnly cookies on backend.
// This is just a helper for ephemeral session data.
export const secureSession = {
  set(key: string, value: unknown): void {
    try {
      sessionStorage.setItem(`kg_${key}`, JSON.stringify(value));
    } catch {}
  },
  get<T>(key: string): T | null {
    try {
      const v = sessionStorage.getItem(`kg_${key}`);
      return v ? (JSON.parse(v) as T) : null;
    } catch {
      return null;
    }
  },
  remove(key: string): void {
    sessionStorage.removeItem(`kg_${key}`);
  },
  clear(): void {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith("kg_"))
      .forEach((k) => sessionStorage.removeItem(k));
  },
};
