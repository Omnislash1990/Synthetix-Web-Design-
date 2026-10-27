"use client";

import { ArrowRight } from "lucide-react";
import { trackAnalyticsEvent } from "@/lib/cookieConsent";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400";

function trackAppClick(project) {
  trackAnalyticsEvent("app_click", {
    app_id: project.id,
    link_url: project.href,
  });
}

export function LiveAppSubdomain({ project }) {
  const badge =
    "inline-flex max-w-full items-center rounded-lg border border-cyan-500/20 bg-cyan-950/50 px-3 py-1 text-xs font-mono text-cyan-400";

  if (!project.href) {
    return <span className={badge}>{project.subdomain}</span>;
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAppClick(project)}
      className={`${badge} transition hover:border-cyan-300/70 hover:text-cyan-200 ${focusRing}`}
    >
      {project.subdomain}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function OpenAppLink({ project, className = "", fullWidth = false }) {
  if (!project?.href) return null;

  const width = fullWidth ? "w-full" : "w-full sm:w-auto";

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAppClick(project)}
      className={`inline-flex min-h-11 ${width} items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-950/70 hover:text-white ${focusRing} ${className}`}
    >
      <span>Open app</span>
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
