export const CONTACT_EMAIL = "synthetix.studio1@gmail.com";

export const PROJECT_TYPES = [
  {
    id: "website",
    name: "Business Website",
    desc: "1–5 pages",
    basePrice: 795,
  },
  {
    id: "larger-website",
    name: "Larger Website",
    desc: "6–10 pages",
    basePrice: 1295,
  },
  {
    id: "portal",
    name: "Trade / Field Service Portal",
    desc: "Job sheets, engineer forms, signatures, and automated emails",
    basePrice: 1950,
  },
];

export const ADDON_FEATURES = [
  {
    id: "auth",
    label: "Logins + cloud database",
    price: 395,
    detail:
      "Secure Google or email sign-in and a cloud database for one core record type (e.g. jobs or customers), up to 3 user roles.",
  },
  {
    id: "pdf",
    label: "Digital signatures + branded PDFs",
    price: 295,
    detail: "On-screen signature capture and 1 branded PDF template, emailed automatically.",
  },
  {
    id: "stripe",
    label: "Stripe payments",
    price: 350,
    detail: "One-off card payments or deposits via Stripe Checkout (subscriptions quoted separately).",
  },
  {
    id: "calculator",
    label: "Quote calculator",
    price: 200,
    detail: "A simple instant-price calculator with up to about 10 options.",
  },
  { id: "setup", label: "Domain, SSL & setup", price: 0, included: true },
];

export const CARE_PLANS = [
  { id: "none", label: "No care plan", price: 0 },
  {
    id: "hosting-care",
    label: "Hosting + Care",
    price: 29,
    detail: "Hosting, SSL, backups, uptime and security monitoring.",
  },
  {
    id: "care-edits",
    label: "Care + Edits + SEO report",
    price: 59,
    detail:
      "Everything in £29, plus up to 1 hour of small edits a month and a monthly Google performance report (searches, clicks, rankings for key local terms, speed and errors). The report covers results; it’s not ongoing SEO work.",
  },
  {
    id: "portal-support",
    label: "Portal Support",
    price: 119,
    detail:
      "Everything in £59, plus portal upkeep (logins, database, PDFs, emails), bug fixes, Firebase and Stripe monitoring, up to 2 hours of changes a month and a next-working-day response. New features are quoted separately.",
  },
];

export function formatPounds(amount) {
  return `£${amount.toLocaleString("en-GB")}`;
}
