"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBag, Droplets, ArrowRight } from "lucide-react";

const ACCENT = "#FF6B35";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_featured: boolean;
  tiktok_url: string | null; // add this
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
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        /* ── Ticker ── */
        .ht-wrap { overflow: hidden; white-space: nowrap; padding: 9px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07); background: #FFF3E0; }
        .ht-inner { display: inline-flex; animation: htTick 28s linear infinite; }
        @keyframes htTick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ht-item { display: inline-flex; align-items: center; gap: 8px; padding: 0 24px;
          font-family: 'Nunito', sans-serif; font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase; }
        .ht-dot { width: 4px; height: 4px; border-radius: 50%; background: #FF6B35; flex-shrink: 0; }

        /* ── Shell ── */
        .hs-shell { font-family: 'Nunito', sans-serif; background: #FAF7F2;
          position: relative; overflow: hidden; }

        /* ── Decorative bg blobs ── */
        .hs-blob-a { position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: #FF6B35; opacity: 0.07; filter: blur(100px);
          top: -120px; right: -100px; pointer-events: none; }
        .hs-blob-b { position: absolute; width: 300px; height: 300px; border-radius: 50%;
          background: #FF6B35; opacity: 0.05; filter: blur(80px);
          bottom: -60px; left: -60px; pointer-events: none; }

        /* ── Main grid ── */
        .hs-grid { position: relative; z-index: 1; display: grid;
          grid-template-columns: 1fr 1fr; min-height: 520px; max-width: 1320px;
          margin: 0 auto; padding: 0 5vw; gap: 0; }

        /* ── Left ── */
        .hs-left { display: flex; flex-direction: column; justify-content: center;
          padding: 4rem 3rem 4rem 0; gap: 1.5rem; }

        .hs-label { display: inline-flex; align-items: center; gap: 7px; width: fit-content; }
        .hs-label-text { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: #FF6B35; }

        .hs-headline { font-size: clamp(2.6rem, 5vw, 4.2rem); font-weight: 900;
          line-height: 1.0; color: #111827; margin: 0; letter-spacing: -0.025em; }
        .hs-headline span { color: #FF6B35; }

        .hs-sub { font-size: clamp(0.9rem, 1.3vw, 1rem); color: #6B7280;
          line-height: 1.7; max-width: 400px; margin: 0; }

        /* ── Pills row ── */
        .hs-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .hs-pill { background: white; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 999px; padding: 7px 14px; font-size: 0.72rem; font-weight: 700;
          color: #374151; display: flex; align-items: center; gap: 6px; }
        .hs-pill-dot { width: 7px; height: 7px; border-radius: 50%; background: #FF6B35; }

        /* ── CTAs ── */
        .hs-ctas { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .hs-btn-primary { display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 30px; border-radius: 999px; background: #FF6B35; color: white;
          font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.88rem;
          letter-spacing: 0.03em; text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 8px 28px rgba(255,107,53,0.3); }
        .hs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(255,107,53,0.38); }
        .hs-btn-ghost { display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.88rem;
          color: #374151; text-decoration: none; transition: color 0.18s; }
        .hs-btn-ghost:hover { color: #FF6B35; }

        /* ── Trust badges ── */
        .hs-trust { display: flex; gap: 1.25rem; flex-wrap: wrap; padding-top: 0.25rem; }
        .hs-trust-item { font-size: 0.72rem; font-weight: 700; color: #9CA3AF;
          display: flex; align-items: center; gap: 5px; }

        /* ── Right panel ── */
        .hs-right { position: relative; display: flex; align-items: stretch; }

        /* ── Image stage ── */
        .hs-stage { flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem 0 3rem 3rem; position: relative; }

        .hs-img-frame { position: relative; width: 100%; max-width: 420px;
          aspect-ratio: 1; border-radius: 32px; background: white;
          border: 1px solid rgba(0,0,0,0.06); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.25s; }
        .hs-img-frame:hover { transform: scale(1.015); }
        .hs-img-frame:hover .hs-view-overlay { opacity: 1; }

        .hs-view-overlay { position: absolute; inset: 0; background: rgba(255,107,53,0.06);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; border-radius: 32px; }
        .hs-view-overlay span { background: #FF6B35; color: white; font-weight: 800;
          font-size: 0.8rem; padding: 10px 22px; border-radius: 999px; letter-spacing: 0.05em; }

        .hs-new-badge { position: absolute; top: 18px; left: 18px; z-index: 2;
          background: #FF6B35; color: white; font-size: 0.6rem; font-weight: 900;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 999px; }

        /* ── Product selector dots ── */
        .hs-dots { display: flex; gap: 6px; margin-top: 1.25rem; }
        .hs-dot-btn { width: 8px; height: 8px; border-radius: 50%; border: none;
          cursor: pointer; transition: transform 0.15s, background 0.15s; padding: 0; }

        /* ── Product info strip ── */
        .hs-product-strip { width: 100%; max-width: 420px; margin-top: 1rem;
          background: white; border: 1px solid rgba(0,0,0,0.07); border-radius: 20px;
          padding: 14px 18px; display: flex; align-items: center; gap: 12px; }
        .hs-strip-cat { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.12em;
          text-transform: uppercase; color: white; background: #FF6B35;
          padding: 3px 9px; border-radius: 999px; flex-shrink: 0; }
        .hs-strip-name { font-size: 0.82rem; font-weight: 800; color: #111827;
          margin: 0 0 2px; line-height: 1.2; }
        .hs-strip-price { font-size: 0.92rem; font-weight: 900; color: #FF6B35; margin: 0; }

        /* ── Skeleton ── */
        .hs-skel { width: 100%; max-width: 420px; aspect-ratio: 1; border-radius: 32px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%; animation: hsSkel 1.4s ease infinite; }
        @keyframes hsSkel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── Stats sidebar ── */
        .hs-stats-bar { display: flex; flex-direction: column; gap: 1rem;
          justify-content: center; padding: 3rem 0 3rem 1.5rem; border-left: 1px solid rgba(0,0,0,0.07); }
        .hs-stat-card { background: white; border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px; padding: 14px 16px; min-width: 90px; text-align: center; }
        .hs-stat-num { font-size: 1.1rem; font-weight: 900; color: #111827;
          display: block; line-height: 1; margin-bottom: 4px; }
        .hs-stat-lbl { font-size: 0.6rem; font-weight: 800; color: #9CA3AF;
          text-transform: uppercase; letter-spacing: 0.1em; display: block; }

        /* ══════ MODAL ══════ */
        .hs-modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px); z-index: 300; display: flex;
          align-items: center; justify-content: center; padding: 1rem; box-sizing: border-box; }
        .hs-modal { background: white; border-radius: 28px; overflow: hidden;
          width: 100%; max-width: 780px; max-height: 90svh; display: flex;
          box-shadow: 0 40px 80px rgba(0,0,0,0.2); overflow-y: auto; }
        .hs-modal-img { width: 42%; flex-shrink: 0; background: #FAF7F2;
          display: flex; align-items: center; justify-content: center;
          padding: 2.5rem; box-sizing: border-box; min-height: 300px; }
        .hs-modal-body { flex: 1; padding: 2rem 2rem 2rem 1.5rem;
          display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; }
        .hs-modal-close { position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 34px; height: 34px; border-radius: 50%; background: white;
          border: 1px solid rgba(0,0,0,0.1); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: #374151; line-height: 1; }
        .hs-modal-cat { font-size: 0.62rem; font-weight: 900; letter-spacing: 0.12em;
          text-transform: uppercase; color: white; background: #FF6B35;
          padding: 4px 12px; border-radius: 999px; width: fit-content; }
        .hs-modal-name { font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 900;
          color: #111827; margin: 0; line-height: 1.15; }
        .hs-modal-price { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 900;
          color: #FF6B35; margin: 0; }
        .hs-modal-desc { font-size: 0.88rem; color: #6B7280; line-height: 1.7; margin: 0; flex: 1; }
        .hs-modal-shop-label { font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #9CA3AF; margin: 0; }
        .hs-tiktok-btn { display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px 1rem; border-radius: 999px; background: #010101; color: white;
          font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem;
          text-decoration: none; transition: opacity 0.2s; border: none; cursor: pointer; }
        .hs-tiktok-btn:hover { opacity: 0.85; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .hs-grid { grid-template-columns: 1fr; }
          .hs-left { padding: 2.5rem 0 1.5rem; align-items: center; text-align: center; }
          .hs-sub { text-align: center; }
          .hs-pills { justify-content: center; }
          .hs-ctas { justify-content: center; }
          .hs-trust { justify-content: center; }
          .hs-right { justify-content: center; }
          .hs-stage { padding: 0 0 2.5rem; align-items: center; }
          .hs-stats-bar { flex-direction: row; border-left: none;
            border-top: 1px solid rgba(0,0,0,0.07); padding: 1.5rem 0 0; }
          .hs-stat-card { flex: 1; }
        }
        @media (max-width: 600px) {
          .hs-headline { font-size: clamp(2rem, 9vw, 2.8rem); }
          .hs-img-frame { border-radius: 22px; }
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
              style={{ color: i % 2 === 0 ? "#374151" : ACCENT }}
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

            <div className="hs-pills">
              {[
                "🧊 24H Cold Retention",
                "💧 BPA Free",
                "✅ 18 oz Capacity",
              ].map((p) => (
                <span key={p} className="hs-pill">
                  <span className="hs-pill-dot" />
                  {p}
                </span>
              ))}
            </div>

            <div className="hs-ctas">
              <Link href="/products" className="hs-btn-primary">
                <ShoppingBag size={16} />
                Shop now
              </Link>
              <Link href="/about" className="hs-btn-ghost">
                Our story <ArrowRight size={14} />
              </Link>
            </div>

            <div className="hs-trust">
              {[
                ["🚚", "Free shipping"],
                ["↩️", "30-day returns"],
                ["🏆", "Lifetime warranty"],
              ].map(([e, t]) => (
                <div key={t} className="hs-trust-item">
                  <span>{e}</span>
                  <span>{t}</span>
                </div>
              ))}
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
                    color: "#9CA3AF",
                    fontFamily: "'Nunito',sans-serif",
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

                  {/* Selector dots */}
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
                              i === activeIdx ? ACCENT : "rgba(0,0,0,0.15)",
                            transform:
                              i === activeIdx ? "scale(1.3)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Name / price strip */}
                  <div className="hs-product-strip">
                    <span className="hs-strip-cat">{featured.category}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="hs-strip-name">{featured.name}</p>
                      {featured.price > 0 && (
                        <p className="hs-strip-price">
                          ₱
                          {Number(featured.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{
                        background: ACCENT,
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "999px",
                        padding: "9px 16px",
                        fontFamily: "'Nunito',sans-serif",
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      View →
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Stats sidebar */}
            <div className="hs-stats-bar">
              {[
                ["500+", "Happy buyers"],
                ["24H", "Ice cold"],
                ["100%", "BPA free"],
              ].map(([n, l]) => (
                <div key={l} className="hs-stat-card">
                  <span
                    className="hs-stat-num"
                    style={{ color: n === "24H" ? ACCENT : "#111827" }}
                  >
                    {n}
                  </span>
                  <span className="hs-stat-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          position: "relative",
          height: "1px",
          background: "rgba(0,0,0,0.07)",
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
            style={{ width: 20, height: 1, background: "rgba(0,0,0,0.1)" }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: ACCENT,
              opacity: 0.5,
            }}
          />
          <div
            style={{ width: 20, height: 1, background: "rgba(0,0,0,0.1)" }}
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
              {featured.price > 0 && (
                <p className="hs-modal-price">
                  ₱
                  {Number(featured.price)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )}
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
                Shop on TikTok
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
