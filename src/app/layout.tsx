import type { Metadata } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/utils/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AfterLightFX Studios | Immersive Design & Visualization",
  description: "Transforming ideas into stunning visual experiences.",
};

import { ThemeProvider } from "@/components/layout/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syncopate.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
