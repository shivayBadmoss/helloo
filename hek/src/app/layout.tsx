import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FederAI Chain - Decentralized AI Model Training & Marketplace",
  description: "Turn AI models into community-trained, tradable on-chain assets. Contribute compute, earn rewards, and build the future of collaborative AI.",
  keywords: ["FederAI", "AI", "Machine Learning", "Federated Learning", "Blockchain", "NFT", "Marketplace", "Decentralized"],
  authors: [{ name: "FederAI Chain Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "FederAI Chain",
    description: "Decentralized AI Model Training & Marketplace",
    url: "https://federai.chain",
    siteName: "FederAI Chain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FederAI Chain",
    description: "Decentralized AI Model Training & Marketplace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
