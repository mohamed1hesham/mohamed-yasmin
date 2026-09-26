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
  metadataBase: new URL("http://localhost:3000"),
  title: "Mohamed & Yasmin | زفاف محمد وياسمين",
  description: "دعوة خاصة لحضور حفل زفاف محمد وياسمين في Villa La Riva على ضفاف النيل - 31 أكتوبر 2026",
  keywords: ["wedding", "Mohamed & Yasmin", "Villa La Riva", "زفاف", "دعوة فرح", "محمد وياسمين"],
  openGraph: {
    title: "Mohamed & Yasmin Wedding Invitation | دعوة زفاف محمد وياسمين",
    description: "ليلة تجمعنا على ضفاف النيل في Villa La Riva - 31 أكتوبر 2026",
    images: [{ url: "/images/couple.jpg", width: 1200, height: 800, alt: "Mohamed & Yasmin" }],
  },
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
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${alexandria.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#120F0D] text-[#524436] selection:bg-[#c5a059] selection:text-white">
        {children}
      </body>
    </html>
  );
}
