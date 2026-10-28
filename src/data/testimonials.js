/**
 * Real client testimonials and before-and-after notes.
 * The homepage section renders nothing while this array is empty.
 * Add an entry only when it is a real client result. Do not add sample quotes.
 *
 * Fields for a real entry:
 * - id: string
 * - name: string (required for the entry to show)
 * - business: string
 * - quote: the client's own words
 * - before: string
 * - after: string
 *
 * An entry is shown only when it has a name and either a quote or both a before and an after.
 */
export const TESTIMONIALS = [];

export function visibleTestimonials(entries = TESTIMONIALS) {
  if (!Array.isArray(entries)) return [];
  return entries.filter((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const name = typeof entry.name === "string" ? entry.name.trim() : "";
    const quote = typeof entry.quote === "string" ? entry.quote.trim() : "";
    const before = typeof entry.before === "string" ? entry.before.trim() : "";
    const after = typeof entry.after === "string" ? entry.after.trim() : "";
    return Boolean(name && (quote || (before && after)));
  });
}
