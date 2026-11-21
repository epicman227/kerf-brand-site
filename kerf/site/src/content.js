// Page content for the Kerf site. One page. Source: the approved brief on KERA-477 (STRAT-6):
// "Positioning brief v2" and "Website rewrite plan", look locked to D v2 Rings (KERA-524).
// Rules: no invented testimonials, numbers or logos. No "coming soon", "planned" or "beta" on a feature.
// QuickBooks Online and QuoteIQ are the only CRMs named. No Jobber. No price in this file: the
// cost and founding blocks come from src/pricing.local.js, which is not committed (see build.mjs).

// PLACEHOLDER: Connor has not supplied the real booking link. Replace this one value.
// Not a working calendar. Nothing books itself until it is replaced.
export const BOOK_URL = "https://calendly.com/kerf-placeholder/20-minute-look";
export const BOOK_IS_PLACEHOLDER = true;

// Form handler stub. src/form.js validates and posts here. functions/api/lead.js stores the lead
// and sends nothing to anyone. Without a LEADS binding it answers 503 and the form shows its error.
export const FORM_ENDPOINT = "/api/lead";

// Hero teaser cut. null until the Video Producer's file exists. While null, the hero shows the
// poster built in the page. Set { src, poster } and the hero plays muted, looped, inline.
export const HERO_VIDEO = null;

export const TREE = {
  key: "tree",
  title: "Kerf. The operating system for a tree company.",
  description:
    "The board, the follow-up in your voice, the report, and the growth around the work. Kerf runs on Quo, works with the CRM you have, and you tap before anything goes out.",
  tagline: "Your business follows through with Kerf.",
  eyebrow: "For tree care companies",
  headline: ["The operating system", "for a tree company."],
  sub: "The board, the follow-up in your voice, the report, and the growth around the work. It runs on Quo. You tap before anything goes out.",
  suite: {
    eyebrow: "The suite",
    heading: "One place for the work.",
    lead: "Who to call, what to send, what the week paid, and the growth around the work.",
    groups: [
      ["Core", [
        ["Board", "Every call, text, form, and estimate lands in one place, with a score, so you know who to call first."],
        ["Drafts", "The next text is written in your voice. You send, edit, or skip. Nothing goes out until you tap."],
        ["Follow-up", "An open estimate gets a follow-up. After the job, a review ask, then a referral ask. Each one waits for your tap."],
        ["Report", "Leads, how fast you replied, estimates, jobs won, and what each source paid."],
        ["Business health", "How the shop is doing, in one view."],
        ["Analytics", "The same numbers as the report and business health. One place, not a second app."],
      ]],
      ["Growth", [
        ["Neighbors", "A postcard to the homes around a job you already did, in Douglas, Arapahoe, and Jefferson counties. You tap before it mails."],
        ["Social", "Review replies and posts, in your voice. You tap before they go."],
        ["Ads", "Campaigns drafted for the work you do. You confirm before they run."],
        ["Growth", "Where you rank, and a clear list of site fixes. You apply the fixes."],
        ["Scouts", "People already asking for tree work, with a draft you can post. Kerf does not post it for you."],
        ["Referrals", "Kerf tracks a referral and queues the reward for your tap. It does not pay the reward."],
      ]],
    ],
  },
  quo: {
    eyebrow: "Quo",
    heading: "Kerf runs on Quo.",
    body: [
      "Kerf is not a phone system. Your customers call the Quo number. Quo is what puts the call and the text on the board.",
      "If you want an assistant to pick up, that is Quo's own AI, Sona. Kerf does not turn it on. Kerf drafts the follow-up in your voice, and nothing goes out until you tap.",
      "If Quo is disconnected, the board stops getting new calls and texts, and Kerf stops sending. Your Quo app keeps working.",
    ],
    two: "You pay Quo for the phone. You pay Kerf for the system. They are two bills.",
  },
  crm: {
    eyebrow: "The CRM you have",
    heading: "You keep estimating where you do now.",
    body: "Kerf does not replace your CRM. It works with QuickBooks Online and QuoteIQ. Moving a card on the board does not write back to the CRM and does not send anything.",
    names: ["QuickBooks Online", "QuoteIQ"],
  },
  week: {
    eyebrow: "How a week works",
    heading: "It lands on the board. You tap. The report shows where the money came from.",
    steps: [
      ["It lands", "A call, a text, a form, or an estimate shows up on the board with a score."],
      ["You tap", "The same tap covers a postcard, a reply, or an ad. Send, edit, or skip."],
      ["You see the money", "The report shows which source paid, by the job."],
    ],
    note: "Approval first. Nothing goes to a customer without your tap.",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Plain answers.",
    items: [
      ["Do I have to use Quo?", ["Yes. Kerf runs on Quo. It does not connect to another phone system."]],
      ["Does Kerf answer the phone?", ["No. Quo's AI can, if you turn that on in Quo. Kerf makes sure the lead does not go cold after that. A missed call can leave a text draft. You tap before it goes."]],
      ["Does Kerf text my customers by itself?", ["Not at the start. You get Send, Edit, or Skip. Undo holds a send for 5 seconds. A message type can send itself only after you have sent 50 of that type with no edits and you turn that on. You can turn it back."]],
      ["Can I keep my number?", [
        "Yes. Move the business number customers already call onto Quo. Kerf does not move it. Quo does.",
        "If that move is not done, forward the number to a Quo number. Calls still come in, and Kerf still gets them. Forwarding is the fallback.",
        "A personal cell can stay personal. Kerf will not ask you to move it. You can forward missed calls from it instead.",
      ]],
      ["What CRM do I need?", ["The one you estimate in now. Kerf does not replace it. This page names QuickBooks Online and QuoteIQ. You keep estimating there. Moving a card does not write back and does not send."]],
      ["What will I see on a call?", ["North Fork Arbor Care, a made-up company. Not your books. Nothing is sent while we look."]],
      ["Is there an app store app?", ["No. It is the phone browser. Add to Home Screen."]],
    ],
  },
  // Product shots. Stays empty until captures of the KERA-526 build exist. Nothing renders while empty.
  screens: [],
  close: {
    heading: "Reply for a 20 minute look.",
    sub: "We show you Kerf on a made-up company, North Fork Arbor Care. No real customer data is on screen.",
    ask: "Book 20 minutes",
  },
  form: {
    note: "Or leave your details and we will reach out.",
    success: "Got it. We will be in touch.",
    failure: "That did not go through. Please try again in a minute.",
    systems: ["QuickBooks Online", "QuoteIQ", "Something else"],
  },
  footer: "Kerf. Built by an arborist, for arborists.",
};

const PENDING = "Pending legal review. This page is a placeholder, not final, and not legal advice.";
export const LEGAL = {
  privacy: {
    file: "privacy",
    title: "Privacy",
    paras: [
      PENDING,
      "The contact form on this site collects the name, company, phone, email, and business system you type in. We use it to reply to you about a look at Kerf. We do not sell it.",
      "The final privacy policy will replace this page after legal review.",
    ],
  },
  terms: {
    file: "terms",
    title: "Terms",
    paras: [
      PENDING,
      "Nothing on this site is an offer, a price, or a guarantee.",
      "The final terms will replace this page after legal review.",
    ],
  },
};
