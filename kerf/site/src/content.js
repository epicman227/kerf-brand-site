// Page content for the Kerf site. One page. Copy follows the approved positioning brief
// (KERA-269 "positioning", line approved on KERA-190). Rules: no prices, no stats we have not
// sourced, no testimonials or logos, QuoteIQ and Quo are the only systems named.

// PLACEHOLDER: Connor has not supplied the demo booking link yet. Replace this one value with
// the real Calendly URL. While it starts with "#", the Book a demo buttons scroll to the form.
export const BOOK_URL = "#contact";

// Where the contact form posts. A Cloudflare Pages Function in functions/api/lead.js.
export const FORM_ENDPOINT = "/api/lead";

export const TREE = {
  key: "tree",
  title: "Kerf. Your business follows through.",
  description:
    "Kerf sits on the CRM and the phone you already use. Every lead lands on one board, and follow-ups are drafted in your voice for one tap approval. For tree care companies on QuoteIQ and Quo.",
  eyebrow: "For tree care companies on QuoteIQ and Quo.",
  headline: ["Your business", "follows through with Kerf."],
  sub: "Kerf sits on the CRM and the phone you already use. Every lead lands on one board. Follow-ups are drafted in your voice, and you approve them with one tap.",
  heroImage: "hero",
  heroAlt: "Arborist tied in at the top of a tall cottonwood against a blue sky",
  heroCard: { title: "Draft waiting", sub: "Estimate follow-up, in your voice. Approve, edit, or skip." },
  why: {
    heading: "The lead came in. The follow-up did not.",
    body: "You are in the tree or on the chipper. The estimate sits in a text thread. The next touch happens when someone remembers.",
    points: [
      ["On the job", "The phone is in the truck and both hands are on a line."],
      ["After the estimate", "The quote goes out, then the thread goes quiet."],
      ["Across tools", "The call is in one place, the text in another, the estimate in a third."],
      ["At the end of the week", "Nobody can say which source the money came from."],
    ],
    image: "spar",
    imageAlt: "Arborist tied in at the top of a tall spar against the clouds",
  },
  steps: [
    { title: "Connect what you already run.", body: "QuoteIQ and Quo stay. Kerf sits on top of them.", state: "connect" },
    { title: "Kerf drafts the next touch.", body: "The reply and the follow-up come from the real thread, in your voice.", state: "draft" },
    { title: "You tap approve.", body: "Approve, edit, or skip. Nothing is sent until you tap.", state: "approve" },
  ],
  offer: {
    heading: "What Kerf does first",
    lead: "Four things, in this order.",
    items: [
      ["One board", "Every call, text, form, and estimate lands on one scored board, so you know who to call first."],
      ["Drafts in your voice", "The thread reader writes the reply and the follow-up. You approve, edit, or skip with one tap from your phone."],
      ["Follow-up after the estimate", "Kerf keeps the follow-up going until it books. After the job, it drafts the review ask and the referral ask."],
      ["One report on Friday", "Leads, response time, estimates, jobs won, and revenue by source."],
    ],
  },
  different: {
    heading: "What makes it different",
    lead: "Kerf works inside the conversations you already have.",
    items: [
      ["The thread reader sits on the deal", "The draft is in the same thread you already have."],
      ["A close score on every lead", "Each lead is scored from estimate views."],
      ["It sounds like you", "You approve the words before anything goes out."],
      ["One report", "It covers the CRM, the phone, and marketing."],
    ],
  },
  founder: {
    heading: "Built by an arborist.",
    body: [
      "Kerf started inside Saw and Order Tree Care. Connor Grovenor is an ISA Certified Arborist, and he still climbs. Leads came in while the crew was in a tree, and open estimates sat in the text thread.",
      "He built Kerf on top of the CRM and the phone the company already used. A follow-up is drafted in his voice, and he approves it with one tap. Saw and Order is customer zero.",
    ],
    credential: "ISA Certified Arborist",
    image: "founder",
    imageAlt: "Kerf founder, an ISA Certified Arborist, kneeling beside a chainsaw on a removal",
  },
  beta: {
    heading: "The beta",
    lead: "Invite-only. One install per company. Connor decides who we talk to first.",
    whoTitle: "Who it is for",
    who: "Owners of tree care companies with 1 to 5 trucks, already on QuoteIQ and Quo.",
    inTitle: "In the beta",
    inList: [
      "The installable web app, added to your home screen",
      "Scored pipeline and thread reader",
      "Estimate follow-up, review ask, referral ask",
      "A weekly report",
      "QuoteIQ and Quo",
    ],
    firstWeek: "The first week is draft mode. A customer text goes out only after you tap approve.",
  },
  report: {
    heading: "One page every Friday",
    body: "Leads, response time, estimates, jobs won, and revenue by source. No dashboard to learn.",
    rows: [
      ["Leads", 80],
      ["Response time", 55],
      ["Estimates", 66],
      ["Jobs won", 40],
      ["Revenue by source", 72],
    ],
    note: "Sample layout. Your numbers appear after your first week.",
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
    sub: "We show you Kerf on a made-up company, North Fork Arbor Care. No real customer data is on screen.",
  },
  form: {
    note: "Or leave your details and we will reach out.",
    success: "Got it. We will be in touch.",
    failure: "That did not go through. Please try again in a minute.",
    systems: ["QuoteIQ and Quo", "Something else"],
  },
  footer: "Kerf. Built by an arborist, for arborists.",
};

export const LEGAL = {
  privacy: {
    file: "privacy",
    title: "Privacy",
    paras: [
      "This page is a placeholder. It has not been reviewed by a lawyer and is not final.",
      "The contact form on this site collects the name, company, phone, email, and business system you type in. We use it to reply to you about a demo. We do not sell it.",
      "The final privacy policy will replace this page after legal review.",
    ],
  },
  terms: {
    file: "terms",
    title: "Terms",
    paras: [
      "This page is a placeholder. It has not been reviewed by a lawyer and is not final.",
      "Kerf is in an invite-only beta. Nothing on this site is an offer, a price, or a guarantee.",
      "The final terms will replace this page after legal review.",
    ],
  },
};
