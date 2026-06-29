"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBag, Droplets, ArrowRight } from "lucide-react";

const ACCENT = "#0EA5E9";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_featured: boolean;
  tiktok_url: string | null;
}

export default function HeroSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const getImageUrl = (p: string) => {
    if (!p) return "/placeholder.svg";
    if (p.startsWith("http")) return p;
    const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return `${BASE}/${p.startsWith("images/products/") ? p : `images/products/${p}`}`;
  };

  useEffect(() => {
    fetch("/api/products?paginate=false")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setProducts(Array.isArray(d) ? d : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = products[activeIdx] ?? null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ── Ticker ── */
        .ht-wrap { overflow: hidden; white-space: nowrap; padding: 9px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07); background: #E0F2FE; }
        .ht-inner { display: inline-flex; animation: htTick 28s linear infinite; }
        @keyframes htTick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ht-item { display: inline-flex; align-items: center; gap: 8px; padding: 0 24px;
          font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; }
        .ht-dot { width: 4px; height: 4px; border-radius: 50%; background: #FF6B35; flex-shrink: 0; }

        /* ── Shell ── */
        .hs-shell { font-family: 'Inter', sans-serif; 
          background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 40%, #E1F5FF 100%);
          position: relative; overflow: hidden; }

        /* ── Decorative bg blobs ── */
        .hs-blob-a { position: absolute; width: 600px; height: 600px; border-radius: 50%;
          background: linear-gradient(135deg, #0EA5E9, #06B6D4); opacity: 0.15; filter: blur(80px);
          top: -150px; right: -120px; pointer-events: none; animation: hs-float 8s ease-in-out infinite; }
        .hs-blob-b { position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: linear-gradient(135deg, #22D3EE, #0EA5E9); opacity: 0.12; filter: blur(70px);
          bottom: -80px; left: -80px; pointer-events: none; animation: hs-float 10s ease-in-out infinite reverse; }
        @keyframes hs-float { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(40px) scale(1.05); } }

        /* ── Main grid ── */
        .hs-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 5vw;
          gap: 0;
        }

        /* ── Left ── */
        .hs-left { display: flex; flex-direction: column; justify-content: center;
          padding: 4rem 3rem 4rem 0; gap: 1.5rem; }

        .hs-label { display: inline-flex; align-items: center; gap: 7px; width: fit-content; }
        .hs-label-text { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: #0EA5E9; }

        .hs-headline { font-size: clamp(2.6rem, 5vw, 4.2rem); font-weight: 900;
          line-height: 1.0; background: linear-gradient(135deg, #0C1C2E 0%, #0EA5E9 50%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin: 0; letter-spacing: -0.025em; }
        .hs-headline span { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .hs-sub { font-size: clamp(0.9rem, 1.3vw, 1rem); color: #4B5563;
          line-height: 1.7; max-width: 400px; margin: 0; }

        /* ── Pills row ── */
        .hs-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .hs-pill { background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,249,255,0.6));
          border: 1.5px solid rgba(14,165,233,0.2); backdrop-filter: blur(8px);
          border-radius: 999px; padding: 8px 16px; font-size: 0.72rem; font-weight: 700;
          color: #0C1C2E; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .hs-pill:hover { border-color: rgba(14,165,233,0.4); box-shadow: 0 4px 12px rgba(14,165,233,0.1); }
        .hs-pill-dot { width: 7px; height: 7px; border-radius: 50%; background: #0EA5E9; }

        /* ── CTAs ── */
        .hs-ctas { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .hs-btn-primary { display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 999px; 
          background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%);
          color: white; font-family: 'Inter', sans-serif; font-weight: 800; font-size: 0.88rem;
          letter-spacing: 0.03em; text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, scale 0.2s;
          box-shadow: 0 12px 32px rgba(14,165,233,0.4); }
        .hs-btn-primary:hover { transform: translateY(-4px); scale: 1.03; box-shadow: 0 20px 48px rgba(14,165,233,0.5); }
        .hs-btn-ghost { display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif; font-weight: 800; font-size: 0.88rem;
          color: #0C1C2E; text-decoration: none; transition: all 0.2s; position: relative; }
        .hs-btn-ghost:hover { color: #0EA5E9; transform: translateX(4px); }

        /* ── Trust badges ── */
        .hs-trust { display: flex; gap: 1.25rem; flex-wrap: wrap; padding-top: 0.25rem; }
        .hs-trust-item { font-size: 0.72rem; font-weight: 700; color: #6B7280;
          display: flex; align-items: center; gap: 5px; }

        /* ── Right panel ── */
        .hs-right { position: relative; display: flex; align-items: stretch; overflow: hidden; }

        /* ── Image stage ── */
        .hs-stage { flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem 0 3rem 3rem; position: relative; min-width: 0; }

        .hs-img-frame { position: relative; width: 100%; max-width: 360px;
          aspect-ratio: 1; border-radius: 32px; 
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.8));
          border: 2px solid rgba(14,165,233,0.25); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 20px 50px rgba(14,165,233,0.15); backdrop-filter: blur(10px); }
        .hs-img-frame:hover { transform: scale(1.03) translateY(-8px); box-shadow: 0 32px 64px rgba(14,165,233,0.3); }
        .hs-img-frame:hover .hs-view-overlay { opacity: 1; }

        .hs-view-overlay { position: absolute; inset: 0; background: rgba(14,165,233,0.08);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; border-radius: 32px; }
        .hs-view-overlay span { background: #0EA5E9; color: white; font-weight: 800;
          font-size: 0.8rem; padding: 10px 22px; border-radius: 999px; letter-spacing: 0.05em; }

        .hs-new-badge { position: absolute; top: 18px; left: 18px; z-index: 2;
          background: #0EA5E9; color: white; font-size: 0.6rem; font-weight: 900;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 999px; }

        /* ── Product selector dots ── */
        .hs-dots { display: flex; gap: 6px; margin-top: 1.25rem; }
        .hs-dot-btn { width: 8px; height: 8px; border-radius: 50%; border: none;
          cursor: pointer; transition: transform 0.15s, background 0.15s; padding: 0; }

        /* ── Product info strip ── */
        .hs-product-strip { width: 100%; max-width: 360px; margin-top: 1rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,249,255,0.7));
          border: 1.5px solid rgba(14,165,233,0.2); backdrop-filter: blur(8px);
          border-radius: 20px; padding: 14px 18px; display: flex; align-items: center; gap: 12px;
          transition: all 0.2s; }
        .hs-product-strip:hover { border-color: rgba(14,165,233,0.4); box-shadow: 0 8px 20px rgba(14,165,233,0.1); }
        .hs-strip-cat { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.12em;
          text-transform: uppercase; color: white; background: #0EA5E9;
          padding: 3px 9px; border-radius: 999px; flex-shrink: 0; }
        .hs-strip-name { font-size: 0.82rem; font-weight: 800; color: #0C1C2E;
          margin: 0 0 2px; line-height: 1.2; }
        .hs-strip-price { font-size: 0.92rem; font-weight: 900; color: #0EA5E9; margin: 0; }

        /* ── Skeleton ── */
        .hs-skel { width: 100%; max-width: 360px; aspect-ratio: 1; border-radius: 32px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%; animation: hsSkel 1.4s ease infinite; }
        @keyframes hsSkel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── Stats sidebar ── */
        .hs-stats-bar { display: flex; flex-direction: column; gap: 1rem;
          justify-content: center; padding: 3rem 0 3rem 1.5rem;
          border-left: 1px solid rgba(0,0,0,0.08); flex-shrink: 0; }
        .hs-stat-card { background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,249,255,0.7));
          border: 1.5px solid rgba(14,165,233,0.2); backdrop-filter: blur(8px);
          border-radius: 16px; padding: 14px 16px; min-width: 90px; text-align: center; transition: all 0.2s; }
        .hs-stat-card:hover { border-color: rgba(14,165,233,0.4); box-shadow: 0 8px 20px rgba(14,165,233,0.1); }
        .hs-stat-num { font-size: 1.1rem; font-weight: 900; color: #0C1C2E;
          display: block; line-height: 1; margin-bottom: 4px; }
        .hs-stat-lbl { font-size: 0.6rem; font-weight: 800; color: #6B7280;
          text-transform: uppercase; letter-spacing: 0.1em; display: block; }

        /* ══════ MODAL ══════ */
        .hs-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px); z-index: 300; display: flex;
          align-items: center; justify-content: center; padding: 1rem; box-sizing: border-box; }
        .hs-modal { background: white; border-radius: 28px; overflow: hidden;
          width: 100%; max-width: 780px; max-height: 90svh; display: flex;
          box-shadow: 0 40px 80px rgba(0,0,0,0.22); overflow-y: auto; }
        .hs-modal-img { width: 42%; flex-shrink: 0; background: #F0F9FF;
          display: flex; align-items: center; justify-content: center;
          padding: 2.5rem; box-sizing: border-box; min-height: 300px; }
        .hs-modal-body { flex: 1; padding: 2rem 2rem 2rem 1.5rem;
          display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; }
        .hs-modal-close { position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 34px; height: 34px; border-radius: 50%; background: white;
          border: 1px solid rgba(0,0,0,0.12); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: #0C1C2E; line-height: 1; }
        .hs-modal-cat { font-size: 0.62rem; font-weight: 900; letter-spacing: 0.12em;
          text-transform: uppercase; color: white; background: #0EA5E9;
          padding: 4px 12px; border-radius: 999px; width: fit-content; }
        .hs-modal-name { font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 900;
          color: #0C1C2E; margin: 0; line-height: 1.15; }
        .hs-modal-price { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 900;
          color: #0EA5E9; margin: 0; }
        .hs-modal-desc { font-size: 0.88rem; color: #4B5563; line-height: 1.7; margin: 0; flex: 1; }
        .hs-modal-shop-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #6B7280; margin: 0; }
        .hs-tiktok-btn { display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 1rem; border-radius: 999px; background: #010101; color: white;
          font-family: 'Inter', sans-serif; font-weight: 800; font-size: 0.85rem;
          text-decoration: none; transition: opacity 0.2s; border: none; cursor: pointer; }
        .hs-tiktok-btn:hover { opacity: 0.85; }

        /* ══════ RESPONSIVE ══════ */

        /* Tablet: stack to single column */
        @media (max-width: 860px) {
          .hs-grid {
            grid-template-columns: 1fr;
            padding: 0 1.25rem;
          }
          .hs-left {
            padding: 2.5rem 0 1rem;
            align-items: center;
            text-align: center;
          }
          .hs-sub { text-align: center; max-width: 100%; }
          .hs-pills { justify-content: center; }
          .hs-ctas { justify-content: center; }
          .hs-trust { justify-content: center; }

          /* Right: image + stats side by side on tablet */
          .hs-right {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            gap: 1.25rem;
            padding-bottom: 2.5rem;
          }
          .hs-stage {
            padding: 0;
            align-items: center;
            flex: 1;
            min-width: 0;
          }
          .hs-stats-bar {
            flex-direction: column;
            border-left: 1px solid rgba(0,0,0,0.08);
            border-top: none;
            padding: 0 0 0 1.25rem;
            justify-content: center;
            flex-shrink: 0;
          }
          .hs-stat-card { min-width: 80px; }
        }

        /* Mobile: fully stacked, stats go horizontal below image */
        @media (max-width: 560px) {
          .hs-grid { padding: 0 1rem; }
          .hs-left { padding: 2rem 0 1rem; gap: 1.1rem; }
          .hs-headline { font-size: clamp(2rem, 9vw, 2.6rem); }

          .hs-right {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .hs-stage { padding: 0; width: 100%; }
          .hs-img-frame { max-width: 100%; border-radius: 22px; }
          .hs-skel { max-width: 100%; border-radius: 22px; }
          .hs-product-strip { max-width: 100%; }

          /* Stats go horizontal row below image */
          .hs-stats-bar {
            flex-direction: row;
            border-left: none;
            border-top: 1px solid rgba(0,0,0,0.08);
            padding: 1rem 0 0;
            width: 100%;
            justify-content: space-between;
            gap: 0.75rem;
          }
          .hs-stat-card { flex: 1; min-width: 0; padding: 10px 8px; }
          .hs-stat-num { font-size: 1rem; }
          .hs-stat-lbl { font-size: 0.55rem; }

          /* Modal */
          .hs-modal { flex-direction: column; border-radius: 20px; }
          .hs-modal-img { width: 100%; min-height: 220px; padding: 1.5rem; }
          .hs-modal-body { padding: 1.25rem 1.25rem 1.5rem; }
        }
      `}</style>

      {/* Ticker */}
      <div className="ht-wrap">
        <div className="ht-inner">
          {[
            "STAY HYDRATED",
            "FREE SHIPPING",
            "24H COLD",
            "BPA FREE",
            "STAINLESS STEEL",
            "PREMIUM QUALITY",
            "STAY HYDRATED",
            "FREE SHIPPING",
            "24H COLD",
            "BPA FREE",
            "STAINLESS STEEL",
            "PREMIUM QUALITY",
          ].map((t, i) => (
            <span
              key={i}
              className="ht-item"
              style={{ color: i % 2 === 0 ? "#1F2937" : ACCENT }}
            >
              <span className="ht-dot" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hero shell */}
      <section className="hs-shell">
        <div className="hs-blob-a" />
        <div className="hs-blob-b" />

        <div className="hs-grid">
          {/* ══ LEFT ══ */}
          <div className="hs-left">
            <div className="hs-label">
              <Droplets size={13} color={ACCENT} />
              <span className="hs-label-text">
                Premium drinkware · Philippines
              </span>
            </div>

            <h1 className="hs-headline">
              Drink Bold.
              <br />
              <span>Stay Cold.</span>
            </h1>

            <p className="hs-sub">
              Insulated stainless steel tumblers built for life on the go.
              Ice-cold for 24 hours. Yours for every adventure.
            </p>

            <div className="hs-ctas">
              <Link href="/products" className="hs-btn-primary">
                <ShoppingBag size={16} />
                Shop now
              </Link>
              <Link href="/about" className="hs-btn-ghost">
                Our story <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ══ RIGHT ══ */}
          <div className="hs-right">
            <div className="hs-stage">
              {loading ? (
                <div className="hs-skel" />
              ) : !featured ? (
                <p
                  style={{
                    color: "#6B7280",
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  No products.
                </p>
              ) : (
                <>
                  <div
                    className="hs-img-frame"
                    onClick={() => setModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
                    aria-label={`View ${featured.name}`}
                  >
                    <Image
                      src={getImageUrl(featured.image)}
                      alt={featured.name}
                      width={320}
                      height={320}
                      style={{
                        objectFit: "contain",
                        maxWidth: "80%",
                        maxHeight: "80%",
                      }}
                      priority
                    />
                    <div className="hs-view-overlay">
                      <span>VIEW PRODUCT</span>
                    </div>
                    <span className="hs-new-badge">NEW</span>
                  </div>

                  {products.length > 1 && (
                    <div className="hs-dots">
                      {products.map((_, i) => (
                        <button
                          key={i}
                          className="hs-dot-btn"
                          onClick={() => setActiveIdx(i)}
                          aria-label={`Product ${i + 1}`}
                          style={{
                            background:
                              i === activeIdx ? ACCENT : "rgba(0,0,0,0.18)",
                            transform:
                              i === activeIdx ? "scale(1.3)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="hs-product-strip">
                    <span className="hs-strip-cat">{featured.category}</span>
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{
                        background: ACCENT,
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "999px",
                        padding: "9px 16px",
                        fontFamily: "'Inter',sans-serif",
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        marginLeft: "auto",
                      }}
                    >
                      View →
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Stats sidebar */}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          position: "relative",
          height: "1px",
          background: "rgba(0,0,0,0.08)",
          margin: "0 4rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            background: "#FAF7F2",
            padding: "0 1rem",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{ width: 20, height: 1, background: "rgba(0,0,0,0.12)" }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: ACCENT,
              opacity: 0.6,
            }}
          />
          <div
            style={{ width: 20, height: 1, background: "rgba(0,0,0,0.12)" }}
          />
        </div>
      </div>

      {/* ══ MODAL ══ */}
      {modalOpen && featured && (
        <div className="hs-modal-bg" onClick={() => setModalOpen(false)}>
          <div
            className="hs-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative" }}
          >
            <button
              className="hs-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="hs-modal-img">
              <Image
                src={getImageUrl(featured.image)}
                alt={featured.name}
                width={280}
                height={280}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>

            <div className="hs-modal-body">
              <span className="hs-modal-cat">{featured.category}</span>
              <h2 className="hs-modal-name">{featured.name}</h2>
              <p className="hs-modal-desc">{featured.description}</p>

              <p className="hs-modal-shop-label">Available on</p>
              <a
                href={featured.tiktok_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hs-tiktok-btn"
                style={{
                  pointerEvents: featured.tiktok_url ? "auto" : "none",
                  opacity: featured.tiktok_url ? 1 : 0.4,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="white"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
                </svg>
                Shop now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
