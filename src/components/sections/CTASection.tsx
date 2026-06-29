import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap');
        @keyframes cta-blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        @keyframes cta-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(40px) scale(1.05); }
        }
        .cta-blob { animation: cta-blob 7s infinite, cta-float 8s ease-in-out infinite; }
        .cta-blob-2 { animation-delay: 2s; }
        .cta-blob-3 { animation-delay: 4s; }
        .cta-btn-primary:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 48px rgba(14,165,233,0.5) !important; }
        .cta-btn-outline:hover { transform: translateY(-4px); background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.5) !important; }
      `}</style>

      <section
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0EA5E9 0%, #06B6D4 50%, #0EA5E9 100%)",
        }}
      >
        {/* Blobs */}
        <div
          className="cta-blob absolute top-8 left-8 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "#FFFFFF", filter: "blur(80px)", opacity: 0.12 }}
        />
        <div
          className="cta-blob cta-blob-2 absolute bottom-8 right-8 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#FFFFFF", filter: "blur(80px)", opacity: 0.15 }}
        />
        <div
          className="cta-blob cta-blob-3 absolute top-1/2 left-1/2 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "#FFFFFF", filter: "blur(80px)", opacity: 0.08 }}
        />

        {/* Cyan accent line top */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "#FFFFFF" }}
        />

        <div className="relative container mx-auto px-4 text-center">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              Premium Drinkware
            </span>
          </div>

          {/* Heading */}
          <h2
            className="mb-6 leading-tight"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Stylish &amp; Durable</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>
              Tumblers for Everyday Life
            </span>
          </h2>

          {/* Body */}
          <p
            className="mb-10 mx-auto"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "48ch",
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            Keep your drinks cold for 24 hours or hot for 12 — eco-friendly,
            reusable, and perfect for any lifestyle.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="cta-btn-primary"
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                padding: "0 2rem",
                height: 52,
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)",
                color: "#0EA5E9",
                boxShadow: "0 12px 32px rgba(255,255,255,0.4)",
                letterSpacing: "0.03em",
                transition: "transform 0.3s, box-shadow 0.3s, scale 0.3s",
              }}
            >
              <Link href="/products">Shop Tumblers</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="cta-btn-outline"
              style={{
                fontSize: "0.95rem",
                fontWeight: 800,
                padding: "0 2rem",
                height: 52,
                borderRadius: 12,
                border: "2px solid rgba(255,255,255,0.4)",
                color: "#FFFFFF",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                backdropFilter: "blur(8px)",
                letterSpacing: "0.03em",
                transition:
                  "transform 0.3s, background 0.3s, border-color 0.3s, scale 0.3s",
              }}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Trust strip */}
          <div
            className="mt-8 flex items-center justify-center gap-2 flex-wrap"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>—</span>
            <span>Eco-Friendly</span>
            <span style={{ color: "#FFFFFF" }}>·</span>
            <span>Stylish</span>
            <span style={{ color: "#FFFFFF" }}>·</span>
            <span>Durable</span>
            <span style={{ color: "#FFFFFF" }}>—</span>
          </div>
        </div>

        {/* Cyan accent line bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: "#FFFFFF" }}
        />
      </section>
    </>
  );
}
