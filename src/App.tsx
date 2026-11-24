import { useState } from "react";
import { BIZ, WA_LINK } from "./data";

/* ---------- small building blocks ---------- */

function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "gold";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/60";
  const styles = {
    primary: "bg-plum text-white hover:bg-plum-dark shadow-lg shadow-plum/25",
    gold: "bg-gold text-ink hover:brightness-95 shadow-lg shadow-gold/30",
    ghost: "border-2 border-plum text-plum hover:bg-plum hover:text-white",
  }[variant];
  return (
    <a href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function SectionTitle({
  kicker,
  title,
  sub,
  light = false,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {kicker && (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-widest ${light ? "text-gold" : "text-plum"}`}>
          {kicker}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-3 text-lg ${light ? "text-white/80" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

const PhoneIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6.1 6.1 0 0 0 1.3 3.2 13.9 13.9 0 0 0 5.3 4.7c2 .8 2.7.9 3.7.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3z" />
  </svg>
);

const Check = () => (
  <svg aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-plum" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ---------- tracking helper (fires dataLayer events if GTM is installed) ---------- */
function track(event: string, extra: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...extra });
}

/* ---------- Quote form (4 fields) ---------- */
function QuoteForm({ id = "quote" }: { id?: string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", details: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    track("quote_form_submit");
    // Placeholder handler: opens a pre-filled WhatsApp message so no enquiry is lost
    // before a real form backend (Wix form / Formspree / email) is connected.
    const msg = `Hi Sylvia, quote request please.\nName: ${form.name}\nPhone: ${form.phone}\nEvent date: ${form.date}\nDetails: ${form.details}`;
    window.open(`https://wa.me/447563372067?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-plum/10">
        <p className="font-display text-2xl font-bold text-plum">Thanks — got it.</p>
        <p className="mt-2 text-muted">
          Sylvia will reply with a quote. Need it faster? Call{" "}
          <a className="font-semibold text-plum underline" href={`tel:${BIZ.phoneTel}`}>
            {BIZ.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-plum/10 sm:p-8">
      <h3 className="font-display text-2xl font-bold text-ink">Get your free quote</h3>
      <p className="mt-1 text-sm text-muted">Four quick fields. No pressure, no spam.</p>
      <div className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-sm font-semibold">Your name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/30"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Mobile number</span>
          <input
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/30"
            autoComplete="tel"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Event date</span>
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/30"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Occasion, colours & area (short is fine)</span>
          <textarea
            rows={3}
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder="e.g. 30th birthday, sage & cream garland, Croydon"
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/30"
          />
        </label>
        <button
          type="submit"
          className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-plum px-6 py-4 text-base font-semibold text-white shadow-lg shadow-plum/25 transition hover:bg-plum-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
        >
          Send my quote request
        </button>
        <p className="text-center text-xs text-muted">
          Prefer to chat?{" "}
          <a href={WA_LINK} onClick={() => track("whatsapp_click", { placement: "form" })} className="font-semibold text-plum underline">
            WhatsApp Sylvia
          </a>
        </p>
      </div>
    </form>
  );
}

/* ---------- page ---------- */

export default function App() {
  const services = [
    {
      title: "Balloon garlands",
      body: "Organic garlands in your exact colours. Wall-mounted or on a backdrop. Mini garlands start at £90.",
      price: "from £90",
      verified: true,
    },
    {
      title: "Arches & backdrops",
      body: "Full and half arches, hoops and photo backdrops for birthdays, baby showers and weddings.",
      price: "Quote on request",
      verified: false,
    },
    {
      title: "Themed party decor",
      body: "Any theme, as subtle or as elaborate as you like. Colour-matched to your invites, cake or venue.",
      price: "Quote on request",
      verified: false,
    },
    {
      title: "Balloon bouquets & gifts",
      body: "Smaller pieces for surprises, table displays and room set-ups.",
      price: "Quote on request",
      verified: false,
    },
  ];

  const faqs = [
    {
      q: "How much does balloon decor cost?",
      a: "Mini garlands start at £90. The final price depends on the number of colours, the length, and whether it goes on a wall or a backdrop. Delivery and collection are charged separately based on your location. You get a clear written quote before you pay anything.",
    },
    {
      q: "Do you set it up, or do I collect it?",
      a: "Sylvia designs, preps and sets up at your venue or home, so you are not blowing up balloons in your living room the night before. Collection options can be discussed when you book.",
    },
    {
      q: "How far ahead should I book?",
      a: "As early as you can, especially for weekends and school holidays. If your date is close, message anyway. If it is possible, Sylvia will tell you straight away.",
    },
    {
      q: "Which areas do you cover?",
      a: "London, Kent, Essex and Surrey. If you are just outside those areas, ask. Travel is quoted up front so there are no surprises.",
    },
    {
      q: "Will the colours match what I asked for?",
      a: "Colour matching is the whole point. Send a photo of your invite, cake or theme and the balloons are matched to it. You will see the colour plan before the day.",
    },
    {
      q: "How long will the balloons last?",
      a: "Air-filled garlands and arches usually look good for days indoors. Outdoor installs and hot weather shorten that. Sylvia will advise on placement so your decor looks right for the whole event.",
    },
  ];

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-plum/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2" aria-label={`${BIZ.name} home`}>
            {/* LOGO PLACEHOLDER: no logo file found publicly. Replace with real SVG/PNG. */}
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-plum text-lg">
              🎈
            </span>
            <span className="font-display text-lg font-bold leading-none text-plum">
              Balloons By <span className="text-ink">Sylvia</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex" aria-label="Primary">
            <a href="#services" className="hover:text-plum">Services</a>
            <a href="#reviews" className="hover:text-plum">Reviews</a>
            <a href="#how" className="hover:text-plum">How it works</a>
            <a href="#faq" className="hover:text-plum">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BIZ.phoneTel}`}
              onClick={() => track("call_click", { placement: "header" })}
              className="hidden items-center gap-2 rounded-full border-2 border-plum px-4 py-2 text-sm font-semibold text-plum hover:bg-plum hover:text-white sm:inline-flex"
            >
              <PhoneIcon /> {BIZ.phoneDisplay}
            </a>
            <a
              href="#quote"
              onClick={() => track("cta_click", { placement: "header" })}
              className="inline-flex items-center rounded-full bg-plum px-4 py-2 text-sm font-semibold text-white hover:bg-plum-dark"
            >
              Get a quote
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- 1. Hero ---------- */}
        <section className="relative overflow-hidden bg-blush">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-plum ring-1 ring-plum/15">
                {BIZ.tagline} · {BIZ.areas.join(" · ")}
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                Show up to your own party as a guest.{" "}
                <span className="text-plum">Sylvia handles the balloons.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted">
                Bespoke balloon garlands, arches and party decor across London, Kent, Essex and Surrey. Designed in your
                exact colours, built and set up for you. Mini garlands from <strong className="text-ink">£90</strong>.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="#quote" onClick={() => track("cta_click", { placement: "hero" })}>
                  Get a free quote
                </CTAButton>
                <CTAButton
                  href={`tel:${BIZ.phoneTel}`}
                  variant="ghost"
                  onClick={() => track("call_click", { placement: "hero" })}
                >
                  <PhoneIcon /> Call {BIZ.phoneDisplay}
                </CTAButton>
              </div>

              {/* Trust line: VERIFIED facts only */}
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Check /> {BIZ.instagramPosts} designs shared on Instagram
                </li>
                <li className="flex items-center gap-2">
                  <Check /> Pricing shown up front
                </li>
                <li className="flex items-center gap-2">
                  <Check /> Set up at your venue
                </li>
              </ul>
              {/* PLACEHOLDER — swap for "★ 5.0 · 00 Google reviews" once owner supplies GBP link */}
              <p className="mt-3 inline-block rounded-md border border-dashed border-plum/40 bg-white px-3 py-1 text-xs text-muted">
                [PLACEHOLDER: Google rating + review count — owner to supply]
              </p>
            </div>

            <figure className="relative">
              <img
                src="/images/hero-placeholder.jpg"
                alt="Placeholder image of a plum, blush and gold balloon garland on an arch in a living room — replace with a real Balloons By Sylvia installation photo"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl shadow-plum/20"
                fetchPriority="high"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 text-[11px] text-white">
                Placeholder image — replace with real client photo
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- 2. Pain → Solution ---------- */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle
              kicker="Sound familiar?"
              title="The three things that go wrong with party balloons"
              sub="Pulled from what people complain about in public reviews of balloon services. Here's how Sylvia avoids each one."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  pain: "“The colours looked nothing like what I picked.”",
                  fix: "You send a photo of your invite, cake or theme. Sylvia matches the balloons to it and confirms the colour plan with you before the day.",
                },
                {
                  pain: "“It arrived late, or half-deflated, and nobody replied.”",
                  fix: "No courier boxes. Sylvia builds and installs in person, at an agreed time before your guests arrive. You have her direct mobile number.",
                },
                {
                  pain: "“Surprise charges after I'd already said yes.”",
                  fix: "Starting prices are published. Your written quote lists the decor, delivery and collection separately, so the number you see is the number you pay.",
                },
              ].map((item) => (
                <article key={item.pain} className="rounded-2xl bg-blush p-6 ring-1 ring-plum/10">
                  <p className="font-display text-xl font-bold text-plum">{item.pain}</p>
                  <p className="mt-3 text-muted">{item.fix}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 3. Services / Offer ---------- */}
        <section id="services" className="bg-blush py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle
              kicker="What you can book"
              title="Balloon decor for birthdays, baby showers, weddings & brand events"
              sub="Every piece is one of a kind, made to match your theme. As subtle or as elaborate as you like."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s) => (
                <article key={s.title} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-plum/10">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold">{s.title}</h3>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        s.verified ? "bg-plum text-white" : "bg-blush-deep text-plum"
                      }`}
                    >
                      {s.price}
                    </span>
                  </div>
                  <p className="mt-2 text-muted">{s.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-plum/15 bg-white p-6 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">What every booking includes</p>
                <ul className="mt-2 grid gap-1 text-sm text-muted sm:grid-cols-2">
                  <li className="flex gap-2"><Check /> Design consultation on your colours and theme</li>
                  <li className="flex gap-2"><Check /> All prep done off-site, not in your kitchen</li>
                  <li className="flex gap-2"><Check /> Set-up at your venue before guests arrive</li>
                  <li className="flex gap-2"><Check /> Delivery & collection quoted separately, up front</li>
                </ul>
              </div>
              <CTAButton href="#quote" className="mt-5 sm:mt-0" onClick={() => track("cta_click", { placement: "services" })}>
                Price my event
              </CTAButton>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Prices start at £90 for a mini garland and vary by colours, length and placement. Delivery and collection
              are extra and depend on location.
            </p>
          </div>
        </section>

        {/* ---------- 4. Social proof ---------- */}
        <section id="reviews" className="bg-white py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle
              kicker="Real clients"
              title="What people say after the party"
              sub="Reviews below are placeholders. They will be replaced with real, attributed reviews supplied by the owner. No invented testimonials."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <blockquote
                  key={n}
                  className="rounded-2xl border-2 border-dashed border-plum/30 bg-blush p-6 text-muted"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-plum">Placeholder review {n}</p>
                  <p className="mt-2">
                    [Paste real review text here, word for word as publicly shown on Google / Facebook / Instagram.]
                  </p>
                  <footer className="mt-4 text-sm">
                    — [Reviewer first name + initial], [Platform], [Month Year]
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
              <a
                href={BIZ.instagram}
                target="_blank"
                rel="noopener"
                onClick={() => track("instagram_click")}
                className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 font-semibold text-plum ring-1 ring-plum/15 hover:bg-blush-deep"
              >
                See {BIZ.instagramPosts} real installs on Instagram →
              </a>
              <span className="text-muted">{BIZ.instagramFollowers} followers · @balloonsbysylvia</span>
            </div>
          </div>
        </section>

        {/* ---------- 5. Why choose us ---------- */}
        <section className="bg-plum py-16 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle
              light
              kicker="Why Sylvia"
              title="One stylist. Your colours. Done before the doorbell rings."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  h: "You deal with Sylvia directly",
                  p: "Not a call centre or a booking portal. The person who quotes your job is the person who designs and installs it.",
                },
                {
                  h: "Colour matching is the speciality",
                  p: "Sylvia's whole approach is built on matching colours perfectly to your theme, so the decor looks planned, not bought.",
                },
                {
                  h: "Prices you can see before you ask",
                  p: "Starting prices are public. Many balloon stylists only quote by DM. Here you know the floor before you message.",
                },
                {
                  h: "It gives you your time back",
                  p: "Design, prep and set-up are handled. You spend party day with your guests, not a hand pump.",
                },
              ].map((item) => (
                <div key={item.h} className="rounded-2xl bg-white/10 p-6 ring-1 ring-white/15">
                  <h3 className="font-display text-lg font-bold text-gold">{item.h}</h3>
                  <p className="mt-2 text-white/85">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 6. How it works ---------- */}
        <section id="how" className="bg-white py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionTitle kicker="Simple process" title="How it works in 3 steps" />
            <ol className="grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "1",
                  h: "Send your date, area and idea",
                  p: "Use the short form, WhatsApp or call. A photo of your theme or invite helps a lot.",
                },
                {
                  n: "2",
                  h: "Get a clear quote and colour plan",
                  p: "You receive a written price with decor, delivery and collection listed separately. Approve it, pay a deposit, and the date is yours.",
                },
                {
                  n: "3",
                  h: "Sylvia sets up. You host.",
                  p: "Everything is built and installed at your venue at the agreed time. You walk in, take photos, and enjoy it.",
                },
              ].map((s) => (
                <li key={s.n} className="relative rounded-2xl bg-blush p-6 pt-10 ring-1 ring-plum/10">
                  <span className="absolute -top-4 left-6 grid h-10 w-10 place-items-center rounded-full bg-plum font-display text-lg font-bold text-white shadow">
                    {s.n}
                  </span>
                  <h3 className="font-display text-xl font-bold">{s.h}</h3>
                  <p className="mt-2 text-muted">{s.p}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-center text-xs text-muted">
              [OWNER TO CONFIRM deposit amount and payment terms before launch.]
            </p>
          </div>
        </section>

        {/* ---------- 7. Risk reversal ---------- */}
        <section className="bg-blush py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-plum/10 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-plum">Booking with confidence</p>
              <h2 className="font-display mt-2 text-3xl font-bold">No hidden costs. Written quote first.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                You see the full price, including delivery and collection, in writing before you pay a penny. If the
                quote isn't right for you, no hard feelings.
              </p>
              <div className="mt-6 rounded-xl border-2 border-dashed border-plum/30 bg-blush p-4 text-sm text-muted">
                [PLACEHOLDER — guarantee block. Suggested for owner approval: “If your install isn't set up by the agreed
                time, you get £X back.” Only publish if Sylvia agrees to it. Do not launch this box unedited.]
              </div>
              <div className="mt-6 rounded-xl bg-blush-deep p-4 text-sm">
                <strong className="text-plum">Referral offer (live on current site):</strong> {BIZ.referral}{" "}
                <span className="text-muted">Conditions apply — see booking terms.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 8. FAQ ---------- */}
        <section id="faq" className="bg-white py-16 scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionTitle kicker="Questions" title="Things people ask before booking" />
            <div className="divide-y divide-plum/10 rounded-2xl ring-1 ring-plum/10">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5" onToggle={(e) => (e.currentTarget.open ? track("faq_open", { q: f.q }) : null)}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush text-plum transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 9. Final CTA + NAP ---------- */}
        <section id="quote" className="bg-plum py-16 text-white scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold">Ready when you are</p>
              <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
                Tell Sylvia your date. Get a quote back.
              </h2>
              <p className="mt-3 text-white/85">
                Weekends go first. If your event is coming up, send your details now and you'll know quickly whether the
                date is free.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton href={`tel:${BIZ.phoneTel}`} variant="gold" onClick={() => track("call_click", { placement: "footer" })}>
                  <PhoneIcon /> Call {BIZ.phoneDisplay}
                </CTAButton>
                <a
                  href={WA_LINK}
                  onClick={() => track("whatsapp_click", { placement: "footer" })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-3.5 font-semibold text-white hover:bg-white hover:text-plum"
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>

              <dl className="mt-10 grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-gold">Business name</dt>
                  <dd>{BIZ.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gold">Phone</dt>
                  <dd>
                    <a className="underline" href={`tel:${BIZ.phoneTel}`}>
                      {BIZ.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gold">Email</dt>
                  <dd>
                    <a className="underline" href={`mailto:${BIZ.email}`} onClick={() => track("email_click")}>
                      {BIZ.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gold">Areas covered</dt>
                  <dd>{BIZ.areas.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gold">Based in</dt>
                  <dd>London (Camden, NW1) <span className="text-white/60">— owner to confirm vs Google profile</span></dd>
                </div>
                <div>
                  <dt className="font-semibold text-gold">Hours</dt>
                  <dd className="text-white/80">{BIZ.hours}</dd>
                </div>
              </dl>

              <div className="mt-8 flex gap-4 text-sm">
                <a className="underline hover:text-gold" href={BIZ.instagram} target="_blank" rel="noopener">Instagram</a>
                <a className="underline hover:text-gold" href={BIZ.facebook} target="_blank" rel="noopener">Facebook</a>
                <a className="underline hover:text-gold" href={BIZ.tiktok} target="_blank" rel="noopener">TikTok</a>
              </div>
            </div>

            <QuoteForm />
          </div>
        </section>
      </main>

      <footer className="bg-plum-dark py-6 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {BIZ.name} · Balloon decor in London, Kent, Essex & Surrey
      </footer>

      {/* ---------- Sticky mobile bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-plum/15 bg-white/95 p-2 backdrop-blur md:hidden" role="region" aria-label="Quick contact">
        <a
          href={`tel:${BIZ.phoneTel}`}
          onClick={() => track("call_click", { placement: "sticky" })}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-plum py-3 font-semibold text-plum"
        >
          <PhoneIcon /> Call
        </a>
        <a
          href="#quote"
          onClick={() => track("cta_click", { placement: "sticky" })}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-plum py-3 font-semibold text-white"
        >
          Get a quote
        </a>
      </div>
    </>
  );
}
