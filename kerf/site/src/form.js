// Form handler stub. Validates in the browser, posts JSON to FORM_ENDPOINT, and reports ok or not.
// The endpoint (functions/api/lead.js) stores the lead and sends nothing to anyone.
export function validate(data) {
  const need = ["name", "company", "phone", "email"];
  for (const f of need) if (!String(data[f] || "").trim()) return false;
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email).trim());
}
export async function submitLead(endpoint, data) {
  if (!validate(data)) return "invalid";
  try {
    const res = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    return res.ok ? "sent" : "error";
  } catch (_) {
    return "error";
  }
}
