import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ISI: Nama Website",
    template: "%s | ISI: Nama Website",
  },
  description:
    "Website edukasi kesehatan mental untuk mahasiswa: materi singkat, game relaksasi, dan informasi bantuan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}