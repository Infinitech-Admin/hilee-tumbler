"use client";

import { useState, useEffect } from "react";

interface Post {
  category: string;
  read: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
  featured?: boolean;
}

const TICKER_ITEMS: string[] = [
  "HILEE BLOG",
  "STAY COLD ALL DAY",
  "HYDRATION TIPS",
  "TUMBLER GUIDES",
  "LIFESTYLE READS",
  "WELLNESS",
  "HILEE BLOG",
  "STAY COLD ALL DAY",
  "HYDRATION TIPS",
  "TUMBLER GUIDES",
  "LIFESTYLE READS",
  "WELLNESS",
];

const POSTS: Post[] = [
  {
    category: "Hydration Tips",
    read: "5 min read",
    title: "How Much Water Do You Actually Need Each Day?",
    excerpt:
      "The '8 glasses a day' rule is a myth. Here's what the science actually says about daily hydration — and how to hit your real target without thinking twice.",
    date: "June 15, 2026",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    category: "Lifestyle",
    read: "4 min read",
    title: "Cold Coffee at 3PM: Why Your Tumbler Is Your Best Desk Buddy",
    excerpt:
      "Work-from-home or office life — your drink shouldn't go warm before lunch. Here's how the right tumbler changes your entire afternoon routine.",
    date: "June 8, 2026",
    img: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&auto=format&fit=crop&q=80",
  },
  {
    category: "Product Guide",
    read: "6 min read",
    title: "Tumbler vs. Bottle vs. Cup: Which One Is Actually Right for You?",
    excerpt:
      "We break down every format so you can pick the one that fits your lifestyle — not just the trendiest one on TikTok.",
    date: "May 28, 2026",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
  },
  {
    category: "Wellness",
    read: "4 min read",
    title: "The Link Between Hydration and Focus (It's Bigger Than You Think)",
    excerpt:
      "Even mild dehydration kills your concentration and mood. A cold drink within reach is a small habit that pays off every single hour.",
    date: "May 20, 2026",
    img: "https://images.unsplash.com/photo-1544991875-5dc1b05f1571?w=600&auto=format&fit=crop&q=80",
  },
  {
    category: "Hydration Tips",
    read: "3 min read",
    title: "Hot or Iced? How to Get the Most from Insulated Drinkware",
    excerpt:
      "Double-wall vacuum insulation works differently for hot and cold drinks. Here's how to use it right so your coffee stays hot and your water stays freezing.",
    date: "May 12, 2026",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
  },
  {
    category: "Lifestyle",
    read: "5 min read",
    title: "Gym, Commute, Office: One Tumbler for Every Part of Your Day",
    excerpt:
      "Your drinkware should keep up with you — not the other way around. Real life is messy, fast, and full. Hilee was built for all of it.",
    date: "May 5, 2026",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES: string[] = [
  "All",
  ...Array.from(new Set(POSTS.map((p) => p.category))),
];

const TRUST_ITEMS = [
  { icon: "🚚", label: "Free Shipping" },
  { icon: "↩️", label: "30-Day Returns" },
  { icon: "🏆", label: "Lifetime Warranty" },
  { icon: "✅", label: "100% BPA Free" },
  { icon: "🧊", label: "24H Ice Cold" },
];

export default function Blog() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F2",
        }}
      />
    );
  }

  const featured = POSTS.find((p) => p.featured);
  const showFeatured = activeCategory === "All";
  const filtered =
    activeCategory === "All"
      ? POSTS.filter((p) => !p.featured)
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@300;400;500;600&display=swap');

        .bl { font-family: 'Inter', sans-serif; background: #FAF7F2; color: #1A1A1A; min-height: 100vh; }
        .bl * { box-sizing: border-box; }
        .bl-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Nav */
        .bl-nav {
          position: sticky; top: 0; z-index: 100;
          height: 64px; background: rgba(250,247,242,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2DAD0;
          display: flex; align-items: center;
          justify-content: space-between; padding: 0 2.5rem;
        }
        .bl-nav-logo { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.25rem; color: #1A1A1A; text-decoration: none; letter-spacing: -0.02em; }
        .bl-nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .bl-nav-links a { font-size: 0.78rem; font-weight: 500; color: #777; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase; transition: color 0.15s; }
        .bl-nav-links a:hover, .bl-nav-links a.active { color: #1A1A1A; }
        .bl-nav-cta { background: #1A1A1A !important; color: #FAF7F2 !important; padding: 0.45rem 1.1rem; border-radius: 999px; }
        .bl-nav-cta:hover { opacity: 0.8; }

        /* Ticker */
        @keyframes bl-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bl-ticker { background: #EDE8DF; border-bottom: 1px solid #E2DAD0; height: 36px; overflow: hidden; display: flex; align-items: center; }
        .bl-tick-track { display: flex; width: max-content; animation: bl-tick 30s linear infinite; }
        .bl-tick-item { display: flex; align-items: center; gap: 1rem; padding: 0 2rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #5C4F3A; white-space: nowrap; }
        .bl-tick-dot { width: 4px; height: 4px; border-radius: 50%; background: #8C7355; flex-shrink: 0; }

        /* Hero */
        .bl-hero { padding: 5rem 2.5rem 3.5rem; text-align: center; border-bottom: 1px solid #E2DAD0; max-width: 900px; margin: 0 auto; }
        .bl-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; background: #EDE8DF; border: 1px solid #DDD0BC; border-radius: 999px; padding: 0.35rem 0.85rem; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #5C4F3A; margin-bottom: 1.5rem; }

        /* Fade up animation */
        @keyframes bl-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .bl-u { animation: bl-up 0.7s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}
        .d4{animation-delay:.38s}.d5{animation-delay:.5s}.d6{animation-delay:.62s}

        /* Filters */
        .bl-filters { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; padding: 2rem 2.5rem 0; }
        .bl-chip { background: none; border: 1.5px solid #E2DAD0; border-radius: 999px; padding: 0.45rem 1.1rem; font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; color: #777; cursor: pointer; transition: all 0.18s; letter-spacing: 0.03em; }
        .bl-chip:hover { border-color: #8C7355; color: #8C7355; }
        .bl-chip.active { background: #1A1A1A; border-color: #1A1A1A; color: #FAF7F2; }

        /* Body */
        .bl-body { max-width: 1160px; margin: 0 auto; padding: 3rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 3rem; }

        /* Section label */
        .bl-section-label { display: flex; align-items: center; gap: 1rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #bbb; }
        .bl-section-label::after { content: ''; flex: 1; height: 1px; background: #E2DAD0; }

        /* Featured */
        .bl-featured { display: grid; grid-template-columns: 1fr 1fr; border-radius: 20px; border: 1.5px solid #E2DAD0; overflow: hidden; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; }
        .bl-featured:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.10); transform: translateY(-2px); }
        .bl-feat-img-wrap { position: relative; min-height: 320px; }
        .bl-feat-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bl-feat-img-badge { position: absolute; top: 1.25rem; left: 1.25rem; background: rgba(250,247,242,0.92); backdrop-filter: blur(8px); border-radius: 999px; padding: 0.3rem 0.8rem; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #5C4F3A; }
        .bl-feat-body { padding: 2.5rem 2.25rem; display: flex; flex-direction: column; justify-content: center; gap: 0.85rem; background: #FAF7F2; }
        .bl-feat-label { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #8C7355; display: flex; align-items: center; gap: 0.5rem; }
        .bl-feat-tag { background: #EDE8DF; border: 1px solid #DDD0BC; border-radius: 999px; padding: 0.2rem 0.55rem; font-size: 0.55rem; color: #5C4F3A; letter-spacing: 0.12em; }
        .bl-feat-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(1.3rem, 2.5vw, 1.9rem); line-height: 1.12; color: #1A1A1A; }
        .bl-feat-excerpt { font-size: 0.88rem; color: #777; line-height: 1.8; }
        .bl-feat-meta { display: flex; align-items: center; gap: 0.6rem; font-size: 0.7rem; color: #bbb; font-weight: 500; }
        .bl-feat-cta { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 700; color: #1A1A1A; background: none; border: none; padding: 0; cursor: pointer; margin-top: 0.25rem; transition: gap 0.15s; }
        .bl-feat-cta:hover { gap: 0.75rem; }

        /* Grid */
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .bl-card { background: #fff; border-radius: 18px; border: 1.5px solid #E2DAD0; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; }
        .bl-card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,0.07); }
        .bl-card-img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .bl-card-body { padding: 1.35rem 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
        .bl-card-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #8C7355; }
        .bl-card-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.98rem; line-height: 1.25; color: #1A1A1A; }
        .bl-card-excerpt { font-size: 0.78rem; color: #777; line-height: 1.7; flex: 1; }
        .bl-card-meta { display: flex; align-items: center; justify-content: space-between; font-size: 0.66rem; color: #bbb; font-weight: 500; padding-top: 0.75rem; border-top: 1px solid #EDE8DF; margin-top: 0.25rem; }
        .bl-card-arrow { color: #8C7355; font-weight: 800; font-size: 0.8rem; }

        /* Newsletter */
        .bl-nl { background: #EDE8DF; border-radius: 20px; border: 1.5px solid #E2DAD0; padding: 3rem 2.5rem; text-align: center; }
        .bl-nl-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.75rem; color: #1A1A1A; margin-bottom: 0.6rem; }
        .bl-nl-sub { font-size: 0.9rem; color: #5C4F3A; line-height: 1.7; max-width: 42ch; margin: 0 auto 1.75rem; }
        .bl-nl-row { display: flex; align-items: center; gap: 0.6rem; justify-content: center; flex-wrap: wrap; }
        .bl-nl-input { border: 1.5px solid #DDD0BC; border-radius: 999px; padding: 0.7rem 1.35rem; font-family: 'Inter', sans-serif; font-size: 0.85rem; background: #FAF7F2; color: #1A1A1A; outline: none; width: 260px; transition: border-color 0.15s; }
        .bl-nl-input:focus { border-color: #8C7355; }
        .bl-nl-input::placeholder { color: #bbb; }
        .bl-nl-btn { background: #1A1A1A; color: #FAF7F2; border: none; border-radius: 999px; padding: 0.7rem 1.6rem; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: opacity 0.15s, transform 0.15s; white-space: nowrap; }
        .bl-nl-btn:hover { opacity: 0.82; transform: translateY(-1px); }

        /* Trust */
        .bl-trust { display: flex; align-items: center; justify-content: center; gap: 2.25rem; flex-wrap: wrap; padding: 1.75rem 2.5rem; border-top: 1.5px dashed #E2DAD0; }
        .bl-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 600; color: #bbb; }

        /* Footer */
        .bl-footer { background: #1A1A1A; color: #FAF7F2; padding: 3rem 2.5rem 2rem; }
        .bl-footer-grid { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 1.5rem; }
        .bl-footer-brand-name { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.3rem; }
        .bl-footer-brand-desc { font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.7; margin-top: 0.75rem; max-width: 28ch; }
        .bl-footer-col h4 { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 1rem; }
        .bl-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .bl-footer-col a { font-size: 0.82rem; color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.15s; }
        .bl-footer-col a:hover { color: #fff; }
        .bl-footer-bottom { max-width: 1160px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; color: rgba(255,255,255,0.35); flex-wrap: wrap; gap: 0.5rem; }

        /* Empty state */
        .bl-empty { text-align: center; padding: 4rem 0; color: #bbb; font-size: 0.88rem; grid-column: 1 / -1; }

        /* Responsive */
        @media (max-width: 900px) {
          .bl-featured { grid-template-columns: 1fr; }
          .bl-feat-img-wrap { min-height: 220px; }
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
          .bl-footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 580px) {
          .bl-nav { padding: 0 1.25rem; }
          .bl-nav-links { display: none; }
          .bl-hero { padding: 3.5rem 1.25rem 2.5rem; }
          .bl-body { padding: 2rem 1.25rem 4rem; }
          .bl-grid { grid-template-columns: 1fr; }
          .bl-footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .bl-trust { gap: 1.25rem; }
        }
      `}</style>

      <div className="bl">
        {/* Ticker */}
        <div className="bl-ticker">
          <div className="bl-tick-track">
            {TICKER_ITEMS.map((item, i) => (
              <div key={i} className="bl-tick-item">
                <span className="bl-tick-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="bl-hero">
          <div className="bl-eyebrow bl-u d1">✦ Tips &amp; Stories</div>
          <h1
            className="bl-h bl-u d2"
            style={{
              fontSize: "clamp(3.5rem,9vw,7rem)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              marginBottom: "1.25rem",
            }}
          >
            The Sip
          </h1>
          <p
            className="bl-u d3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#777",
              maxWidth: "44ch",
              margin: "0 auto",
            }}
          >
            Hydration tips, lifestyle reads, and everything tumbler — by Hilee.
          </p>
        </div>

        {/* Filters */}
        <div className="bl-filters bl-u d4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`bl-chip${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="bl-body">
          {/* Featured Post */}
          {showFeatured && featured && (
            <div className="bl-featured bl-u d4">
              <div className="bl-feat-img-wrap">
                <img
                  className="bl-feat-img"
                  src={featured.img}
                  alt={featured.title}
                  loading="lazy"
                />
                <span className="bl-feat-img-badge">✦ Featured</span>
              </div>
              <div className="bl-feat-body">
                <div className="bl-feat-label">
                  {featured.category}
                  <span className="bl-feat-tag">FEATURED</span>
                </div>
                <div className="bl-feat-title">{featured.title}</div>
                <div className="bl-feat-excerpt">{featured.excerpt}</div>
                <div className="bl-feat-meta">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.read}</span>
                </div>
                <button className="bl-feat-cta">Read Article →</button>
              </div>
            </div>
          )}

          {/* Section Label */}
          {filtered.length > 0 && (
            <div className="bl-section-label bl-u d5">More Articles</div>
          )}

          {/* Post Grid */}
          <div className="bl-grid bl-u d5">
            {filtered.length === 0 ? (
              <p className="bl-empty">
                No posts in this category yet — check back soon!
              </p>
            ) : (
              filtered.map((post) => (
                <div key={post.title} className="bl-card">
                  <img
                    className="bl-card-img"
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className="bl-card-body">
                    <div className="bl-card-label">{post.category}</div>
                    <div className="bl-card-title">{post.title}</div>
                    <div className="bl-card-excerpt">{post.excerpt}</div>
                    <div className="bl-card-meta">
                      <span>
                        {post.date} · {post.read}
                      </span>
                      <span className="bl-card-arrow">→</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Newsletter */}
          <div className="bl-nl bl-u d6">
            <div className="bl-nl-title">Stay in the Loop.</div>
            <p className="bl-nl-sub">
              Get hydration tips, tumbler guides, and exclusive Hilee updates
              straight to your inbox. No spam — ever.
            </p>
            <div className="bl-nl-row">
              <input
                className="bl-nl-input"
                type="email"
                placeholder="your@email.com"
              />
              <button className="bl-nl-btn">Subscribe →</button>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="bl-trust bl-u d6">
            {TRUST_ITEMS.map((item) => (
              <span key={item.label} className="bl-trust-item">
                <span>{item.icon}</span> {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
