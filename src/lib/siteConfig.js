/**
 * Public site flags. These NEXT_PUBLIC_ values are inlined at build time.
 * Change them in the Vercel project, then redeploy, before the live site updates.
 */

/**
 * Care plan offer line.
 * Shown only when NEXT_PUBLIC_SHOW_CARE_PLAN_OFFER is exactly "true".
 * Unset, "false", or any other value keeps the line hidden. Default is off.
 * The line does not change estimator prices.
 */
export const SHOW_CARE_PLAN_OFFER = process.env.NEXT_PUBLIC_SHOW_CARE_PLAN_OFFER === "true";

export const CARE_PLAN_OFFER_LINE =
  "First 3 clients this month get the first month of the care plan free";

export const WHATSAPP_FREE_CHECK_MESSAGE =
  "Hi Synthetix Studio, I'd like a free website check for: ";

export const WHATSAPP_GENERAL_MESSAGE =
  "Hi Synthetix Studio, I'd like to ask about a website for my business.";

export function whatsAppNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
}

export function hasWhatsAppNumber() {
  return whatsAppNumber().length > 0;
}

export function freeCheckWhatsAppMessage(websiteUrl = "") {
  const url = String(websiteUrl || "").trim();
  return url ? `${WHATSAPP_FREE_CHECK_MESSAGE}${url}` : WHATSAPP_FREE_CHECK_MESSAGE;
}

export function whatsAppHref(message) {
  const number = whatsAppNumber();
  if (!number) return "";
  const text = String(message || WHATSAPP_GENERAL_MESSAGE);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
