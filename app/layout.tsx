import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: "Stone River",
  description: "A modern single page website built with Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
