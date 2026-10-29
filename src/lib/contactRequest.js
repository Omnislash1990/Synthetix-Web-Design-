import { ADDON_FEATURES, CARE_PLANS, PROJECT_TYPES } from "@/lib/catalogue";

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function honeypotTripped(value) {
  if (value == null) return false;
  if (typeof value === "string") return value.trim() !== "";
  return true;
}

function cleanLine(value, max) {
  if (value == null || value === "") return { value: "" };
  if (typeof value !== "string") return { error: "invalid" };
  const text = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\s+/g, " ").trim();
  if (!text) return { value: "" };
  if (text.length > max) return { error: "long" };
  return { value: text };
}

function cleanMessage(value) {
  if (value == null || value === "") return { value: "" };
  if (typeof value !== "string") return { error: "invalid" };
  const text = value.replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  if (!text) return { value: "" };
  if (text.length > 5000) return { error: "long" };
  return { value: text };
}

export function normalizeWebsite(value) {
  if (value == null || value === "") return { value: "" };
  if (typeof value !== "string") return { error: "invalid" };
  const raw = value.trim();
  if (!raw) return { value: "" };
  if (raw.length > 300 || /\s/.test(raw)) return { error: "invalid" };
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url;
  try {
    url = new URL(withProtocol);
  } catch {
    return { error: "invalid" };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return { error: "invalid" };
  if (!url.hostname.includes(".")) return { error: "invalid" };
  return { value: url.toString() };
}

function cleanEmail(value) {
  if (typeof value !== "string") return { error: "invalid" };
  const email = value.trim();
  if (!email || email.length > 200 || /[\r\n\s]/.test(email) || !EMAIL_RE.test(email)) {
    return { error: "invalid" };
  }
  return { value: email };
}

function cleanPhone(value) {
  if (value == null || value === "") return { value: "" };
  if (typeof value !== "string") return { error: "invalid" };
  const phone = value.trim();
  if (!phone) return { value: "" };
  if (phone.length > 40 || !/^[0-9+().\-\s]+$/.test(phone)) return { error: "invalid" };
  return { value: phone };
}

function cleanIdList(value) {
  if (value == null) return { value: [] };
  if (!Array.isArray(value) || value.length > 20) return { error: "invalid" };
  const ids = [];
  for (const id of value) {
    if (typeof id !== "string" || !id || id.length > 40) return { error: "invalid" };
    if (!ids.includes(id)) ids.push(id);
  }
  return { value: ids };
}

export function validateEnquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, message: "We could not read that form." };
  }
  if (honeypotTripped(body.company_fax)) {
    return { ok: true, honeypot: true };
  }

  const kind =
    body.kind === "website-check" ? "website-check" : body.kind === "app-idea" ? "app-idea" : "quote";

  const name = cleanLine(body.name, 120);
  if (name.error || !name.value) {
    return { ok: false, message: name.error === "long" ? "That name is too long." : "Add your name." };
  }

  const email = cleanEmail(body.email);
  if (email.error) {
    return { ok: false, message: "Add a valid email address so we can reply." };
  }

  const business = cleanLine(body.business, 160);
  if (business.error) {
    return {
      ok: false,
      message: business.error === "long" ? "That business name is too long." : "Check the business name.",
    };
  }

  const phone = cleanPhone(body.phone);
  if (phone.error) {
    return { ok: false, message: "Check the phone number. Use digits and spaces only, or leave it blank." };
  }

  const website = normalizeWebsite(body.websiteUrl);
  if (website.error) {
    return {
      ok: false,
      message:
        kind === "website-check"
          ? "Add the address of your current website, such as www.yourbusiness.co.uk."
          : "That website address does not look valid. Use something like www.yourbusiness.co.uk, or leave it blank.",
    };
  }
  if (kind === "website-check" && !website.value) {
    return {
      ok: false,
      message: "Add the address of your current website, such as www.yourbusiness.co.uk.",
    };
  }

  const message = cleanMessage(body.message);
  if (message.error) {
    return {
      ok: false,
      message: message.error === "long" ? "That message is too long." : "Check the message and try again.",
    };
  }
  if ((kind === "quote" || kind === "app-idea") && !message.value) {
    return {
      ok: false,
      message:
        kind === "app-idea"
          ? "Tell us a little about the app idea."
          : "Tell us a little about the website you want.",
    };
  }

  if (typeof body.projectTypeId !== "string" || !PROJECT_TYPES.some((type) => type.id === body.projectTypeId)) {
    return { ok: false, message: "Choose a package and try again." };
  }

  const addonIds = cleanIdList(body.addonIds);
  if (addonIds.error || addonIds.value.some((id) => !ADDON_FEATURES.some((addon) => addon.id === id))) {
    return { ok: false, message: "Those add-ons could not be matched. Refresh the page and try again." };
  }

  if (typeof body.carePlanId !== "string" || !CARE_PLANS.some((plan) => plan.id === body.carePlanId)) {
    return { ok: false, message: "Choose a care plan option and try again." };
  }

  return {
    ok: true,
    value: {
      kind,
      name: name.value,
      business: business.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      websiteUrl: website.value,
      projectTypeId: body.projectTypeId,
      addonIds: addonIds.value,
      carePlanId: body.carePlanId,
    },
  };
}
