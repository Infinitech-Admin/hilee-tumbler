"use client";

import { useState, useEffect } from "react";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  const trustItems = [
    { e: "🚚", t: "Free Shipping" },
    { e: "↩️", t: "30-Day Returns" },
    { e: "🏆", t: "Lifetime Warranty" },
    { e: "✅", t: "100% BPA Free" },
    { e: "🧊", t: "24H Ice Cold" },
  ];

  if (loading) {
    return (
      <>
        <style>{`
          .ab-sk-wrap { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); min-height: 100vh; }
          @keyframes ab-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          .ab-sk {
            background: linear-gradient(90deg, rgba(6,174,213,0.08) 25%, rgba(6,174,213,0.18) 37%, rgba(6,174,213,0.08) 63%);
            background-size: 800px 100%;
            animation: ab-shimmer 1.4s ease-in-out infinite;
            border-radius: 10px;
          }
          .ab-sk-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; }
          .ab-sk-hero { padding: 4rem 2rem 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.1rem; }
          .ab-sk-badges { display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; }
          .ab-sk-badge { width: 140px; height: 24px; border-radius: 999px; }
          .ab-sk-title { width: min(70%, 420px); height: 84px; border-radius: 16px; }
          .ab-sk-sub { width: min(60%, 340px); height: 16px; }
          .ab-sk-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; display: flex; flex-direction: column; gap: 3rem; }
          .ab-sk-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
          .ab-sk-visual { min-height: 420px; border-radius: 24px; }
          .ab-sk-text-block { display: flex; flex-direction: column; gap: 0.75rem; }
          .ab-sk-line { height: 12px; }
          .ab-sk-section-title { width: 260px; height: 20px; margin: 0 auto 1.5rem; }
          .ab-sk-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
          .ab-sk-pillar { border-radius: 20px; border: 1.5px solid rgba(6,174,213,0.15); padding: 1.5rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; background: white; }
          .ab-sk-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .ab-sk-review { border-radius: 20px; border: 1.5px solid rgba(6,174,213,0.15); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; background: white; }
          .ab-sk-promise { border-radius: 24px; padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.85rem; border: 1.5px solid rgba(6,174,213,0.2); }
          .ab-sk-trust { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 1.75rem 2rem; border-top: 1.5px dashed #CDEEF9; }
          .ab-sk-trust-item { width: 90px; height: 12px; }
          @media (max-width: 860px) {
            .ab-sk-intro { grid-template-columns: 1fr; }
            .ab-sk-visual { min-height: 300px; }
            .ab-sk-pillars { grid-template-columns: repeat(2, 1fr); }
            .ab-sk-reviews { grid-template-columns: 1fr; }
          }
          @media (max-width: 500px) {
            .ab-sk-body { padding: 2rem 1rem 4rem; gap: 2.25rem; }
            .ab-sk-pillars { grid-template-columns: repeat(2, 1fr); }
            .ab-sk-visual { min-height: 240px; }
          }
        `}</style>
        <div className="ab-sk-wrap">
          <div className="ab-sk-hero-band">
            <div className="ab-sk-hero">
              <div className="ab-sk-badges">
                <div className="ab-sk ab-sk-badge" />
                <div className="ab-sk ab-sk-badge" />
                <div className="ab-sk ab-sk-badge" />
              </div>
              <div className="ab-sk ab-sk-title" />
              <div className="ab-sk ab-sk-sub" />
            </div>
          </div>

          <div className="ab-sk-body">
            {/* Intro */}
            <div className="ab-sk-intro">
              <div className="ab-sk ab-sk-visual" />
              <div className="ab-sk-text-block">
                <div
                  className="ab-sk ab-sk-line"
                  style={{ width: "70%", height: 30 }}
                />
                <div
                  className="ab-sk ab-sk-line"
                  style={{ width: "50%", height: 30, marginBottom: 8 }}
                />
                <div className="ab-sk ab-sk-line" style={{ width: "100%" }} />
                <div className="ab-sk ab-sk-line" style={{ width: "95%" }} />
                <div className="ab-sk ab-sk-line" style={{ width: "90%" }} />
                <div
                  className="ab-sk ab-sk-line"
                  style={{ width: "100%", marginTop: 8 }}
                />
                <div className="ab-sk ab-sk-line" style={{ width: "85%" }} />
                <div className="ab-sk ab-sk-line" style={{ width: "60%" }} />
              </div>
            </div>

            {/* Pillars */}
            <div>
              <div className="ab-sk ab-sk-section-title" />
              <div className="ab-sk-pillars">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="ab-sk-pillar">
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "40%", height: 30 }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "70%", height: 14 }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "90%" }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "60%" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="ab-sk ab-sk-section-title" />
              <div className="ab-sk-reviews">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="ab-sk-review">
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "35%", height: 14 }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "100%" }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "90%" }}
                    />
                    <div
                      className="ab-sk ab-sk-line"
                      style={{ width: "50%", height: 12, marginTop: 4 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Promise */}
            <div className="ab-sk ab-sk-promise">
              <div className="ab-sk" style={{ width: "50%", height: 26 }} />
              <div className="ab-sk" style={{ width: "70%", height: 14 }} />
              <div className="ab-sk" style={{ width: "60%", height: 14 }} />
            </div>

            {/* Trust strip */}
            <div className="ab-sk-trust">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="ab-sk ab-sk-trust-item" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const tickerColors = [
    "#0EA5E9",
    "#38BDF8",
    "#67E8F9",
    "#0369A1",
    "#7DD3FC",
    "#0284C7",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@300;400;600;700;800&display=swap');

        .ab { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); color: #073B4C; min-height: 100vh; }
        .ab * { box-sizing: border-box; }
        .ab-h { font-family: 'Bricolage Grotesque', sans-serif; }

        @keyframes ab-tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ab-ticker { background: linear-gradient(90deg, #EAFBFF, #F6FEFF); border-bottom: 2px solid rgba(6,174,213,0.15); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .ab-tick-track { display: flex; width: max-content; animation: ab-tick 28s linear infinite; }
        .ab-tick-item { display: flex; align-items: center; gap: 1.25rem; padding: 0 1.75rem; white-space: nowrap; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #073B4C; }
        .ab-tick-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        @keyframes ab-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        .ab-u { animation: ab-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1 { animation-delay: .06s } .d2 { animation-delay: .18s }
        .d3 { animation-delay: .3s  } .d4 { animation-delay: .44s }
        .d5 { animation-delay: .56s } .d6 { animation-delay: .68s }

        @keyframes ab-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .ab-badge { display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; animation: ab-float 4s ease-in-out infinite; background: rgba(255,255,255,0.6); border: 1.5px solid rgba(3,105,161,0.3); color: #0369A1; }

        /* Hero — distinct blue band, centered, matching the rest of the site */
        .ab-hero { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); padding: 4rem 2rem 3rem; text-align: center; border-bottom: 1.5px solid #B7E6F5; }

        .ab-body { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 5rem; display: flex; flex-direction: column; gap: 3rem; }

        .ab-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }

        .ab-intro-visual {
          background: linear-gradient(145deg, #EAFBFF, #CDEFFB);
          border-radius: 24px;
          border: 1.5px solid #CDEEF9;
          overflow: hidden;
          position: relative;
          width: 100%;
          min-height: 420px;
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
          background: linear-gradient(to top, rgba(6,34,46,0.72) 0%, transparent 100%);
          padding: 1.5rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .ab-intro-visual-label {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #F0FBFF;
          letter-spacing: 0.05em;
        }
        .ab-intro-visual-sub {
          font-size: 0.7rem;
          color: rgba(240,251,255,0.75);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ab-tagline { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; line-height: 1.15; background: linear-gradient(135deg, #073B4C 0%, #0EA5E9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
        .ab-tagline span { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ab-body-text { font-size: 0.9rem; color: #5B7C8D; font-weight: 500; line-height: 1.8; }

        .ab-section-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.3rem; color: #073B4C; text-align: center; margin-bottom: 1.5rem; }

        .ab-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .ab-pillar { background: #FFFFFF; border-radius: 20px; border: 1.5px solid #CDEEF9; padding: 1.5rem 1rem; text-align: center; transition: all 0.3s ease; }
        .ab-pillar:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(6,174,213,0.16); border-color: #67E8F9; }
        .ab-pillar-num { font-family: 'Bricolage Grotesque', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #0EA5E9, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.5rem; }
        .ab-pillar-name { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.85rem; color: #073B4C; margin-bottom: 0.3rem; }
        .ab-pillar-desc { font-size: 0.75rem; color: #5B7C8D; font-weight: 500; line-height: 1.5; }

        .ab-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .ab-review { background: #FFFFFF; border-radius: 20px; border: 1.5px solid #CDEEF9; padding: 1.25rem; transition: all 0.3s ease; }
        .ab-review:hover { transform: translateY(-3px); border-color: #67E8F9; box-shadow: 0 8px 24px rgba(6,174,213,0.14); }
        .ab-review-stars { color: #0EA5E9; font-size: 0.8rem; margin-bottom: 0.75rem; letter-spacing: 0.1em; }
        .ab-review-text { font-size: 0.82rem; color: #5B7C8D; font-weight: 500; line-height: 1.7; margin-bottom: 0.75rem; font-style: italic; }
        .ab-review-name { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.78rem; color: #073B4C; }

        .ab-promise { background: linear-gradient(135deg, #EAFBFF, #F6FEFF); border-radius: 24px; padding: 2.5rem 2rem; text-align: center; border: 1.5px solid #CDEEF9; }
        .ab-promise-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.6rem; background: linear-gradient(135deg, #073B4C 0%, #0EA5E9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.75rem; }
        .ab-promise-sub { font-size: 0.9rem; color: #2C6478; font-weight: 500; line-height: 1.75; max-width: 46ch; margin: 0 auto; }
        .ab-promise-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #0EA5E9, #0369A1); color: white; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem; border: none; border-radius: 999px; padding: 0.7rem 1.75rem; cursor: pointer; box-shadow: 0 12px 32px rgba(14,165,233,0.35); transition: all 0.3s ease; }
        .ab-promise-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.45); }

        .ab-trust { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 1.75rem 2rem; border-top: 1.5px dashed #CDEEF9; }
        .ab-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #5B94A6; }

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
            <span className="ab-badge" style={{ animationDelay: "0s" }}>
              🧊 Stay Cold. Stay Bold.
            </span>
            <span className="ab-badge" style={{ animationDelay: "0.7s" }}>
              ⭐ Trusted Brand
            </span>
            <span className="ab-badge" style={{ animationDelay: "1.3s" }}>
              ✅ 100% BPA Free
            </span>
          </div>

          <div className="ab-u d2" style={{ marginBottom: "0.75rem" }}>
            <h1
              className="ab-h"
              style={{
                fontSize: "clamp(2.4rem,6vw,4.2rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#073B4C",
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
              color: "#2C6478",
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
