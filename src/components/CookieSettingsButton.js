"use client";

import { COOKIE_SETTINGS_EVENT } from "@/lib/cookieConsent";

export default function CookieSettingsButton({ className = "" }) {
  return (
    <button
      type="button"
      className={`transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${className}`}
      onClick={() => {
        window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
      }}
    >
      Cookie settings
    </button>
  );
}
