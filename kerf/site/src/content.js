// Landing page copy for withkerf.com. Source of truth: kerf-canon (2026-11-18).
// Rules: no invented testimonials, numbers or logos. No receptionist, no Spanish add-on,
// no integrations beyond QuoteIQ and Quo, no contract terms, no prices (pricing waits on Connor).

// TODO(Connor): replace with the real booking link before the page goes live.
export const DEMO_URL = "https://calendly.com/";

export const TREE = {
  key: "tree",
  title: "Kerf. No lead goes cold. Built by an arborist.",
  description:
    "Kerf sits on top of the CRM and phone you already use, drafts every follow-up in your voice, and waits for your one tap. Built by an arborist for tree care owners.",
  eyebrow: "For tree care owners on QuoteIQ and Quo",
  headline: ["Your business", "grows with Kerf."],
  sub: "Kerf sits on top of the CRM and phone you already use. It makes sure no lead goes cold, drafts every follow-up in your voice for one-tap approval, and shows you where the money comes from.",
  heroImage: "hero",
  heroAlt: "Arborist tied in at the top of a tall cottonwood against a blue sky",
  heroCard: ["Estimate sent 6 days ago, no reply", "Follow-up drafted in your voice. Waiting for your tap."],
  why: {
    heading: "The work you already paid for goes quiet.",
    body: "You are in a tree when the call comes in. The text gets read at the truck and answered tomorrow. The estimate goes out and nobody follows up, because nobody has the time. That is not laziness. That is the job.",
    points: [
      ["Leads go cold", "A call, a text or a form lands while you are working. By the time you reply, the homeowner has talked to someone else."],
      ["Estimates sit", "A quote goes out, then silence. Without a follow-up it stays in the thread until it is too late to ask."],
      ["No one to call first", "Ten open leads, one pair of hands. Which one is about to say yes?"],
      ["Money without a source", "You know the month was busy. You do not know which lead source paid for it."],
    ],
    image: "spar",
    imageAlt: "Arborist tied in at the top of a tall spar against the clouds",
  },
  how: {
    heading: "How it works",
    lead: "Three steps. Only the last one is yours. Scroll through it, or tap a step.",
    steps: [
      { title: "Connect your CRM and phone", body: "Link QuoteIQ and Quo. Every call, text, form and estimate lands on one scored pipeline board, so you know who to call first.", state: "connect" },
      { title: "Kerf drafts", body: "Kerf reads the thread and drafts the reply or follow-up in your voice: estimate nudges, booking, review and referral asks.", state: "draft" },
      { title: "You tap approve", body: "Approve, edit or skip from your phone. Nothing goes to a customer until you tap.", state: "approve" },
    ],
  },
  shots: {
    heading: "What you see on your phone",
    lead: "Shown with a made-up company, North Fork Arbor Care. Real screenshots from the demo account are on the way.",
    items: [
      ["Pipeline board", "Every lead, scored, with the one to call first on top."],
      ["Approve a draft", "The follow-up in your voice. Approve, edit or skip."],
      ["Weekly report", "Leads, response time, estimates, jobs won, revenue by source."],
    ],
  },
  benefits: {
    heading: "What nobody else sells to a small shop",
    lead: "Most tools stop at answering the phone. Kerf works the lead until it is won or lost.",
    items: [
      ["A thread reader that moves deals", "Kerf reads the whole conversation, not just the last message, and drafts the next step that moves the deal."],
      ["A close score on every lead", "Each lead is scored from signals like whether they opened the estimate, so you call the warm ones first."],
      ["Drafts in your voice", "Replies sound like you wrote them, because they are written from how you write. You approve, edit or skip."],
      ["Postcards to the neighbors", "Neighbor postcards built from your job calendar, so a job on one street turns into leads on the next."],
      ["One report, not three", "One weekly report across your CRM, your phone and your marketing, with revenue by source."],
      ["Approval first, always", "Nothing is sent without your tap. Kerf drafts. You decide."],
    ],
  },
  founder: {
    heading: "Built from the bucket, not a boardroom.",
    body: [
      "Kerf started inside Saw and Order Tree Care, a working tree company run by an ISA Certified Arborist who still climbs. It began as the tool that kept that shop's leads from going cold and its estimates from sitting.",
      "Saw and Order is customer zero. Every feature has to earn its place in a real tree business first, which is why Kerf talks about estimates, removals and crews like someone who has done the work.",
    ],
    credential: "ISA Certified Arborist",
    note: "Case study and client results published as they come in.",
    image: "founder",
    imageAlt: "Kerf founder, an ISA Certified Arborist, kneeling beside a chainsaw on a removal",
  },
  beta: {
    heading: "What the beta includes",
    lead: "For tree care companies on QuoteIQ and Quo. One instance for your company, set up with you.",
    items: [
      ["Scored pipeline board", "Every call, text, form and estimate on one board, ranked by who to call first."],
      ["Drafts for one-tap approval", "A thread reader drafts replies and follow-ups in your voice. Approve, edit or skip."],
      ["Estimate follow-up and booking", "Nudges on open estimates, and help getting the visit on the calendar."],
      ["Reviews and referrals", "After-job review and referral asks, drafted for your approval."],
      ["A weekly report", "Leads, response time, estimates, jobs won and revenue by source."],
      ["An app on your home screen", "Open Kerf in your phone browser and tap Add to Home Screen. No app store."],
    ],
    addons: "Marketing add-ons (social posts, neighbor postcards, local scouting, ads and SEO) are turned on per customer after the first result.",
    note: "Beta terms and pricing are covered on the demo call.",
  },
  faq: [
    ["Is Kerf a CRM?", "No. It sits on top of the CRM you already use. You keep QuoteIQ and your phone as they are."],
    ["Does Kerf answer my phone?", "No. Kerf does not pick up calls. It works the leads that come in: it scores them, drafts the follow-up and shows you what to do next."],
    ["Will it text my customers on its own?", "No. Every draft waits for your tap. You approve, edit or skip. Nothing reaches a customer without it."],
    ["Which CRM and phone does it work with?", "The beta fits companies on QuoteIQ and Quo. Other systems come later."],
    ["Does it sound like me?", "Drafts are written in your voice, and you can edit any of them before it goes out. The more you approve and edit, the closer it gets."],
    ["Do I need an app from the app store?", "No. Kerf is a web app. Open it in your phone browser and tap Add to Home Screen."],
    ["What does it cost?", "We cover beta terms and pricing on the demo call."],
    ["Who is it for?", "Owners of small tree care companies, roughly one to five trucks. Other trades come later."],
  ],
  finalCta: {
    heading: "Stay in the tree. Kerf works the leads.",
    sub: "A short demo with a made-up tree company, so you can see the pipeline, a draft and the approve tap. Bring your questions.",
    list: [
      "Show you the pipeline board and the weekly report",
      "Walk a lead from first text to approved follow-up",
      "Tell you straight whether the beta fits your shop",
    ],
  },
};
