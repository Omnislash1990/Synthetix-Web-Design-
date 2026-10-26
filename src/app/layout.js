import { Geist, Geist_Mono } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "").trim();

export const metadata = {
  title: "Synthetix Studio | Birmingham Web Design",
  description:
    "Bespoke business websites, trade portals, and invoice tools from Synthetix Studio, a Birmingham web design studio working with companies across the West Midlands.",
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
