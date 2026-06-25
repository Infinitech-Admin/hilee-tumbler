"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import type { MenuItem } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  index?: number;
}

const formatPrice = (price: number | string): string => {
  const n =
    typeof price === "number" ? price : Number.parseFloat(String(price));
  return n.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

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

const CATEGORY_STYLES: Record<string, { label: string; accent: string }> = {
  "everyday use": { label: "Everyday Use", accent: "#f97316" },
  travel: { label: "Travel", accent: "#3b82f6" },
  office: { label: "Office", accent: "#2563eb" },
  "for kids": { label: "For Kids", accent: "#f59e0b" },
  couples: { label: "Couples", accent: "#ec4899" },
  "gift sets": { label: "Gift Sets", accent: "#a855f7" },
  adult: { label: "Adult", accent: "#18181b" },
  "gym & sports": { label: "Gym & Sports", accent: "#22c55e" },
  outdoor: { label: "Outdoor", accent: "#166534" },
  coffee: { label: "Coffee", accent: "#78350f" },
  school: { label: "School", accent: "#ef4444" },
};

export const KNOWN_CATEGORY_ORDER = [
  "everyday use",
  "travel",
  "office",
  "for kids",
  "couples",
  "gift sets",
  "adult",
  "gym & sports",
  "outdoor",
  "coffee",
  "school",
] as const;

const FALLBACK_ACCENTS = [
  "#0ABAB5",
  "#F06292",
  "#CA8A04",
  "#6366F1",
  "#0D9488",
  "#DC2626",
  "#9333EA",
];

export function getCategoryStyle(category?: string | null): {
  label: string;
  accent: string;
} {
  if (!category || !category.trim())
    return { label: "Uncategorized", accent: "#D1D5DB" };
  const key = category.trim().toLowerCase();
  if (CATEGORY_STYLES[key]) return CATEGORY_STYLES[key];
  let hash = 0;
  for (let i = 0; i < key.length; i++)
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  const accent = FALLBACK_ACCENTS[hash % FALLBACK_ACCENTS.length];
  const label = category.trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return { label, accent };
}

const TikTokIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const PLATFORMS = [
  {
    key: "tiktok" as const,
    label: "TikTok",
    Icon: TikTokIcon,
    activeBg: "#010101",
    activeFg: "#FFFFFF",
    inactiveBg: "#F3F4F6",
    inactiveFg: "#6B7280",
    inactiveBorder: "#E5E7EB",
  },
];

export default function MenuItemCard({ item, index = 0 }: MenuItemCardProps) {
  const categoryStyle = getCategoryStyle(item.category);

  const links: Record<"tiktok", string> = {
    tiktok: item.tiktok_url || "#",
  };

  const hasUrl = (key: "tiktok") => links[key] !== "#";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        .mc-root { font-family: 'Nunito', sans-serif; }

        @keyframes mc-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mc-wrap {
          animation: mc-in 0.4s ease both;
          height: 100%;
        }

        .mc-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .mc-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .mc-img-area {
          position: relative;
          background: #F9FAFB;
          border-bottom: 1px solid #F3F4F6;
          flex-shrink: 0;
        }

        .mc-cat-chip {
          position: absolute; top: 0.6rem; left: 0.6rem; z-index: 2;
          font-family: 'Nunito', sans-serif;
          font-size: 0.5rem; font-weight: 800;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.2rem 0.55rem; border-radius: 999px;
          color: white;
        }

        .mc-info {
          padding: 0.85rem 0.9rem 0.9rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mc-info-top { flex: 1; }

        .mc-cat-label {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .mc-name {
          font-size: 0.85rem; font-weight: 700;
          color: #111827; line-height: 1.3;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          margin: 0 0 0.4rem;
        }

        .mc-price {
          font-size: 1.05rem; font-weight: 800;
          color: #111827; margin-bottom: 0;
        }

        .mc-buy-label {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #9CA3AF; margin-top: 0.75rem; margin-bottom: 0.4rem;
        }

        .mc-platform-row { display: flex; gap: 0.3rem; }
        .mc-platform-btn {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.2rem;
          padding: 0.55rem 0.2rem;
          border-radius: 10px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 0.04em;
          text-align: center; text-decoration: none;
          border: 1.5px solid transparent;
          transition: opacity 0.15s ease, transform 0.15s ease;
          cursor: pointer;
        }
        .mc-platform-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .mc-platform-btn-name { font-size: 0.62rem; font-weight: 800; line-height: 1; }
        .mc-platform-btn-status { font-size: 0.5rem; font-weight: 600; opacity: 0.7; line-height: 1; }

        @keyframes mc-modal-in {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .mc-modal {
          animation: mc-modal-in 0.3s ease both;
          background: white !important; border: none !important;
          border-radius: 20px !important; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15) !important;
        }

        /* Style shadcn's built-in close button — no custom button needed */
        .mc-modal > button[data-radix-dialog-close],
        .mc-modal > button:has(svg) {
          position: absolute !important;
          top: 0.75rem !important;
          right: 0.75rem !important;
          z-index: 10 !important;
          width: 30px !important;
          height: 30px !important;
          border-radius: 50% !important;
          background: rgba(0,0,0,0.07) !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          color: #6B7280 !important;
          transition: background 0.15s !important;
          opacity: 1 !important;
        }
        .mc-modal > button[data-radix-dialog-close]:hover,
        .mc-modal > button:has(svg):hover {
          background: rgba(0,0,0,0.12) !important;
        }

        .mc-modal-platform-btn {
          width: 100%; padding: 0.9rem 1rem;
          border: none; border-radius: 12px;
          font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.85rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
        }
        .mc-modal-platform-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      <Dialog>
        <div
          className="mc-wrap mc-root"
          style={{ animationDelay: `${index * 0.04}s` }}
        >
          <div className="mc-card">
            {/* ── Card Image ── */}
            <DialogTrigger asChild>
              <div
                className="mc-img-area"
                style={{ paddingTop: "110%", cursor: "pointer" }}
              >
                <div
                  className="mc-cat-chip"
                  style={{ background: categoryStyle.accent }}
                >
                  {categoryStyle.label}
                </div>
                <div style={{ position: "absolute", inset: "0" }}>
                  <Image
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                </div>
              </div>
            </DialogTrigger>

            {/* ── Card Info ── */}
            <div className="mc-info">
              <DialogTrigger asChild>
                <div className="mc-info-top" style={{ cursor: "pointer" }}>
                  <div
                    className="mc-cat-label"
                    style={{ color: categoryStyle.accent }}
                  >
                    {categoryStyle.label}
                  </div>
                  <h3 className="mc-name">{item.name}</h3>
                  <div className="mc-price">₱{formatPrice(item.price)}</div>
                </div>
              </DialogTrigger>

              <div className="mc-buy-label">Buy on</div>
              <div className="mc-platform-row">
                {PLATFORMS.map((p) => {
                  const active = hasUrl(p.key);
                  return (
                    <a
                      key={p.key}
                      href={links[p.key]}
                      target={active ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="mc-platform-btn"
                      style={{
                        background: active ? p.activeBg : p.inactiveBg,
                        color: active ? p.activeFg : p.inactiveFg,
                        borderColor: active ? "transparent" : p.inactiveBorder,
                        pointerEvents: active ? "auto" : "none",
                      }}
                    >
                      <p.Icon size={13} />
                      <span className="mc-platform-btn-name">{p.label}</span>
                      {active ? (
                        <span className="mc-platform-btn-status">
                          Shop now ↗
                        </span>
                      ) : (
                        <span className="mc-platform-btn-status">Soon</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Modal ── */}
        {/* 
          FIX: Removed the custom mc-modal-close button entirely.
          shadcn's DialogContent renders its own close button automatically.
          We style it via .mc-modal > button CSS above.
          The old custom button had e.stopPropagation() which broke closing,
          and it was stacking on top of shadcn's own button causing a duplicate.
        */}
        <DialogContent className="mc-modal p-0 border-0 w-[90vw] max-w-[380px]">
          {/* ── Modal Image ── */}
          <div
            style={{
              position: "relative",
              paddingTop: "90%",
              background: "#F9FAFB",
              borderBottom: "1px solid #F3F4F6",
              flexShrink: 0,
            }}
          >
            <div style={{ position: "absolute", inset: "0" }}>
              <Image
                src={getImageUrl(item.image)}
                alt={item.name}
                fill
                className="object-contain"
                sizes="380px"
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                left: "0.75rem",
                background: categoryStyle.accent,
                color: "white",
                borderRadius: "999px",
                fontSize: "0.5rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.2rem 0.55rem",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {categoryStyle.label}
            </div>
          </div>

          {/* ── Modal Details ── */}
          <div
            style={{
              padding: "1.25rem 1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: categoryStyle.accent,
                  marginBottom: "0.3rem",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {categoryStyle.label}
              </div>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "#111827",
                  margin: "0 0 0.4rem",
                  lineHeight: 1.2,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {item.name}
              </h2>
              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  color: "#6B7280",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {item.description}
              </p>
            </div>

            <div style={{ height: "1px", background: "#F3F4F6" }} />

            <div>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#9CA3AF",
                  marginBottom: "0.2rem",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Price
              </div>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                ₱{formatPrice(item.price)}
              </div>
            </div>

            <div
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9CA3AF",
                marginBottom: "-0.4rem",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Buy on
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {PLATFORMS.map((p) => {
                const active = hasUrl(p.key);
                return (
                  <a
                    key={p.key}
                    href={links[p.key]}
                    target={active ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="mc-modal-platform-btn"
                    style={{
                      background: active ? p.activeBg : p.inactiveBg,
                      color: active ? p.activeFg : p.inactiveFg,
                      border: active
                        ? "none"
                        : `1.5px solid ${p.inactiveBorder}`,
                      pointerEvents: active ? "auto" : "none",
                      opacity: active ? 1 : 0.8,
                    }}
                  >
                    <p.Icon size={16} />
                    {active ? (
                      <>
                        Buy on {p.label}
                        <ExternalLink size={13} strokeWidth={2.5} />
                      </>
                    ) : (
                      `${p.label} — Coming Soon`
                    )}
                  </a>
                );
              })}
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.62rem",
                color: "#D1D5DB",
                margin: 0,
                fontWeight: 600,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              You'll be taken to TikTok Shop to complete your purchase
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
