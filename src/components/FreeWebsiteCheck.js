"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { EnquiryFallback, EnquirySuccess } from "@/components/EnquiryStatus";
import HoneypotField from "@/components/HoneypotField";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CONTACT_EMAIL } from "@/lib/catalogue";
import { normalizeWebsite } from "@/lib/contactRequest";
import { buildEnquiryMailto } from "@/lib/enquiry";
import { freeCheckWhatsAppMessage, hasWhatsAppNumber } from "@/lib/siteConfig";
import { submitEnquiry } from "@/lib/submitEnquiry";

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-[#070A11] px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none";

export default function FreeWebsiteCheck({ projectTypeId, addonIds, carePlanId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
    companyFax: "",
  });
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [mailDraftHref, setMailDraftHref] = useState("");

  const websiteForMessage = (() => {
    const normalized = normalizeWebsite(form.website);
    return normalized.value || form.website.trim();
  })();

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setFormError("");
    const normalized = normalizeWebsite(form.website);
    const payload = {
      kind: "website-check",
      name: form.name,
      business: "",
      email: form.email,
      phone: "",
      message: form.message,
      websiteUrl: normalized.value || form.website.trim(),
      projectTypeId,
      addonIds,
      carePlanId,
      company_fax: form.companyFax,
    };
    setMailDraftHref(buildEnquiryMailto(payload));
    const result = await submitEnquiry(payload);
    if (result.status === "sent") {
      setStatus("sent");
      return;
    }
    if (result.status === "fallback") {
      setFormError(result.message);
      setStatus("fallback");
      return;
    }
    setFormError(result.message);
    setStatus("idle");
  }

  return (
    <section id="website-check" className="relative z-10 scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#131B2E] to-[#0D1322] p-6 shadow-2xl sm:p-10">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="min-w-0 space-y-5 lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                Free website check
              </span>
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Send your current website. Get a free review or a homepage mock-up.
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Share the address of the site you have now. Synthetix Studio will reply with a free review, or a homepage mock-up of how a new one could look. There is no charge and no obligation.
              </p>
              {hasWhatsAppNumber() ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">
                    Or message us on WhatsApp with your website address.
                  </p>
                  <WhatsAppButton
                    message={freeCheckWhatsAppMessage(websiteForMessage)}
                    variant="solid"
                    className="w-full sm:w-auto"
                  />
                </div>
              ) : null}
            </div>

            <div className="min-w-0 lg:col-span-7">
              {status === "sent" ? (
                <EnquirySuccess
                  title="Website check requested"
                  onReset={() => {
                    setStatus("idle");
                    setFormError("");
                  }}
                >
                  <p>
                    Your website address has been sent to Synthetix Studio at{" "}
                    <strong className="text-white">{CONTACT_EMAIL}</strong>. We will reply with a free review or a homepage mock-up.
                  </p>
                </EnquirySuccess>
              ) : null}

              {status === "fallback" ? (
                <EnquiryFallback
                  message={formError}
                  mailtoHref={mailDraftHref}
                  whatsAppMessage={freeCheckWhatsAppMessage(websiteForMessage)}
                  onEdit={() => setStatus("idle")}
                />
              ) : null}

              {status === "idle" || status === "sending" ? (
                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <HoneypotField value={form.companyFax} onChange={(value) => update("companyFax", value)} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="check-name" className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Your name *
                      </label>
                      <input
                        id="check-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        placeholder="e.g. Alex Parton"
                        className={fieldClass}
                      />
                    </div>
                    <div className="min-w-0">
                      <label htmlFor="check-email" className="mb-1.5 block text-xs font-semibold text-slate-300">
                        Email address *
                      </label>
                      <input
                        id="check-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        placeholder="you@company.co.uk"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="check-website" className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Current website *
                    </label>
                    <input
                      id="check-website"
                      type="text"
                      required
                      inputMode="url"
                      autoComplete="url"
                      value={form.website}
                      onChange={(event) => update("website", event.target.value)}
                      placeholder="www.yourbusiness.co.uk"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="check-note" className="mb-1.5 block text-xs font-semibold text-slate-300">
                      Anything we should look at
                    </label>
                    <textarea
                      id="check-note"
                      rows={3}
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                      placeholder="Optional. Tell us what feels outdated, slow, or hard to use."
                      className={fieldClass}
                    />
                  </div>
                  {formError ? (
                    <p className="text-sm text-amber-200" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 py-4 text-base font-bold text-white shadow-xl shadow-purple-600/25 transition hover:from-indigo-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{status === "sending" ? "Sending..." : "Request a free website check"}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
