import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/auth-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nabi: for foreigners in korea",
  description:
    "nabi helps foreign residents in Korea navigate visas, local services, healthcare, recreation, community information, and practical daily-life support.",
  applicationName: "nabi",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  keywords: [
    "nabi",
    "foreigners in Korea",
    "Korea immigration",
    "visa tracker",
    "local services Korea",
    "health and recreation Korea",
  ],
  openGraph: {
    title: "nabi: for foreigners in korea",
    description:
      "Personalized visa, local service, healthcare, recreation, and community guidance for foreign residents in Korea.",
    siteName: "nabi",
    images: [{ url: "/logo.png", width: 1294, height: 390, alt: "nabi logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nabi: for foreigners in korea",
    description:
      "Personalized visa, local service, healthcare, recreation, and community guidance for foreign residents in Korea.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
