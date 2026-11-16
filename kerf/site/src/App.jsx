import React, { useEffect, useMemo, useRef, useState } from "react";

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

function Nav({ page }) {
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
  const links = [["#why", "Why Kerf"], ["#how", "How it works"], ["#pricing", "Pricing"], ["#faq", "FAQ"], [page.otherPage.href, page.otherPage.label]];
  return (
    <header className={`nav ${solid ? "solid" : ""}`} id="top">
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="Kerf home"><Mark size={30} id="nav" /><span>kerf</span></a>
        <nav className="nav-links" aria-label="Primary">{links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <a className="btn btn-primary nav-cta" href="#contact">Book a 15-minute call</a>
        <button className={`burger ${open ? "x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <div className={`sheet ${open ? "open" : ""}`}>
        {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>Book a 15-minute call</a>
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
            <Magnetic className="btn btn-primary" href="#contact">Book a 15-minute call</Magnetic>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-art" data-reveal style={{ transitionDelay: "300ms" }}>
          <Photo name={page.heroImage} alt={page.heroAlt} className="hero-photo" />
          <div className="hero-card">
            <span className="dot" />
            <div><strong>Incoming call, 7:12 pm</strong><small>Answered on ring one. Estimate booked 8:00 am.</small></div>
          </div>
        </div>
      </div>
      <Stats stats={page.stats} />
    </section>
  );
}

function Stat({ s }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v = useCount(go ? s.value : 0, { duration: 1100 });
  return (
    <div className="stat" ref={ref} data-reveal>
      <div className="stat-v">{s.prefix || ""}{Math.round(v).toLocaleString()}{s.suffix || ""}</div>
      <div className="stat-l">{s.label}</div>
      <div className="stat-s">{s.source}</div>
    </div>
  );
}

function Stats({ stats }) {
  return <div className="wrap stats">{stats.map((s, i) => <Stat key={i} s={s} />)}</div>;
}

/* ---------- calculator ---------- */

function Ticker({ value }) {
  const v = useCount(value, { duration: 600 });
  return <span>{"$" + Math.round(v).toLocaleString()}</span>;
}

function Calculator({ page }) {
  const d = page.calc;
  const [calls, setCalls] = useState(d.calls);
  const [missed, setMissed] = useState(d.missed);
  const [close, setClose] = useState(d.close);
  const [job, setJob] = useState(d.job);
  const lost = useMemo(() => Math.round(calls * (missed / 100) * (close / 100) * job * 52), [calls, missed, close, job]);
  const recovered = Math.round(lost * 0.6);
  const Field = ({ label, v, set, min, max, step, fmt }) => (
    <label className="field">
      <span className="field-l"><span>{label}</span><b>{fmt(v)}</b></span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} />
    </label>
  );
  return (
    <section className="sec calc" id="cost">
      <div className="wrap calc-in">
        <div className="calc-copy" data-reveal>
          <h2>What a missed call costs you</h2>
          <p className="lead">Your numbers, not an industry average. Slide them to where your shop actually is.</p>
          <div className="fields">
            <Field label="Calls per week" v={calls} set={setCalls} min={5} max={200} step={1} fmt={(x) => x} />
            <Field label="Missed or sent to voicemail" v={missed} set={setMissed} min={5} max={80} step={1} fmt={(x) => x + "%"} />
            <Field label="Close rate when you do talk to them" v={close} set={setClose} min={5} max={70} step={1} fmt={(x) => x + "%"} />
            <Field label={d.jobLabel} v={job} set={setJob} min={200} max={8000} step={50} fmt={(x) => "$" + x.toLocaleString()} />
          </div>
          <div className="calc-out">
            <div><span className="eyebrow">Quotes you never gave, per year</span><div className="big"><Ticker value={lost} /></div></div>
            <div><span className="eyebrow">If Kerf recovers 60% of them</span><div className="big sap"><Ticker value={recovered} /></div></div>
          </div>
          <p className="fine">Lost revenue = calls × missed % × close rate × average job × 52. Recovery rate is the conservative end of what missed-call text-back and 24/7 answering recover for home-services businesses.</p>
        </div>
        <div data-reveal style={{ transitionDelay: "150ms" }}>
          <Photo name={page.calcImage} alt="Homeowner calling about an emergency" className="tall" caption={page.calcCaption} />
        </div>
      </div>
    </section>
  );
}

/* ---------- why / leaks / benefits ---------- */

function Why({ w }) {
  return (
    <section className={`sec why ${w.image ? "" : "no-img"}`} id="why">
      <div className="wrap why-in">
        {w.image && <div data-reveal><Photo name={w.image} alt={w.imageAlt} className="portrait" /></div>}
        <div data-reveal style={{ transitionDelay: "120ms" }}>
          <p className="eyebrow">Why you need this</p>
          <h2>{w.heading}</h2>
          <p className="lead">{w.body}</p>
          <dl className="why-list">{w.points.map(([t, b]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}</dl>
        </div>
      </div>
    </section>
  );
}

function Leaks({ l }) {
  return (
    <section className="sec leaks" id="leaks">
      <div className="wrap">
        <div className="sec-head" data-reveal><p className="eyebrow">Why the old way is losing you work</p><h2>{l.heading}</h2><p className="lead">{l.lead}</p></div>
        <ol className="leak-list">
          {l.items.map(([n, step, title, body, src], i) => (
            <li key={step} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="leak-step">{String(i + 1).padStart(2, "0")} {step}</span>
              <span className="leak-n">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="stat-s">{src}</span>
            </li>
          ))}
        </ol>
        <p className="leak-note" data-reveal>{l.note} <a href="#compare">See the side-by-side.</a></p>
      </div>
    </section>
  );
}

function Benefits({ b }) {
  return (
    <section className="sec benefits" id="benefits">
      <div className="wrap">
        <div className="sec-head" data-reveal><p className="eyebrow">What Kerf does for you</p><h2>{b.heading}</h2><p className="lead">{b.lead}</p></div>
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

function MidCta({ c }) {
  return (
    <section className="midcta">
      <div className="wrap midcta-in" data-reveal>
        <div><h2>{c.heading}</h2><p className="lead">{c.sub}</p></div>
        <div className="cta-row">
          <Magnetic className="btn btn-primary" href="#contact">Book a 15-minute call</Magnetic>
          <a className="btn btn-ghost" href="#cost">Run the calculator</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- timeline ---------- */

function Timeline({ t }) {
  const Col = ({ title, items, good }) => (
    <div className={`tl ${good ? "good" : "bad"}`} data-reveal>
      <h3>{title}</h3>
      <ol>{items.map(([time, text], i) => <li key={i} style={{ transitionDelay: `${i * 90}ms` }}><span className="t">{time}</span><span>{text}</span></li>)}</ol>
    </div>
  );
  return (
    <section className="sec timeline" id="timeline">
      <div className="wrap">
        <div className="sec-head" data-reveal><h2>{t.heading}</h2><p className="lead">{t.lead}</p></div>
        <div className="tl-grid">
          <Col title="Without Kerf" items={t.before} />
          <Col title="With Kerf" items={t.after} good />
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works: pinned, scroll-scrubbed phone ---------- */

// Which phone cards show for a step (a) and how far through it the reader has scrolled (t, 0..1).
function cardsFor(a, t) {
  if (a === 0) return { call: "show", them: t > 0.3 ? "show" : "" };
  if (a === 1) return { call: "dim", them: "dim", us: "show", photo: t > 0.25 ? "show" : "", cal: t > 0.55 ? "show" : "" };
  if (a === 2) return { cal: "dim", thread: "show" };
  return { thread: "dim", review: "show", react: t > 0.4 ? "show" : "" };
}
const STATE_NAMES = ["call", "book", "chase", "review"];

function Phone({ a, t, trades }) {
  const k = cardsFor(a, t);
  const c = (n) => k[n] || "";
  const fill = a > 2 ? 1 : a === 2 ? Math.min(1, t / 0.7) : 0;
  const them = trades ? "Hi, my water heater is leaking into the garage. Is anyone there?" : "Hi, a big limb just came down on my garage. Is anyone there?";
  const us = trades ? "This is Kerf for the crew. Is the water shut off? Reply with a photo of the tank if you can." : "This is Kerf for the tree crew. Is anything resting on the house right now? Reply with a photo if you can.";
  const look = trades ? "7:00 am visit" : "8:00 am look";
  const react = trades ? ["Tune-up reminder queued", "Goes out in 6 months, before peak season"] : ["Winter pruning reminder queued", "Goes out in November to this customer"];
  return (
    <div className={`phone s-${STATE_NAMES[a]}`} aria-hidden="true">
      <div className="ph-top"><span /><b>Kerf</b><span /></div>
      <div className="ph-body">
        <div className={`pc call ${c("call")}`}>
          <div className="ring" />
          <div><strong>Incoming call</strong><small>Homeowner, after hours</small></div>
          <em>Answered 0:01</em>
        </div>
        <div className={`pc bubble them ${c("them")}`}>{them}</div>
        <div className={`pc bubble us ${c("us")}`}>{us}</div>
        <div className={`pc bubble them photo ${c("photo")}`}><i /><i /></div>
        <div className={`pc cal ${c("cal")}`}>
          <div className="cal-h"><strong>Tomorrow</strong><small>{look}</small></div>
          <div className="cal-g"><i /><i className="on" /><i /><i /><i /><i /></div>
          <em>Booked. Sent to your CRM.</em>
        </div>
        <div className={`pc thread ${c("thread")}`}>
          <div><strong>Estimate follow-up</strong><small>Touch {1 + Math.round(fill * 4)} of 5</small></div>
          <div className="bars">{[1, 0.72, 0.4].map((w, i) => <i key={i} style={{ width: `${w * fill * 100}%` }} />)}</div>
        </div>
        <div className={`pc review ${c("review")}`}><strong>Job marked done</strong><small>Review request sent 4:12 pm</small><span className="stars">★★★★★</span></div>
        <div className={`pc react ${c("react")}`}><strong>{react[0]}</strong><small>{react[1]}</small></div>
      </div>
    </div>
  );
}

function Steps({ steps, trades }) {
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
      <div className="wrap sec-head how-head" data-reveal><h2>How it works</h2><p className="lead">Four things, every time the phone rings. You do none of them. Scroll through it, or tap a step.</p></div>
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
            <div className="phone-wrap"><Phone a={a} t={t} trades={trades} /></div>
            <p className="how-m" aria-live="polite">{steps[a].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ items }) {
  return (
    <section className="gallery" aria-label="The work Kerf understands">
      <div className="wrap gal-grid">
        {items.map(([n, cap], i) => <div key={n} data-reveal style={{ transitionDelay: `${i * 110}ms` }}><Photo name={n} alt={cap} caption={cap} /></div>)}
      </div>
    </section>
  );
}

function Band({ b }) {
  const ok = HAVE[b.image];
  return (
    <section className={`band ${ok ? "has" : ""}`}>
      {ok && <img src={`images/${b.image}.webp`} alt="" loading="lazy" />}
      <div className="wrap"><p data-reveal>{b.text}</p></div>
    </section>
  );
}

/* ---------- integrations ---------- */

function Integrations({ list }) {
  const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const items = [...list, ...list];
  return (
    <section className="integr" aria-label="Integrations">
      <div className="wrap"><p className="eyebrow center">Works with what you already use</p></div>
      <div className="ticker"><div className="ticker-in">
        {items.map((n, i) => {
          const s = slug(n), f = LOGOS[s];
          const dup = i >= list.length ? { "aria-hidden": true } : {};
          if (f && s === "google-business-profile") return <span className="tk gbp" key={i} {...dup}><img src={`images/logos/${f}`} alt="" />Google Business Profile</span>;
          return <span className="tk" key={i} {...dup}>{f ? <img src={`images/logos/${f}`} alt={n} /> : n}</span>;
        })}
        <span className="tk sapt">or just your cell phone</span>
      </div></div>
    </section>
  );
}

/* ---------- founder ---------- */

function Founder({ f }) {
  return (
    <section className="sec founder" id="story">
      <div className="wrap founder-in">
        <div data-reveal><Photo name={f.image} alt={f.imageAlt} className="portrait" /></div>
        <div className="founder-copy" data-reveal style={{ transitionDelay: "120ms" }}>
          <h2>{f.heading}</h2>
          {f.body.map((p, i) => <p key={i} className="lead">{p}</p>)}
          <div className="cred"><Mark size={28} id="cred" /><span>{f.credential}, still climbing</span></div>
          <h3>Results from our own shop</h3>
          <ul className="results">{f.results.map((r, i) => <li key={i}>{r}</li>)}</ul>
          <p className="fine">{f.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- compare ---------- */

function Cell({ v }) {
  if (v === true) return <span className="yes" aria-label="Yes">Yes</span>;
  if (v === false) return <span className="no" aria-label="No">No</span>;
  return <span className="part">{v}</span>;
}

function Compare({ c }) {
  return (
    <section className="sec compare" id="compare">
      <div className="wrap">
        <div className="sec-head" data-reveal><h2>Kerf against the alternatives</h2><p className="lead">You already have one of these. Here is what each one does when the phone rings at 7 pm.</p></div>
        <div className="table-wrap" data-reveal>
          <table>
            <thead><tr><th scope="col"></th>{c.cols.map((h) => <th scope="col" key={h} className={h === "Kerf" ? "kerf" : ""}>{h}</th>)}</tr></thead>
            <tbody>{c.rows.map(([label, vals]) => <tr key={label}><th scope="row">{label}</th>{vals.map((v, i) => <td key={i} className={c.cols[i] === "Kerf" ? "kerf" : ""}><Cell v={v} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- vs hiring ---------- */

function Hire() {
  const hire = [
    ["Wage, $25 to $30 an hour, 2,080 hours", "$52,000 to $62,400"],
    ["Payroll taxes, insurance, paid time off and benefits", "+$22,000 to $26,700"],
    ["Hiring, training, a desk, a phone, software seats", "extra"],
  ];
  const kerf = [
    ["Close plan, $797 a month", "$9,564"],
    ["Setup, paid once", "$2,500"],
    ["Hiring, training, sick days, turnover", "$0"],
  ];
  return (
    <section className="sec hire" id="hire">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <p className="eyebrow">Kerf against an office hire</p>
          <h2>Cheaper than one hire. Working every hour they are not.</h2>
          <p className="lead">A good office person is worth having. Here is what one costs if their job is answering the phone and chasing quotes by hand.</p>
        </div>
        <div className="hire-grid">
          <div className="hire-col" data-reveal>
            <h3>Office hire, W-2</h3>
            <dl>{hire.map(([l, v]) => <div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl>
            <div className="hire-total"><span>Per year</span><b>$74,000 to $89,000</b></div>
            <ul className="hire-notes">
              <li>Covers 40 of the 168 hours in a week</li>
              <li>One call at a time. The second caller gets voicemail.</li>
              <li>Sick days, vacations, and starting over when they quit</li>
            </ul>
          </div>
          <div className="hire-col kerf" data-reveal style={{ transitionDelay: "120ms" }}>
            <h3>Kerf, Close plan</h3>
            <dl>{kerf.map(([l, v]) => <div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl>
            <div className="hire-total"><span>First year</span><b>$12,064</b></div>
            <ul className="hire-notes">
              <li>Covers 168 of 168 hours</li>
              <li>Missed calls texted back in 60 seconds, every time</li>
              <li>Same script on every call, five follow-ups on every quote</li>
            </ul>
          </div>
        </div>
        <p className="fine" data-reveal>Benefits and employer costs average 30% of total compensation for private-industry workers (BLS, Employer Costs for Employee Compensation, June 2026). Already have an office manager? Kerf takes the phone off their plate so they can schedule crews, bill and handle the customers who need a person.</p>
      </div>
    </section>
  );
}

/* ---------- security ---------- */

function Security() {
  const items = [
    ["Limited-user access", "You add Kerf as a limited user or issue a scoped API key. We never hold a password."],
    ["One vault per client", "Your credentials live in their own vault. Nothing shared across clients, revoked in one click."],
    ["Your number, your name", "An A2P 10DLC registered line in your business name. Kerf only texts people who called you."],
    ["Leave with everything", "Ten business days after notice: leads exported, number released, keys revoked, in writing."],
  ];
  return (
    <section className="sec security" id="security">
      <div className="wrap">
        <div className="sec-head" data-reveal><h2>Your data, your number, your customers.</h2><p className="lead">Kerf runs your front office. It does not own any of it.</p></div>
        <dl className="sec-list">{items.map(([t, b], i) => <div key={t} data-reveal style={{ transitionDelay: `${i * 80}ms` }}><dt>{t}</dt><dd>{b}</dd></div>)}</dl>
      </div>
    </section>
  );
}

/* ---------- week ---------- */

function Week({ w }) {
  return (
    <section className="sec week">
      <div className="wrap week-in">
        <div data-reveal><h2>{w.heading}</h2><p className="lead">{w.body}</p>
          <p className="guarantee">If Kerf does not book a single estimate in your first 30 days, the setup fee comes back.</p>
        </div>
        <div className="report" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="rep-h"><Mark size={22} id="rep" /><span>Weekly report</span><span className="rep-d">Fri, week 1</span></div>
          {w.rows.map(([l, pct], i) => <div className="rep-row" key={l}><span>{l}</span><div className="rep-bar"><i style={{ width: pct + "%", transitionDelay: `${200 + i * 120}ms` }} /></div><b>--</b></div>)}
          <p className="fine">Your numbers after week one.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */

const TIERS = [
  { n: "Capture", m: 497, s: 1500, items: ["AI receptionist on your number, first ring, 24/7", "Missed-call text-back in 60 seconds", "Intake form and photo capture", "Booking into your calendar", "Lead push to your CRM or the Kerf job board", "Weekly report"] },
  { n: "Close", m: 797, s: 2500, hot: true, items: ["Everything in Capture", "Five-touch estimate follow-up, text and email", "Quote-aging alerts at 3, 7 and 14 days", "Review request after every completed job", "Monthly report call"] },
  { n: "Grow", m: 1197, s: 3500, items: ["Everything in Close", "Google review responses, drafted for your approval", "Seasonal reactivation campaigns to past customers", "Lead-source dashboard", "Quarterly strategy call"] },
];

function Pricing({ note }) {
  return (
    <section className="sec pricing" id="pricing">
      <div className="wrap">
        <div className="sec-head" data-reveal><h2>Pricing</h2><p className="lead">Monthly on a 12-month agreement. Setup is paid once and covers your number, scripts, calendar, CRM connection and a live test week.</p></div>
        <div className="tiers">
          {TIERS.map((t, i) => (
            <div key={t.n} className={`tier ${t.hot ? "hot" : ""}`} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              {t.hot && <span className="tag">Most popular</span>}
              <h3>{t.n}</h3>
              <div className="price"><span>${t.m.toLocaleString()}</span><small>/month</small></div>
              <div className="setup">${t.s.toLocaleString()} setup</div>
              <ul>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <a className={`btn ${t.hot ? "btn-primary" : "btn-ghost"}`} href="#contact">Start with {t.n}</a>
            </div>
          ))}
        </div>
        <p className="fine center" data-reveal>{note}</p>
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
        <div data-reveal><h2>Questions owners ask on the first call</h2></div>
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
  const [sent, setSent] = useState(false);
  return (
    <section className="sec contact" id="contact">
      <div className="wrap contact-in">
        <div data-reveal>
          <h2>{page.finalCta.heading}</h2>
          <p className="lead">{page.finalCta.sub}</p>
          <p className="eyebrow">On the call we will</p>
          <ul className="results cta-list">{page.finalCta.list.map((x) => <li key={x}>{x}</li>)}</ul>
          {/* Swap this href for the real Calendly link */}
          <a className="btn btn-primary" href="https://calendly.com/">Pick a time</a>
          <p className="fine">Keep your number. Live in 7 to 10 business days. No estimate booked in your first 30 days, setup fee back. Or email hello@kerf.co</p>
        </div>
        <form className="form" data-reveal style={{ transitionDelay: "120ms" }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div className="thanks"><strong>Got it.</strong><p>You will hear from a real person, not a bot, within one business day.</p></div>
          ) : (
            <>
              <label>Name<input required name="name" autoComplete="name" /></label>
              <label>Company<input required name="company" autoComplete="organization" /></label>
              <label>Phone<input required name="phone" type="tel" autoComplete="tel" /></label>
              <label>Email<input required name="email" type="email" autoComplete="email" /></label>
              <label>What do you run the business on?
                <select name="crm" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>Housecall Pro</option><option>Jobber</option><option>ServiceTitan</option><option>GoHighLevel</option><option>QuickBooks and my phone</option><option>Something else</option>
                </select>
              </label>
              <button className="btn btn-primary" type="submit">Request the call</button>
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
        <p>The AI front office for tree care companies and the trades. Built by a working arborist.</p>
        <nav aria-label="Footer"><a href="#how">How it works</a><a href="#pricing">Pricing</a><a href="#security">Security</a><a href={page.otherPage.href}>{page.otherPage.label}</a></nav>
        <small>© 2026 Kerf</small>
      </div>
    </footer>
  );
}

export default function App({ page }) {
  useReveal();
  return (
    <>
      <Nav page={page} />
      <main>
        <Hero page={page} />
        <Why w={page.why} />
        <Leaks l={page.leaks} />
        <Calculator page={page} />
        <Timeline t={page.timeline} />
        <Gallery items={page.gallery} />
        <Steps steps={page.steps} trades={page.key === "trades"} />
        <Benefits b={page.benefits} />
        <MidCta c={page.midCta} />
        <Band b={page.band} />
        <Integrations list={page.integrations} />
        <Founder f={page.founder} />
        <Compare c={page.compare} />
        <Hire />
        <Security />
        <Week w={page.week} />
        <Pricing note={page.pricingNote} />
        <Faq items={page.faq} />
        <Contact page={page} />
      </main>
      <Footer page={page} />
    </>
  );
}
