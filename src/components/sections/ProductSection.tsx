"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, X, ExternalLink } from "lucide-react";

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

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/placeholder.svg";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath;
  const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const fullPath = imagePath.startsWith("images/products/")
    ? imagePath
    : `images/products/${imagePath}`;
  return `${BASE}/${fullPath}`;
};

const THEME = {
  accent: "#0EA5E9",
  bg: "linear-gradient(145deg, #E0F2FE, #BAE6FD)",
};

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
  fetch("/api/products?paginate=false")
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((d) => {
      const drinkware = Array.isArray(d)
        ? d.filter((product) => product.category === "Drinkware")
        : [];

      setProducts(drinkware);
    })
    .catch((e) => setError(String(e)))
    .finally(() => setLoading(false));
}, []);


  const { accent, bg } = THEME;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Nunito:wght@400;600;700;800&display=swap');

        .ps-root  { font-family: 'Nunito', sans-serif; }
        .ps-disp  { font-family: 'Bricolage Grotesque', sans-serif; }

        .ps-section {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 35%, #FFF9FF 70%, #FFFFFF 100%);
          padding: 5rem 2rem 5rem;
        }

        @keyframes ps-morph {
          0%,100%{border-radius:62% 38% 70% 30%/45% 55% 45% 55%}
          25%    {border-radius:40% 60% 45% 55%/60% 40% 60% 40%}
          50%    {border-radius:55% 45% 35% 65%/40% 60% 50% 50%}
          75%    {border-radius:70% 30% 60% 40%/55% 45% 65% 35%}
        }
        @keyframes ps-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(40px) scale(1.05); }
        }
        .ps-blob { animation: ps-morph 12s ease-in-out infinite, ps-float 8s ease-in-out infinite; position: absolute; pointer-events: none; z-index: 0; }

        .ps-dotgrid { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.3; pointer-events: none; z-index: 0; }

        @keyframes ps-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .ps-up { animation: ps-up 0.8s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}

        @keyframes ps-in { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:none} }
        .ps-card-wrap { animation: ps-in 0.65s cubic-bezier(.22,1,.36,1) both; }

        .ps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        @media (max-width: 980px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .ps-grid { grid-template-columns: repeat(1, 1fr); }
        }

        .ps-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7));
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(14,165,233,0.12), 0 2px 8px rgba(0,0,0,0.04);
          border: 1.5px solid rgba(14,165,233,0.15);
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ps-card:hover {
          transform: translateY(-8px);
          border-color: rgba(14,165,233,0.3);
          box-shadow: 0 12px 48px rgba(14,165,233,0.2), 0 4px 12px rgba(0,0,0,0.05);
        }

        .ps-img-area {
          position: relative;
          flex-shrink: 0;
        }

        @keyframes ps-float { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(0.5deg)} }
        .ps-float { animation: ps-float 5s ease-in-out infinite; }

        @keyframes ps-wobble { 0%,100%{transform:rotate(-5deg) scale(1)} 50%{transform:rotate(-3deg) scale(1.06)} }
        .ps-new {
          position: absolute; top: 0.75rem; right: 0.75rem; z-index: 4;
          border-radius: 999px; color: white;
          font-family: 'Nunito', sans-serif;
          font-size: 0.5rem; font-weight: 900; letter-spacing: 0.15em;
          padding: 0.22rem 0.6rem;
          animation: ps-wobble 3s ease-in-out infinite;
          display: flex; align-items: center; gap: 0.25rem;
        }

        .ps-chip {
          position: absolute; top: 0.75rem; left: 0.75rem; z-index: 4;
          border-radius: 999px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.22rem 0.65rem;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(8px);
        }

        .ps-card-body {
          padding: 0.875rem 1rem 1rem;
          border-top: 1.5px dashed rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0.4rem;
        }
        .ps-card-info { cursor: pointer; }

        .ps-price {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.15rem; font-weight: 800; line-height: 1;
          color: #0EA5E9;
        }

        .ps-shop-row {
          margin-top: auto;
          padding-top: 0.75rem;
          display: flex;
          gap: 0.4rem;
        }
        .ps-shop-btn {
          flex: 1;
          height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.54rem; font-weight: 800; letter-spacing: 0.03em;
          text-decoration: none; cursor: pointer;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .ps-shop-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .ps-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: 'Nunito', sans-serif; font-weight: 800;
          font-size: 0.85rem; letter-spacing: 0.06em;
          padding: 0.875rem 2rem; border-radius: 999px;
          border: none; cursor: pointer; color: white;
          background: linear-gradient(135deg, #0EA5E9, #06B6D4);
          box-shadow: 0 12px 32px rgba(14,165,233,0.4);
          transition: all 0.3s ease; text-decoration: none;
        }
        .ps-cta:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.5); }

        .ps-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,16,10,0.55); backdrop-filter: blur(18px);
          display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        @keyframes ps-modal-in { from{opacity:0;transform:scale(0.93) translateY(24px)} to{opacity:1;transform:none} }
        .ps-modal {
          background: white; border-radius: 32px;
          width: 100%; max-width: 700px; max-height: 90vh;
          overflow-y: auto; position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.22);
          animation: ps-modal-in 0.4s cubic-bezier(.22,1,.36,1) both;
          display: grid; grid-template-columns: 1fr 1fr;
        }
        .ps-modal-close {
          position: absolute; top: 1rem; right: 1rem; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(0,0,0,0.07); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7C6F60;
          transition: background 0.2s ease;
        }
        .ps-modal-close:hover { background: rgba(0,0,0,0.14); color: #2E2419; }
        .ps-modal-shop-btn {
          width: 100%; height: 48px;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          border: none; border-radius: 999px; cursor: pointer; color: white;
          font-family: 'Nunito', sans-serif; font-weight: 800;
          font-size: 0.8rem; letter-spacing: 0.06em;
          text-decoration: none;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .ps-modal-shop-btn:hover { transform: translateY(-2px); opacity: 0.92; }

        @media(max-width:600px) {
          .ps-modal { grid-template-columns: 1fr; }
          .ps-modal-img { border-radius: 32px 32px 0 0 !important; min-height: 220px !important; }
        }
      `}</style>

      <section className="ps-root ps-section">
        {/* Blobs */}
        <div
          className="ps-blob"
          style={{
            top: "-10%",
            right: "-5%",
            width: "380px",
            height: "380px",
            background:
              "linear-gradient(135deg,rgba(14,165,233,0.12) 0%,rgba(34,211,238,0.08) 100%)",
          }}
        />
        <div
          className="ps-blob"
          style={{
            bottom: "-12%",
            left: "-4%",
            width: "280px",
            height: "280px",
            background:
              "linear-gradient(135deg,rgba(6,182,212,0.11) 0%,rgba(165,243,252,0.07) 100%)",
            animationDelay: "-5s",
          }}
        />
        <div
          className="ps-blob"
          style={{
            top: "20%",
            left: "5%",
            width: "140px",
            height: "140px",
            background: "rgba(14,165,233,0.07)",
            animationDelay: "-8s",
          }}
        />

        {/* Dot grid */}
        <svg className="ps-dotgrid">
          <defs>
            <pattern
              id="ps-dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.08)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ps-dots)" />
        </svg>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              className="ps-up d1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(14,165,233,0.1)",
                border: "1.5px solid rgba(14,165,233,0.25)",
                borderRadius: "999px",
                padding: "0.35rem 0.9rem",
                fontSize: "0.62rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0EA5E9",
                marginBottom: "1rem",
              }}
            >
              ✨ Featured Collection
            </div>
            <h2
              className="ps-up d2 ps-disp"
              style={{
                fontSize: "clamp(2.5rem,6vw,4.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#0C1C2E",
                margin: "0 0 0.75rem",
              }}
            >
              Our Collection
            </h2>
            <p
              className="ps-up d3"
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#6B7280",
                maxWidth: "44ch",
                margin: "0 auto",
                fontWeight: 400,
              }}
            >
              From everyday carry to outdoor adventures — find the perfect Hilee
              for your lifestyle.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="ps-grid">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "340px",
                    borderRadius: "20px",
                    background: "linear-gradient(135deg,#E0F2FE,#BAE6FD)",
                    animation: "ps-in 1.2s ease-in-out infinite alternate",
                  }}
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                background: "white",
                borderRadius: "24px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <p
                style={{
                  color: "#0EA5E9",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                Failed to load products
              </p>
              <p style={{ color: "#ACA193", fontSize: "0.85rem" }}>{error}</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <div className="ps-grid">
              {products.length > 0 ? (
                products.map((product, i) => (
                  <div
                    key={product.id}
                    className="ps-card-wrap ps-card"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Image area */}
                    <div
                      className="ps-img-area"
                      style={{
                        paddingTop: "85%",
                        background: bg,
                        cursor: "pointer",
                      }}
                      onClick={() => setSelected(product)}
                    >
                      <div
                        className="ps-float"
                        style={{
                          position: "absolute",
                          inset: "8%",
                          zIndex: 2,
                        }}
                      >
                        <Image
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                          style={{
                            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.14))",
                          }}
                        />
                      </div>

                      <div
                        className="ps-chip"
                        style={{
                          borderColor: `#0EA5E933`,
                          color: "#0EA5E9",
                          border: `1.5px solid #0EA5E933`,
                        }}
                      >
                        Hilee
                      </div>

                      <div
                        className="ps-new"
                        style={{
                          background: "#0EA5E9",
                          boxShadow: `0 4px 12px #0EA5E955`,
                        }}
                      >
                        <Sparkles size={8} strokeWidth={2.5} />
                        NEW
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="ps-card-body">
                      <div
                        className="ps-card-info"
                        onClick={() => setSelected(product)}
                      >
                        <div
                          style={{
                            fontSize: "0.55rem",
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#0EA5E9",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {product.category}
                        </div>

                        <h3
                          className="ps-disp"
                          style={{
                            fontSize: "clamp(0.8rem,1.4vw,0.95rem)",
                            fontWeight: 700,
                            color: "#0C1C2E",
                            lineHeight: 1.25,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginBottom: "0.3rem",
                          }}
                        >
                          {product.name}
                        </h3>

                        {/* <div className="ps-price" style={{ color: accent }}>
                          ₱
                          {Number(product.price).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </div> */}
                      </div>

                      {/* TikTok shop link */}
                      <div className="ps-shop-row">
                        <a
                          href={product.tiktok_url ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ps-shop-btn"
                          style={{
                            background: "#87CEEB",
                            color: "#FFFFFF",
                            pointerEvents: product.tiktok_url ? "auto" : "none",
                            opacity: product.tiktok_url ? 1 : 0.4,
                          }}
                        >
                          Shop now
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "#ACA193",
                    gridColumn: "1/-1",
                    padding: "3rem 0",
                  }}
                >
                  No products available at the moment.
                </p>
              )}
            </div>
          )}

          {/* View all CTA */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/products" className="ps-cta">
              View All Products
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="ps-modal-overlay" onClick={() => setSelected(null)}>
          <div className="ps-modal" onClick={(e) => e.stopPropagation()}>
            {/* Image panel */}
            <div
              className="ps-modal-img"
              style={{
                background: bg,
                borderRadius: "32px 0 0 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5rem",
                position: "relative",
                minHeight: "320px",
                overflow: "hidden",
              }}
            >
              <button
                className="ps-modal-close"
                onClick={() => setSelected(null)}
              >
                <X size={14} strokeWidth={2.5} />
              </button>

              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  zIndex: 5,
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(8px)",
                  border: `1.5px solid ${accent}33`,
                  borderRadius: "999px",
                  color: accent,
                  fontSize: "0.55rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "0.22rem 0.65rem",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                Hilee
              </div>

              <div
                className="ps-float"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "260px",
                  zIndex: 2,
                }}
              >
                <Image
                  src={getImageUrl(selected.image)}
                  alt={selected.name}
                  fill
                  className="object-contain"
                  sizes="340px"
                  style={{
                    filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.16))",
                  }}
                />
              </div>
            </div>

            {/* Info panel */}
            <div
              style={{
                padding: "2.5rem 2rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                Premium Drinkware
              </div>

              <h2
                className="ps-disp"
                style={{
                  fontSize: "clamp(1.3rem,3vw,1.9rem)",
                  fontWeight: 800,
                  color: "#2E2419",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {selected.name}
              </h2>

              {/* <div
                className="ps-disp"
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: accent,
                  lineHeight: 1,
                }}
              >
                ₱
                {Number(selected.price).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </div> */}

              <div
                style={{
                  height: "1.5px",
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "999px",
                }}
              />

              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                  color: "#7C6F60",
                  fontWeight: 400,
                  margin: 0,
                  flex: 1,
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                {selected.description}
              </p>

              {/* TikTok shop link */}
              <a
                href={selected.tiktok_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="ps-modal-shop-btn"
                style={{
                  background: "#000000",
                  color: "#FFFFFF",
                  pointerEvents: selected.tiktok_url ? "auto" : "none",
                  opacity: selected.tiktok_url ? 1 : 0.4,
                }}
              >
                Shop now
                <ExternalLink size={14} strokeWidth={2.5} />
              </a>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.62rem",
                  color: "#C9C0B3",
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                You'll be taken to TikTok to complete your purchase
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
