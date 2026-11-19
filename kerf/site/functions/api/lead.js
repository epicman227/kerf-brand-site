// Cloudflare Pages Function: receives the contact form. It validates and stores the lead in a KV
// namespace bound as LEADS. It sends nothing to anyone. If LEADS is not bound it returns 503, so the
// form shows its error state instead of pretending the lead was saved.
const FIELDS = ["name", "company", "phone", "email", "system"];

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch (_) { return json({ ok: false }, 400); }
  if (data.website) return json({ ok: true }); // honeypot: pretend success, store nothing
  const lead = {};
  for (const f of FIELDS) lead[f] = String(data[f] || "").trim().slice(0, 200);
  if (!lead.name || !lead.company || !lead.phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) return json({ ok: false }, 400);
  if (!env.LEADS) return json({ ok: false }, 503);
  lead.at = new Date().toISOString();
  await env.LEADS.put(`lead:${lead.at}:${crypto.randomUUID()}`, JSON.stringify(lead));
  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}
