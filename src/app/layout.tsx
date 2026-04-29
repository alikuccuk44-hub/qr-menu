import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dinamik QR Menü",
  description: "KOBİ odaklı dinamik QR menü yönetim sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
