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

const siteUrl = "https://www.synthetixstudio.co.uk";
const siteTitle = "Synthetix Studio | Birmingham Web Design and App Development";
const siteDescription =
  "Birmingham web design and app development from Synthetix Studio. Websites and custom apps for businesses of any size, start-ups, and anyone with an idea.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Synthetix Studio",
    locale: "en_GB",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
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
