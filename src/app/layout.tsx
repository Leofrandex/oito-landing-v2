import type { Metadata } from "next";
import { Dongle, DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dongle = Dongle({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-dongle",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "oito | Agencia de Automatización",
  description: "Aumenta la productividad de tu empresa con automatización inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dongle.variable} ${dmSans.variable} ${playfair.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
