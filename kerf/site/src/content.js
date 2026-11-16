// Page content. Two pages share components; copy and defaults differ.

const CTA_LIST = [
  "Count last month's missed calls from your phone log",
  "Put a dollar figure on them using your own average ticket",
  "Walk through exactly what a caller hears and gets texted",
  "Tell you straight if Kerf does not pencil out for your shop",
];

export const TREE = {
  key: "tree",
  title: "Kerf. The AI front office for tree care companies.",
  description:
    "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the estimate, and follows up until the removal is won. Built by a certified arborist.",
  otherPage: { href: "trades.html", label: "Other trades" },
  eyebrow: "AI front office for tree care companies",
  headline: ["Every call answered.", "Every quote chased."],
  sub: "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the estimate on your calendar, and follows up until the job is won. Built by a certified arborist who got tired of missing removals from 60 feet up.",
  heroImage: "hero",
  heroAlt: "Arborist tied in at the top of a tall cottonwood against a blue sky",
  stats: [
    { value: 48, suffix: "%", label: "of home-services calls go unanswered", source: "Invoca, 70M tracked calls, 2026" },
    { value: 85, suffix: "%", label: "of unanswered callers never call back", source: "CallRail" },
    { value: 1000, prefix: "$", suffix: "+", label: "walks away with every missed tree call", source: "One removal ticket, conservative" },
  ],
  why: {
    heading: "You can't run a saw and answer a phone.",
    body: "The phone rings when you are 60 feet up a spar, when the chipper is running, when both hands are on a lowering line. That is not bad luck. That is the job. And the days you are busiest, storm days, are the days homeowners need someone to pick up right now.",
    points: [
      ["Storm days", "The calls stack up while every crew is already in a tree."],
      ["Midday", "The climber is tied in, the ground crew is on the chipper, nobody is near the truck."],
      ["Evenings", "The homeowner finally looks up at that limb at 7 pm. You are at dinner."],
      ["Weekends", "People shop for tree work when they are home to look at the tree. Your office is closed."],
    ],
    image: "spar",
    imageAlt: "Arborist tied in at the top of a tall spar against the clouds",
  },
  leaks: {
    heading: "Where your current setup leaks jobs",
    lead: "Voicemail, a callback list and a pile of open quotes. That is how most tree companies run, and every step drops work you already paid to get.",
    items: [
      ["69%", "The ring", "Voicemail is where calls go to die.", "Most callers who hit voicemail hang up without leaving a message. You never learn they called, so your missed-call list is shorter than the real one.", "Moneypenny, small business call report"],
      ["21x", "The callback", "Calling back at lunch is too late.", "A lead reached within 5 minutes is 21 times more likely to qualify than one reached at 30. By the time you are out of the tree, she has booked whoever answered.", "MIT and InsideSales, Lead Response Management Study"],
      ["2 to 3", "The quote", "Quotes die in your text thread.", "A homeowner gets two or three bids on a removal. The company that follows up stays on top. Without a system, follow-up happens when you remember, which is usually never.", "Bids per removal, founder field experience"],
      ["98%", "The review", "A finished job with no review is an ad you skipped.", "Nearly everyone reads reviews before they call a local business. The best time to ask is the day the job closes, while the yard is clean. Nobody remembers to.", "BrightLocal, Local Consumer Review Survey 2022"],
    ],
    note: "An answering service takes a message. Your CRM's built-in bot books a slot. Neither knows a co-dominant stem from a hanger, and neither chases the quote.",
  },
  benefits: {
    heading: "What changes the week Kerf goes live",
    lead: "Same phone number, same crew, same software. More of the calls you already get turn into jobs on the schedule.",
    items: [
      ["Every call answered", "First ring, 24/7, including the 7 pm storm call and the Saturday morning shopper. Missed calls get a text back in under 60 seconds."],
      ["Estimates you can price from the truck", "Kerf asks what the tree is doing, how big, how many, and whether anything is over a structure, then gets photos. You see the job before you drive to it."],
      ["Storm days without the voicemail pile", "Every storm caller gets answered or texted back inside 60 seconds with a photo link and a booking link, while your crews keep cutting."],
      ["Quotes that close", "Five follow-ups by text and email on every open estimate, plus alerts at 3, 7 and 14 days. Nothing goes cold because you had a big week."],
      ["Slow months filled from your own list", "Past customers hear from you before winter pruning, storm season and spring. The work comes from people who already paid you once."],
      ["More five-star reviews", "The review request goes out the day the job is marked done, while the customer is still looking at a clean yard."],
      ["Your evenings back", "No returning voicemails at 9 pm. One page every Friday shows what came in, what booked and what is still open."],
      ["Sound like the big outfit", "Every caller gets a calm, professional answer in your company name. A two-truck crew sounds like it has a dispatcher, because now it does."],
    ],
  },
  midCta: { heading: "Find out what your missed calls cost you last month.", sub: "Fifteen minutes on the phone. Bring your call log and your average ticket. You leave with a dollar figure whether you sign or not." },
  pricingNote: "12-month agreement, 60-day out after month three. Spanish-language receptionist +$150/mo. At $1,000+ per missed tree call, one caught call covers a month of Close.",
  calc: { calls: 40, missed: 45, close: 25, job: 1800, jobLabel: "Average job (removal, prune, stump)" },
  calcImage: "storm-roof",
  calcCaption: "7:12 pm. A split tree on the roof. She is calling the next company on the list in 45 seconds.",
  timeline: {
    heading: "What happens at 7:12 pm",
    lead: "A cottonwood limb comes down on a garage across town. The homeowner calls three tree companies. Here is the next hour, two ways.",
    before: [
      ["7:12", "Call rings out. Voicemail."],
      ["7:13", "She calls the next company on Google."],
      ["7:19", "Someone answers. She books with them."],
      ["Next day", "You hear the voicemail at lunch. Call back. No answer."],
      ["Friday", "You see their crew's truck on her street."],
    ],
    after: [
      ["7:12", "Kerf answers on the first ring. Asks what came down and whether anything is on the house."],
      ["7:13", "Texts her a link. She sends two photos of the limb."],
      ["7:15", "Books your 8 am look. Flags it to your phone as storm, over structure."],
      ["7:16", "Lead lands in your CRM with photos, address and urgency."],
      ["8:05 am", "You are in her driveway. The other two companies are still checking voicemail."],
    ],
  },
  steps: [
    { title: "Answer", body: "Kerf picks up your number on the first ring, 24/7. It asks what the tree is doing, how many, how big, whether anything is over a structure, and captures photos by text. If it is an emergency, it rings you.", state: "call" },
    { title: "Book", body: "It offers real openings from your calendar, confirms by text, and pushes the lead into Housecall Pro, Jobber, ServiceTitan, or the Kerf job board if you run off your phone.", state: "book" },
    { title: "Chase", body: "Every open estimate gets five follow-ups by text and email over two weeks. You get a nudge when a quote is 3, 7 and 14 days old. Removals do not go cold.", state: "chase" },
    { title: "Grow", body: "When a job is marked done, the review request goes out that day. Past customers hear from you for winter pruning, storm prep and plant health care, so the slow months fill from your own list.", state: "review" },
  ],
  founder: {
    heading: "Built from the bucket, not a boardroom.",
    body: [
      "Kerf started inside a working tree care company run by an ISA Certified Arborist who still climbs. He paid agencies and freelancers thousands for a website and systems that did not work, then built the front office himself: an AI receptionist that texts callers an intake form, voice-note-to-estimate, a five-message follow-up, review automation.",
      "Kerf is that system, pulled out of one shop and run for other crews. The scripts know what a co-dominant stem is, what a crane pick costs, and why a storm call at 7 pm is worth more than a Tuesday prune.",
    ],
    credential: "ISA Certified Arborist",
    results: [
      "Every inbound call gets a text-back within 60 seconds",
      "Estimate follow-up runs five touches without anyone remembering to",
      "Review requests go out the day the job closes",
    ],
    note: "Client results published as they come in.",
    image: "founder",
    imageAlt: "Kerf founder, an ISA Certified Arborist, kneeling beside a chainsaw on a removal",
  },
  compare: {
    cols: ["Voicemail", "Answering service", "Your CRM's built-in AI", "Office hire (W-2)", "Kerf"],
    rows: [
      ["Answers after hours", [false, true, true, false, true]],
      ["Knows what a co-dominant stem is", [false, false, false, "if you train them", true]],
      ["Asks the right tree questions and gets photos", [false, false, false, "if you train them", true]],
      ["Texts back a missed call in 60 seconds", [false, false, "some", "when free", true]],
      ["Books into your real calendar", [false, "sometimes", true, true, true]],
      ["Chases the estimate five times", [false, false, false, "when they remember", true]],
      ["Asks for the review when the job closes", [false, false, "some", "sometimes", true]],
      ["Covers sick days, vacations and turnover", [false, true, true, false, true]],
      ["A human you can text when it breaks", [false, "ticket", "ticket", true, true]],
      ["Cost per month", ["$0 and the removal", "$300 to $900", "$50 to $200 plus your time", "$6,200 to $7,400", "from $497"]],
    ],
  },
  week: {
    heading: "What a week looks like",
    body: "Every Friday you get one page. No dashboard to learn.",
    rows: [
      ["Calls answered", 82],
      ["Missed calls texted back", 64],
      ["Estimates booked", 46],
      ["Open quotes chased", 71],
      ["Reviews requested", 28],
    ],
  },
  band: { image: "log-rounds", text: "The kerf is the cut the blade takes. Get it right and everything after is clean." },
  gallery: [
    ["rigging", "Lowering a top over a roof. Kerf asks whether anything is over a structure before you roll."],
    ["grinder", "Stump grinding. Kerf gets photos of every stump by text, so you can quote before you load the grinder."],
    ["cleanup", "Rounds stacked, driveway blown off. Kerf sends the review request the day the job closes."],
  ],
  integrations: ["Housecall Pro", "Jobber", "ServiceTitan", "GoHighLevel", "QuickBooks", "Google Business Profile", "Calendly", "Stripe"],
  faq: [
    ["Do I need to change my software?", "No. Kerf sits in front of whatever you run. Leads land in Housecall Pro, Jobber, ServiceTitan or GoHighLevel. If you run off your phone and QuickBooks, you get the Kerf job board: a simple mobile list of every lead, its status and the next follow-up."],
    ["Does it sound like a robot?", "It sounds like a calm dispatcher who knows tree work. It says it is an automated assistant if asked, and it rings you for anything it cannot handle: a tree on a house, a price negotiation, an angry customer."],
    ["Who answers if the AI can't?", "You, or whoever you name. Emergencies and anything outside the script ring through to a real phone. Everything else gets a text-back and a booking."],
    ["What about Spanish-speaking callers?", "Add the Spanish receptionist for $150 a month. Same script, same booking, same text-back, in Spanish."],
    ["How do you get access to my accounts?", "You add Kerf as a limited user or issue a scoped API key. We never ask for passwords. Each client's credentials sit in their own vault, and when you leave we revoke everything and hand you an export within 10 business days."],
    ["Is this compliant for texting customers?", "Yes. Every client gets an A2P 10DLC registered number in their own business name. Kerf only texts people who called you or filled out your form. Opt-outs are honored at the carrier level."],
    ["How fast is setup?", "Seven to ten business days from signing to live. Your number does not change: we forward on no-answer, so the first thing your customers notice is that someone picked up."],
    ["What if I want out?", "Twelve-month agreement, 60-day notice after month three. Your number, your leads and your data leave with you."],
  ],
  finalCta: { heading: "Stay in the tree. Kerf has the phone.", sub: "Fifteen minutes. Bring your call volume and your average ticket. We will run your numbers together.", list: CTA_LIST },
};

