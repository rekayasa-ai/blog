import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateDefaultMetadata } from "@/lib/metadata";
import BlogNavbar from "@/components/layout/BlogNavbar";
import BlogFooter from "@/components/layout/BlogFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <BlogNavbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <BlogFooter />
      </body>
    </html>
  );
}
