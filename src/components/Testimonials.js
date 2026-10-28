import { visibleTestimonials } from "@/data/testimonials";

export default function Testimonials() {
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="results" className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Client results
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Before and after</h2>
          <p className="text-base text-slate-400 sm:text-lg">
            Notes from real clients of Synthetix Studio.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id || item.name}
              className="min-w-0 rounded-3xl border border-white/10 bg-[#101625] p-6 sm:p-8"
            >
              {item.quote ? (
                <blockquote className="text-base leading-relaxed break-words text-slate-100">
                  “{item.quote.trim()}”
                </blockquote>
              ) : null}
              <p className={`text-sm text-slate-300 ${item.quote ? "mt-4" : ""}`}>
                <span className="font-semibold text-white">{item.name.trim()}</span>
                {item.business?.trim() ? <span>{`, ${item.business.trim()}`}</span> : null}
              </p>
              {item.before?.trim() && item.after?.trim() ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0 rounded-2xl border border-white/10 bg-[#090D16] p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Before</div>
                    <p className="mt-2 text-sm leading-relaxed break-words text-slate-200">{item.before.trim()}</p>
                  </div>
                  <div className="min-w-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">After</div>
                    <p className="mt-2 text-sm leading-relaxed break-words text-slate-200">{item.after.trim()}</p>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
