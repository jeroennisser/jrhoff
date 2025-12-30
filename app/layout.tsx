import React from "react";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito, Libre_Baskerville } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import { VideoDialog } from "@/components/lazy-components";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: 'swap',
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jeroen van der Hoff - Body Therapist & NIS Therapeut Zaandam",
  description: "Body Therapist en NIS Therapeut in Zaandam. Professionele behandelingen met Neurolink NIS voor diverse klachten. KvK: 34337856",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={cn(fontSans.variable, nunito.variable, lato.variable, libreBaskerville.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