export const TRADES = {
  ...TREE,
  key: "trades",
  title: "Kerf. The AI front office for home service trades.",
  description:
    "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the job, and follows up until the quote is won. For HVAC, plumbing, roofing, landscaping and electrical.",
  otherPage: { href: "index.html", label: "Tree care" },
  eyebrow: "AI front office for HVAC, plumbing, roofing, landscaping and electrical",
  headline: ["Every call answered.", "Every quote chased."],
  sub: "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the visit on your calendar, and follows up until the job is won. Built inside a working trade company, not a software office.",
  stats: [
    TREE.stats[0],
    TREE.stats[1],
    { value: 350, prefix: "$125 to $", label: "lost per missed service call", source: "Callsetter, NextPhone estimates" },
  ],
  why: {
    heading: "You can't run a job and answer a phone.",
    body: "The phone rings when you are on a roof, under a sink, in an attic at 130 degrees. That is not bad luck. That is the job. And your busiest days, heat waves, freezes and storms, are the days homeowners need someone to pick up right now.",
    points: [
      ["Peak season", "Calls stack up while every tech is already on a job."],
      ["Midday", "Hands are full, the van is down the block, the phone is in the cab."],
      ["Evenings", "The leak shows up at 8 pm. You are at dinner."],
      ["Weekends", "Homeowners shop for service when they are home to notice the problem. Your office is closed."],
    ],
  },
  leaks: {
    ...TREE.leaks,
    lead: "Voicemail, a callback list and a pile of open quotes. That is how most shops run, and every step drops work you already paid to get.",
    items: TREE.leaks.items.map((it) => it[1] === "The quote"
      ? ["2 to 3", "The quote", "Quotes die in your text thread.", "A homeowner gets two or three quotes on a replacement. The company that follows up stays on top. Without a system, follow-up happens when you remember, which is usually never.", "Quotes per replacement, typical"]
      : it[1] === "The callback" ? [it[0], it[1], it[2], "A lead reached within 5 minutes is 21 times more likely to qualify than one reached at 30. By the time you are off the job, he has booked whoever answered.", it[4]] : it),
    note: "An answering service takes a message. Your CRM's built-in bot books a slot. Neither asks the right questions for your trade, and neither chases the quote.",
  },
  benefits: {
    ...TREE.benefits,
    items: TREE.benefits.items.map(([t, b]) =>
      t === "Estimates you can price from the truck" ? ["Jobs you can price before you roll", "Kerf asks what is wrong, how long, whether anything is leaking, sparking or not heating, and gets photos. You see the job before you drive to it."]
      : t === "Storm days without the voicemail pile" ? ["Busy days without the voicemail pile", "Every caller during a heat wave or a freeze gets answered or texted back inside 60 seconds with a photo link and a booking link, while your techs keep working."]
      : t === "Slow months filled from your own list" ? ["Slow months filled from your own list", "Past customers hear from you before tune-up season and the first freeze. The work comes from people who already paid you once."]
      : t === "Sound like the big outfit" ? ["Sound like the big outfit", "Every caller gets a calm, professional answer in your company name. A two-van shop sounds like it has a dispatcher, because now it does."]
      : [t, b]),
  },
  pricingNote: "12-month agreement, 60-day out after month three. Spanish-language receptionist +$150/mo. One recovered replacement job covers months of Kerf.",
  heroImage: "hvac",
  heroAlt: "HVAC technician on a rooftop condenser at dusk, answering a call",
  calc: { calls: 60, missed: 40, close: 30, job: 900, jobLabel: "Average job" },
  calcImage: "plumber",
  band: { image: "homeowner-text", text: "The text-back lands before she finds the next number. That is the whole game." },
  gallery: [
    ["landscaping", "Landscape install. Kerf asks lot size and timeline before you quote."],
    ["roofing", "Roof repair. Kerf asks about active leaks and insurance claims."],
    ["plumber", "Service plumbing. Kerf asks if the water is shut off and sends a photo link."],
  ],
  calcCaption: "8:40 pm. Water heater leaking into the garage. He is calling the next plumber on the list in 45 seconds.",
  timeline: {
    heading: "What happens at 8:40 pm",
    lead: "A water heater lets go in a garage across town. The homeowner calls three plumbers. Here is the next hour, two ways.",
    before: [
      ["8:40", "Call rings out. Voicemail."],
      ["8:41", "She calls the next company on Google."],
      ["8:47", "Someone answers. She books with them."],
      ["Next day", "You hear the voicemail at lunch. Call back. No answer."],
      ["Friday", "You see their van on her street."],
    ],
    after: [
      ["8:40", "Kerf answers on the first ring. Asks what is leaking and whether the water is shut off."],
      ["8:41", "Texts her a link. She sends a photo of the tank and the shutoff."],
      ["8:43", "Books your 7 am visit. Flags it to your phone as active leak."],
      ["8:44", "Lead lands in your CRM with photos, address and urgency."],
      ["7:05 am", "You are in her driveway. The other two companies are still checking voicemail."],
    ],
  },
  steps: [
    { title: "Answer", body: "Kerf picks up your number on the first ring, 24/7. It asks what is wrong, how long, whether anything is actively leaking, sparking or not heating, and captures photos by text. Emergencies ring you.", state: "call" },
    { title: "Book", body: "It offers real openings from your calendar, confirms by text, and pushes the lead into Housecall Pro, Jobber, ServiceTitan, or the Kerf job board if you run off your phone.", state: "book" },
    { title: "Chase", body: "Every open quote gets five follow-ups by text and email over two weeks. You get a nudge when a quote is 3, 7 and 14 days old. Replacements do not go cold.", state: "chase" },
    { title: "Grow", body: "When a job is marked done, the review request goes out that day. Past customers hear from you for tune-ups, gutter cleaning, and seasonal checks, so the slow months fill from your own list.", state: "review" },
  ],
  founder: {
    ...TREE.founder,
    heading: "Built on a job site, not in a boardroom.",
    body: [
      "Kerf started inside a working tree care company run by an ISA Certified Arborist who still climbs. The problem was the same one every trade has: the phone rings while you are on the job, and the lead goes to whoever picks up.",
      "The scripts are tuned per trade. An HVAC caller gets asked about the thermostat and the age of the unit. A roofing caller gets asked about active leaks and insurance. A landscaper's caller gets asked about lot size and timeline.",
    ],
  },
  compare: {
    ...TREE.compare,
    rows: TREE.compare.rows.map((r) =>
      r[0] === "Knows what a co-dominant stem is" ? ["Asks the right questions for your trade", [false, false, false, "if you train them", true]] : r[0] === "Asks the right tree questions and gets photos" ? ["Gets photos before you roll a truck", [false, false, false, "if you train them", true]] : r
    ),
  },
  finalCta: { heading: "Stay on the job. Kerf has the phone.", sub: "Fifteen minutes. Bring your call volume and your average ticket. We will run your numbers together.", list: CTA_LIST },
};
