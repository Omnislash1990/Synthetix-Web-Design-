import { whatsAppHref } from "@/lib/siteConfig";

function WhatsAppGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6-1.6A11 11 0 0 0 20.5 3.5zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.6.9.9-3.5-.2-.3A9.1 9.1 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9 14 14 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"
      />
    </svg>
  );
}

const VARIANT_CLASS = {
  solid:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#128C7E] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f7a6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-2xl border border-[#128C7E]/50 bg-[#128C7E]/15 px-7 py-4 text-base font-semibold text-slate-100 transition hover:bg-[#128C7E]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
  link: "inline-flex items-center gap-1.5 font-semibold text-emerald-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300",
};

export default function WhatsAppButton({ message, variant = "outline", className = "" }) {
  const href = whatsAppHref(message);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${VARIANT_CLASS[variant] || VARIANT_CLASS.outline} ${className}`.trim()}
    >
      <WhatsAppGlyph className={variant === "link" ? "h-3.5 w-3.5 shrink-0" : "h-4 w-4 shrink-0"} />
      <span>Message us on WhatsApp</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
