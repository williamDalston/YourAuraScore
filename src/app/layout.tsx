import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YourAuraScore — Discover Your Unique Aura",
  description: "Take a 60-second visual personality quiz and get a stunning, one-of-a-kind aura visualization that reveals your true energy.",
  keywords: ["aura", "personality quiz", "generative art", "aura score", "personality test", "visualization"],
  openGraph: {
    title: "YourAuraScore — Discover Your Unique Aura",
    description: "Take a 60-second visual personality quiz and get a stunning, one-of-a-kind aura visualization.",
    siteName: "YourAuraScore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourAuraScore — Discover Your Unique Aura",
    description: "Take a 60-second visual personality quiz and get a stunning, one-of-a-kind aura visualization.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
                     focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
