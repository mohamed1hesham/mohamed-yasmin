import type { Metadata } from "next";
import { Amiri, Alexandria, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamed-yasmin-wedding.world"),
  title: "Mohamed & Yasmin | زفاف محمد وياسمين",
  description: "دعوة خاصة لحضور حفل زفاف محمد وياسمين في Villa La Riva على ضفاف النيل - 31 أكتوبر 2026",
  keywords: ["wedding", "Mohamed & Yasmin", "Villa La Riva", "زفاف", "دعوة فرح", "محمد وياسمين"],
  openGraph: {
    title: "Mohamed & Yasmin Wedding Invitation | دعوة زفاف محمد وياسمين",
    description: "ليلة تجمعنا على ضفاف النيل في Villa La Riva - 31 أكتوبر 2026",
    images: [{ url: "/images/couple.jpg", width: 1200, height: 800, alt: "Mohamed & Yasmin" }],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=5", sizes: "any" },
      { url: "/icon.png?v=5", type: "image/png", sizes: "64x64" },
      { url: "/icon.svg?v=5", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=5",
    apple: [
      { url: "/apple-icon.png?v=5", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${alexandria.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=5" sizes="any" />
        <link rel="icon" href="/icon.png?v=5" type="image/png" sizes="64x64" />
        <link rel="icon" href="/icon.svg?v=5" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png?v=5" />
      </head>
      <body className="min-h-full bg-[#f2ede4] text-[#5b5748] selection:bg-[#98713b] selection:text-white">
        {children}
      </body>
    </html>
  );
}
