"use client";

import { useState, useEffect } from "react";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%)",
        }}
      ></div>
    );
  }

  const pillars = [
    {
      num: "01",
      name: "Double-wall vacuum",
      desc: "Ice cold for 24 hours. Hot drinks stay warm for 12.",
    },
    {
      num: "02",
      name: "Food-grade stainless",
      desc: "Pure taste, zero plastic. Safe and built to last.",
    },
    {
      num: "03",
      name: "100% BPA free",
      desc: "No harmful chemicals. Just clean, safe hydration.",
    },
    {
      num: "04",
      name: "Drop-tough build",
      desc: "Durable design backed by a lifetime warranty.",
    },
  ];

  const reviews = [
    {
      stars: "★★★★★",
      text: "My iced coffee was still cold after 8 hours. I've tried a lot of tumblers — this one actually delivers.",
      name: "Maria L.",
    },
    {
      stars: "★★★★★",
      text: "Solid, sleek, and the lid has never once leaked on me. It's become my everyday essential.",
      name: "Anna R.",
    },
    {
      stars: "★★★★★",
      text: "Brought it to a full-day event and my drink stayed cold the whole time. Absolutely worth it.",
      name: "Joy P.",
    },
  ];

  const tickerItems = [
    "HILEE TUMBLERS",
    "STAY COLD ALL DAY",
    "BUILT TO LAST",
    "BPA FREE",
    "PREMIUM DRINKWARE",
    "NATIONWIDE SHIPPING",
    "HILEE TUMBLERS",
    "STAY COLD ALL DAY",
    "BUILT TO LAST",
    "BPA FREE",
    "PREMIUM DRINKWARE",
    "NATIONWIDE SHIPPING",
  ];

  const tickerColors = [
    "#8C7355",
    "#A89070",
    "#C4AA8A",
    "#6B5E4A",
    "#D4C4A8",
    "#9E8868",
  ];

  const trustItems = [
    { e: "🚚", t: "Free Shipping" },
    { e: "↩️", t: "30-Day Returns" },
    { e: "🏆", t: "Lifetime Warranty" },
    { e: "✅", t: "100% BPA Free" },
    { e: "🧊", t: "24H Ice Cold" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@300;400;600;700;800&display=swap');

        .ab { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%); color: #0C1C2E; min-height: 100vh; }
        .ab * { box-sizing: border-box; }
        .ab-h { font-family: 'Bricolage Grotesque', sans-serif; }

        @keyframes ab-tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ab-ticker { background: linear-gradient(90deg, #E0F2FE, #F0F9FF); border-bottom: 2px solid rgba(14,165,233,0.1); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .ab-tick-track { display: flex; width: max-content; animation: ab-tick 28s linear infinite; }
        .ab-tick-item { display: flex; align-items: center; gap: 1.25rem; padding: 0 1.75rem; white-space: nowrap; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #0C1C2E; }
        .ab-tick-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        @keyframes ab-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        .ab-u { animation: ab-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1 { animation-delay: .06s } .d2 { animation-delay: .18s }
        .d3 { animation-delay: .3s  } .d4 { animation-delay: .44s }
        .d5 { animation-delay: .56s } .d6 { animation-delay: .68s }

        @keyframes ab-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .ab-badge { display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; animation: ab-float 4s ease-in-out infinite; background: rgba(14,165,233,0.1); border: 1.5px solid rgba(14,165,233,0.25); color: #0EA5E9; }

        .ab-hero { background: linear-gradient(160deg, #BFE3FA 0%, #D3ECFB 45%, #EAF6FE 100%); padding: 4rem 2rem 3rem; text-align: center; border-bottom: 1.5px solid rgba(14,165,233,0.18); }

        .ab-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; display: flex; flex-direction: column; gap: 3rem; }

        .ab-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }

        /* ── IMAGE FIX ── */
        .ab-intro-visual {
          background: linear-gradient(145deg, #F7F1E8, #ECE0CC);
          border-radius: 24px;
          border: 1.5px solid #DDD8CF;
          overflow: hidden;
          position: relative;
          width: 100%;
          min-height: 420px;   /* reliable fixed height instead of aspect-ratio */
        }
        .ab-intro-visual img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .ab-intro-visual:hover img { transform: scale(1.04); }
        .ab-intro-visual-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(26,16,10,0.7) 0%, transparent 100%);
          padding: 1.5rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .ab-intro-visual-label {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #FAF7F2;
          letter-spacing: 0.05em;
        }
        .ab-intro-visual-sub {
          font-size: 0.7rem;
          color: rgba(250,247,242,0.7);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ab-tagline { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; line-height: 1.15; background: linear-gradient(135deg, #0C1C2E 0%, #0EA5E9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
        .ab-tagline span { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ab-body-text { font-size: 0.9rem; color: #7C6F60; font-weight: 500; line-height: 1.8; }

        .ab-section-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.3rem; color: #2E2419; text-align: center; margin-bottom: 1.5rem; }

        .ab-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .ab-pillar { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7)); border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.15); padding: 1.5rem 1rem; text-align: center; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .ab-pillar:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(14,165,233,0.15); border-color: rgba(14,165,233,0.3); }
        .ab-pillar-num { font-family: 'Bricolage Grotesque', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #0EA5E9, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.5rem; }
        .ab-pillar-name { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.85rem; color: #0C1C2E; margin-bottom: 0.3rem; }
        .ab-pillar-desc { font-size: 0.75rem; color: #7C6F60; font-weight: 500; line-height: 1.5; }

        .ab-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .ab-review { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7)); border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.15); padding: 1.25rem; backdrop-filter: blur(10px); transition: all 0.3s ease; }
        .ab-review:hover { transform: translateY(-3px); border-color: rgba(14,165,233,0.3); box-shadow: 0 8px 24px rgba(14,165,233,0.12); }
        .ab-review-stars { color: #0EA5E9; font-size: 0.8rem; margin-bottom: 0.75rem; letter-spacing: 0.1em; }
        .ab-review-text { font-size: 0.82rem; color: #7C6F60; font-weight: 500; line-height: 1.7; margin-bottom: 0.75rem; font-style: italic; }
        .ab-review-name { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.78rem; color: #2E2419; }

        .ab-promise { background: linear-gradient(135deg, #E0F2FE, #F0F9FF); border-radius: 24px; padding: 2.5rem 2rem; text-align: center; border: 1.5px solid rgba(14,165,233,0.2); }
        .ab-promise-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.6rem; background: linear-gradient(135deg, #0C1C2E 0%, #0EA5E9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.75rem; }
        .ab-promise-sub { font-size: 0.9rem; color: #5C6B7A; font-weight: 500; line-height: 1.75; max-width: 46ch; margin: 0 auto; }
        .ab-promise-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #0EA5E9, #06B6D4); color: white; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem; border: none; border-radius: 999px; padding: 0.7rem 1.75rem; cursor: pointer; box-shadow: 0 12px 32px rgba(14,165,233,0.4); transition: all 0.3s ease; }
        .ab-promise-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.5); }

        .ab-trust { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 1.75rem 2rem; border-top: 1.5px dashed #DDD8CF; }
        .ab-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #ACA193; }

        @media (max-width: 860px) {
          .ab-intro { grid-template-columns: 1fr; }
          .ab-intro-visual { min-height: 300px; }
          .ab-pillars { grid-template-columns: repeat(2, 1fr); }
          .ab-reviews { grid-template-columns: 1fr; }
        }
        @media (max-width: 500px) {
          .ab-body { padding: 2rem 1rem 4rem; }
          .ab-pillars { grid-template-columns: repeat(2, 1fr); }
          .ab-intro-visual { min-height: 240px; }
        }
      `}</style>

      <div className="ab">
        {/* Ticker */}
        <div className="ab-ticker">
          <div className="ab-tick-track">
            {tickerItems.map((t, i) => (
              <div key={i} className="ab-tick-item">
                <span
                  className="ab-tick-dot"
                  style={{ background: tickerColors[i % 6] }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="ab-hero">
          <div
            className="ab-u d1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            <span
              className="ab-badge"
              style={{
                background: "rgba(255,107,53,0.1)",
                border: "1.5px solid rgba(255,107,53,0.25)",
                color: "#FF6B35",
                animationDelay: "0s",
              }}
            >
              🧊 Stay Cold. Stay Bold.
            </span>
            <span
              className="ab-badge"
              style={{
                background: "rgba(255,107,53,0.1)",
                border: "1.5px solid rgba(255,107,53,0.25)",
                color: "#FF6B35",
                animationDelay: "0.7s",
              }}
            >
              ⭐ Trusted Brand
            </span>
            <span
              className="ab-badge"
              style={{
                background: "rgba(255,107,53,0.1)",
                border: "1.5px solid rgba(255,107,53,0.25)",
                color: "#FF6B35",
                animationDelay: "1.3s",
              }}
            >
              ✅ 100% BPA Free
            </span>
          </div>

          <div className="ab-u d2" style={{ marginBottom: "0.75rem" }}>
            <h1
              className="ab-h"
              style={{
                fontSize: "clamp(3.2rem,8vw,6.5rem)",
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#2E2419",
              }}
            >
              Our Story
            </h1>
          </div>

          <p
            className="ab-u d3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#7C6F60",
              maxWidth: "42ch",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
            Built for the ones who never stop — sip by sip.
          </p>
        </div>

        {/* Body */}
        <div className="ab-body">
          {/* Intro */}
          <div className="ab-intro ab-u d4">
            {/* Product image */}
            <div className="ab-intro-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about.jpg" alt="Hilee Premium Tumbler" />
              <div className="ab-intro-visual-overlay">
                <div className="ab-intro-visual-label">HILEE</div>
                <div className="ab-intro-visual-sub">Premium Tumblers</div>
              </div>
            </div>

            <div>
              <h2 className="ab-tagline">
                Crafted for the <span>Way You Live.</span>
              </h2>
              <p className="ab-body-text">
                Hilee was born from a simple frustration — drinkware that looks
                good but falls short when it matters. Drinks that go warm too
                fast. Lids that leak. Tumblers that dent on the first drop.
                <br />
                <br />
                So we built something better. Hilee tumblers are designed for
                real life — whether you&apos;re rushing to work, hitting the
                gym, or just getting through the day. Double-wall vacuum
                insulation keeps your drinks ice cold for up to 24 hours and hot
                for 12. Food-grade stainless steel means no unwanted taste, no
                compromise. Every detail, from lid to base, is made to hold up —
                and look great doing it.
                <br />
                <br />
                Premium hydration shouldn&apos;t be a luxury. At Hilee, we make
                sure it isn&apos;t.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="ab-u d5">
            <div className="ab-section-title">What Makes Hilee Different</div>
            <div className="ab-pillars">
              {pillars.map((p) => (
                <div key={p.num} className="ab-pillar">
                  <div className="ab-pillar-num">{p.num}</div>
                  <div className="ab-pillar-name">{p.name}</div>
                  <div className="ab-pillar-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="ab-u d6">
            <div className="ab-section-title">What Our Customers Say</div>
            <div className="ab-reviews">
              {reviews.map((r) => (
                <div key={r.name} className="ab-review">
                  <div className="ab-review-stars">{r.stars}</div>
                  <div className="ab-review-text">&ldquo;{r.text}&rdquo;</div>
                  <div className="ab-review-name">— {r.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Promise CTA */}
          <div className="ab-promise ab-u d6">
            <div className="ab-promise-title">Your Drink. Our Commitment.</div>
            <div className="ab-promise-sub">
              Every Hilee tumbler ships with a lifetime warranty, because we
              stand behind every sip. Built for you, built to last.
            </div>
            {/* <button className="ab-promise-btn">Shop Hilee Tumblers →</button> */}
          </div>

          {/* Trust strip */}
          <div className="ab-trust">
            {trustItems.map((x) => (
              <span key={x.t} className="ab-trust-item">
                <span>{x.e}</span> {x.t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
