import React, { useEffect, useMemo, useRef, useState } from "react";
import { BOOK_URL, FORM_ENDPOINT } from "./content.js";

const HAVE = typeof __KERF_IMAGES__ !== "undefined" ? __KERF_IMAGES__ : {};
const LOGOS = typeof __KERF_LOGOS__ !== "undefined" ? __KERF_LOGOS__ : {};
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- primitives ---------- */

function Mark({ size = 30, id = "k" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C8F24D" />
          <stop offset="0.55" stopColor="#1FB26A" />
          <stop offset="1" stopColor="#0B5C44" />
        </linearGradient>
        <mask id={id + "m"}>
          <rect width="64" height="64" fill="#fff" />
          <rect x="30" y="-4" width="4.5" height="36" fill="#000" transform="rotate(38 32 32)" />
        </mask>
      </defs>
      <g mask={`url(#${id}m)`}>
        <circle cx="32" cy="32" r="25" fill="none" stroke={`url(#${id})`} strokeWidth="6" />
        <circle cx="32" cy="32" r="14" fill="none" stroke={`url(#${id})`} strokeWidth="4" opacity="0.9" />
        <circle cx="32" cy="32" r="4" fill={`url(#${id})`} />
      </g>
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function useCount(target, { duration = 900, start = false } = {}) {
  const [v, setV] = useState(start ? target : 0);
  const prev = useRef(v);
  useEffect(() => {
    if (reduced()) { setV(target); prev.current = target; return; }
    const from = prev.current, to = target, t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = from + (to - from) * e;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick); else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function Photo({ name, alt, className = "", caption }) {
  const ok = HAVE[name];
  return (
    <figure className={`photo ${ok ? "has" : "fallback"} ${className}`}>
      {ok ? <img src={`images/${name}.webp`} alt={alt} loading="lazy" /> : <div className="ph" aria-hidden="true"><Mark size={56} id={"ph" + name} /></div>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Magnetic({ className, href, children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (reduced() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</a>
  );
}

/* ---------- nav ---------- */


/* ---------- nav ---------- */

function BookLink({ className, children, onClick, magnetic }) {
  const Cmp = magnetic ? Magnetic : "a";
  return <Cmp className={className} href={BOOK_URL} onClick={onClick}>{children}</Cmp>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(0);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? window.scrollY / max : 0);
      setSolid(window.scrollY > 24);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["#why", "The problem"], ["#how", "How it works"], ["#beta", "The beta"], ["#faq", "FAQ"]];
  return (
    <header className={`nav ${solid ? "solid" : ""}`} id="top">
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="Kerf home"><Mark size={30} id="nav" /><span>kerf</span></a>
        <nav className="nav-links" aria-label="Primary">{links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <BookLink className="btn btn-primary nav-cta">Book a demo</BookLink>
        <button className={`burger ${open ? "x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <div className={`sheet ${open ? "open" : ""}`}>
        {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <BookLink className="btn btn-primary" onClick={() => setOpen(false)}>Book a demo</BookLink>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero({ page }) {
  const words = page.headline.join(" ").split(" ");
  const secondStart = page.headline[0].split(" ").length;
  return (
    <section className="hero">
      <div className="mesh" aria-hidden="true"><i /><i /><i /></div>
      {HAVE["hero-bg"] && <img className="hero-bg" src="images/hero-bg.webp" alt="" aria-hidden="true" />}
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="display">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className={`w ${i >= secondStart ? "grad" : ""}`} style={{ animationDelay: `${120 + i * 90}ms` }}>{w}</span>
                {i === secondStart - 1 ? <br /> : " "}
              </React.Fragment>
            ))}
          </h1>
          <p className="lead" data-reveal style={{ transitionDelay: "500ms" }}>{page.sub}</p>
          <div className="cta-row" data-reveal style={{ transitionDelay: "620ms" }}>
            <BookLink magnetic className="btn btn-primary">Book a demo</BookLink>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-art" data-reveal style={{ transitionDelay: "300ms" }}>
          <Photo name={page.heroImage} alt={page.heroAlt} className="hero-photo" />
          <div className="hero-card">
            <span className="dot" />
            <div><strong>{page.heroCard.title}</strong><small>{page.heroCard.sub}</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why({ w }) {
  return (
    <section className={`sec why ${w.image ? "" : "no-img"}`} id="why">
      <div className="wrap why-in">
        {w.image && <div data-reveal><Photo name={w.image} alt={w.imageAlt} className="portrait" /></div>}
        <div data-reveal style={{ transitionDelay: "120ms" }}>
          <p className="eyebrow">The problem</p>
          <h2>{w.heading}</h2>
          <p className="lead">{w.body}</p>
          <dl className="why-list">{w.points.map(([t, b]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}


/* ---------- how it works ---------- */

function cardsFor(a, t) {
  if (a === 0) return { call: "show", them: t > 0.3 ? "show" : "" };
  if (a === 1) return { call: "dim", them: "dim", us: "show", thread: t > 0.4 ? "show" : "" };
  return { call: "dim", them: "dim", us: "dim", review: "show", react: t > 0.4 ? "show" : "" };
}
const STATE_NAMES = ["call", "book", "chase"];

function Phone({ a, t }) {
  const k = cardsFor(a, t);
  const c = (n) => k[n] || "";
  return (
    <div className={`phone s-${STATE_NAMES[a]}`} aria-hidden="true">
      <div className="ph-top"><span /><b>Kerf</b><span /></div>
      <div className="ph-body">
        <div className={`pc call ${c("call")}`}>
          <div><strong>New text from a homeowner</strong><small>Sample lead, North Fork Arbor Care</small></div>
          <em>Lands on your board</em>
        </div>
        <div className={`pc bubble them ${c("them")}`}>Hi, can you give me a price to take down the maple by the garage?</div>
        <div className={`pc bubble us ${c("us")}`}>Draft in your voice: Thanks for reaching out. I can come look at the maple this week. Does Thursday morning work?</div>
        <div className={`pc thread ${c("thread")}`}>
          <div><strong>Waiting on you</strong><small>Approve, edit, or skip</small></div>
        </div>
        <div className={`pc review ${c("review")}`}><strong>Approved</strong><small>Sent after your tap</small></div>
        <div className={`pc react ${c("react")}`}><strong>Follow-up queued</strong><small>Drafted for you to approve</small></div>
      </div>
    </div>
  );
}

function Steps({ steps }) {
  const n = steps.length;
  const track = useRef(null);
  const pin = useRef(null);
  const [pos, setPos] = useState({ a: 0, t: 0 });
  const metrics = () => {
    const tr = track.current, pn = pin.current;
    const top = parseFloat(getComputedStyle(pn).top) || 0;
    const dist = Math.max(1, tr.offsetHeight - pn.offsetHeight);
    return { tr, top, dist };
  };
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!track.current || !pin.current) return;
      const { tr, top, dist } = metrics();
      const y = Math.min(Math.max(top - tr.getBoundingClientRect().top, 0), dist);
      const p = Math.min((y / dist) * n, n - 0.0001);
      const a = Math.floor(p);
      const t = Math.round((p - a) * 100) / 100;
      setPos((o) => (o.a === a && o.t === t ? o : { a, t }));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [n]);
  const go = (i) => {
    const { tr, top, dist } = metrics();
    const y = window.scrollY + tr.getBoundingClientRect().top - top + ((i + 0.8) / n) * dist;
    window.scrollTo({ top: y, behavior: reduced() ? "auto" : "smooth" });
  };
  const { a, t } = pos;
  return (
    <section className="how" id="how">
      <div className="wrap sec-head how-head" data-reveal><h2>How it works</h2><p className="lead">Three steps. Scroll through it, or tap a step. Screens use made-up data from North Fork Arbor Care.</p></div>
      <div className="how-track" ref={track} style={{ "--n": n }}>
        <div className="how-pin" ref={pin}>
          <div className="wrap how-grid">
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={i} className={i === a ? "on" : i < a ? "done" : ""}>
                  <button type="button" onClick={() => go(i)} aria-current={i === a ? "step" : undefined}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="st"><b>{s.title}</b><span className="sb">{s.body}</span></span>
                    <span className="bar" aria-hidden="true"><i style={{ transform: `scaleX(${i < a ? 1 : i === a ? t : 0})` }} /></span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="phone-wrap"><Phone a={a} t={t} /></div>
            <p className="how-m" aria-live="polite">{steps[a].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function Offer({ b, id, eyebrow }) {
  return (
    <section className="sec benefits" id={id}>
      <div className="wrap">
        <div className="sec-head" data-reveal><p className="eyebrow">{eyebrow}</p><h2>{b.heading}</h2><p className="lead">{b.lead}</p></div>
        <ul className="ben-list">
          {b.items.map(([t, body], i) => (
            <li key={t} data-reveal style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
              <span className="ben-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Founder({ f }) {
  return (
    <section className="sec founder" id="story">
      <div className="wrap founder-in">
        <div data-reveal><Photo name={f.image} alt={f.imageAlt} className="portrait" /></div>
        <div className="founder-copy" data-reveal style={{ transitionDelay: "120ms" }}>
          <h2>{f.heading}</h2>
          {f.body.map((p, i) => <p key={i} className="lead">{p}</p>)}
          <div className="cred"><Mark size={28} id="cred" /><span>{f.credential}, still climbing</span></div>
        </div>
      </div>
    </section>
  );
}

function Beta({ b }) {
  return (
    <section className="sec" id="beta">
      <div className="wrap faq-in">
        <div data-reveal><h2>{b.heading}</h2><p className="lead">{b.lead}</p></div>
        <div data-reveal style={{ transitionDelay: "120ms" }}>
          <h3>{b.whoTitle}</h3>
          <p className="lead">{b.who}</p>
          <h3>{b.inTitle}</h3>
          <ul className="results">{b.inList.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="fine">{b.firstWeek}</p>
        </div>
      </div>
    </section>
  );
}

function Report({ w }) {
  return (
    <section className="sec week">
      <div className="wrap week-in">
        <div data-reveal><h2>{w.heading}</h2><p className="lead">{w.body}</p></div>
        <div className="report" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="rep-h"><Mark size={22} id="rep" /><span>Weekly report</span><span className="rep-d">Sample</span></div>
          {w.rows.map(([l, pct], i) => <div className="rep-row" key={l}><span>{l}</span><div className="rep-bar"><i style={{ width: pct + "%", transitionDelay: `${200 + i * 120}ms` }} /></div><b>--</b></div>)}
          <p className="fine">{w.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */

function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec faq" id="faq">
      <div className="wrap faq-in">
        <div data-reveal><h2>Questions</h2></div>
        <div className="qs" data-reveal>
          {items.map(([q, a], i) => (
            <div key={q} className={`q ${open === i ? "open" : ""}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><i /></button>
              <div className="a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




/* ---------- contact + footer ---------- */

function Contact({ page }) {
  const [status, setStatus] = useState("idle");
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "sent" : "error");
    } catch (_) {
      setStatus("error");
    }
  };
  return (
    <section className="sec contact" id="contact">
      <div className="wrap contact-in">
        <div data-reveal>
          <h2>{page.finalCta.heading}</h2>
          <p className="lead">{page.finalCta.sub}</p>
          {!BOOK_URL.startsWith("#") && <a className="btn btn-primary" href={BOOK_URL}>Book a demo</a>}
          <p className="fine">{page.form.note}</p>
        </div>
        <form className="form" data-reveal style={{ transitionDelay: "120ms" }} onSubmit={submit}>
          {status === "sent" ? (
            <div className="thanks"><strong>{page.form.success}</strong></div>
          ) : (
            <>
              <label>Name<input required name="name" autoComplete="name" /></label>
              <label>Company<input required name="company" autoComplete="organization" /></label>
              <label>Phone<input required name="phone" type="tel" autoComplete="tel" /></label>
              <label>Email<input required name="email" type="email" autoComplete="email" /></label>
              <label>What do you run the business on?
                <select name="system" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  {page.form.systems.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending" : "Send"}</button>
              {status === "error" && <p className="fine" role="alert">{page.form.failure}</p>}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer({ page }) {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="brand"><Mark size={26} id="ft" /><span>kerf</span></div>
        <p>{page.footer}</p>
        <nav aria-label="Footer"><a href="#how">How it works</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></nav>
        <small>© 2026 Kerf</small>
      </div>
    </footer>
  );
}

function Legal({ doc }) {
  return (
    <>
      <header className="nav solid" id="top"><div className="wrap nav-in"><a href="index.html" className="brand" aria-label="Kerf home"><Mark size={30} id="lnav" /><span>kerf</span></a></div></header>
      <main>
        <section className="sec"><div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Pending legal review</p>
          <h1>{doc.title}</h1>
          {doc.paras.map((p, i) => <p key={i} className="lead">{p}</p>)}
          <p><a href="index.html">Back to the site</a></p>
        </div></section>
      </main>
    </>
  );
}

export default function App({ page, legal }) {
  useReveal();
  if (legal) return <Legal doc={legal} />;
  return (
    <>
      <Nav />
      <main>
        <Hero page={page} />
        <Why w={page.why} />
        <Steps steps={page.steps} />
        <Offer b={page.offer} id="offer" eyebrow="What Kerf does" />
        <Offer b={page.different} id="different" eyebrow="Why it is different" />
        <Founder f={page.founder} />
        <Beta b={page.beta} />
        <Report w={page.report} />
        <Faq items={page.faq} />
        <Contact page={page} />
      </main>
      <Footer page={page} />
    </>
  );
}
