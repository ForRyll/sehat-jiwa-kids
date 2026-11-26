import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import MotionProvider from "@/components/MotionProvider";
import TopUtilityBar from "@/components/TopUtilityBar";
import { tentang } from "@/content/tentang";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: tentang.namaWebsite,
    template: `%s | ${tentang.namaWebsite}`,
  },
  description:
    "Website edukasi kesehatan mental untuk mahasiswa: materi singkat, game relaksasi, dan informasi bantuan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${nunito.variable} ${nunito.className} antialiased`}>
        <MotionProvider>
          <TopUtilityBar />
          {children}
          <BottomNav />
        </MotionProvider>
      </body>
    </html>
  );
}
