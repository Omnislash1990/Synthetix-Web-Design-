"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import {
  COOKIE_SETTINGS_EVENT,
  applyCookieChoice,
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeToConsent,
  writeStoredConsent,
} from "@/lib/cookieConsent";

export default function CookieConsent() {
  const titleId = useId();
  const stored = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const open = stored === "unset" || settingsOpen;

  useEffect(() => {
    if (stored === "accepted" || stored === "rejected") {
      applyCookieChoice(stored);
    }
  }, [stored]);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.paddingBottom = "";
      return undefined;
    }

    const banner = document.getElementById("cookie-banner");
    if (!banner) return undefined;

    const applyPadding = () => {
      document.body.style.paddingBottom = `${banner.offsetHeight}px`;
    };
    applyPadding();
    const observer = new ResizeObserver(applyPadding);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  const choose = (next) => {
    writeStoredConsent(next);
    setSettingsOpen(false);
  };

  if (stored === "pending" || !open) return null;

  const currentChoice = stored === "accepted" || stored === "rejected" ? stored : null;

  return (
    <div
      id="cookie-banner"
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#101625]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
        <h2 id={titleId} className="text-sm font-semibold text-white">
          Cookies on this site
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Analytics cookies stay off until you accept them. Accept loads Google Analytics. Reject leaves it unloaded. You can change this later from Cookie settings in the footer.
        </p>
        {currentChoice ? (
          <p className="mt-2 text-xs text-slate-400">
            Current choice: {currentChoice === "accepted" ? "accepted" : "rejected"}.
          </p>
        ) : null}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cookies"
            className="text-sm font-medium text-purple-300 underline underline-offset-2 hover:text-white"
          >
            Read about cookies
          </Link>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className={`inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-semibold text-slate-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                currentChoice === "rejected"
                  ? "border-purple-400 bg-white/10"
                  : "border-white/15 bg-white/5 hover:bg-white/10"
              }`}
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                currentChoice === "accepted"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 ring-2 ring-purple-300/70"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500"
              }`}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
