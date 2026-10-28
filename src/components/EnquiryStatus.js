import { CheckCircle2, Mail } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { hasWhatsAppNumber } from "@/lib/siteConfig";

export function EnquirySuccess({ title, children, onReset }) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center sm:p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle2 className="h-9 w-9 text-emerald-300" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <div className="max-w-md text-sm leading-relaxed text-slate-300">{children}</div>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
        >
          Send another
        </button>
      ) : null}
    </div>
  );
}

export function EnquiryFallback({ message, mailtoHref, whatsAppMessage, onEdit }) {
  const showWhatsApp = hasWhatsAppNumber();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-6 text-center sm:p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20">
        <Mail className="h-9 w-9 text-amber-200" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-bold text-white">Not sent yet</h3>
      <p className="max-w-md text-sm leading-relaxed text-slate-200">{message}</p>
      <p className="max-w-md text-sm leading-relaxed text-slate-300">
        {showWhatsApp
          ? "Open the email draft or message us on WhatsApp, then send it yourself so it reaches Synthetix Studio."
          : "Open the email draft and send it yourself so it reaches Synthetix Studio."}
      </p>
      <div className="flex w-full max-w-md flex-col gap-3">
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-bold text-white"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Open the email draft
        </a>
        <WhatsAppButton message={whatsAppMessage} variant="solid" className="w-full" />
      </div>
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-white/15"
        >
          Edit enquiry
        </button>
      ) : null}
    </div>
  );
}
