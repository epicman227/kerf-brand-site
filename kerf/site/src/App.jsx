import React, { useEffect, useRef, useState } from "react";
import { BOOK_URL, BOOK_IS_PLACEHOLDER, FORM_ENDPOINT, HERO_VIDEO } from "./content.js";
import { submitLead } from "./form.js";

const MARK = typeof __KERF_MARK__ !== "undefined" ? __KERF_MARK__ : "";
const MARK_MONO = typeof __KERF_MARK_MONO__ !== "undefined" ? __KERF_MARK_MONO__ : "";
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- primitives ---------- */

function Mark({ size = 30, mono = false }) {
  return <span className={`mark ${mono ? "mono" : ""}`} style={{ width: size, height: size }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: mono ? MARK_MONO : MARK }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function Magnetic({ className, href, children, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (reduced() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${(e.clientY - (r.top + r.height / 2)) * 0.28}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>{children}</a>;
}

// The one filled button on the page is the reply ask (heartwood). Everything else is a ghost button.
function Ask({ className = "btn btn-primary", children, onClick }) {
  return <Magnetic className={className} href={BOOK_URL} target="_blank" rel="noopener" onClick={onClick}>{children}</Magnetic>;
}

function Band({ id, hue, children, className = "" }) {
  return (
    <section id={id} className={`band ${className}`} style={hue ? { "--hue": hue } : undefined}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* ---------- nav ---------- */

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
  const links = [["#suite", "The suite"], ["#quo", "Quo"], ["#week", "How a week works"], ["#faq", "FAQ"]];
  return (
    <header className={`nav ${solid ? "solid" : ""}`} id="top">
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <div className="wrap nav-in">
        <a href="#top" className="brand" aria-label="Kerf home"><Mark size={32} /><span>kerf</span></a>
        <nav className="nav-links" aria-label="Primary">{links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
        <button className={`burger ${open ? "x" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      <div className={`sheet ${open ? "open" : ""}`}>
        {links.map(([h, t]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
        <a href="#contact" onClick={() => setOpen(false)}>Reply for a look</a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function HeroFilm() {
  // Poster is built in the page: the wordmark on the ground, Kerf green through the mark.
  const [sound, setSound] = useState(false);
  const vref = useRef(null);
  const poster = (
    <div className="poster" role="img" aria-label="kerf">
      <Mark size={88} mono /><span>kerf</span>
    </div>
  );
  if (!HERO_VIDEO) return <div className="film" data-reveal>{poster}</div>;
  const still = reduced();
  return (
    <div className="film" data-reveal>
      {still ? poster : (
        <video ref={vref} src={HERO_VIDEO.src} poster={HERO_VIDEO.poster} muted={!sound} autoPlay playsInline loop controls={false} />
      )}
      {!still && <button className="linkbtn" onClick={() => { setSound(true); if (vref.current) { vref.current.currentTime = 0; vref.current.muted = false; vref.current.play(); } }}>Watch with sound</button>}
    </div>
  );
}

function Hero({ page }) {
  const words = page.headline.join(" ").split(" ");
  const secondStart = page.headline[0].split(" ").length;
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="display">
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span className={`w ${i >= secondStart ? "grad" : ""}`} style={{ animationDelay: `${120 + i * 90}ms` }}>{w}</span>
              {i === secondStart - 1 ? <br /> : " "}
            </React.Fragment>
          ))}
        </h1>
        <p className="lead" data-reveal>{page.sub}</p>
        <div className="cta-row" data-reveal>
          <Ask>Reply for a 20 minute look</Ask>
          <a className="btn btn-ghost" href="#suite">See the suite</a>
        </div>
        <HeroFilm />
        <p className="tagline">{page.tagline}</p>
      </div>
    </section>
  );
}

/* ---------- sections ---------- */

function Suite({ s }) {
  return (
    <Band id="suite" hue="#C98BDC">
      <div className="sec-head" data-reveal><p className="eyebrow">{s.eyebrow}</p><h2>{s.heading}</h2><p className="lead">{s.lead}</p></div>
      {s.groups.map(([g, items]) => (
        <div key={g} className="group">
          <h3 className="group-t" data-reveal>{g}</h3>
          <ul className="cards">
            {items.map(([t, b], i) => (
              <li key={t} className="card" data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <h3>{t}</h3><p>{b}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Band>
  );
}

function Quo({ q }) {
  return (
    <Band id="quo" hue="#66B8E8">
      <div className="split">
        <div data-reveal><p className="eyebrow">{q.eyebrow}</p><h2>{q.heading}</h2></div>
        <div data-reveal style={{ transitionDelay: "100ms" }}>
          {q.body.map((p, i) => <p key={i} className="lead">{p}</p>)}
          <p className="callout">{q.two}</p>
        </div>
      </div>
    </Band>
  );
}

function Crm({ c }) {
  return (
    <Band id="crm" hue="#929DF5">
      <div className="split">
        <div data-reveal><p className="eyebrow">{c.eyebrow}</p><h2>{c.heading}</h2></div>
        <div data-reveal style={{ transitionDelay: "100ms" }}>
          <p className="lead">{c.body}</p>
          <div className="chips">{c.names.map((n) => <span key={n} className="chip">{n}</span>)}</div>
        </div>
      </div>
    </Band>
  );
}

function Cost({ c }) {
  return (
    <Band id="cost" hue="#9FB4CF">
      <div className="sec-head" data-reveal><p className="eyebrow">{c.eyebrow}</p><h2>{c.heading}</h2></div>
      <div className="ledger" data-reveal>
        {c.rows.map(([a, b, n]) => (
          <div key={a} className="ledger-row"><span className="l-a">{a}</span><b className="l-b">{b}</b><span className="l-n">{n}</span></div>
        ))}
      </div>
      <p className="lead" data-reveal>{c.body}</p>
      <p className="fine" data-reveal>{c.fine}</p>
    </Band>
  );
}

function Founding({ f }) {
  return (
    <Band id="founding" hue="#BFAD90">
      <div className="split">
        <div data-reveal><p className="eyebrow">{f.eyebrow}</p><h2>{f.heading}</h2></div>
        <div data-reveal style={{ transitionDelay: "100ms" }}><p className="lead">{f.body}</p></div>
      </div>
    </Band>
  );
}

function Week({ w }) {
  return (
    <Band id="week" hue="#B5CB6A">
      <div className="sec-head" data-reveal><p className="eyebrow">{w.eyebrow}</p><h2>{w.heading}</h2></div>
      <ol className="steps">
        {w.steps.map(([t, b], i) => (
          <li key={t} className="card" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{b}</p>
          </li>
        ))}
      </ol>
      <p className="callout" data-reveal>{w.note}</p>
    </Band>
  );
}

function Faq({ f }) {
  const [open, setOpen] = useState(0);
  return (
    <Band id="faq" hue="#BFAD90">
      <div className="faq-in">
        <div data-reveal><p className="eyebrow">{f.eyebrow}</p><h2>{f.heading}</h2></div>
        <div className="qs" data-reveal>
          {f.items.map(([q, a], i) => (
            <div key={q} className={`q ${open === i ? "open" : ""}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><i /></button>
              <div className="a"><div>{a.map((p, j) => <p key={j}>{p}</p>)}</div></div>
            </div>
          ))}
        </div>
      </div>
    </Band>
  );
}

function Screens({ shots }) {
  if (!shots || !shots.length) return null; // slot stays empty until KERA-526 captures exist
  return (
    <Band id="screens" hue="#C98BDC">
      <div className="shots">{shots.map((s) => <figure key={s.src}><img src={s.src} alt={s.alt} loading="lazy" /></figure>)}</div>
    </Band>
  );
}

function Walkthrough({ w }) {
  if (!w) return null;
  return (
    <Band id="walkthrough" hue="#C98BDC">
      <div className="sec-head" data-reveal><p className="eyebrow">{w.eyebrow}</p><h2>{w.heading}</h2><p className="lead">{w.lead}</p></div>
      <ol className="walk">
        {w.steps.map((st, i) => (
          <li key={st.file} className="walk-step" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{st.title}</h3>
            <p>{st.body}</p>
            <picture>
              <source media="(min-width: 700px)" srcSet={`walkthrough/${st.file}-1440.webp`} width="1440" height="900" />
              <img src={`walkthrough/${st.file}-390.webp`} width="780" height="1688" alt={st.alt} loading="lazy" />
            </picture>
          </li>
        ))}
      </ol>
    </Band>
  );
}

function CaseStudy({ c, page }) {
  return (
    <>
      <header className="nav solid" id="top"><div className="wrap nav-in"><a href="index.html" className="brand" aria-label="Kerf home"><Mark size={32} /><span>kerf</span></a></div></header>
      <main>
        <section className="hero case-hero" style={{ "--hue": "#4FBF86" }}><div className="wrap">
          <p className="draft-flag">{c.draftNote}</p>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.headline[0]} <span className="grad">{c.headline[1]}</span></h1>
          <p className="lead">{c.sub}</p>
        </div></section>
        <Band id="shop" hue="#B5CB6A">
          <div className="split">
            <div data-reveal><p className="eyebrow">{c.shop.eyebrow}</p><h2>{c.shop.heading}</h2></div>
            <div data-reveal>{c.shop.body.map((p, i) => <p key={i} className="lead">{p}</p>)}</div>
          </div>
        </Band>
        <Band id="does" hue="#C98BDC">
          <div className="sec-head" data-reveal><p className="eyebrow">{c.does.eyebrow}</p><h2>{c.does.heading}</h2></div>
          <div className="cards">
            {c.does.items.map(([t, b], i) => (
              <div key={t} className="card" data-reveal style={{ transitionDelay: `${i * 70}ms` }}><h3>{t}</h3><p>{b}</p></div>
            ))}
          </div>
        </Band>
        <Band id="numbers" hue="#9FB4CF">
          <div className="sec-head" data-reveal><p className="eyebrow">{c.numbers.eyebrow}</p><h2>{c.numbers.heading}</h2></div>
          <div className="ledger" data-reveal>
            {c.numbers.rows.map(([a, b, n]) => (
              <div key={a} className={`ledger-row ${b === "TBC" ? "tbc" : ""}`}><span className="l-a">{a}</span><span className="l-b">{b}</span><span className="l-n">{n}</span></div>
            ))}
          </div>
          <p className="callout" data-reveal>{c.numbers.note}</p>
        </Band>
        <Band id="quote" hue="#BFAD90">
          <div className="split">
            <div data-reveal><p className="eyebrow">{c.quote.eyebrow}</p><h2>{c.quote.heading}</h2></div>
            <div data-reveal><p className="lead tbc-text">{c.quote.body}</p></div>
          </div>
        </Band>
        <Walkthrough w={page.walkthrough} />
        <section className="close"><div className="wrap" data-reveal>
          <h2>{c.close.heading}</h2><p className="lead">{c.close.sub}</p>
          <Ask>{c.close.ask}</Ask>
        </div></section>
      </main>
      <Footer page={page} />
    </>
  );
}

function Contact({ page }) {
  const [status, setStatus] = useState("idle");
  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setStatus(await submitLead(FORM_ENDPOINT, Object.fromEntries(new FormData(e.target).entries())));
  };
  return (
    <section className="close" id="contact">
      <div className="wrap contact-in">
        <div data-reveal>
          <h2>{page.close.heading}</h2>
          <p className="lead">{page.close.sub}</p>
          <Ask>{page.close.ask}</Ask>
          {BOOK_IS_PLACEHOLDER && <p className="fine">Booking link is a placeholder until Connor supplies the real one.</p>}
          <p className="fine">{page.form.note}</p>
        </div>
        <form className="form" data-reveal style={{ transitionDelay: "120ms" }} onSubmit={submit} noValidate>
          {status === "sent" ? (
            <div className="thanks" role="status"><strong>{page.form.success}</strong></div>
          ) : (
            <>
              <label>Name<input required name="name" autoComplete="name" /></label>
              <label>Company<input required name="company" autoComplete="organization" /></label>
              <label>Phone<input required name="phone" type="tel" autoComplete="tel" /></label>
              <label>Email<input required name="email" type="email" autoComplete="email" /></label>
              <label>What do you estimate in?
                <select name="system" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  {page.form.systems.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
              <button className="btn btn-ghost" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending" : "Send"}</button>
              {(status === "error" || status === "invalid") && <p className="fine" role="alert">{status === "invalid" ? "Check your name, company, phone and email." : page.form.failure}</p>}
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
        <div className="brand"><Mark size={26} /><span>kerf</span></div>
        <p>{page.footer}</p>
        <nav aria-label="Footer"><a href="#suite">The suite</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></nav>
        <small>© 2026 Kerf</small>
      </div>
    </footer>
  );
}

function Legal({ doc }) {
  return (
    <>
      <header className="nav solid" id="top"><div className="wrap nav-in"><a href="index.html" className="brand" aria-label="Kerf home"><Mark size={32} /><span>kerf</span></a></div></header>
      <main>
        <section className="band" style={{ "--hue": "#BFAD90" }}><div className="wrap" style={{ maxWidth: 720 }}>
          <p className="eyebrow">Pending legal review</p>
          <h1>{doc.title}</h1>
          {doc.paras.map((p, i) => <p key={i} className="lead">{p}</p>)}
          <p><a className="textlink standalone" href="index.html">Back to the site</a></p>
        </div></section>
      </main>
    </>
  );
}

export default function App({ page, legal, pricing, caseStudy }) {
  useReveal();
  return (
    <>
      <div className="bg" aria-hidden="true"><i className="glow" /><i className="rings" /><i className="grain" /><i className="film-grain" /></div>
      {legal ? <Legal doc={legal} /> : caseStudy ? <CaseStudy c={caseStudy} page={page} /> : (
        <>
          <Nav />
          <main>
            <Hero page={page} />
            <Suite s={page.suite} />
            <Quo q={page.quo} />
            <Crm c={page.crm} />
            {pricing && pricing.cost && <Cost c={pricing.cost} />}
            {pricing && pricing.founding && <Founding f={pricing.founding} />}
            <Week w={page.week} />
            <Faq f={page.faq} />
            <Walkthrough w={page.walkthrough} />
            <Screens shots={page.screens} />
            <Contact page={page} />
          </main>
          <Footer page={page} />
        </>
      )}
    </>
  );
}
