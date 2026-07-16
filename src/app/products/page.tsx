"use client";

import { useState, useEffect, useMemo } from "react";
import type { MenuItem } from "@/types";
import MenuItemCard, { getCategoryStyle } from "@/components/ui/menu-item-card";

type Category = {
  name: string;
  color: string;
};

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Self-contained inline SVG placeholder — never 404s because it's not a network request.
const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="12" fill="#EAF7FB"/>
      <path d="M30 65 L45 45 L58 58 L68 42 L75 65 Z" fill="#B7E6F5"/>
      <circle cx="38" cy="35" r="7" fill="#B7E6F5"/>
    </svg>
  `);

const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return FALLBACK_IMG;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath;
  const fullPath = imagePath.startsWith("images/products/")
    ? imagePath
    : `images/products/${imagePath}`;
  return `${BASE}/${fullPath}`;
};

function normalizeCategory(category?: string | null): string {
  return category?.trim().toLowerCase() || "";
}

const CATEGORY_GROUPS: { cats: Category[] }[] = [
  {
    cats: [{ name: "Home Supplies", color: "#22c55e" }],
  },
  {
    cats: [{ name: "Tea & Coffeeware", color: "#92400e" }],
  },
  {
    cats: [{ name: "Bakeware", color: "#f59e0b" }],
  },
  {
    cats: [{ name: "Cookware", color: "#ef4444" }],
  },
  {
    cats: [{ name: "Cutlery & Tableware", color: "#3b82f6" }],
  },
  {
    cats: [{ name: "Drinkware", color: "#06b6d4" }],
  },
];

export default function MenuPage() {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Which category the user tapped into on the mobile "shop categories" screen.
  // null = show the category list (like the TikTok Shop screenshot).
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/products?paginate=false");
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch products");
        const transformed: MenuItem[] = data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price:
            typeof product.price === "string"
              ? parseFloat(product.price)
              : product.price,
          quantity: product.quantity,
          image: getImageUrl(product.image),
          category: product.category ?? null,
          tiktok_url: product.tiktok_url ?? null,
        }));
        setProducts(transformed);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products",
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const allGroupCats = useMemo(
    () => CATEGORY_GROUPS.flatMap((g) => g.cats),
    [],
  );

  const toggleFilter = (cat: string) => {
    const normalized = normalizeCategory(cat);

    setActiveFilters((prev) =>
      prev.includes(normalized)
        ? prev.filter((c) => c !== normalized)
        : [...prev, normalized],
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const knownCats = CATEGORY_GROUPS.flatMap((g) => g.cats.map((c) => c.name));

  // First product image found for a category — used as the row thumbnail
  // on the mobile category list, same idea as the screenshot.
  // Falls back to an inline SVG (never 404s) if no product/image is found.
  const getCategoryThumb = (catName: string) => {
    const norm = normalizeCategory(catName);
    const found = products.find((p) => normalizeCategory(p.category) === norm);
    return found?.image || FALLBACK_IMG;
  };

  const openMobileCategory = (catName: string) => {
    setMobileCategory(catName);
    setActiveFilters([normalizeCategory(catName)]);
  };

  const closeMobileCategory = () => {
    setMobileCategory(null);
    setActiveFilters([]);
  };

  const filtered = products.filter((p) => {
    const cat = normalizeCategory(p.category);

    const matchCat =
      activeFilters.length === 0 ||
      activeFilters.includes(cat) ||
      (activeFilters.includes("other") && !knownCats.includes(cat));

    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <>
        <style>{`
          .mp-sk-wrap { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); min-height: 100vh; }
          @keyframes mp-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          .mp-sk {
            background: linear-gradient(90deg, rgba(6,174,213,0.09) 25%, rgba(6,174,213,0.18) 37%, rgba(6,174,213,0.09) 63%);
            background-size: 800px 100%;
            animation: mp-shimmer 1.4s ease-in-out infinite;
            border-radius: 10px;
          }
          .mp-sk-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; }
          .mp-sk-hero { padding: 4rem 2rem 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
          .mp-sk-badges { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
          .mp-sk-badge { width: 130px; height: 26px; border-radius: 999px; }
          .mp-sk-title { width: min(70%, 320px); height: 60px; border-radius: 16px; margin-top: 0.25rem; }
          .mp-sk-sub { width: min(70%, 340px); height: 16px; }
          .mp-sk-search { width: 300px; max-width: 80vw; height: 44px; border-radius: 999px; margin-top: 0.5rem; }
          .mp-sk-area { padding: 0 2rem 5rem; }
          .mp-sk-layout { display: flex; gap: 2rem; align-items: flex-start; max-width: 1400px; margin: 0 auto; }
          .mp-sk-sidebar { width: 230px; flex-shrink: 0; background: white; border-radius: 20px; padding: 1.25rem 0.9rem; display: flex; flex-direction: column; gap: 0.6rem; }
          .mp-sk-sidebar-title { width: 60%; height: 14px; margin-bottom: 0.5rem; }
          .mp-sk-cb { height: 30px; border-radius: 10px; }
          .mp-sk-main { flex: 1; min-width: 0; }
          .mp-sk-strip { height: 1.5px; background: #CDEEF9; margin: 1.75rem 0; }
          .mp-sk-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
          .mp-sk-card { border-radius: 20px; overflow: hidden; border: 1.5px solid #CDEEF9; background: white; }
          .mp-sk-card-img { height: 180px; border-radius: 0; }
          .mp-sk-card-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
          .mp-sk-line { height: 12px; }
          @media (max-width: 1100px) { .mp-sk-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 900px) {
            .mp-sk-sidebar { display: none; }
            .mp-sk-layout { display: block; }
          }
          @media (max-width: 700px) { .mp-sk-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; } }
        `}</style>
        <div className="mp-sk-wrap">
          <div className="mp-sk-hero-band">
            <div className="mp-sk-hero">
              <div className="mp-sk-badges">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="mp-sk mp-sk-badge" />
                ))}
              </div>
              <div className="mp-sk mp-sk-title" />
              <div className="mp-sk mp-sk-sub" />
              <div className="mp-sk mp-sk-search" />
            </div>
          </div>
          <div className="mp-sk-area">
            <div className="mp-sk-layout">
              <aside className="mp-sk-sidebar">
                <div className="mp-sk mp-sk-sidebar-title" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="mp-sk mp-sk-cb" />
                ))}
              </aside>
              <div className="mp-sk-main">
                <div className="mp-sk-strip" />
                <div className="mp-sk-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="mp-sk-card">
                      <div className="mp-sk mp-sk-card-img" />
                      <div className="mp-sk-card-body">
                        <div
                          className="mp-sk mp-sk-line"
                          style={{ width: "60%" }}
                        />
                        <div
                          className="mp-sk mp-sk-line"
                          style={{ width: "85%", height: 14 }}
                        />
                        <div
                          className="mp-sk mp-sk-line"
                          style={{ width: "40%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "white",
            padding: "2rem 3rem",
            borderRadius: "24px",
            border: "1.5px solid #CDEEF9",
            boxShadow: "0 4px 30px rgba(6,174,213,0.1)",
          }}
        >
          <p
            style={{
              color: "#DC2626",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Failed to load products
          </p>
          <p style={{ color: "#8FBFCE", fontSize: "0.85rem" }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@300;400;600;700;800&display=swap');

        .mp { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); color: #073B4C; min-height: 100vh; }
        .mp * { box-sizing: border-box; }
        .mp-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Float badges */
        @keyframes mp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .mp-badge { display:inline-flex; align-items:center; gap:0.4rem; border-radius:999px; padding:0.35rem 0.9rem; font-size:0.62rem; font-weight:800; letter-spacing:0.15em; text-transform:uppercase; animation:mp-float 4s ease-in-out infinite; background: rgba(255,255,255,0.6); border: 1.5px solid rgba(3,105,161,0.3); color: #0369A1; }

        /* Entry */
        @keyframes mp-up { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        .mp-u { animation:mp-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.06s}.d2{animation-delay:.18s}.d3{animation-delay:.3s}.d4{animation-delay:.44s}.d5{animation-delay:.56s}

        /* Hero — distinct blue band, matching the rest of the site */
        .mp-hero {
          position:relative; overflow:hidden;
          background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%);
          padding:4rem 2rem 3rem; text-align:center;
          border-bottom: 1.5px solid #B7E6F5;
        }

        /* Search */
        .mp-search-wrap { position:relative; display:inline-flex; align-items:center; }
        .mp-search {
          font-family:'Nunito',sans-serif; font-size:0.85rem; font-weight:600;
          background:white; border:2px solid #CDEEF9; color:#073B4C;
          padding:0.7rem 1.1rem 0.7rem 2.6rem; border-radius:999px; outline:none; width:300px;
          box-shadow:0 2px 16px rgba(6,174,213,0.1); transition:border-color .3s,box-shadow .3s;
        }
        .mp-search::placeholder { color:#8FBFCE; }
        .mp-search:focus { border-color:#0EA5E9; box-shadow:0 2px 20px rgba(14,165,233,0.18); }
        .mp-search-ico { position:absolute; left:0.9rem; color:#8FBFCE; pointer-events:none; }

        /* Count */
        .mp-count { display:inline-flex; align-items:center; gap:0.4rem; background:white; border:1.5px solid #CDEEF9; border-radius:999px; padding:0.35rem 0.9rem; box-shadow:0 2px 12px rgba(6,174,213,0.08); font-size:0.65rem; font-weight:700; color:#5B7C8D; }
        .mp-count-n { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:0.9rem; color:#0284C7; }

        /* Grid area */
        .mp-grid-area { background: transparent; padding:0 2rem 5rem; min-height:60vh; }

        /* Layout: sidebar + main */
        .mp-layout { display:flex; gap:2rem; align-items:flex-start; max-width:1400px; margin:0 auto; }
        .mp-main   { flex:1; min-width:0; }

        /* ── Checkbox Sidebar (desktop) ── */
        .mp-sidebar {
          width:230px; flex-shrink:0; position:sticky; top:1.5rem;
          background:white; border-radius:20px; padding:1.25rem 0.9rem;
          box-shadow:0 4px 20px rgba(6,174,213,0.08); border:1.5px solid #CDEEF9;
        }
        .mp-sidebar-title {
          font-family:'Bricolage Grotesque',sans-serif; font-weight:800;
          font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase;
          color:#5B94A6; margin:0 0 0.75rem 0.2rem;
        }
        .mp-sidebar-group { margin-bottom:0.25rem; }
        .mp-cb-item {
          display:flex; align-items:center; gap:0.6rem;
          width:100%; padding:0.5rem 0.5rem; border-radius:10px;
          background:transparent; border:none; cursor:pointer;
          transition:background 0.15s ease; text-align:left;
        }
        .mp-cb-item:hover { background:rgba(6,174,213,0.06); }
        .mp-cb-item.on    { background:rgba(6,174,213,0.05); }
        .mp-cb-box {
          width:17px; height:17px; flex-shrink:0;
          border-radius:5px; border:1.5px solid rgba(6,58,77,0.2);
          background:white; display:flex; align-items:center; justify-content:center;
          transition:background 0.15s, border-color 0.15s;
        }
        .mp-cb-item.on .mp-cb-box { border-color:transparent; }
        .mp-cb-check { display:none; }
        .mp-cb-item.on .mp-cb-check { display:block; }
        .mp-cb-dot   { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .mp-cb-label { flex:1; font-size:0.78rem; font-weight:600; color:#0C4A6E; transition:color 0.15s; }
        .mp-cb-item.on .mp-cb-label { font-weight:700; }
        .mp-cb-count {
          font-size:0.62rem; font-weight:700; color:#8FBFCE;
          background:rgba(6,174,213,0.08); padding:0.1rem 0.45rem; border-radius:999px;
        }
        .mp-cb-item.on .mp-cb-count { background:rgba(255,255,255,0.7); }

        /* Active filter pills */
        .mp-active-pills {
          display:flex; flex-wrap:wrap; gap:0.3rem;
          margin:0.75rem 0 0; padding-top:0.75rem;
          border-top:1.5px dashed #CDEEF9;
        }
        .mp-active-pill {
          display:inline-flex; align-items:center; gap:0.3rem;
          font-size:0.58rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;
          padding:0.22rem 0.6rem 0.22rem 0.5rem; border-radius:999px; color:white;
        }
        .mp-active-pill-x {
          background:rgba(255,255,255,0.3); border:none; border-radius:50%;
          width:13px; height:13px; display:flex; align-items:center; justify-content:center;
          cursor:pointer; font-size:0.55rem; color:white; padding:0; line-height:1;
        }

        /* Clear button */
        .mp-clear-btn {
          width:100%; margin-top:0.85rem;
          padding:0.55rem; border-radius:10px;
          border:1.5px solid #CDEEF9; background:transparent;
          color:#8FBFCE; font-family:'Nunito',sans-serif; font-size:0.72rem; font-weight:700;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.35rem;
          transition:background 0.15s, color 0.15s;
        }
        .mp-clear-btn:hover { background:rgba(14,165,233,0.08); color:#0284C7; border-color:rgba(14,165,233,0.3); }

        @media (max-width:900px) {
          .mp-sidebar { display:none; }
          .mp-layout { display:block; }
        }

        /* ── Mobile category list (TikTok-shop style) ── */
        .mp-mobile-cats {
          display:none;
        }
        @media (max-width:900px) {
          .mp-mobile-cats:not(.hidden) {
            display:block;
            background:white; border-radius:16px; padding:0 1rem;
            box-shadow:0 4px 20px rgba(6,174,213,0.08); border:1.5px solid #CDEEF9;
            margin-bottom:1.25rem;
          }
        }
        .mp-cat-row {
          display:flex; align-items:center; gap:0.9rem;
          width:100%; padding:0.85rem 0.1rem;
          border:none; border-bottom:1px solid #EAF7FB;
          background:none; cursor:pointer; text-align:left;
        }
        .mp-cat-row:last-child { border-bottom:none; }
        .mp-cat-thumb { width:52px; height:52px; border-radius:10px; object-fit:cover; flex-shrink:0; background:#EAF7FB; }
        .mp-cat-name { flex:1; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:0.95rem; color:#073B4C; }
        .mp-cat-count { color:#8FBFCE; font-weight:700; font-size:0.85rem; }
        .mp-cat-chevron { flex-shrink:0; }

        .mp-mobile-back {
          display:none;
        }
        @media (max-width:900px) {
          .mp-mobile-back {
            display:inline-flex; align-items:center; gap:0.4rem;
            font-family:'Nunito',sans-serif; font-weight:800; font-size:0.85rem;
            color:#0369A1; background:none; border:none; padding:0.4rem 0.1rem 0.9rem;
            cursor:pointer;
          }
        }

        .mp-mobile-products { }
        @media (max-width:900px) {
          .mp-mobile-products:not(.show) { display:none; }
        }

        /* Strip */
        .mp-strip { display:flex; align-items:center; gap:1rem; padding:1.5rem 0 1.75rem; }
        .mp-strip-line { flex:1; height:1.5px; background:#CDEEF9; border-radius:999px; }
        .mp-strip-lbl { font-size:0.62rem; font-weight:800; letter-spacing:0.22em; text-transform:uppercase; color:#5B94A6; white-space:nowrap; }

        /* Product grid */
        .mp-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; }
        @media (max-width:1100px) { .mp-grid { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:700px)  { .mp-grid { grid-template-columns:repeat(2,1fr); gap:0.75rem; } }

        /* Empty */
        .mp-empty { text-align:center; padding:6rem 2rem; }

        @media(max-width:600px){ .mp-search{width:85vw} }
      `}</style>

      <div className="mp">
        {/* ── Hero Header ── */}
        <div className="mp-hero">
          <div
            className="mp-u d1"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            <span className="mp-badge" style={{ animationDelay: "0s" }}>
              💧 Premium Drinkware
            </span>
            <span className="mp-badge" style={{ animationDelay: "0.7s" }}>
              ⭐ Top Rated
            </span>
            <span className="mp-badge" style={{ animationDelay: "1.3s" }}>
              🧊 24H Cold
            </span>
          </div>

          <div
            className="mp-u d2"
            style={{ position: "relative", zIndex: 2, marginBottom: "0.75rem" }}
          >
            <h1
              className="mp-h"
              style={{
                fontSize: "clamp(2.4rem,6vw,4.2rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#073B4C",
              }}
            >
              Shop All
            </h1>
          </div>

          <p
            className="mp-u d3"
            style={{
              position: "relative",
              zIndex: 2,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2C6478",
              maxWidth: "42ch",
              margin: "0 auto 2rem",
              fontWeight: 400,
            }}
          >
            Find your perfect tumbler — every color, every size, every vibe.
          </p>

          <div
            className="mp-u d4"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div className="mp-search-wrap">
                <svg
                  className="mp-search-ico"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  className="mp-search"
                  placeholder="Search by name or color…"
                  value={searchQuery}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="mp-count">
                <span className="mp-count-n">{filtered.length}</span>
                <span>found</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid area ── */}
        <div className="mp-grid-area">
          <div className="mp-layout">
            {/* ── Checkbox Sidebar (desktop) ── */}
            <aside className="mp-u d5 mp-sidebar">
              <div className="mp-sidebar-title">Filter by</div>

              {CATEGORY_GROUPS.map((group, groupIndex) => (
                <div key={groupIndex} className="mp-sidebar-group">
                  {group.cats.map((cat) => {
                    const normalizedName = normalizeCategory(cat.name);
                    const isOn = activeFilters.includes(normalizedName);

                    const count = products.filter((p) => {
                      const normalizedCat = normalizeCategory(p.category);
                      const matchSearch = p.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                      if (!matchSearch) return false;
                      if (normalizedName === "other") {
                        return !knownCats.includes(normalizedCat);
                      }
                      return normalizedCat === normalizedName;
                    }).length;

                    return (
                      <button
                        key={cat.name}
                        className={`mp-cb-item ${isOn ? "on" : ""}`}
                        onClick={() => toggleFilter(normalizedName)}
                      >
                        <div
                          className="mp-cb-box"
                          style={isOn ? { background: cat.color } : undefined}
                        >
                          <svg
                            className="mp-cb-check"
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4l2.5 2.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <span
                          className="mp-cb-dot"
                          style={{ background: cat.color }}
                        />

                        <span
                          className="mp-cb-label"
                          style={isOn ? { color: cat.color } : undefined}
                        >
                          {cat.name}
                        </span>

                        <span
                          className="mp-cb-count"
                          style={
                            isOn
                              ? {
                                  background: `${cat.color}18`,
                                  color: cat.color,
                                }
                              : undefined
                          }
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}

              {activeFilters.length > 0 && (
                <div className="mp-active-pills">
                  {activeFilters.map((cat) => {
                    const style = getCategoryStyle(cat);
                    return (
                      <span
                        key={cat}
                        className="mp-active-pill"
                        style={{ background: style.accent }}
                      >
                        {style.label}
                        <button
                          className="mp-active-pill-x"
                          onClick={() => toggleFilter(cat)}
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {activeFilters.length > 0 && (
                <button className="mp-clear-btn" onClick={clearFilters}>
                  ✕ Clear all filters
                </button>
              )}
            </aside>

            <div className="mp-main mt-4">
              {/* ── Mobile category list — tap a row to browse that category ── */}
              <div
                className={`mp-mobile-cats ${mobileCategory ? "hidden" : ""}`}
              >
                {allGroupCats.map((cat) => {
                  const normalizedName = normalizeCategory(cat.name);
                  const count = products.filter((p) => {
                    const normalizedCat = normalizeCategory(p.category);
                    const matchSearch = p.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                    if (!matchSearch) return false;
                    if (normalizedName === "other") {
                      return !knownCats.includes(normalizedCat);
                    }
                    return normalizedCat === normalizedName;
                  }).length;

                  return (
                    <button
                      key={cat.name}
                      className="mp-cat-row"
                      onClick={() => openMobileCategory(cat.name)}
                    >
                      <img
                        src={getCategoryThumb(cat.name)}
                        alt={cat.name}
                        className="mp-cat-thumb"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMG;
                        }}
                      />
                      <span className="mp-cat-name">{cat.name}</span>
                      <span className="mp-cat-count">{count}</span>
                      <svg
                        className="mp-cat-chevron"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8FBFCE"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {mobileCategory && (
                <button
                  className="mp-mobile-back"
                  onClick={closeMobileCategory}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to categories
                </button>
              )}

              <div
                className={`mp-mobile-products ${
                  mobileCategory || searchQuery ? "show" : ""
                }`}
              >
                {/* Section strip */}
                <div className="mp-strip">
                  <div className="mp-strip-line" />
                  <span className="mp-strip-lbl">
                    {activeFilters.length === 0
                      ? "All Products"
                      : activeFilters
                          .map((c) => getCategoryStyle(c).label)
                          .join(", ")}
                    {" · "}
                    {filtered.length} items
                  </span>
                  <div className="mp-strip-line" />
                </div>

                {filtered.length === 0 ? (
                  <div className="mp-empty">
                    <div
                      className="mp-h"
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: 800,
                        color: "rgba(6,58,77,0.08)",
                        marginBottom: "1rem",
                      }}
                    >
                      Nothing here yet
                    </div>
                    <p style={{ color: "#8FBFCE", fontSize: "0.9rem" }}>
                      Try a different filter or search term.
                    </p>
                  </div>
                ) : (
                  <div className="mp-grid">
                    {filtered.map((product, i) => (
                      <MenuItemCard key={product.id} item={product} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
