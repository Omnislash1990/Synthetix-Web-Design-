import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";

export const metadata = {
  title: "Privacy Policy | Synthetix Studio",
  description: "How Synthetix Studio uses information you send through an enquiry.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy policy">
      <p>
        Synthetix Studio is a web design studio in Birmingham, United Kingdom. This policy explains what happens to information you share on synthetixstudio.co.uk.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Who to contact</h2>
        <p>
          Synthetix Studio is responsible for personal information collected through this site. Use the enquiry form on the{" "}
          <Link href="/#contact" className="text-purple-300 hover:text-white underline underline-offset-2">
            homepage
          </Link>{" "}
          if you want a copy of your information, a correction, or deletion.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">What you can send us</h2>
        <p>The project enquiry form asks for:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>your name</li>
          <li>your business name, if you add one</li>
          <li>your email address</li>
          <li>your phone number, if you add one</li>
          <li>a description of the website or tool you want</li>
          <li>the project type and options you selected in the quote estimator</li>
        </ul>
        <p>
          We use those details to reply, discuss the work, and prepare a proposal. The lawful reason is that you asked us to take steps before a possible contract. We do not sell personal information, and we do not add you to an advertising list.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Hosting and cookies</h2>
        <p>
          The site is hosted on Vercel. The host may keep short technical logs, such as IP address, browser type, and the page requested, so the site can run and stay secure. Advertising cookies stay off. Analytics cookies are optional: Google Analytics loads only after you accept them. If you reject them, it is not loaded. The{" "}
          <Link href="/cookies" className="text-purple-300 hover:text-white underline underline-offset-2">
            cookies page
          </Link>{" "}
          explains how to change that choice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">How long we keep an enquiry</h2>
        <p>
          Enquiry messages are kept while we are talking about a project, and for a short time afterwards in case you return. Ask the studio to delete an enquiry and it will be removed unless a record has to be kept for tax or a legal claim.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Your rights</h2>
        <p>
          If you are in the UK, you can ask for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. You can also complain to the Information Commissioner’s Office at ico.org.uk.
        </p>
      </section>
    </LegalDocument>
  );
}
