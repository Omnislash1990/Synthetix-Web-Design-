export const COOKIE_CONSENT_STORAGE_KEY = "synthetix-cookie-consent";
export const COOKIE_SETTINGS_EVENT = "synthetix:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "synthetix:consent-changed";

let memoryChoice = null;

/** Consent Mode v2. Advertising signals stay denied; analytics is opt-in. */
export const CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export const CONSENT_ACCEPTED = {
  ad_storage: "denied",
  analytics_storage: "granted",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

const MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "").trim();

let consentDefaultSet = false;
let gaScriptRequested = false;

export function measurementId() {
  return /^G-[A-Z0-9]+$/i.test(MEASUREMENT_ID) ? MEASUREMENT_ID : "";
}

export function readStoredConsent() {
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "rejected") {
      memoryChoice = value;
      return value;
    }
  } catch {
    // Private browsing can block storage. Fall back to the session choice.
  }
  return memoryChoice;
}

export function writeStoredConsent(choice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
  } catch {
    // The session choice still applies when storage is blocked.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function subscribeToConsent(onStoreChange) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getConsentSnapshot() {
  return readStoredConsent() ?? "unset";
}

export function getConsentServerSnapshot() {
  return "pending";
}

function gtag() {
  window.dataLayer.push(arguments);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = gtag;
  }
  if (!consentDefaultSet) {
    window.gtag("consent", "default", CONSENT_DENIED);
    consentDefaultSet = true;
  }
}

function loadGaScript(id) {
  if (gaScriptRequested || document.getElementById("synthetix-ga4")) {
    gaScriptRequested = true;
    return;
  }
  gaScriptRequested = true;
  window.gtag("js", new Date());
  const script = document.createElement("script");
  script.id = "synthetix-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
  window.gtag("config", id);
}

/**
 * Loads gtag only after an explicit accept, and only when a measurement ID is set.
 * Reject updates consent to denied when the tag is already on the page, and does not load it otherwise.
 */
export function applyCookieChoice(choice) {
  const id = measurementId();
  if (!id) return;

  if (choice === "accepted") {
    ensureGtag();
    window.gtag("consent", "update", CONSENT_ACCEPTED);
    loadGaScript(id);
    return;
  }

  if (choice === "rejected" && consentDefaultSet && typeof window.gtag === "function") {
    window.gtag("consent", "update", CONSENT_DENIED);
  }
}
