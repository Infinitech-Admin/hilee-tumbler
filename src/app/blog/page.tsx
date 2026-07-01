"use client";

import { useState, useEffect } from "react";

interface Post {
  category: string;
  read: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  img: string;
  featured?: boolean;
}

const POSTS: Post[] = [
  {
    category: "Hydration Tips",
    read: "5 min read",
    title: "How Much Water Do You Actually Need Each Day?",
    excerpt:
      "The '8 glasses a day' rule is a myth. Here's what the science actually says about daily hydration — and how to hit your real target without thinking twice.",
    body: `You've heard it a thousand times: drink eight glasses of water a day. It's printed on wellness posters, repeated by fitness influencers, and treated like gospel. The problem? It's not based on solid science.

The real answer depends on your body weight, activity level, climate, and even what you eat. The National Academies of Sciences suggests about 3.7 liters (125 oz) per day for men and 2.7 liters (91 oz) for women — but that includes water from food, which accounts for roughly 20% of intake.

**Signs you're actually dehydrated:**
• Urine that's dark yellow rather than pale straw
• Headaches that come on without obvious cause
• Difficulty concentrating or feeling foggy
• Dry mouth and lips, even after drinking

The easiest habit you can build? Keep a tumbler visible on your desk. Research consistently shows that people drink more when a vessel is within arm's reach. Out of sight really is out of mind when it comes to water. A 27oz Hilee flask refilled twice a day gets most people comfortably across their daily target — no calorie tracking, no apps required.`,
    date: "June 15, 2026",
    img: "https://binzahidmarket.com/cdn/shop/files/hilee-flask-27oz-sweet-harvest-edition-hot-cold-vacuum-tumbler-raspberry-984.png?v=1746716411&width=900",
    featured: true,
  },
  {
    category: "Lifestyle",
    read: "4 min read",
    title: "Cold Coffee at 3PM: Why Your Tumbler Is Your Best Desk Buddy",
    excerpt:
      "Work-from-home or office life — your drink shouldn't go warm before lunch. Here's how the right tumbler changes your entire afternoon routine.",
    body: `The 3PM slump is real. Your energy dips, your focus blurs, and you reach for something cold and caffeinated. The last thing you need is to find your iced coffee has turned into lukewarm disappointment.

Double-wall vacuum insulation changes the equation entirely. A quality tumbler keeps your iced coffee genuinely cold for 8–12 hours — meaning that drink you made at 8AM is still refreshing when you finally surface from your afternoon meeting spiral.

**Why it matters beyond temperature:**
Cold drinks are more palatable, so you actually finish them. That means more caffeine delivered at the right pace, more hydration overall, and fewer trips to the kitchen that break your flow state.

**The desk setup that works:**
Place your tumbler at your non-dominant side — the side you don't use for your mouse. You'll reach for it instinctively during moments of pause (reading, thinking, waiting for a file to load) without it ever feeling like an effort. Small friction removals compound into real habits.

The Hilee cantaloupe edition has become a favourite for office setups precisely because the warm orange is a visual cue — bright enough to catch your eye, reminder enough to sip.`,
    date: "June 8, 2026",
    img: "https://binzahidmarket.com/cdn/shop/files/hilee-flask-27oz-sweet-harvest-edition-hot-cold-vacuum-tumbler-cantaloupe-436.png?v=1746712334&width=900",
  },

  {
    category: "Wellness",
    read: "4 min read",
    title: "The Link Between Hydration and Focus (It's Bigger Than You Think)",
    excerpt:
      "Even mild dehydration kills your concentration and mood. A cold drink within reach is a small habit that pays off every single hour.",
    body: `Your brain is roughly 75% water. Even a 1–2% drop in hydration — the kind you won't even notice as thirst — measurably impairs cognitive performance. Studies show that mild dehydration slows reaction time, reduces short-term memory recall, and increases feelings of anxiety and fatigue.

The cruel irony: by the time you feel thirsty, you're already mildly dehydrated. Thirst is a lag indicator, not a leading one.

**What changes when you're well-hydrated:**
• Sharper focus, especially during repetitive tasks
• Better mood regulation throughout the day
• Fewer tension headaches (often caused by mild dehydration)
• More consistent energy without the mid-afternoon crash

**Building the habit without thinking:**
The goal isn't to force yourself to drink water — it's to make not drinking feel like the weird choice. Keep your tumbler filled and cold at the start of every work block. Set a simple rule: before you open a new tab or document, take a sip. It takes three seconds and becomes automatic within a week.

Hydration is one of the highest-leverage, lowest-cost wellness habits available. The Hilee banana edition's cheerful yellow was literally chosen to be a mood-lifter on your desk.`,
    date: "May 20, 2026",
    img: "https://binzahidmarket.com/cdn/shop/files/hilee-flask-27oz-sweet-harvest-edition-hot-cold-vacuum-tumbler-banana-985.jpg?v=1755589573&width=600",
  },
  {
    category: "Hydration Tips",
    read: "3 min read",
    title: "Hot or Iced? How to Get the Most from Insulated Drinkware",
    excerpt:
      "Double-wall vacuum insulation works differently for hot and cold drinks. Here's how to use it right so your coffee stays hot and your water stays freezing.",
    body: `Vacuum insulation is one of those technologies that sounds simple but has a lot of nuance in practice. Understanding how it works helps you use it better.

**How it actually works:**
A double-wall vacuum tumbler has two stainless steel walls with a vacuum (no air) between them. Heat can only transfer through conduction, convection, or radiation — and the vacuum eliminates convection almost entirely, while the steel reflects radiated heat. The result: thermal transfer slows dramatically.

**For cold drinks:**
Pre-chill your tumbler with cold water or ice for 5 minutes before filling. This matters more than most people realise — a warm tumbler will begin warming your drink the moment liquid touches the walls. Use large ice cubes (they melt slower than crushed ice), fill to the top, and seal. Your Hilee flask will keep drinks ice cold for up to 24 hours.

**For hot drinks:**
Pre-warm the same way — pour boiling water in, wait 2 minutes, discard. This brings the metal walls up to temperature so they stop absorbing heat from your coffee. Then fill with your hot drink. Expected retention: 6–12 hours of genuine warmth, not just tepid.

**The one rule:**
Never put carbonated drinks in a sealed vacuum flask without venting. Pressure builds, and opening can spray liquid. For sparkling water, leave the lid slightly loose.`,
    date: "May 12, 2026",
    img: "https://binzahidmarket.com/cdn/shop/files/hilee-flask-27oz-sweet-harvest-edition-hot-cold-vacuum-tumbler-raspberry-984.png?v=1746716411&width=600",
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
  const [expandedPost, setExpandedPost] = useState<Post | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (expandedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedPost]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%)",
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

  const renderBody = (body: string) => {
    return body.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <h3
            key={i}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#2E2419",
              margin: "1.5rem 0 0.5rem",
            }}
          >
            {block.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (block.includes("\n•")) {
        const [heading, ...items] = block.split("\n");
        return (
          <div key={i}>
            {heading && (
              <p
                style={{
                  color: "#5C4F3A",
                  lineHeight: 1.85,
                  marginBottom: "0.5rem",
                }}
              >
                {heading.replace(/\*\*/g, "")}
              </p>
            )}
            <ul style={{ paddingLeft: "1.25rem", margin: "0.25rem 0 1rem" }}>
              {items.map((item, j) => (
                <li
                  key={j}
                  style={{
                    color: "#7C6F60",
                    lineHeight: 1.8,
                    fontSize: "0.9rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.replace("• ", "")}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p
          key={i}
          style={{
            color: "#5C4F3A",
            lineHeight: 1.85,
            fontSize: "0.92rem",
            marginBottom: "0.25rem",
          }}
        >
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} style={{ color: "#2E2419", fontWeight: 700 }}>
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            ),
          )}
        </p>
      );
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Nunito:wght@300;400;500;600;700;800&display=swap');

        .bl { font-family: 'Nunito', sans-serif; background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #FFFFFF 100%); color: #0C1C2E; min-height: 100vh; }
        .bl * { box-sizing: border-box; }
        .bl-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Ticker */
        @keyframes bl-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bl-ticker { background: linear-gradient(90deg, #E0F2FE, #F0F9FF); border-bottom: 1.5px solid rgba(14,165,233,0.1); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .bl-tick-item { display: flex; align-items: center; gap: 1rem; padding: 0 2rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #0C1C2E; white-space: nowrap; }
        .bl-tick-dot { width: 5px; height: 5px; border-radius: 50%; background: #0EA5E9; flex-shrink: 0; }

        /* Hero */
        .bl-hero { padding: 5rem 2.5rem 3.5rem; text-align: center; border-bottom: 1.5px solid rgba(0,0,0,0.06); background: linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 45%, #FFFFFF 100%); max-width: none; width: 100%; margin: 0; }
        .bl-hero-inner { max-width: 900px; margin: 0 auto; }
        .bl-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(14,165,233,0.1); border: 1.5px solid rgba(14,165,233,0.25); border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #0EA5E9; margin-bottom: 1.5rem; }

        /* Fade up animation */
        @keyframes bl-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .bl-u { animation: bl-up 0.7s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}
        .d4{animation-delay:.38s}.d5{animation-delay:.5s}.d6{animation-delay:.62s}

        /* Filters */
        .bl-filters { display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap; padding: 2rem 2.5rem 0; }
        .bl-chip { background: none; border: 1.5px solid rgba(14,165,233,0.2); border-radius: 999px; padding: 0.45rem 1.1rem; font-family: 'Nunito', sans-serif; font-size: 0.72rem; font-weight: 700; color: #0C1C2E; cursor: pointer; transition: all 0.2s; letter-spacing: 0.03em; }
        .bl-chip:hover { border-color: #0EA5E9; color: #0EA5E9; background: rgba(14,165,233,0.05); }
        .bl-chip.active { background: #0EA5E9; border-color: #0EA5E9; color: #FFFFFF; }

        /* Body */
        .bl-body { max-width: 1160px; margin: 0 auto; padding: 3rem 2.5rem 6rem; display: flex; flex-direction: column; gap: 3rem; }

        /* Section label */
        .bl-section-label { display: flex; align-items: center; gap: 1rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #ACA193; }
        .bl-section-label::after { content: ''; flex: 1; height: 1px; background: #DDD8CF; }

        /* Featured */
        .bl-featured { display: grid; grid-template-columns: 1fr 1fr; border-radius: 24px; border: 1.5px solid rgba(14,165,233,0.15); overflow: hidden; cursor: pointer; transition: all 0.3s ease; background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.8)); }
        .bl-featured:hover { box-shadow: 0 20px 50px rgba(14,165,233,0.2); transform: translateY(-4px) scale(1.01); border-color: rgba(14,165,233,0.3); }
        .bl-feat-img-wrap { position: relative; min-height: 320px; background: #F3ECE1; display: flex; align-items: center; justify-content: center; }
        .bl-feat-img { width: 100%; height: 100%; object-fit: contain; display: block; padding: 1.5rem; }
        .bl-feat-img-badge { position: absolute; top: 1.25rem; left: 1.25rem; background: rgba(250,247,242,0.92); backdrop-filter: blur(8px); border-radius: 999px; padding: 0.3rem 0.8rem; font-size: 0.6rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #5C4F3A; }
        .bl-feat-body { padding: 2.5rem 2.25rem; display: flex; flex-direction: column; justify-content: center; gap: 0.85rem; background: white; }
        .bl-feat-label { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #8C7355; display: flex; align-items: center; gap: 0.5rem; }
        .bl-feat-tag { background: #EDE8DF; border: 1px solid #DDD8CF; border-radius: 999px; padding: 0.2rem 0.55rem; font-size: 0.55rem; color: #5C4F3A; letter-spacing: 0.12em; }
        .bl-feat-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(1.3rem, 2.5vw, 1.9rem); line-height: 1.12; color: #2E2419; }
        .bl-feat-excerpt { font-size: 0.88rem; color: #7C6F60; line-height: 1.8; }
        .bl-feat-meta { display: flex; align-items: center; gap: 0.6rem; font-size: 0.7rem; color: #ACA193; font-weight: 600; }
        .bl-feat-cta { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.8rem; font-weight: 800; color: #FF6B35; background: none; border: none; padding: 0; cursor: pointer; margin-top: 0.25rem; transition: gap 0.15s; font-family: 'Nunito', sans-serif; }
        .bl-feat-cta:hover { gap: 0.75rem; }

        /* Grid */
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .bl-card { background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7)); border-radius: 20px; border: 1.5px solid rgba(14,165,233,0.15); overflow: hidden; cursor: pointer; display: flex; flex-direction: column; transition: all 0.3s ease; backdrop-filter: blur(10px); }
        .bl-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 40px rgba(14,165,233,0.2); border-color: rgba(14,165,233,0.3); }
        .bl-card-img-wrap { width: 100%; height: 200px; background: #F3ECE1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .bl-card-img { width: 100%; height: 100%; object-fit: contain; display: block; padding: 1rem; transition: transform 0.3s ease; }
        .bl-card:hover .bl-card-img { transform: scale(1.05); }
        .bl-card-body { padding: 1.35rem 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
        .bl-card-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #8C7355; }
        .bl-card-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.98rem; line-height: 1.25; color: #2E2419; }
        .bl-card-excerpt { font-size: 0.78rem; color: #7C6F60; line-height: 1.7; flex: 1; }
        .bl-card-meta { display: flex; align-items: center; justify-content: space-between; font-size: 0.66rem; color: #ACA193; font-weight: 600; padding-top: 0.75rem; border-top: 1.5px dashed #DDD8CF; margin-top: 0.25rem; }
        .bl-card-arrow { color: #8C7355; font-weight: 800; font-size: 0.8rem; }

        /* Newsletter */
        .bl-nl { background: #F3ECE1; border-radius: 24px; border: 1.5px solid #DDD8CF; padding: 3rem 2.5rem; text-align: center; }
        .bl-nl-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.75rem; color: #2E2419; margin-bottom: 0.6rem; }
        .bl-nl-sub { font-size: 0.9rem; color: #7C6F60; line-height: 1.7; max-width: 42ch; margin: 0 auto 1.75rem; }
        .bl-nl-row { display: flex; align-items: center; gap: 0.6rem; justify-content: center; flex-wrap: wrap; }
        .bl-nl-input { border: 1.5px solid #DDD8CF; border-radius: 999px; padding: 0.7rem 1.35rem; font-family: 'Nunito', sans-serif; font-size: 0.85rem; background: white; color: #2E2419; outline: none; width: 260px; transition: border-color 0.15s; }
        .bl-nl-input:focus { border-color: #8C7355; box-shadow: 0 0 0 3px rgba(140,115,85,0.1); }
        .bl-nl-input::placeholder { color: #ACA193; }
        .bl-nl-btn { background: linear-gradient(135deg, #0EA5E9, #06B6D4); color: white; border: none; border-radius: 999px; padding: 0.7rem 1.6rem; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem; cursor: pointer; box-shadow: 0 12px 32px rgba(14,165,233,0.4); transition: all 0.3s ease; white-space: nowrap; }
        .bl-nl-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.5); }

        /* Trust */
        .bl-trust { display: flex; align-items: center; justify-content: center; gap: 2.25rem; flex-wrap: wrap; padding: 1.75rem 2.5rem; border-top: 1.5px dashed #DDD8CF; }
        .bl-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #ACA193; }

        /* Empty state */
        .bl-empty { text-align: center; padding: 4rem 0; color: #ACA193; font-size: 0.88rem; grid-column: 1 / -1; }

        /* ── Modal ── */
        @keyframes bl-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bl-modal-in { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: none; } }

        .bl-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(30, 22, 14, 0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: bl-overlay-in 0.22s ease both;
        }
        .bl-modal {
          background: #FDFAF6;
          border-radius: 28px;
          border: 1.5px solid #DDD8CF;
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          overflow-y: auto;
          animation: bl-modal-in 0.3s cubic-bezier(.22,1,.36,1) both;
          position: relative;
          scrollbar-width: thin;
          scrollbar-color: #DDD8CF transparent;
        }
        .bl-modal::-webkit-scrollbar { width: 5px; }
        .bl-modal::-webkit-scrollbar-track { background: transparent; }
        .bl-modal::-webkit-scrollbar-thumb { background: #DDD8CF; border-radius: 99px; }

        .bl-modal-img-wrap {
          width: 100%;
          height: 420px;
          background: #F3ECE1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          position: relative;
        }
        .bl-modal-img {
          height: 100%;
          width: 100%;
          object-fit: contain;
          padding: 2.5rem;
        }
        .bl-modal-close {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(250,247,242,0.9);
          backdrop-filter: blur(8px);
          border: 1.5px solid #DDD8CF;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5C4F3A;
          transition: background 0.15s, transform 0.15s;
          z-index: 10;
        }
        .bl-modal-close:hover { background: white; transform: scale(1.08); }

        .bl-modal-content { padding: 2.25rem 2.5rem 2.75rem; }
        .bl-modal-cat { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #8C7355; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .bl-modal-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: clamp(1.4rem, 3vw, 2rem); line-height: 1.1; color: #2E2419; margin-bottom: 0.75rem; }
        .bl-modal-meta { display: flex; align-items: center; gap: 0.6rem; font-size: 0.72rem; color: #ACA193; font-weight: 600; margin-bottom: 1.75rem; padding-bottom: 1.5rem; border-bottom: 1.5px dashed #DDD8CF; }
        .bl-modal-body { display: flex; flex-direction: column; gap: 0.9rem; }
        .bl-modal-footer { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1.5px dashed #DDD8CF; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .bl-modal-shop { background: #FF6B35; color: white; border: none; border-radius: 999px; padding: 0.75rem 1.75rem; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem; cursor: pointer; box-shadow: 0 8px 28px rgba(255,107,53,0.25); transition: transform 0.2s, box-shadow 0.2s; }
        .bl-modal-shop:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(255,107,53,0.35); }
        .bl-modal-back { background: none; border: 1.5px solid #DDD8CF; border-radius: 999px; padding: 0.72rem 1.35rem; font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.82rem; cursor: pointer; color: #7C6F60; transition: border-color 0.15s, color 0.15s; }
        .bl-modal-back:hover { border-color: #8C7355; color: #5C4F3A; }

        /* Responsive */
        @media (max-width: 900px) {
          .bl-featured { grid-template-columns: 1fr; }
          .bl-feat-img-wrap { min-height: 260px; }
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .bl-hero { padding: 3.5rem 1.25rem 2.5rem; }
          .bl-body { padding: 2rem 1.25rem 4rem; }
          .bl-grid { grid-template-columns: 1fr; }
          .bl-trust { gap: 1.25rem; }
          .bl-modal-content { padding: 1.5rem 1.25rem 2rem; }
          .bl-modal-img-wrap { height: 300px; }
        }
      `}</style>

      <div className="bl">
        {/* Ticker */}

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
              color: "#2E2419",
            }}
          >
            The Sip
          </h1>
          <p
            className="bl-u d3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#7C6F60",
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
            <div
              className="bl-featured bl-u d4"
              onClick={() => setExpandedPost(featured)}
            >
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
                <div
                  key={post.title}
                  className="bl-card"
                  onClick={() => setExpandedPost(post)}
                >
                  <div className="bl-card-img-wrap">
                    <img
                      className="bl-card-img"
                      src={post.img}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
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

      {/* ── Article Modal ── */}
      {expandedPost && (
        <div
          className="bl-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setExpandedPost(null);
          }}
        >
          <div className="bl-modal">
            {/* Image header */}
            <div className="bl-modal-img-wrap">
              <img
                className="bl-modal-img"
                src={expandedPost.img}
                alt={expandedPost.title}
              />
              <button
                className="bl-modal-close"
                onClick={() => setExpandedPost(null)}
                aria-label="Close article"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="bl-modal-content">
              <div className="bl-modal-cat">
                {expandedPost.category}
                {expandedPost.featured && (
                  <span
                    style={{
                      background: "#EDE8DF",
                      border: "1px solid #DDD8CF",
                      borderRadius: 999,
                      padding: "0.2rem 0.55rem",
                      fontSize: "0.55rem",
                      color: "#5C4F3A",
                      letterSpacing: "0.12em",
                    }}
                  >
                    FEATURED
                  </span>
                )}
              </div>
              <div className="bl-modal-title">{expandedPost.title}</div>
              <div className="bl-modal-meta">
                <span>{expandedPost.date}</span>
                <span>·</span>
                <span>{expandedPost.read}</span>
              </div>

              <div className="bl-modal-body">
                {renderBody(expandedPost.body)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
