import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";

const pageTitle = "Cookies | Synthetix Studio";
const pageDescription =
  "How Synthetix Studio uses cookies, and how to accept or reject analytics on this website.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://www.synthetixstudio.co.uk/cookies" },
  openGraph: {
    type: "website",
    url: "https://www.synthetixstudio.co.uk/cookies",
    siteName: "Synthetix Studio",
    locale: "en_GB",
    title: pageTitle,
    description: pageDescription,
  },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
};

export default function CookiesPage() {
  return (
    <LegalDocument title="Cookies">
      <p>
        This page explains the cookies on synthetixstudio.co.uk. Synthetix Studio asks you to accept or reject analytics cookies. Nothing in the analytics tool is loaded until you accept.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Your choice</h2>
        <p>
          The first visit shows a banner with Accept and Reject. Your choice is saved in this browser, so the banner stays closed next time. Use Cookie settings in the footer if you want to choose again.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">If you reject</h2>
        <p>
          Google Analytics is not loaded. Analytics storage and advertising storage stay off. The rest of the website works as usual.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">If you accept</h2>
        <p>
          Synthetix Studio loads Google Analytics 4 when analytics is switched on for this website. It uses cookies to count visits and to see which pages are read. Analytics storage is switched on. Advertising storage stays off, so this choice is not used to build an advertising profile.
        </p>
        <p>
          If analytics is not configured, Accept still saves your choice and does not load Google Analytics.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">What stays on your device</h2>
        <p>
          The saved choice sits in local storage in this browser. It is not an account, and it is not sent with an enquiry. You can clear stored data for this site in your browser. That removes the choice, and the banner asks again.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">More about your information</h2>
        <p>
          Enquiry details are covered in the{" "}
          <Link href="/privacy" className="text-purple-300 hover:text-white underline underline-offset-2">
            privacy policy
          </Link>
          . The site is hosted on Vercel, which may keep short technical logs so the pages can run and stay secure.
        </p>
      </section>
    </LegalDocument>
  );
}
