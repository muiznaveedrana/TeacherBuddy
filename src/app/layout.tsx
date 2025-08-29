import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorksheetGenerator.AI - Transform Worksheet Creation from Hours to Seconds",
  description: "AI-powered worksheet generator for UK primary school teachers. Create curriculum-aligned worksheets in seconds with personalized student names and professional formatting.",
  keywords: "worksheet generator, AI, primary school, UK curriculum, teaching tools, educational technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}