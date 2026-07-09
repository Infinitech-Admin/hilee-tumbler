"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ShoppingBag, Droplets, ArrowRight, Play } from "lucide-react";

const ACCENT = "#0EA5E9";

interface Reel {
  id: number;
  video: string; // path under /public, e.g. "/reels/reel-1.mp4"
  poster?: string; // optional thumbnail shown before video loads
  title?: string; // optional now — caption strip only shows if present
  caption?: string; // optional now — caption strip only shows if present
  linkUrl?: string | null; // optional TikTok/Instagram link for this reel
}

// ─── Edit this list with your own reels ───
// Drop your .mp4 files in /public/reels/ (or point video at a full URL)
const REELS: Reel[] = [
  { id: 1, video: "/reels/1.mp4" },
  { id: 2, video: "/reels/2.mp4" },
  { id: 3, video: "/reels/3.mp4" },
  { id: 4, video: "/reels/4.mp4" },
  { id: 5, video: "/reels/5.mp4" },
  { id: 6, video: "/reels/6.mp4" },
  { id: 7, video: "/reels/7.mp4" },
  { id: 8, video: "/reels/8.mp4" },
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const featured = REELS[activeIdx] ?? null;

  const goToNextReel = () => {
    setActiveIdx((prev) => (prev + 1) % REELS.length);
  };

  const openModal = () => {
    setModalOpen(true);
    // let the modal video take over playback (autoPlay handles it, this is just a safety kick)
    requestAnimationFrame(() => {
      modalVideoRef.current?.play().catch(() => {});
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

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
          grid-template-areas: "intro right" "cta right";
          align-content: center;
          min-height: 520px;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 5vw;
          column-gap: 0;
          row-gap: 0;
        }

        /* ── Intro (label + headline + sub) ── */
        .hs-intro { grid-area: intro; display: flex; flex-direction: column;
          justify-content: center; padding: 4rem 3rem 0 0; gap: 1.5rem; }

        /* ── CTA group ── */
        .hs-cta-group { grid-area: cta; padding: 1.5rem 3rem 4rem 0; }

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

        /* ── Reel stage ── */
        .hs-stage { flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem 0 3rem 3rem; position: relative; min-width: 0; }

        .hs-img-frame { position: relative; width: 100%; max-width: 280px;
          aspect-ratio: 9 / 16; border-radius: 28px; 
          background: #0C1C2E; overflow: hidden;
          border: 2px solid rgba(14,165,233,0.35);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 0 0 6px rgba(14,165,233,0.12), 0 20px 50px rgba(14,165,233,0.25);
          animation: hs-glow-pulse 3.5s ease-in-out infinite; }
        .hs-img-frame:hover { transform: scale(1.03) translateY(-8px); box-shadow: 0 0 0 8px rgba(14,165,233,0.18), 0 32px 64px rgba(14,165,233,0.35); }

        @keyframes hs-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(14,165,233,0.12), 0 20px 50px rgba(14,165,233,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(14,165,233,0.05), 0 24px 60px rgba(14,165,233,0.35); }
        }

        .hs-reel-video { width: 100%; height: 100%; object-fit: cover; display: block; }

        .hs-new-badge { position: absolute; top: 14px; left: 14px; z-index: 2;
          background: #0EA5E9; color: white; font-size: 0.6rem; font-weight: 900;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 999px; display: inline-flex; align-items: center; gap: 4px; }

        .hs-caption-strip { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
          padding: 14px 14px 12px; background: linear-gradient(to top, rgba(0,0,0,0.75), transparent);
          color: white; text-align: left; }
        .hs-caption-title { font-size: 0.82rem; font-weight: 800; margin: 0 0 2px; }
        .hs-caption-text { font-size: 0.68rem; opacity: 0.85; margin: 0; line-height: 1.4; }

        /* ── Reel selector dots ── */
        .hs-dots { display: flex; gap: 6px; margin-top: 1.25rem; }
        .hs-dot-btn { width: 8px; height: 8px; border-radius: 50%; border: none;
          cursor: pointer; transition: transform 0.15s, background 0.15s; padding: 0; }

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
        .hs-modal-img { width: 42%; flex-shrink: 0; background: #0C1C2E;
          display: flex; align-items: center; justify-content: center;
          padding: 0; box-sizing: border-box; min-height: 300px; }
        .hs-modal-video { width: 100%; height: 100%; object-fit: cover; display: block; }
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
        .hs-modal-desc { font-size: 0.88rem; color: #4B5563; line-height: 1.7; margin: 0; flex: 1; }

        /* ══════ RESPONSIVE ══════ */

        /* Tablet: stack to single column */
        @media (max-width: 860px) {
          .hs-grid {
            grid-template-columns: 1fr;
            grid-template-areas: "intro" "right" "cta";
            padding: 0 1.25rem;
          }
          .hs-intro {
            padding: 2.5rem 0 0;
            align-items: center;
            text-align: center;
          }
          .hs-cta-group {
            padding: 1.5rem 0 1rem;
            display: flex;
            justify-content: center;
          }
          .hs-sub { text-align: center; max-width: 100%; }
          .hs-pills { justify-content: center; }
          .hs-ctas { justify-content: center; }
          .hs-trust { justify-content: center; }

          /* Right: reel + stats side by side on tablet */
          .hs-right {
            flex-direction: row;
            justify-content: center;
            align-items: flex-start;
            gap: 1.25rem;
            padding-bottom: 1rem;
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

        /* Mobile: fully stacked, stats go horizontal below reel */
        @media (max-width: 560px) {
          .hs-grid { padding: 0 1rem; }
          .hs-intro { padding: 2rem 0 0; gap: 1.1rem; }
          .hs-cta-group { padding: 1.25rem 0 0.75rem; }
          .hs-headline { font-size: clamp(2rem, 9vw, 2.6rem); }

          .hs-right {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .hs-stage { padding: 0; width: 100%; }
          .hs-img-frame { max-width: 220px; border-radius: 22px; }

          /* Stats go horizontal row below reel */
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
          .hs-modal-img { width: 100%; min-height: 220px; padding: 0; }
          .hs-modal-body { padding: 1.25rem 1.25rem 1.5rem; }
        }
      `}</style>

      {/* Hero shell */}
      <section className="hs-shell">
        <div className="hs-blob-a" />
        <div className="hs-blob-b" />

        <div className="hs-grid">
          {/* ══ INTRO TEXT ══ */}
          <div className="hs-intro">
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
          </div>

          {/* ══ RIGHT ══ */}
          <div className="hs-right">
            <div className="hs-stage">
              {!featured ? (
                <p
                  style={{
                    color: "#6B7280",
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  No reels yet.
                </p>
              ) : (
                <>
                  <div
                    className="hs-img-frame"
                    onClick={openModal}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openModal()}
                    aria-label={`Play reel ${featured.id}`}
                  >
                    <video
                      key={featured.id}
                      className="hs-reel-video"
                      src={featured.video}
                      poster={featured.poster}
                      autoPlay
                      muted
                      playsInline
                      onEnded={goToNextReel}
                    />
                    <span className="hs-new-badge">
                      <Play size={9} fill="white" /> REEL
                    </span>
                    {(featured.title || featured.caption) && (
                      <div className="hs-caption-strip">
                        {featured.title && (
                          <p className="hs-caption-title">{featured.title}</p>
                        )}
                        {featured.caption && (
                          <p className="hs-caption-text">{featured.caption}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {REELS.length > 1 && (
                    <div className="hs-dots">
                      {REELS.map((_, i) => (
                        <button
                          key={i}
                          className="hs-dot-btn"
                          onClick={() => setActiveIdx(i)}
                          aria-label={`Reel ${i + 1}`}
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
                </>
              )}
            </div>

            {/* Stats sidebar */}
          </div>

          {/* ══ CTA GROUP ══ */}
          <div className="hs-cta-group">
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
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          position: "relative",
          height: "1px",
          background: "rgba(0,0,0,0.08)",
          margin: "0 1.5rem",
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
              <video
                ref={modalVideoRef}
                className="hs-modal-video"
                src={featured.video}
                poster={featured.poster}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            {(featured.title || featured.caption) && (
              <div className="hs-modal-body">
                <span className="hs-modal-cat">Reel</span>
                {featured.title && (
                  <h2 className="hs-modal-name">{featured.title}</h2>
                )}
                {featured.caption && (
                  <p className="hs-modal-desc">{featured.caption}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
