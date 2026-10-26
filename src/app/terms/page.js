import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";

export const metadata = {
  title: "Terms | Synthetix Studio",
  description:
    "Terms for using the Synthetix Studio website and for project work agreed with the studio.",
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms">
      <p>
        These terms cover use of synthetixstudio.co.uk and project work agreed with Synthetix Studio. Synthetix Studio is a web design studio in Birmingham, United Kingdom.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">The website</h2>
        <p>
          The examples and prices on this site describe the kind of work the studio offers. A figure from the estimator is a guide, not a fixed quote and not an offer. Sending the enquiry form does not create a contract.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">A project starts in writing</h2>
        <p>
          Work starts only after Synthetix Studio sends a written proposal and you accept it. That proposal sets the scope, price, and timing. Anything outside that scope is quoted separately before it is built.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">What you receive</h2>
        <p>
          For an agreed website or custom tool, you receive the pages or tools described in the proposal. Once the agreed fee is paid, you own the custom design and code written for that project. Domain names, hosting, Stripe, Firebase, and other third-party accounts stay in your name and follow those providers’ own terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Your content</h2>
        <p>
          You are responsible for the text, logos, and other material you supply, and for having the right to use them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Liability</h2>
        <p>
          The public website is a description of the studio’s work. Paid project work is carried out with reasonable care. Liability for a paid project is limited to the fees you paid for that project, except where UK law does not allow a limit.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Law</h2>
        <p>
          These terms are governed by the laws of England and Wales. Questions about a project can be sent through the{" "}
          <Link href="/#contact" className="text-purple-300 hover:text-white underline underline-offset-2">
            enquiry form
          </Link>
          .
        </p>
      </section>
    </LegalDocument>
  );
}
