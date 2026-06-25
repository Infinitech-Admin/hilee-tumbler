"use client";

import { useState, useEffect } from "react";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FAF7F2" }}
      />
    );
  }

  const categories = [
    "All",
    "Hydration Tips",
    "Lifestyle",
    "Product Guide",
    "Wellness",
  ];

  const posts = [
    {
      category: "Hydration Tips",
      read: "5 min read",
      title: "How Much Water Do You Actually Need a Day?",
      excerpt:
        "The '8 glasses a day' rule is a myth. Here's what the science actually says about daily hydration — and how to hit your real target without thinking twice.",
      date: "June 10, 2025",
      emoji: "💧",
      featured: true,
    },
    {
      category: "Lifestyle",
      read: "4 min read",
      title: "Cold Coffee at 3PM: Why Your Tumbler Is Your Best Desk Buddy",
      excerpt:
        "Work-from-home or office life — your drink shouldn't go warm before lunch. Here's how the right tumbler changes your entire afternoon routine.",
      date: "June 4, 2025",
      emoji: "☕",
      featured: false,
    },
    {
      category: "Product Guide",
      read: "6 min read",
      title: "Tumbler vs. Bottle vs. Cup: Which One Is Actually Right for You?",
      excerpt:
        "We break down every format — insulated tumblers, water bottles, travel cups — so you can pick the one that fits your lifestyle instead of guessing.",
      date: "May 28, 2025",
      emoji: "🧊",
      featured: false,
    },
    {
      category: "Wellness",
      read: "4 min read",
      title:
        "The Link Between Hydration and Focus (It's Bigger Than You Think)",
      excerpt:
        "Even mild dehydration kills your concentration and mood. A cold drink in reach is a small habit that pays off every single hour.",
      date: "May 20, 2025",
      emoji: "🧠",
      featured: false,
    },
    {
      category: "Hydration Tips",
      read: "3 min read",
      title: "Hot or Iced? How to Get the Most from Insulated Drinkware",
      excerpt:
        "Double-wall vacuum insulation works differently for hot and cold drinks. Here's how to use it right so your coffee stays hot and your water stays freezing.",
      date: "May 12, 2025",
      emoji: "🌡️",
      featured: false,
    },
    {
      category: "Lifestyle",
      read: "5 min read",
      title: "Gym, Commute, Office: One Tumbler for Every Part of Your Day",
      excerpt:
        "Your drinkware should keep up with you — not the other way around. Real life is messy, fast, and sweaty. Hilee was built for all of it.",
      date: "May 5, 2025",
      emoji: "🏋️",
      featured: false,
    },
  ];

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const showFeatured = activeCategory === "All";

  const tickerItems = [
    "HILEE BLOG",
    "STAY COLD ALL DAY",
    "HYDRATION TIPS",
    "LIFESTYLE",
    "PRODUCT GUIDES",
    "WELLNESS",
    "HILEE BLOG",
    "STAY COLD ALL DAY",
    "HYDRATION TIPS",
    "LIFESTYLE",
    "PRODUCT GUIDES",
    "WELLNESS",
  ];
  const tickerColors = [
    "#8C7355",
    "#A89070",
    "#C4AA8A",
    "#6B5E4A",
    "#D4C4A8",
    "#9E8868",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@300;400;600;700;800&display=swap');

        .bl { font-family: 'Nunito', sans-serif; background: #FAF7F2; color: #1A1A1A; min-height: 100vh; }
        .bl * { box-sizing: border-box; }
        .bl-h { font-family: 'Bricolage Grotesque', sans-serif; }

        @keyframes bl-tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .bl-ticker { background: #EDE8DF; border-bottom: 2px solid rgba(0,0,0,0.05); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .bl-tick-track { display: flex; width: max-content; animation: bl-tick 28s linear infinite; }
        .bl-tick-item { display: flex; align-items: center; gap: 1.25rem; padding: 0 1.75rem; white-space: nowrap; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #5C4F3A; }
        .bl-tick-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        @keyframes bl-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        .bl-u { animation: bl-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.06s}.d2{animation-delay:.18s}.d3{animation-delay:.3s}
        .d4{animation-delay:.44s}.d5{animation-delay:.56s}.d6{animation-delay:.68s}

        @keyframes bl-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .bl-badge { display:inline-flex; align-items:center; gap:0.4rem; border-radius:999px; padding:0.35rem 0.9rem; font-size:0.62rem; font-weight:800; letter-spacing:0.15em; text-transform:uppercase; animation: bl-float 4s ease-in-out infinite; }

        /* Hero */
        .bl-hero { background: #FAF7F2; padding: 4rem 2rem 3rem; text-align: center; border-bottom: 1.5px solid rgba(0,0,0,0.06); }

        /* Filter chips */
        .bl-filters { display:flex; align-items:center; justify-content:center; gap:0.5rem; flex-wrap:wrap; padding: 2rem 2rem 0; }
        .bl-chip { background:none; border: 1.5px solid #DDD8CF; border-radius:999px; padding:0.4rem 1rem; font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700; color:#888; cursor:pointer; transition:all 0.18s; letter-spacing:0.04em; }
        .bl-chip:hover { border-color:#8C7355; color:#8C7355; }
        .bl-chip.active { background:#1A1A1A; border-color:#1A1A1A; color:#FAF7F2; }

        /* Body */
        .bl-body { max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem 5rem; display:flex; flex-direction:column; gap:2.5rem; }

        /* Featured post */
        .bl-featured { display:grid; grid-template-columns:1fr 1fr; gap:0; border-radius:24px; border:1.5px solid #DDD8CF; overflow:hidden; background:#FAF7F2; transition: box-shadow 0.2s, transform 0.2s; cursor:pointer; }
        .bl-featured:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.09); transform:translateY(-2px); }
        .bl-featured-visual { background: linear-gradient(135deg, #EDE8DF 0%, #DDD0BC 100%); display:flex; align-items:center; justify-content:center; font-size:5rem; min-height:280px; }
        .bl-featured-body { padding: 2.25rem 2rem; display:flex; flex-direction:column; justify-content:center; gap:0.75rem; }
        .bl-featured-label { font-size:0.62rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; color:#8C7355; }
        .bl-featured-title { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(1.3rem,2.5vw,1.75rem); color:#1A1A1A; line-height:1.15; }
        .bl-featured-excerpt { font-size:0.85rem; color:#666; font-weight:500; line-height:1.75; }
        .bl-featured-meta { display:flex; align-items:center; gap:0.75rem; font-size:0.7rem; color:#aaa; font-weight:600; margin-top:0.25rem; }
        .bl-featured-cta { display:inline-flex; align-items:center; gap:0.4rem; font-size:0.78rem; font-weight:800; color:#1A1A1A; border:none; background:none; padding:0; cursor:pointer; margin-top:0.25rem; transition:gap 0.15s; }
        .bl-featured-cta:hover { gap:0.7rem; }

        /* Grid */
        .bl-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        .bl-card { background:#FAF7F2; border-radius:20px; border:1.5px solid #DDD8CF; overflow:hidden; transition:transform 0.2s, box-shadow 0.2s; cursor:pointer; display:flex; flex-direction:column; }
        .bl-card:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(0,0,0,0.07); }
        .bl-card-visual { background:linear-gradient(135deg,#EDE8DF 0%,#E0D8C8 100%); display:flex; align-items:center; justify-content:center; font-size:2.75rem; height:130px; }
        .bl-card-body { padding:1.25rem; display:flex; flex-direction:column; gap:0.5rem; flex:1; }
        .bl-card-label { font-size:0.6rem; font-weight:800; letter-spacing:0.18em; text-transform:uppercase; color:#8C7355; }
        .bl-card-title { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:0.92rem; color:#1A1A1A; line-height:1.25; }
        .bl-card-excerpt { font-size:0.76rem; color:#777; font-weight:500; line-height:1.65; flex:1; }
        .bl-card-meta { display:flex; align-items:center; justify-content:space-between; font-size:0.65rem; color:#bbb; font-weight:600; padding-top:0.5rem; border-top:1px solid #EDE8DF; margin-top:0.5rem; }
        .bl-card-arrow { font-size:0.75rem; color:#8C7355; font-weight:800; }

        /* Newsletter */
        .bl-nl { background:#EDE8DF; border-radius:24px; border:1.5px solid #DDD8CF; padding:2.5rem 2rem; text-align:center; }
        .bl-nl-title { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:1.5rem; color:#1A1A1A; margin-bottom:0.5rem; }
        .bl-nl-sub { font-size:0.88rem; color:#6B5E4A; font-weight:500; line-height:1.7; max-width:44ch; margin:0 auto 1.5rem; }
        .bl-nl-row { display:flex; align-items:center; gap:0.5rem; justify-content:center; flex-wrap:wrap; }
        .bl-nl-input { border:1.5px solid #C4B89A; border-radius:999px; padding:0.65rem 1.25rem; font-family:'Nunito',sans-serif; font-size:0.82rem; background:#FAF7F2; color:#1A1A1A; outline:none; width:240px; }
        .bl-nl-input::placeholder { color:#bbb; }
        .bl-nl-btn { display:inline-flex; align-items:center; background:#1A1A1A; color:#FAF7F2; border:none; border-radius:999px; padding:0.65rem 1.5rem; font-family:'Nunito',sans-serif; font-weight:800; font-size:0.82rem; cursor:pointer; transition:filter 0.2s,transform 0.15s; white-space:nowrap; }
        .bl-nl-btn:hover { filter:brightness(1.3); transform:translateY(-1px); }

        /* Trust */
        .bl-trust { display:flex; align-items:center; justify-content:center; gap:2rem; flex-wrap:wrap; padding:1.75rem 2rem; border-top:1.5px dashed #DDD8CF; }
        .bl-trust-item { display:flex; align-items:center; gap:0.4rem; font-size:0.72rem; font-weight:700; color:#bbb; }

        @media(max-width:860px){
          .bl-featured{grid-template-columns:1fr;}
          .bl-featured-visual{min-height:160px;}
          .bl-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:520px){
          .bl-grid{grid-template-columns:1fr;}
          .bl-body{padding:2rem 1rem 4rem;}
        }
      `}</style>

      <div className="bl">
        {/* Ticker */}
        <div className="bl-ticker">
          <div className="bl-tick-track">
            {tickerItems.map((t, i) => (
              <div key={i} className="bl-tick-item">
                <span
                  className="bl-tick-dot"
                  style={{ background: tickerColors[i % 6] }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="bl-hero">
          <div
            className="bl-u d1"
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
              className="bl-badge"
              style={{
                background: "#EDE8DF",
                border: "1.5px solid #C4B89A",
                color: "#6B5E4A",
                animationDelay: "0s",
              }}
            >
              ✍️ Tips & Stories
            </span>
            <span
              className="bl-badge"
              style={{
                background: "#E8E0D0",
                border: "1.5px solid #C4B89A",
                color: "#7A6A52",
                animationDelay: "0.7s",
              }}
            >
              🧊 Hydration Guides
            </span>
            <span
              className="bl-badge"
              style={{
                background: "#F0EBE0",
                border: "1.5px solid #C4B89A",
                color: "#8C7355",
                animationDelay: "1.3s",
              }}
            >
              🌿 Lifestyle Reads
            </span>
          </div>

          <div className="bl-u d2" style={{ marginBottom: "0.75rem" }}>
            <h1
              className="bl-h"
              style={{
                fontSize: "clamp(3.2rem,8vw,6.5rem)",
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#1A1A1A",
              }}
            >
              The Sip
            </h1>
          </div>

          <p
            className="bl-u d3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#888",
              maxWidth: "42ch",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
            Hydration tips, lifestyle reads, and everything in between — by
            Hilee.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bl-filters bl-u d4">
          {categories.map((c) => (
            <button
              key={c}
              className={`bl-chip${activeCategory === c ? " active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="bl-body">
          {/* Featured */}
          {showFeatured && featured && (
            <div className="bl-featured bl-u d4">
              <div className="bl-featured-visual">{featured.emoji}</div>
              <div className="bl-featured-body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div className="bl-featured-label">{featured.category}</div>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "#bbb",
                      fontWeight: 700,
                    }}
                  >
                    · FEATURED ·
                  </span>
                </div>
                <div className="bl-featured-title">{featured.title}</div>
                <div className="bl-featured-excerpt">{featured.excerpt}</div>
                <div className="bl-featured-meta">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.read}</span>
                </div>
                <button className="bl-featured-cta">Read Article →</button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="bl-u d5">
            {rest.length === 0 && !showFeatured && filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#bbb",
                  fontSize: "0.9rem",
                  padding: "3rem 0",
                }}
              >
                No posts in this category yet — check back soon!
              </div>
            ) : null}
            <div className="bl-grid">
              {(showFeatured ? rest : filtered).map((p) => (
                <div key={p.title} className="bl-card">
                  <div className="bl-card-visual">{p.emoji}</div>
                  <div className="bl-card-body">
                    <div className="bl-card-label">{p.category}</div>
                    <div className="bl-card-title">{p.title}</div>
                    <div className="bl-card-excerpt">{p.excerpt}</div>
                    <div className="bl-card-meta">
                      <span>
                        {p.date} · {p.read}
                      </span>
                      <span className="bl-card-arrow">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bl-nl bl-u d6">
            <div className="bl-nl-title">Stay in the Loop.</div>
            <div className="bl-nl-sub">
              Get hydration tips, lifestyle reads, and exclusive Hilee updates
              straight to your inbox. No spam — ever.
            </div>
            <div className="bl-nl-row">
              <input
                className="bl-nl-input"
                type="email"
                placeholder="your@email.com"
              />
              <button className="bl-nl-btn">Subscribe →</button>
            </div>
          </div>

          {/* Trust */}
          <div className="bl-trust">
            {[
              { e: "🚚", t: "Free Shipping" },
              { e: "↩️", t: "30-Day Returns" },
              { e: "🏆", t: "Lifetime Warranty" },
              { e: "✅", t: "100% BPA Free" },
              { e: "🧊", t: "24H Ice Cold" },
            ].map((x) => (
              <span key={x.t} className="bl-trust-item">
                <span>{x.e}</span> {x.t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
