import { Star } from "lucide-react";

function reviewUrl() {
  const value = (process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "").trim();
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

export default function GoogleReviewLink({ compact = false }) {
  const href = reviewUrl();
  if (!href) return null;

  const sizing = compact ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 ${sizing} font-semibold text-slate-200 transition hover:border-purple-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400`}
    >
      <Star className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
      <span>Leave us a Google review</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
