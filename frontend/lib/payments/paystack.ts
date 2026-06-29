/**
 * Kings Game — Paystack Integration
 *
 * IMPORTANT: Only the PUBLIC key goes in the frontend.
 * The SECRET key NEVER touches frontend code — it lives ONLY on your backend server.
 *
 * Flow:
 * 1. Frontend calls backend → backend creates a Paystack transaction → returns reference + authorization_url
 * 2. Frontend opens Paystack popup/redirect with the reference
 * 3. Paystack sends webhook to backend on payment success
 * 4. Backend verifies with secret key → credits wallet
 */

// ─── Public Key (safe in frontend) ───────────────────────────────────────────
// Replace with your actual Paystack public key from dashboard.paystack.com
const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PaystackPopupOptions {
  email: string;
  amount: number; // in KOBO (multiply naira by 100)
  reference: string;
  currency?: "NGN";
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

interface InitDepositPayload {
  amount: number; // in Naira
  email: string;
  userId: string;
  metadata?: Record<string, unknown>;
}

interface InitDepositResponse {
  reference: string;
  authorization_url: string;
}

// ─── Load Paystack script dynamically ────────────────────────────────────────
export function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PaystackPop) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.head.appendChild(script);
  });
}

// ─── Open Paystack Payment Popup ─────────────────────────────────────────────
export async function openPaystackPopup(options: PaystackPopupOptions): Promise<void> {
  await loadPaystackScript();

  const handler = (window as any).PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: options.email,
    amount: options.amount * 100, // convert Naira → Kobo
    currency: options.currency ?? "NGN",
    ref: options.reference,
    callback: (response: { reference: string }) => {
      options.onSuccess(response.reference);
    },
    onClose: options.onClose,
  });

  handler.openIframe();
}

// ─── Initialize deposit via backend ──────────────────────────────────────────
// This calls YOUR backend which then calls Paystack API with the secret key
export async function initializeDeposit(payload: InitDepositPayload): Promise<InitDepositResponse> {
  const res = await fetch("/api/wallet/deposit/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // sends httpOnly auth cookie
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message ?? "Failed to initialize payment");
  }

  return res.json() as Promise<InitDepositResponse>;
}

// ─── Verify payment (always do this server-side too!) ────────────────────────
export async function verifyPayment(reference: string): Promise<{ verified: boolean; amount: number }> {
  const res = await fetch(`/api/wallet/deposit/verify?ref=${encodeURIComponent(reference)}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Verification failed");
  return res.json();
}
