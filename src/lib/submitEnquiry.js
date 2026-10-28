export async function submitEnquiry(payload) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    if (data.delivered) {
      return { status: "sent", message: data.message || "" };
    }
    if (data.fallback || !response.ok) {
      return {
        status: data.fallback || response.status >= 500 || response.status === 429 ? "fallback" : "error",
        message:
          data.message ||
          "The website could not send your enquiry. Nothing has been delivered.",
      };
    }
    return {
      status: "error",
      message: data.message || "Please check the form and try again.",
    };
  } catch {
    return {
      status: "fallback",
      message: "The website could not reach the form service just now. Nothing has been delivered.",
    };
  }
}
