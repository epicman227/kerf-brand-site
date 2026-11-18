// Landing page copy for withkerf.com. Source of truth: the positioning brief on KERA-269 (2026-11-18) and kerf-canon.
// Rules: no invented testimonials, numbers or logos. No receptionist, no Spanish add-on,
// no integrations beyond QuoteIQ and Quo, no contract terms, no prices (pricing waits on Connor).

// TODO(Connor): replace with the real booking link before the page goes live.
export const DEMO_URL = "https://example.com/replace-with-booking-link";

export const TREE = {
  key: "tree",
  title: "Your business follows through with Kerf.",
  description:
    "Kerf sits on the CRM and the phone you already use. Every lead lands on one board, and follow-ups are drafted in your voice for one tap approval. For tree care companies on QuoteIQ and Quo.",
  eyebrow: "For tree care companies on QuoteIQ and Quo.",
  headline: ["Your business", "follows through with Kerf."],
  sub: "Kerf sits on the CRM and the phone you already use. Every lead lands on one board. Follow-ups are drafted in your voice, and you approve them with one tap.",
  heroImage: "hero",
  heroAlt: "Arborist tied in at the top of a tall cottonwood against a blue sky",
  heroCard: ["Estimate sent 6 days ago, no reply", "Follow-up drafted in your voice. Waiting for your tap."],
  why: {
    heading: "The lead came in. The follow-up did not.",
    body: "You are in the tree or on the chipper. The estimate sits in a text thread. The next touch happens when someone remembers.",
    points: [],
    image: "spar",
    imageAlt: "Arborist tied in at the top of a tall spar against the clouds",
  },
  how: {
    heading: "How it works",
    lead: "Three steps. Only the last one is yours. Scroll through it, or tap a step.",
    steps: [
      { title: "Connect what you already run.", body: "QuoteIQ and Quo stay. Kerf sits on top of them.", state: "connect" },
      { title: "Kerf drafts the next touch.", body: "The reply and the follow-up come from the real thread, in your voice.", state: "draft" },
      { title: "You tap approve.", body: "Approve, edit, or skip. Nothing is sent until you tap.", state: "approve" },
    ],
  },
  offer: {
    eyebrow: "What you get",
    heading: "Four things, in this order.",
    lead: "",
    items: [
      ["One board", "Every call, text, form, and estimate lands on one scored board, so you know who to call first."],
      ["Drafts in your voice", "The thread reader writes the reply and the follow-up. You approve, edit, or skip with one tap from your phone."],
      ["Follow-up after the estimate", "Follow-up until it books. After the job, the review ask and the referral ask."],
      ["One report on Friday", "Leads, response time, estimates, jobs won, and revenue by source.", "shot-report"],
    ],
  },
  shots: {
    heading: "What you see on your phone",
    lead: "Shown with a made-up company, North Fork Arbor Care. These are screenshots from the demo account.",
    items: [
      ["One board", "Every lead, scored, with the one to call first on top.", "shot-board"],
      ["Approve a draft", "The follow-up in your voice. Approve, edit, or skip.", "shot-draft"],
      ["The Friday report", "Leads, response time, estimates, jobs won, revenue by source.", "shot-report"],
    ],
  },
  benefits: {
    eyebrow: "What makes Kerf different",
    heading: "It works the deal, not just the inbox.",
    lead: "",
    items: [
      ["The thread reader sits on the deal", "The draft is in the same thread you already have."],
      ["A close score on each lead", "The score is taken from estimate views, so you call the warm ones first."],
      ["It sounds like you", "You approve the words, so the draft sounds like the owner."],
      ["One report", "One report covers your CRM, your phone, and your marketing."],
    ],
  },
  founder: {
    heading: "Built from the bucket, not a boardroom.",
    body: [
      "Kerf started inside Saw and Order Tree Care. Connor Grovenor is an ISA Certified Arborist, and he still climbs. Leads came in while the crew was in a tree, and open estimates sat in the text thread.",
      "He built Kerf on top of the CRM and the phone the company already used. A follow-up is drafted in his voice, and he approves it with one tap. Saw and Order is customer zero for Kerf.",
    ],
    credential: "ISA Certified Arborist",
    note: "",
    image: "founder",
    imageAlt: "Kerf founder, an ISA Certified Arborist, kneeling beside a chainsaw on a removal",
  },
  beta: {
    heading: "The beta",
    lead: "For tree care companies with 1 to 5 trucks, already on QuoteIQ and Quo. One install per company, set up with you.",
    items: [
      ["The installable web app", "Open Kerf in your phone browser and tap Add to Home Screen. Icon, splash, and an offline shell."],
      ["Pipeline, drafts, and follow-up", "Scored pipeline, thread reader, estimate follow-up, review ask, referral ask, and the weekly report."],
      ["QuoteIQ and Quo", "Connect the QuoteIQ account and the Quo number you already have."],
      ["Draft mode first", "The first week is draft mode. A customer text goes out only after you tap approve."],
    ],
    addons: "Not in the beta: replacing your CRM, a voice that answers calls, native phone apps, and self-serve sign-up. Marketing add-ons come later, turned on per customer after a first result.",
    note: "",
  },
  faq: [
    ["Do I have to leave my CRM?", "No. Kerf sits on QuoteIQ. Your jobs stay there."],
    ["Does Kerf answer the phone for me?", "No. You keep Quo. Kerf drafts the follow-up. You decide what gets sent."],
    ["Where do I download the app?", "You do not. Open it in the phone browser and tap Add to Home Screen."],
    ["Who is it for?", "Tree care companies with 1 to 5 trucks, already on QuoteIQ and Quo."],
    ["Can it text a customer by itself?", "No. You approve every text."],
    ["What does it cost?", "We walk through that on the demo. No number on the page."],
  ],
  finalCta: {
    heading: "Book a demo.",
    sub: "A short demo with a made-up tree company, North Fork Arbor Care, so you can see the board, a draft, and the approve tap.",
    list: [
      "Show you the board and the Friday report",
      "Walk a lead from first text to approved follow-up",
      "Tell you straight whether the beta fits your shop",
    ],
  },
};
