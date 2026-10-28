import {
  ADDON_FEATURES,
  CARE_PLANS,
  CONTACT_EMAIL,
  PROJECT_TYPES,
  formatPounds,
} from "@/lib/catalogue";
import { CARE_PLAN_OFFER_LINE, SHOW_CARE_PLAN_OFFER } from "@/lib/siteConfig";

export function resolveSelection({ projectTypeId, addonIds, carePlanId }) {
  const typeObj = PROJECT_TYPES.find((type) => type.id === projectTypeId) || PROJECT_TYPES[0];
  const addons = [];
  const seen = new Set();
  for (const id of Array.isArray(addonIds) ? addonIds : []) {
    if (seen.has(id)) continue;
    const addon = ADDON_FEATURES.find((item) => item.id === id);
    if (!addon) continue;
    seen.add(id);
    addons.push(addon);
  }
  const carePlan = CARE_PLANS.find((plan) => plan.id === carePlanId) || CARE_PLANS[0];
  const buildTotal = typeObj.basePrice + addons.reduce((sum, addon) => sum + addon.price, 0);
  return { typeObj, addons, carePlan, buildTotal };
}

function oneLine(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

export function enquirySubject({ kind, typeName, websiteUrl }) {
  if (kind === "website-check") {
    const site = websiteUrl ? ` — ${oneLine(websiteUrl)}` : "";
    return `Free website check${site}`.slice(0, 180);
  }
  return `Synthetix Studio enquiry — ${oneLine(typeName) || "website"}`.slice(0, 180);
}

export function buildEnquiryText({
  kind = "quote",
  name,
  business,
  email,
  phone,
  message,
  websiteUrl,
  projectTypeId,
  addonIds,
  carePlanId,
}) {
  const { typeObj, addons, carePlan, buildTotal } = resolveSelection({
    projectTypeId,
    addonIds,
    carePlanId,
  });
  const addonLines = addons.map((addon) =>
    addon.included ? `- ${addon.label} (included)` : `- ${addon.label} (+${formatPounds(addon.price)})`
  );
  const careLine =
    carePlan.price > 0
      ? `${carePlan.label} (${formatPounds(carePlan.price)}/mo)`
      : "None";
  const lines = [
    kind === "website-check" ? "Enquiry type: Free website check" : "Enquiry type: Project quote",
    `Name: ${name || "—"}`,
    `Business: ${business || "—"}`,
    `Email: ${email || "—"}`,
    `Phone: ${phone || "—"}`,
    `Current website: ${websiteUrl || "—"}`,
    "",
    `Package: ${typeObj.name} (${typeObj.desc})`,
    `Build total: ${formatPounds(buildTotal)}`,
    `Monthly care: ${careLine}`,
    "",
    "Add-ons:",
    ...(addonLines.length ? addonLines : ["- None"]),
    "",
    "Message:",
    message || "—",
  ];
  if (SHOW_CARE_PLAN_OFFER) {
    lines.push("", CARE_PLAN_OFFER_LINE);
  }
  return lines.join("\n");
}

export function buildEnquiryMailto(input) {
  const selection = resolveSelection(input);
  const subject = enquirySubject({
    kind: input.kind,
    typeName: selection.typeObj.name,
    websiteUrl: input.websiteUrl,
  });
  const body = buildEnquiryText(input);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
