import { CONTACT_EMAIL } from "@/lib/catalogue";
import { validateEnquiry } from "@/lib/contactRequest";
import { buildEnquiryText, enquirySubject, resolveSelection } from "@/lib/enquiry";

// Basic limit for one server instance. A busy Vercel deploy can run more than one instance.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = globalThis.__synthetixContactHits || new Map();
globalThis.__synthetixContactHits = hits;

const DEFAULT_FROM = "Synthetix Studio <enquiries@synthetixstudio.co.uk>";

const NOT_CONFIGURED_MESSAGE =
  "Email sending is not set up on this website yet, so this form cannot deliver your enquiry. Nothing has been sent.";
const SEND_FAILED_MESSAGE =
  "The website could not send your enquiry just now. Nothing has been delivered.";

function clientIp(request) {
  const realIp = (request.headers.get("x-real-ip") || "").trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return "local";
}

function allowRequest(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      const fresh = times.filter((time) => now - time < WINDOW_MS);
      if (fresh.length === 0) hits.delete(key);
      else hits.set(key, fresh);
    }
  }
  return true;
}

function fromAddress() {
  const configured = (process.env.CONTACT_FROM_EMAIL || "").trim();
  return configured || DEFAULT_FROM;
}

async function sendWithResend({ subject, text, replyTo }) {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  if (!apiKey) return { ok: false, reason: "not_configured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [CONTACT_EMAIL],
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      console.error("Contact email was rejected", response.status);
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("Contact email request failed", error instanceof Error ? error.name : "Error");
    return { ok: false, reason: "send_failed" };
  }
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return Response.json(
      { delivered: false, message: "That enquiry is too long to send." },
      { status: 413 }
    );
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return Response.json({ delivered: false, message: "We could not read that form." }, { status: 400 });
  }
  if (raw.length > 20_000) {
    return Response.json(
      { delivered: false, message: "That enquiry is too long to send." },
      { status: 413 }
    );
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ delivered: false, message: "We could not read that form." }, { status: 400 });
  }

  const ip = clientIp(request);
  if (!allowRequest(ip)) {
    return Response.json(
      {
        delivered: false,
        fallback: true,
        message:
          "Too many enquiries were sent from this connection. Wait a while before trying the form again. Nothing further has been delivered.",
      },
      { status: 429 }
    );
  }

  const validated = validateEnquiry(body);
  if (!validated.ok) {
    return Response.json({ delivered: false, message: validated.message }, { status: 400 });
  }
  if (validated.honeypot) {
    return Response.json({ delivered: true });
  }

  const enquiry = validated.value;
  const selection = resolveSelection(enquiry);
  const text = buildEnquiryText(enquiry);
  const subject = enquirySubject({
    kind: enquiry.kind,
    typeName: selection.typeObj.name,
    websiteUrl: enquiry.websiteUrl,
  });
  const sent = await sendWithResend({
    subject,
    text,
    replyTo: enquiry.email,
  });

  if (sent.ok) {
    return Response.json({
      delivered: true,
      message: "Your enquiry has been sent to Synthetix Studio.",
    });
  }

  return Response.json(
    {
      delivered: false,
      fallback: true,
      message: sent.reason === "not_configured" ? NOT_CONFIGURED_MESSAGE : SEND_FAILED_MESSAGE,
    },
    { status: 503 }
  );
}
