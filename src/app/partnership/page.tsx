"use client";

import { useState, useEffect } from "react";

const TICKER_ITEMS: string[] = [
  "HILEE PARTNERSHIP",
  "GROW WITH US",
  "PREMIUM DRINKWARE",
  "RETAILER PROGRAM",
  "DISTRIBUTOR NETWORK",
  "JOIN THE FAMILY",
  "HILEE PARTNERSHIP",
  "GROW WITH US",
  "PREMIUM DRINKWARE",
  "RETAILER PROGRAM",
  "DISTRIBUTOR NETWORK",
  "JOIN THE FAMILY",
];

const BENEFITS = [
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "Double-wall vacuum insulation, BPA-free materials, and a lifetime warranty — products your customers will come back for.",
  },
  {
    icon: "📈",
    title: "Competitive Margins",
    desc: "Attractive wholesale pricing with flexible volume tiers and payment terms designed to help your business grow.",
  },
  {
    icon: "🎯",
    title: "Marketing Support",
    desc: "Ready-to-use product photography, display assets, and co-branded campaign materials — everything you need to sell.",
  },
];

const PARTNERSHIP_TYPES = [
  {
    type: "Retail Partnership",
    tag: "STORES & PHARMACIES",
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
    desc: "Become the exclusive Hilee distributor in your area. Ideal for businesses with established distribution networks ready to carry a fast-growing premium brand.",
    perks: [
      "Exclusive territorial rights",
      "Volume-based discounts",
      "Priority customer support",
      "Co-branding opportunities",
    ],
    featured: true,
  },
  {
    type: "Reseller / Online",
    tag: "E-COMMERCE",
    desc: "Sell Hilee through your online store, marketplace, or social commerce channels. A lean program built for digital-first sellers.",
    perks: [
      "Digital asset library",
      "Dropship-friendly options",
      "Affiliate tracking tools",
      "Dedicated account manager",
    ],
    featured: false,
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
          .pt-sk-wrap { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%); min-height: 100vh; }
          @keyframes pt-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          .pt-sk {
            background: linear-gradient(90deg, rgba(14,165,233,0.08) 25%, rgba(14,165,233,0.16) 37%, rgba(14,165,233,0.08) 63%);
            background-size: 800px 100%;
            animation: pt-shimmer 1.4s ease-in-out infinite;
            border-radius: 10px;
          }
          .pt-sk-ticker { height: 40px; background: rgba(14,165,233,0.05); border-bottom: 1px solid rgba(14,165,233,0.1); }
          .pt-sk-hero { padding: 5rem 2.5rem 3.5rem; text-align: center; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.1rem; }
          .pt-sk-pill { width: 170px; height: 24px; border-radius: 999px; }
          .pt-sk-title { width: min(85%, 460px); height: 68px; border-radius: 16px; }
          .pt-sk-sub { width: min(75%, 420px); height: 16px; }
          .pt-sk-body { max-width: 1160px; margin: 0 auto; padding: 2rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 3rem; }
          .pt-sk-label { width: 200px; height: 12px; margin-bottom: 1.25rem; }
          .pt-sk-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
          .pt-sk-why-card { border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.1); padding: 2rem 1.75rem; background: white; display: flex; flex-direction: column; gap: 0.75rem; }
          .pt-sk-icon { width: 32px; height: 32px; border-radius: 8px; }
          .pt-sk-line { height: 12px; }
          .pt-sk-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
          .pt-sk-type-card { border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.1); background: white; padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.7rem; }
          .pt-sk-form { border-radius: 24px; background: #F3ECE1; border: 1.5px solid #DDD8CF; padding: 3rem 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
          .pt-sk-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
          .pt-sk-field { height: 44px; }
          .pt-sk-field.span2 { grid-column: 1 / -1; height: 100px; }
          .pt-sk-btn { width: 220px; height: 46px; border-radius: 999px; margin-top: 0.75rem; }
          @media (max-width: 960px) {
            .pt-sk-why { grid-template-columns: 1fr 1fr; }
            .pt-sk-types { grid-template-columns: 1fr; }
          }
          @media (max-width: 700px) {
            .pt-sk-hero { padding: 3.5rem 1.25rem 2.5rem; }
            .pt-sk-body { padding: 1.5rem 1.25rem 4rem; }
            .pt-sk-why { grid-template-columns: 1fr; }
            .pt-sk-form { padding: 2rem 1.25rem; }
            .pt-sk-form-grid { grid-template-columns: 1fr; }
            .pt-sk-field.span2 { grid-column: 1; }
          }
        `}</style>
        <div className="pt-sk-wrap">
          <div className="pt-sk-ticker" />
          <div className="pt-sk-hero">
            <div className="pt-sk pt-sk-pill" />
            <div className="pt-sk pt-sk-title" />
            <div className="pt-sk pt-sk-sub" />
          </div>
          <div className="pt-sk-body">
            <div>
              <div className="pt-sk pt-sk-label" />
              <div className="pt-sk-why">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="pt-sk-why-card">
                    <div className="pt-sk pt-sk-icon" />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "55%", height: 16 }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "100%" }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "85%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pt-sk pt-sk-label" />
              <div className="pt-sk-types">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="pt-sk-type-card">
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "45%", height: 18, borderRadius: 999 }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "70%", height: 18 }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "100%" }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "90%" }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "60%", marginTop: 8 }}
                    />
                    <div
                      className="pt-sk pt-sk-line"
                      style={{ width: "50%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-sk-form">
              <div
                className="pt-sk pt-sk-line"
                style={{ width: "35%", height: 24 }}
              />
              <div className="pt-sk pt-sk-line" style={{ width: "55%" }} />
              <div className="pt-sk-form-grid">
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field" />
                <div className="pt-sk pt-sk-field span2" />
              </div>
              <div className="pt-sk pt-sk-btn" />
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

        .pt { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%); color: #0C1C2E; min-height: 100vh; }
        .pt * { box-sizing: border-box; margin: 0; padding: 0; }
        .pt-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Ticker */
        @keyframes pt-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pt-ticker { background: linear-gradient(90deg, #E0F2FE, #F0F9FF); border-bottom: 1px solid rgba(14,165,233,0.1); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .pt-tick-track { display: flex; width: max-content; animation: pt-tick 30s linear infinite; }
        .pt-tick-item { display: flex; align-items: center; gap: 1rem; padding: 0 2rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #0C1C2E; white-space: nowrap; }
        .pt-tick-dot { width: 5px; height: 5px; border-radius: 50%; background: #0EA5E9; flex-shrink: 0; }

        /* Hero */
        .pt-hero { padding: 5rem 2.5rem 3.5rem; text-align: center; border-bottom: 1.5px solid rgba(14,165,233,0.18); background: linear-gradient(135deg, #B8DFF5 0%, #D6EDFB 50%, #F0F9FF 100%); }
        .pt-hero-inner { max-width: 900px; margin: 0 auto; }
        .pt-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(14,165,233,0.1); border: 1.5px solid rgba(14,165,233,0.25); border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #0EA5E9; margin-bottom: 1.5rem; }

        /* Fade-up */
        @keyframes pt-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .pt-u { animation: pt-up 0.7s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}
        .d4{animation-delay:.38s}.d5{animation-delay:.5s}.d6{animation-delay:.62s}

        /* Body */
        .pt-body { max-width: 1160px; margin: 0 auto; padding: 4rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 4rem; }
        .pt-section-label { display: flex; align-items: center; gap: 1rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #ACA193; margin-bottom: 1.5rem; }
        .pt-section-label::after { content: ''; flex: 1; height: 1px; background: #DDD8CF; }

        /* Why cards */
        .pt-why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: stretch; }
        .pt-why-card { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7)); border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.15); padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; height: 100%; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .pt-why-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(14,165,233,0.15); border-color: rgba(14,165,233,0.3); }
        .pt-why-icon { font-size: 1.6rem; }
        .pt-why-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 1.05rem; color: #0C1C2E; }
        .pt-why-desc { font-size: 0.85rem; color: #7C6F60; line-height: 1.75; flex: 1; }

        /* Partnership cards */
        .pt-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; align-items: stretch; }
        .pt-type-card { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7)); border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.15); overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .pt-type-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 40px rgba(14,165,233,0.2); border-color: rgba(14,165,233,0.3); }
        .pt-type-card.featured { border-color: #0EA5E9; box-shadow: 0 0 0 2px rgba(14,165,233,0.1); }
        .pt-type-header { padding: 1.75rem 1.5rem 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; }
        .pt-type-tag {
          display: inline-flex; align-items: center; width: fit-content;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.15em;
          text-transform: uppercase; color: #0EA5E9;
          background: rgba(14,165,233,0.1); border-radius: 999px;
          padding: 0.3rem 0.75rem; margin-bottom: 0.25rem;
        }
        .pt-type-tag.featured { background: #0EA5E9; color: #fff; }
        .pt-type-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.15rem; color: #0C1C2E; }
        .pt-type-desc { font-size: 0.82rem; color: #7C6F60; line-height: 1.75; }
        .pt-type-perks { padding: 1.25rem 1.5rem; border-top: 1.5px dashed #DDD8CF; display: flex; flex-direction: column; gap: 0.55rem; }
        .pt-perk { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8rem; color: #5C4F3A; line-height: 1.4; }
        .pt-perk::before { content: '✓'; color: #8C7355; font-weight: 800; font-size: 0.75rem; flex-shrink: 0; margin-top: 0.1rem; }

        /* Form */
        .pt-form-wrap { background: #F3ECE1; border-radius: 24px; border: 1.5px solid #DDD8CF; padding: 3rem 2.5rem; }
        .pt-form-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.75rem; color: #2E2419; margin-bottom: 0.5rem; }
        .pt-form-sub { font-size: 0.88rem; color: #7C6F60; line-height: 1.7; margin-bottom: 2rem; }
        .pt-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .pt-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .pt-field.span2 { grid-column: 1 / -1; }
        .pt-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #5C4F3A; }
        .pt-label span { color: #FF6B35; }
        .pt-input, .pt-select, .pt-textarea {
          border: 1.5px solid #DDD8CF; border-radius: 12px; padding: 0.7rem 1rem;
          font-family: 'Nunito', sans-serif; font-size: 0.88rem;
          background: white; color: #2E2419; outline: none;
          transition: border-color 0.15s; width: 100%;
        }
        .pt-input:focus, .pt-select:focus, .pt-textarea:focus { border-color: #8C7355; box-shadow: 0 0 0 3px rgba(140,115,85,0.1); }
        .pt-input::placeholder, .pt-textarea::placeholder { color: #ACA193; }
        .pt-textarea { resize: vertical; min-height: 120px; }

        .pt-input.error, .pt-select.error, .pt-textarea.error { border-color: #C0392B; }
        .pt-field-error { font-size: 0.7rem; color: #C0392B; font-weight: 600; margin-top: 0.1rem; }

        .pt-server-error {
          background: #FDF0EE; border: 1.5px solid #E8C4BC; border-radius: 12px;
          padding: 0.85rem 1.1rem; font-size: 0.82rem; color: #8B2217;
          margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;
        }

        .pt-submit { margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .pt-submit-btn {
          background: linear-gradient(135deg, #0EA5E9, #06B6D4); color: white; border: none; border-radius: 999px;
          padding: 0.8rem 2rem; font-family: 'Nunito', sans-serif; font-weight: 800;
          font-size: 0.88rem; cursor: pointer;
          box-shadow: 0 12px 32px rgba(14,165,233,0.4);
          transition: all 0.3s ease;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .pt-submit-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.5); }
        .pt-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .pt-submit-note { font-size: 0.72rem; color: #ACA193; font-weight: 600; }

        @keyframes pt-spin { to { transform: rotate(360deg); } }
        .pt-spinner {
          width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: pt-spin 0.7s linear infinite; flex-shrink: 0;
        }

        /* Success */
        .pt-success { text-align: center; padding: 3rem 2rem; }
        .pt-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .pt-success-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.5rem; color: #2E2419; margin-bottom: 0.5rem; }
        .pt-success-sub { font-size: 0.9rem; color: #7C6F60; line-height: 1.7; }

        /* Trust */
        .pt-trust { display: flex; align-items: center; justify-content: center; gap: 2.25rem; flex-wrap: wrap; padding: 1.75rem 2.5rem; border-top: 1.5px dashed #DDD8CF; }
        .pt-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #ACA193; }

        /* Responsive */
        @media (max-width: 960px) {
          .pt-why { grid-template-columns: 1fr 1fr; }
          .pt-types { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .pt-hero { padding: 3.5rem 1.25rem 2.5rem; }
          .pt-body { padding: 2.5rem 1.25rem 4rem; gap: 3rem; }
          .pt-why { grid-template-columns: 1fr; }
          .pt-form-wrap { padding: 2rem 1.25rem; }
          .pt-form-grid { grid-template-columns: 1fr; }
          .pt-field.span2 { grid-column: 1; }
          .pt-trust { gap: 1.25rem; padding: 1.5rem 1.25rem; }
        }
        @media (max-width: 400px) {
          .pt-hero { padding: 2.5rem 1rem 2rem; }
          .pt-body { padding: 2rem 1rem 3rem; }
        }
      `}</style>

      <div className="pt">
        {/* Ticker */}
        <div className="pt-ticker">
          <div className="pt-tick-track">
            {TICKER_ITEMS.map((item, i) => (
              <div key={i} className="pt-tick-item">
                <span className="pt-tick-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <div className="pt-eyebrow pt-u d1">✦ Become a Partner</div>
            <h1
              className="pt-h pt-u d2"
              style={{
                fontSize: "clamp(3rem,9vw,7rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                marginBottom: "1.25rem",
                color: "#2E2419",
              }}
            >
              Grow with Us
            </h1>
            <p
              className="pt-u d3"
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#7C6F60",
                maxWidth: "48ch",
                margin: "0 auto",
              }}
            >
              Join our growing network of retailers and distributors bringing
              premium Hilee drinkware to more people — everywhere.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="pt-body">
          {/* Why Partner */}
          <div>
            <div className="pt-section-label pt-u d4">
              Why Partner with Hilee
            </div>
            <div className="pt-why pt-u d4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="pt-why-card">
                  <div className="pt-why-icon">{b.icon}</div>
                  <div className="pt-why-title">{b.title}</div>
                  <div className="pt-why-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Types */}
          <div>
            <div className="pt-section-label pt-u d4">
              Partnership Opportunities
            </div>
            <div className="pt-types pt-u d5">
              {PARTNERSHIP_TYPES.map((p) => (
                <div
                  key={p.type}
                  className={`pt-type-card${p.featured ? " featured" : ""}`}
                >
                  <div className="pt-type-header">
                    <div
                      className={`pt-type-tag${p.featured ? " featured" : ""}`}
                    >
                      {p.tag}
                    </div>
                    <div className="pt-type-title">{p.type}</div>
                    <div className="pt-type-desc">{p.desc}</div>
                  </div>
                  <div className="pt-type-perks">
                    {p.perks.map((perk) => (
                      <div key={perk} className="pt-perk">
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="pt-form-wrap pt-u d6" id="partner-form">
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
                      <span className="pt-field-error">{fieldErrors.name}</span>
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
                      <span className="pt-field-error">{fieldErrors.type}</span>
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

          {/* Trust Bar */}
        </div>
      </div>
    </>
  );
}
