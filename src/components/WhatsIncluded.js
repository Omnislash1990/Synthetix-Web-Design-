import { CONTACT_EMAIL } from "@/lib/catalogue";
import { WHATSAPP_GENERAL_MESSAGE, whatsAppHref } from "@/lib/siteConfig";
import {
  FileCheck,
  Globe,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const INCLUDED = [
  {
    id: "ownership",
    title: "100% ownership",
    text: "Your domain, code and content are yours. No lock-in, full handover.",
    icon: ShieldCheck,
  },
  {
    id: "domain",
    title: "Free domain for the first year",
    text: "Plus SSL and setup, on every package.",
    icon: Globe,
  },
  {
    id: "price",
    title: "Fixed price",
    text: "Agreed upfront, with no hidden fees.",
    icon: FileCheck,
  },
  {
    id: "mobile",
    title: "Mobile-first and fast",
    text: "On every package.",
    icon: Smartphone,
  },
  {
    id: "direct",
    title: "Deal directly",
    icon: MessageCircle,
  },
  {
    id: "check",
    title: "Free website check",
    text: "Or a homepage mock-up first.",
    icon: Search,
  },
  {
    id: "revisions",
    title: "2 rounds of revisions",
    text: "Included with your package.",
    icon: PenLine,
  },
];

const linkClass = "font-medium text-purple-300 transition hover:text-white";

function DirectLine() {
  const whatsApp = whatsAppHref(WHATSAPP_GENERAL_MESSAGE);

  return (
    <p className="mt-1 text-sm leading-relaxed break-words text-slate-400">
      With the person building it, by{" "}
      {whatsApp ? (
        <a href={whatsApp} target="_blank" rel="noopener noreferrer" className={linkClass}>
          WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        "WhatsApp"
      )}{" "}
      or{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
        email
      </a>
      .
    </p>
  );
}

export default function WhatsIncluded() {
  return (
    <section
      id="included"
      aria-labelledby="included-heading"
      className="relative z-10 border-b border-white/10 bg-[#090D16] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl space-y-3 text-center sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
            Every package
          </span>
          <h2 id="included-heading" className="text-3xl font-extrabold text-white sm:text-4xl">
            {"What's included"}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INCLUDED.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className="flex min-w-0 gap-4 rounded-2xl border border-white/10 bg-[#111726] p-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/20">
                  <Icon className="h-5 w-5 text-purple-300" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold break-words text-white">{item.title}</h3>
                  {item.id === "direct" ? (
                    <DirectLine />
                  ) : (
                    <p className="mt-1 text-sm leading-relaxed break-words text-slate-400">{item.text}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
