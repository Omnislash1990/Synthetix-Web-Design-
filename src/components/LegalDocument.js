import Link from "next/link";

export default function LegalDocument({ title, children }) {
  return (
    <main className="min-h-screen bg-[#070A11] text-slate-200">
      <header className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-sm font-extrabold tracking-[0.18em] text-white">
            SYNTHETIX
            <span className="ml-2 text-[11px] font-medium tracking-[0.32em] text-purple-300">STUDIO</span>
          </Link>
          <Link href="/" className="text-sm text-slate-300 hover:text-white">
            Back to site
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
          Synthetix Studio, Birmingham
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-400">Last updated 22 October 2026</p>
        <div className="mt-10 space-y-8 text-sm sm:text-base leading-relaxed text-slate-300">
          {children}
        </div>
      </article>

      <footer className="border-t border-white/10 py-8 text-xs text-slate-400">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/#about" className="hover:text-white">
            About
          </Link>
        </div>
      </footer>
    </main>
  );
}
