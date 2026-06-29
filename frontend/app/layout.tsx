import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Kings Game — The Future of African Online Gaming",
    template: "%s | Kings Game",
  },
  description:
    "Kings Game is Africa's most premium online gaming platform. Play Naija Whot, compete in tournaments, win real rewards. Built for champions.",
  keywords: ["Naija Whot", "online gaming", "African games", "multiplayer", "tournaments", "Kings Game"],
  authors: [{ name: "Kings Game" }],
  creator: "Kings Game",
  openGraph: {
    type: "website",
    locale: "en_NG",
    title: "Kings Game — The Future of African Online Gaming",
    description: "Play Naija Whot and more. Compete. Win. Reign.",
    siteName: "Kings Game",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kings Game",
    description: "Africa's Most Premium Gaming Platform",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#030507",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030507] text-white overflow-x-hidden">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(6,12,20,0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(245,158,11,0.2)",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#f59e0b", secondary: "#030507" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
