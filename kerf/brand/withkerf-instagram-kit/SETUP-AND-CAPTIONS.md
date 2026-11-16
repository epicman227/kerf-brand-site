# @withkerf Instagram setup

## Profile

**Profile picture:** `profile-1080.png` (mark only, sized so the circle crop never clips the tail).

**Name field (searchable, 64 char max):**
`Kerf | Your business runs with Kerf`

**Category:** Software Company

**Bio (150 char max, no emoji, no hashtags):**
```
Your business runs with Kerf.
Leads found. Calls answered. Quotes chased.
Built by a certified arborist.
Book a 15 minute demo below.
```

**Link:** your demo booking page (Calendly). Later swap for a link-in-bio page only if you have more than one destination. One link converts better than five.

**Highlights (left to right):** use the covers in `highlights/`
1. Start here (`hl-mark.png`): a 3-slide explainer of what Kerf does
2. Demo (`hl-demo.png`): screen recording of a missed call getting texted back and booked
3. How it works (`hl-how-it-works.png`)
4. Founder (`hl-founder.png`): you, on a job, talking plainly
5. Results (`hl-results.png`): leave empty until you have one real number. Do not fake it.
6. Pricing (`hl-pricing.png`): leave empty until pricing is final.

Only create highlights that have content. Four strong ones beat six with two empty.

## Launch grid

Instagram shows the grid newest-first, top-left. To land the layout in `grid-preview.png` (12 posts, 4 rows), **post in this order: 09, 08, 12, 07, 06, 05, 11, 04, 03, 02, 10, 01**. Post them all in one sitting, 2 to 3 minutes apart, so the profile looks complete the moment anyone lands on it. Nobody follows a three-post account.

After the launch nine, keep the rhythm: one dark typographic post (these templates), one real-world post (job site, truck, phone screen), repeat. Templates alone look like an ad agency. Job sites alone look like a tree company. The mix is what reads as a real software company run by a tradesman.

## Captions

Keep captions short. The image carries the message; the caption adds one line and a CTA. Five to eight hashtags max, placed in the first comment or at the end, never mid-caption.

**09-demo** (post first)
> 15 minutes. We call your business number and you watch Kerf answer it, text back and book the estimate. Link in bio.
> #treecare #arborist #treeservice #treecompany #homeservices #fieldservice

**08-reviews**
> The best time to ask for a review is the evening the job closes, when the yard is clean and the homeowner is happy. Kerf asks every time, with your Google link, so you never have to remember.
> #treecare #arborist #treeservice #googlereviews #smallbusiness

**07-followup**
> Most estimates don't get a no. They get silence. Kerf follows up on day 2, day 5 and day 9, then hands the answer back to you. Nothing to track.
> #treecare #arborist #treeservice #estimates #sales

**06-how**
> Three jobs that used to need an office manager. Answers the call, books the estimate, chases the quote.
> #treecare #arborist #treeservice #automation #ai

**05-product**
> This is what a missed call looks like with Kerf on the line. Eight seconds from voicemail to a booked estimate. The homeowner never knew you were in the tree.
> (Northline Tree Co. is a placeholder name. Swap it for a real client once you have permission.)
> #treecare #arborist #treeservice #missedcalls #fieldservice

**04-problem**
> Homeowners don't leave voicemails for tree work. They call the next number. Every unanswered ring is a quote someone else wrote.
> #treecare #arborist #treeservice #treecompany #smallbusiness

**03-founder**
> I run a tree company. I built Kerf because I kept losing $3,000 removals to voicemail while I was 60 feet up with a saw in my hand. It's the office I wished I had.
> #treecare #arborist #ISAcertified #founder #treeservice

**02-tagline**
> Every call answered. Every quote chased. Every review asked for. You stay in the tree.
> #treecare #arborist #treeservice #ai #automation

**12-closes**
> Every open estimate gets a close score: how many times it was viewed, how long it has sat, what it is worth. Warm ones get chased first. Cold ones get a different message. Your business closes with Kerf.
> #treecare #arborist #treeservice #estimates #sales

**11-scouts**
> Somebody three streets over just asked their neighbors who does tree work. Kerf finds the post the morning it goes up and drafts the reply. You tap send. Your business scouts with Kerf.
> #treecare #arborist #treeservice #leadgeneration #localbusiness

**10-runs**
> Leads, intake, follow-up, reviews, ads. One system, your brand colors, one login. Your business runs with Kerf.
> #treecare #arborist #treeservice #automation #smallbusiness

**01-brand** (post last)
> Kerf. Your business runs with Kerf. Demos open now, link in bio.
> #treecare #arborist #treeservice #kerf

## The "with kerf" line

Handle, domain and tagline all say the same thing, which is the whole trick. Verbs that are true of the product today, for future posts: runs, scouts, answers, books, follows up, closes, asks (reviews), advertises, ranks (SEO). Keep the structure fixed ("Your business ___ with Kerf.") and only swap the verb; the repetition is the brand. Use one verb per post, never a list of verbs in the headline.

## Things that will make it look cheap

- Stock photos of office people, handshakes, robots or circuit-board brains. Never.
- Emojis in the bio or captions.
- Blue or purple anywhere.
- Engagement bait ("Tag a tree guy who needs this").
- Buying followers. A 300-follower account with real comments from tree companies is worth more than 10k dead ones to anyone who checks, and buyers check.
- Posting the templates and nothing else. See the rhythm note above.

## Regenerating

`build_ig.py` rebuilds every file from the brand tokens and the traced v2 mark (`kerfmark.py`). Edit the copy in the `posts` dict, run it, done. Fonts needed: Sora, JetBrains Mono, Inter (all on Google Fonts).
