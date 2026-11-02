import { Poppins, Playfair_Display } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Köpek Evreni | Köpek İlanları & Cins Portalı",
  description: "Köpekleri olanlar ile köpek arayanların buluştuğu Türkiye'nin köpek ilanları ve ırk portalı.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="tr" className={`${poppins.variable} ${playfair.variable} ${poppins.className}`}>
      <body className="bg-[#FAF8F5] text-base dark:bg-[#151312] text-[#1C1917] dark:text-[#E8E4DF] antialiased selection:bg-[#7A1C30] selection:text-white min-h-screen flex flex-col justify-between">
        {/* TOP ANNOUNCEMENT BAR */}
        <div className="bg-[#1C1917] text-[#FAF8F5] text-[10px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 border-b border-neutral-800">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] inline-block animate-pulse shrink-0"></span>
          <span className="truncate">
            Köpek İlanları & Cins Portalı • <strong className="text-[#C5A059] font-semibold">Köpek Sahipleri ve Arayanların Buluşma Noktası</strong>
          </span>
        </div>

        <AuthProvider>
          <div>
            <ClientCommons />
            <SiteHeader />
            {children}
          </div>

          <div>
            <FooterNav />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
