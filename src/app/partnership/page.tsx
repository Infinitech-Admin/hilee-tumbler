"use client";

import { useState, useEffect } from "react";

const BENEFITS = [
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "Double-wall vacuum insulation, BPA-free materials, and a lifetime warranty — products your customers will come back for.",
    level: 1,
  },
  {
    icon: "📈",
    title: "Competitive Margins",
    desc: "Attractive wholesale pricing with flexible volume tiers and payment terms designed to help your business grow.",
    level: 2,
  },
  {
    icon: "🎯",
    title: "Marketing Support",
    desc: "Ready-to-use product photography, display assets, and co-branded campaign materials — everything you need to sell.",
    level: 3,
  },
];

const PARTNERSHIP_TYPES = [
  {
    type: "Reseller / Online",
    tag: "E-COMMERCE",
    tier: "Tier 01",
    desc: "Sell Hilee through your online store, marketplace, or social commerce channels. A lean program built for digital-first sellers.",
    perks: [
      "Digital asset library",
      "Dropship-friendly options",
      "Affiliate tracking tools",
      "Dedicated account manager",
    ],
    featured: false,
  },
  {
    type: "Retail Partnership",
    tag: "STORES & PHARMACIES",
    tier: "Tier 02",
    desc: "Stock Hilee products in your retail outlet, lifestyle store, or supermarket. Perfect for established retailers looking to expand their premium drinkware selection.",
    perks: [
      "Wholesale pricing on all SKUs",
      "Flexible minimum order quantities",
      "In-store display materials",
      "Product training & demos",
    ],
    featured: false,
  },
  {
    type: "Distributor Partnership",
    tag: "EXCLUSIVE REGIONS",
    tier: "Tier 03",
    desc: "Become the exclusive Hilee distributor in your area. Ideal for businesses with established distribution networks ready to carry a fast-growing premium brand.",
    perks: [
      "Exclusive territorial rights",
      "Volume-based discounts",
      "Priority customer support",
      "Co-branding opportunities",
    ],
    featured: true,
  },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export default function Partnership() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    type: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim()) errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Please enter a valid email address.";
    if (!form.type) errors.type = "Please select a partnership type.";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/partnership-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
          type: form.type,
          message: form.message.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          const mapped: FieldErrors = {};
          for (const [key, messages] of Object.entries(data.errors)) {
            mapped[key as keyof FormState] = (messages as string[])[0];
          }
          setFieldErrors(mapped);
          return;
        }
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Failed to submit. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <style>{`
          .pt-sk-wrap { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); min-height: 100vh; }
          @keyframes pt-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          .pt-sk {
            background: linear-gradient(90deg, rgba(6,174,213,0.08) 25%, rgba(6,174,213,0.18) 37%, rgba(6,174,213,0.08) 63%);
            background-size: 800px 100%;
            animation: pt-shimmer 1.4s ease-in-out infinite;
            border-radius: 10px;
          }
          .pt-sk-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; }
          .pt-sk-hero { padding: 4.5rem 2.5rem; max-width: 1160px; margin: 0 auto; }
          .pt-sk-pill { width: 160px; height: 22px; border-radius: 999px; }
          .pt-sk-title { width: 60%; height: 100px; border-radius: 16px; margin-top: 1rem; }
          .pt-sk-sub { width: 45%; height: 16px; margin-top: 1rem; }
          .pt-sk-body { max-width: 1160px; margin: 0 auto; padding: 1rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 3.5rem; }
          .pt-sk-label { width: 200px; height: 12px; margin-bottom: 1.25rem; }
          .pt-sk-why { display: flex; gap: 1.25rem; align-items: flex-end; }
          .pt-sk-why-card { flex: 1; border-radius: 18px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; }
          .pt-sk-row { border-radius: 20px; height: 150px; margin-bottom: 1rem; }
          .pt-sk-form { border-radius: 24px; display: grid; grid-template-columns: 0.8fr 1.2fr; overflow: hidden; }
          .pt-sk-form-side { height: 420px; }
          .pt-sk-form-main { padding: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
          .pt-sk-field { height: 44px; }
          @media (max-width: 900px) {
            .pt-sk-form { grid-template-columns: 1fr; }
          }
        `}</style>
        <div className="pt-sk-wrap">
          <div className="pt-sk-hero-band">
            <div className="pt-sk-hero">
              <div>
                <div className="pt-sk pt-sk-pill" />
                <div className="pt-sk pt-sk-title" />
                <div className="pt-sk pt-sk-sub" />
              </div>
            </div>
          </div>
          <div className="pt-sk-body">
            <div>
              <div className="pt-sk pt-sk-label" />
              <div className="pt-sk-why">
                {[70, 100, 130].map((h, i) => (
                  <div
                    key={i}
                    className="pt-sk pt-sk-why-card"
                    style={{ height: h }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="pt-sk pt-sk-label" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="pt-sk pt-sk-row" />
              ))}
            </div>
            <div className="pt-sk-form">
              <div className="pt-sk pt-sk-form-side" />
              <div className="pt-sk-form-main">
                <div
                  className="pt-sk pt-sk-field"
                  style={{ width: "40%", height: 24 }}
                />
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Nunito:wght@300;400;500;600;700;800&display=swap');

        .pt { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); color: #073B4C; min-height: 100vh; }
        .pt * { box-sizing: border-box; margin: 0; padding: 0; }
        .pt-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Hero: split layout with a rising "fill gauge" instead of centered banner */
        .pt-hero { max-width: 900px; margin: 0 auto; padding: 4.5rem 2.5rem 3.5rem; position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .pt-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; }
        .pt-eyebrow { display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(255,255,255,0.6); border: 1.5px solid rgba(3,105,161,0.3); border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #0369A1; margin-bottom: 1.5rem; }

        @keyframes pt-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .pt-u { animation: pt-up 0.7s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}
        .d4{animation-delay:.38s}.d5{animation-delay:.5s}.d6{animation-delay:.62s}

        .pt-body { max-width: 1160px; margin: 0 auto; padding: 1rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 4.5rem; }
        .pt-section-label { display: flex; align-items: center; gap: 1rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #5B94A6; margin-bottom: 1.5rem; }
        .pt-section-label::after { content: ''; flex: 1; height: 1px; background: #CDEEF9; }

        /* Why partner: ascending step cards (heights grow) instead of equal 3-col grid */
        .pt-why { display: flex; gap: 1.25rem; align-items: flex-end; }
        .pt-why-card { flex: 1; background: #FFFFFF; border-radius: 18px; border: 1.5px solid #CDEEF9; padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.65rem; transition: all 0.3s ease; }
        .pt-why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(6,174,213,0.18); border-color: #67E8F9; }
        .pt-why-card.lv1 { padding-bottom: 1.75rem; }
        .pt-why-card.lv2 { padding-bottom: 2.75rem; }
        .pt-why-card.lv3 { padding-bottom: 3.75rem; background: linear-gradient(160deg,#FFFFFF, #EAFBFF); }
        .pt-why-icon { font-size: 1.5rem; }
        .pt-why-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 1.02rem; color: #073B4C; }
        .pt-why-desc { font-size: 0.84rem; color: #5B7C8D; line-height: 1.7; }

        /* Partnership types: stacked tier rows connected by a rising line, not a card grid */
        .pt-tiers { position: relative; display: flex; flex-direction: column; gap: 1rem; padding-left: 2.25rem; }
        .pt-tiers::before { content: ''; position: absolute; left: 7px; top: 10px; bottom: 10px; width: 2px; background: linear-gradient(180deg, #BAE6FD, #0EA5E9); border-radius: 2px; }
        .pt-tier-row { position: relative; background: #FFFFFF; border: 1.5px solid #CDEEF9; border-radius: 18px; padding: 1.5rem 1.75rem; display: grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; align-items: center; transition: all 0.3s ease; }
        .pt-tier-row::before { content: ''; position: absolute; left: -2.25rem; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; border-radius: 50%; background: #FFFFFF; border: 3px solid #0EA5E9; }
        .pt-tier-row:hover { box-shadow: 0 16px 40px rgba(6,174,213,0.16); transform: translateX(4px); }
        .pt-tier-row.featured { border-color: #0EA5E9; background: linear-gradient(135deg, #F0FBFF, #E0F7FE); box-shadow: 0 0 0 2px rgba(14,165,233,0.12); }
        .pt-tier-row.featured::before { background: #0EA5E9; }
        .pt-tier-meta { display: flex; flex-direction: column; gap: 0.5rem; }
        .pt-tier-topline { display: flex; align-items: center; gap: 0.6rem; }
        .pt-tier-num { font-family: 'Bricolage Grotesque', sans-serif; font-size: 0.68rem; font-weight: 800; color: #0284C7; letter-spacing: 0.1em; }
        .pt-tier-tag { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; color: #0EA5E9; background: rgba(6,174,213,0.1); border-radius: 999px; padding: 0.28rem 0.7rem; }
        .pt-tier-tag.featured { background: #0EA5E9; color: #fff; }
        .pt-tier-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.2rem; color: #073B4C; }
        .pt-tier-desc { font-size: 0.83rem; color: #5B7C8D; line-height: 1.65; }
        .pt-tier-perks { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .pt-perk-pill { display: flex; align-items: center; gap: 0.35rem; font-size: 0.74rem; font-weight: 600; color: #0C4A6E; background: rgba(6,174,213,0.08); border: 1px solid rgba(6,174,213,0.2); border-radius: 999px; padding: 0.35rem 0.75rem; }
        .pt-perk-pill::before { content: '✓'; color: #0EA5E9; font-weight: 800; }

        /* Contact: split panel — cyan gradient info side + white form side, replacing the tan block */
        .pt-form-wrap { border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 0.85fr 1.15fr; box-shadow: 0 24px 60px rgba(6,58,77,0.12); }
        .pt-form-side { background: linear-gradient(160deg, #073B4C, #0369A1 55%, #0EA5E9); padding: 3rem 2.25rem; display: flex; flex-direction: column; justify-content: space-between; color: #EAFBFF; }
        .pt-form-side-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.6rem; line-height: 1.25; margin-bottom: 1rem; }
        .pt-form-side-sub { font-size: 0.85rem; line-height: 1.75; color: rgba(234,251,255,0.85); }
        .pt-form-stats { display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem; }
        .pt-form-stat { display: flex; align-items: baseline; gap: 0.6rem; }
        .pt-form-stat-num { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.6rem; }
        .pt-form-stat-label { font-size: 0.72rem; color: rgba(234,251,255,0.75); text-transform: uppercase; letter-spacing: 0.08em; }

        .pt-form-main { background: #FFFFFF; padding: 3rem 2.5rem; }
        .pt-form-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.5rem; color: #073B4C; margin-bottom: 0.5rem; }
        .pt-form-sub { font-size: 0.85rem; color: #5B7C8D; line-height: 1.7; margin-bottom: 2rem; }
        .pt-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .pt-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .pt-field.span2 { grid-column: 1 / -1; }
        .pt-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0C4A6E; }
        .pt-label span { color: #EF4444; }
        .pt-input, .pt-select, .pt-textarea {
          border: 1.5px solid #CDEEF9; border-radius: 12px; padding: 0.7rem 1rem;
          font-family: 'Nunito', sans-serif; font-size: 0.88rem;
          background: #F6FEFF; color: #073B4C; outline: none;
          transition: border-color 0.15s; width: 100%;
        }
        .pt-input:focus, .pt-select:focus, .pt-textarea:focus { border-color: #0EA5E9; box-shadow: 0 0 0 3px rgba(14,165,233,0.12); background: #fff; }
        .pt-input::placeholder, .pt-textarea::placeholder { color: #8FBFCE; }
        .pt-textarea { resize: vertical; min-height: 110px; }

        .pt-input.error, .pt-select.error, .pt-textarea.error { border-color: #DC2626; }
        .pt-field-error { font-size: 0.7rem; color: #DC2626; font-weight: 600; margin-top: 0.1rem; }

        .pt-server-error {
          background: #FEF2F2; border: 1.5px solid #FCA5A5; border-radius: 12px;
          padding: 0.85rem 1.1rem; font-size: 0.82rem; color: #991B1B;
          margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;
        }

        .pt-submit { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .pt-submit-btn {
          background: linear-gradient(135deg, #0EA5E9, #0369A1); color: white; border: none; border-radius: 999px;
          padding: 0.8rem 2rem; font-family: 'Nunito', sans-serif; font-weight: 800;
          font-size: 0.88rem; cursor: pointer;
          box-shadow: 0 12px 32px rgba(14,165,233,0.35);
          transition: all 0.3s ease;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .pt-submit-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.45); }
        .pt-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .pt-submit-note { font-size: 0.72rem; color: #8FBFCE; font-weight: 600; }

        @keyframes pt-spin { to { transform: rotate(360deg); } }
        .pt-spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: pt-spin 0.7s linear infinite; flex-shrink: 0;
        }

        .pt-success { text-align: center; padding: 3rem 2rem; }
        .pt-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .pt-success-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.5rem; color: #073B4C; margin-bottom: 0.5rem; }
        .pt-success-sub { font-size: 0.9rem; color: #5B7C8D; line-height: 1.7; }

        @media (max-width: 960px) {
          .pt-tier-row { grid-template-columns: 1fr; }
          .pt-form-wrap { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .pt-hero { padding: 3rem 1.25rem 2.5rem; gap: 2rem; }
          .pt-body { padding: 0 1.25rem 4rem; gap: 3rem; }
          .pt-why { flex-direction: column; }
          .pt-why-card.lv1, .pt-why-card.lv2, .pt-why-card.lv3 { padding-bottom: 1.75rem; }
          .pt-tiers { padding-left: 1.5rem; }
          .pt-tier-row::before { left: -1.5rem; }
          .pt-form-side, .pt-form-main { padding: 2rem 1.25rem; }
          .pt-form-grid { grid-template-columns: 1fr; }
          .pt-field.span2 { grid-column: 1; }
        }
      `}</style>

      <div className="pt">
        {/* Hero */}
        <div className="pt-hero-band">
          <div className="pt-hero">
            <div>
              <div className="pt-eyebrow pt-u d1">✦ Become a Partner</div>
              <h1
                className="pt-h pt-u d2"
                style={{
                  fontSize: "clamp(2.6rem,6vw,4.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.1rem",
                  color: "#073B4C",
                }}
              >
                Grow with Us
              </h1>
              <p
                className="pt-u d3"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#2C6478",
                  maxWidth: "48ch",
                }}
              >
                Join our growing network of retailers and distributors bringing
                premium Hilee drinkware to more people — everywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-body">
          {/* Why Partner — ascending step cards */}
          <div>
            <div className="pt-section-label pt-u d4">
              Why Partner with Hilee
            </div>
            <div className="pt-why pt-u d4">
              {BENEFITS.map((b) => (
                <div key={b.title} className={`pt-why-card lv${b.level}`}>
                  <div className="pt-why-icon">{b.icon}</div>
                  <div className="pt-why-title">{b.title}</div>
                  <div className="pt-why-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Types — connected tier rows */}
          <div>
            <div className="pt-section-label pt-u d4">
              Partnership Opportunities
            </div>
            <div className="pt-tiers pt-u d5">
              {PARTNERSHIP_TYPES.map((p) => (
                <div
                  key={p.type}
                  className={`pt-tier-row${p.featured ? " featured" : ""}`}
                >
                  <div className="pt-tier-meta">
                    <div className="pt-tier-topline">
                      <span className="pt-tier-num">{p.tier}</span>
                      <span
                        className={`pt-tier-tag${p.featured ? " featured" : ""}`}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <div className="pt-tier-title">{p.type}</div>
                    <div className="pt-tier-desc">{p.desc}</div>
                  </div>
                  <div className="pt-tier-perks">
                    {p.perks.map((perk) => (
                      <div key={perk} className="pt-perk-pill">
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form — split gradient panel */}
          <div className="pt-form-wrap pt-u d6" id="partner-form">
            <div className="pt-form-side">
              <div>
                <div className="pt-form-side-title">
                  Let's build something that scales.
                </div>
                <p className="pt-form-side-sub">
                  Tell us about your business and our partnership team will find
                  the right tier for you.
                </p>
              </div>
              <div className="pt-form-stats">
                <div className="pt-form-stat">
                  <span className="pt-form-stat-num">48h</span>
                  <span className="pt-form-stat-label">Avg. reply time</span>
                </div>
                <div className="pt-form-stat">
                  <span className="pt-form-stat-num">3</span>
                  <span className="pt-form-stat-label">Partnership tiers</span>
                </div>
                <div className="pt-form-stat">
                  <span className="pt-form-stat-num">0</span>
                  <span className="pt-form-stat-label">Spam, ever</span>
                </div>
              </div>
            </div>

            <div className="pt-form-main">
              {submitted ? (
                <div className="pt-success">
                  <div className="pt-success-icon">🎉</div>
                  <div className="pt-success-title">We got your inquiry!</div>
                  <p className="pt-success-sub">
                    Our partnership team will reach out within 48 hours. Keep an
                    eye on your inbox — exciting things are coming.
                  </p>
                </div>
              ) : (
                <>
                  <div className="pt-form-title">Start Your Journey</div>
                  <p className="pt-form-sub">
                    Fill out the form below and our team will get back to you
                    within 48 hours.
                  </p>

                  {serverError && (
                    <div className="pt-server-error">
                      <span>⚠️</span> {serverError}
                    </div>
                  )}

                  <div className="pt-form-grid">
                    <div className="pt-field">
                      <label className="pt-label">
                        Full Name <span>*</span>
                      </label>
                      <input
                        className={`pt-input${fieldErrors.name ? " error" : ""}`}
                        name="name"
                        type="text"
                        placeholder="Juan dela Cruz"
                        value={form.name}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                      {fieldErrors.name && (
                        <span className="pt-field-error">
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="pt-field">
                      <label className="pt-label">
                        Email <span>*</span>
                      </label>
                      <input
                        className={`pt-input${fieldErrors.email ? " error" : ""}`}
                        name="email"
                        type="email"
                        placeholder="juan@yourstore.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                      {fieldErrors.email && (
                        <span className="pt-field-error">
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>

                    <div className="pt-field">
                      <label className="pt-label">Company Name</label>
                      <input
                        className="pt-input"
                        name="company"
                        type="text"
                        placeholder="Your Store or Business"
                        value={form.company}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>

                    <div className="pt-field">
                      <label className="pt-label">
                        Partnership Type <span>*</span>
                      </label>
                      <select
                        className={`pt-select${fieldErrors.type ? " error" : ""}`}
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        disabled={submitting}
                      >
                        <option value="">Select a type</option>
                        <option value="retail">Retail Partnership</option>
                        <option value="distributor">
                          Distributor Partnership
                        </option>
                        <option value="reseller">Reseller / Online</option>
                        <option value="other">Other</option>
                      </select>
                      {fieldErrors.type && (
                        <span className="pt-field-error">
                          {fieldErrors.type}
                        </span>
                      )}
                    </div>

                    <div className="pt-field span2">
                      <label className="pt-label">
                        Tell us about your business
                      </label>
                      <textarea
                        className="pt-textarea"
                        name="message"
                        placeholder="What kind of store do you run? Where are you located? How many customers do you reach?"
                        value={form.message}
                        onChange={handleChange}
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="pt-submit">
                    <button
                      className="pt-submit-btn"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="pt-spinner" />
                          Sending…
                        </>
                      ) : (
                        "Send Partnership Inquiry →"
                      )}
                    </button>
                    <span className="pt-submit-note">
                      We reply within 48 hours — no spam, ever.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
