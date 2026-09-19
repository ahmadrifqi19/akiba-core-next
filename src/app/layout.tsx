import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Teko, Permanent_Marker } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const teko = Teko({ subsets: ["latin"], weight: ["700"], variable: "--font-teko" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: ["400"], variable: "--font-marker" });

export const metadata: Metadata = {
  title: "AKIBA CORE • Playbox PS4 Pro Rental",
  description: "Enterprise Esports Playbox Rental System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${teko.variable} ${marker.variable}`} suppressHydrationWarning>
      <body className={jakarta.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}