"use client";

import { useState, useEffect, useMemo } from "react";
import type { MenuItem } from "@/types";
import MenuItemCard, { getCategoryStyle } from "@/components/ui/menu-item-card";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/placeholder.svg";
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

const CATEGORY_GROUPS: { label: string; cats: string[] }[] = [
  {
    label: "Lifestyle",
    cats: ["everyday use", "travel", "office"],
  },
  {
    label: "For Them",
    cats: ["for kids", "couples", "gift sets", "adult"],
  },
  {
    label: "Activity",
    cats: ["gym & sports", "outdoor", "coffee", "school"],
  },
];

export default function MenuPage() {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    setActiveFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => setActiveFilters([]);

  const filtered = products.filter((p) => {
    const cat = normalizeCategory(p.category);
    const knownCats = CATEGORY_GROUPS.flatMap((g) => g.cats);

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

  const tickerColors = [
    "#0EA5E9",
    "#38BDF8",
    "#67E8F9",
    "#0369A1",
    "#7DD3FC",
    "#0284C7",
  ];

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

        /* ── Checkbox Sidebar ── */
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
        .mp-sidebar-group-label {
          font-size:0.6rem; font-weight:800; letter-spacing:0.18em; text-transform:uppercase;
          color:#5B94A6; padding:0.6rem 0.5rem 0.3rem;
          border-top:1.5px dashed #CDEEF9; margin-top:0.25rem;
        }
        .mp-sidebar-group:first-of-type .mp-sidebar-group-label {
          border-top:none; padding-top:0; margin-top:0;
        }
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

        /* Mobile filter button */
        .mp-filter-fab {
          display:none; align-items:center; gap:0.5rem;
          font-family:'Nunito',sans-serif; font-size:0.78rem; font-weight:800;
          padding:0.65rem 1.25rem; border-radius:999px;
          background:white; border:2px solid #CDEEF9; color:#0C4A6E;
          cursor:pointer; box-shadow:0 2px 12px rgba(6,174,213,0.1);
          transition:all .2s ease; margin-bottom:1rem;
        }
        .mp-filter-fab:hover { box-shadow:0 4px 18px rgba(6,174,213,0.16); }
        .mp-filter-fab-dot { width:8px; height:8px; border-radius:50%; background:#0EA5E9; }
        .mp-filter-fab-badge {
          background:#0EA5E9; color:white; border-radius:999px;
          font-size:0.6rem; font-weight:900; padding:0.1rem 0.45rem; min-width:18px; text-align:center;
        }

        /* Bottom sheet drawer */
        .mp-drawer-overlay {
          display:none; position:fixed; inset:0; z-index:100;
          background:rgba(6,34,46,0.45); backdrop-filter:blur(3px);
        }
        .mp-drawer-overlay.open { display:block; }
        .mp-drawer {
          position:fixed; bottom:0; left:0; right:0; z-index:101;
          background:white; border-radius:24px 24px 0 0;
          padding:0 0 2rem; max-height:85vh; overflow-y:auto;
          transform:translateY(100%); transition:transform 0.35s cubic-bezier(.22,1,.36,1);
          box-shadow:0 -8px 40px rgba(6,58,77,0.18);
        }
        .mp-drawer.open { transform:translateY(0); }
        .mp-drawer-handle {
          width:40px; height:4px; border-radius:999px;
          background:#CDEEF9; margin:12px auto 0;
        }
        .mp-drawer-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:1rem 1.25rem 0.5rem;
          border-bottom:1.5px solid #CDEEF9;
        }
        .mp-drawer-title {
          font-family:'Bricolage Grotesque',sans-serif;
          font-size:1.1rem; font-weight:800; color:#073B4C;
        }
        .mp-drawer-close {
          width:32px; height:32px; border-radius:50%;
          background:rgba(6,174,213,0.08); border:none;
          display:flex; align-items:center; justify-content:center;
          font-size:0.9rem; cursor:pointer; color:#5B7C8D;
          transition:background .2s;
        }
        .mp-drawer-close:hover { background:rgba(6,174,213,0.15); }
        .mp-drawer-body { padding:0.75rem 1.25rem; }
        .mp-drawer-group-label {
          font-size:0.6rem; font-weight:800; letter-spacing:0.18em; text-transform:uppercase;
          color:#5B94A6; padding:0.75rem 0 0.4rem;
          border-top:1.5px dashed #CDEEF9; margin-top:0.25rem;
        }
        .mp-drawer-group-label:first-child { border-top:none; padding-top:0.25rem; }
        .mp-drawer-cb-item {
          display:flex; align-items:center; gap:0.7rem;
          width:100%; padding:0.65rem 0.5rem; border-radius:12px;
          background:transparent; border:none; cursor:pointer;
          transition:background .15s; text-align:left;
        }
        .mp-drawer-cb-item:hover { background:rgba(6,174,213,0.06); }
        .mp-drawer-cb-item.on { background:rgba(6,174,213,0.05); }
        .mp-drawer-cb-box {
          width:20px; height:20px; flex-shrink:0; border-radius:6px;
          border:1.5px solid rgba(6,58,77,0.2); background:white;
          display:flex; align-items:center; justify-content:center;
          transition:background .15s, border-color .15s;
        }
        .mp-drawer-cb-item.on .mp-drawer-cb-box { border-color:transparent; }
        .mp-drawer-cb-check { display:none; }
        .mp-drawer-cb-item.on .mp-drawer-cb-check { display:block; }
        .mp-drawer-cb-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
        .mp-drawer-cb-label { flex:1; font-size:0.85rem; font-weight:600; color:#0C4A6E; }
        .mp-drawer-cb-item.on .mp-drawer-cb-label { font-weight:700; }
        .mp-drawer-cb-count {
          font-size:0.65rem; font-weight:700; color:#8FBFCE;
          background:rgba(6,174,213,0.08); padding:0.15rem 0.5rem; border-radius:999px;
        }
        .mp-drawer-cb-item.on .mp-drawer-cb-count { background:rgba(6,174,213,0.12); }
        .mp-drawer-footer {
          display:flex; gap:0.75rem; padding:1rem 1.25rem 0;
          border-top:1.5px solid #CDEEF9; margin-top:0.5rem;
          position:sticky; bottom:0; background:white;
        }
        .mp-drawer-apply {
          flex:1; padding:0.85rem; border-radius:999px; border:none;
          background:linear-gradient(135deg, #0EA5E9, #0369A1); color:white;
          font-family:'Nunito',sans-serif; font-size:0.85rem; font-weight:800;
          cursor:pointer; transition:filter .2s;
        }
        .mp-drawer-apply:hover { filter:brightness(1.08); }
        .mp-drawer-clear {
          padding:0.85rem 1.25rem; border-radius:999px;
          border:1.5px solid #CDEEF9; background:transparent;
          font-family:'Nunito',sans-serif; font-size:0.85rem; font-weight:700; color:#5B7C8D;
          cursor:pointer; transition:all .2s;
        }
        .mp-drawer-clear:hover { border-color:#0EA5E9; color:#0284C7; }

        @media (max-width:900px) {
          .mp-sidebar { display:none; }
          .mp-filter-fab { display:flex; }
          .mp-layout { display:block; }
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

        /* Trust */
        .mp-trust { display:flex; align-items:center; justify-content:center; gap:2rem; flex-wrap:wrap; padding:1.75rem 2rem; border-top:1.5px dashed #CDEEF9; margin-top:1.5rem; }
        .mp-trust-item { display:flex; align-items:center; gap:0.4rem; font-size:0.72rem; font-weight:700; color:#5B94A6; }

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

              {CATEGORY_GROUPS.map((group) => (
                <div key={group.label} className="mp-sidebar-group">
                  <div className="mp-sidebar-group-label">{group.label}</div>
                  {group.cats.map((cat) => {
                    const style = getCategoryStyle(cat);
                    const count = products.filter(
                      (p) => normalizeCategory(p.category) === cat,
                    ).length;
                    const isOn = activeFilters.includes(cat);
                    return (
                      <button
                        key={cat}
                        className={`mp-cb-item ${isOn ? "on" : ""}`}
                        onClick={() => toggleFilter(cat)}
                      >
                        <div
                          className="mp-cb-box"
                          style={
                            isOn ? { background: style.accent } : undefined
                          }
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
                          style={{ background: style.accent }}
                        />
                        <span
                          className="mp-cb-label"
                          style={isOn ? { color: style.accent } : undefined}
                        >
                          {style.label}
                        </span>
                        <span
                          className="mp-cb-count"
                          style={
                            isOn
                              ? {
                                  background: `${style.accent}18`,
                                  color: style.accent,
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

            <div className="mp-main">
              {/* ── Mobile filter FAB + Drawer ── */}
              <button
                className="mp-filter-fab"
                onClick={() => setDrawerOpen(true)}
              >
                <span className="mp-filter-fab-dot" />
                Filter by category
                {activeFilters.length > 0 && (
                  <span className="mp-filter-fab-badge">
                    {activeFilters.length}
                  </span>
                )}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                className={`mp-drawer-overlay ${drawerOpen ? "open" : ""}`}
                onClick={() => setDrawerOpen(false)}
              />

              <div className={`mp-drawer ${drawerOpen ? "open" : ""}`}>
                <div className="mp-drawer-handle" />
                <div className="mp-drawer-header">
                  <span className="mp-drawer-title">Filter by</span>
                  <button
                    className="mp-drawer-close"
                    onClick={() => setDrawerOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="mp-drawer-body">
                  {CATEGORY_GROUPS.map((group, gi) => (
                    <div key={group.label}>
                      <div
                        className={`mp-drawer-group-label ${gi === 0 ? "first-child" : ""}`}
                      >
                        {group.label}
                      </div>
                      {group.cats.map((cat) => {
                        const style = getCategoryStyle(cat);
                        const count = products.filter(
                          (p) => normalizeCategory(p.category) === cat,
                        ).length;
                        const isOn = activeFilters.includes(cat);
                        return (
                          <button
                            key={cat}
                            className={`mp-drawer-cb-item ${isOn ? "on" : ""}`}
                            onClick={() => toggleFilter(cat)}
                          >
                            <div
                              className="mp-drawer-cb-box"
                              style={
                                isOn ? { background: style.accent } : undefined
                              }
                            >
                              <svg
                                className="mp-drawer-cb-check"
                                width="11"
                                height="9"
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
                              className="mp-drawer-cb-dot"
                              style={{ background: style.accent }}
                            />
                            <span
                              className="mp-drawer-cb-label"
                              style={isOn ? { color: style.accent } : undefined}
                            >
                              {style.label}
                            </span>
                            <span
                              className="mp-drawer-cb-count"
                              style={
                                isOn
                                  ? {
                                      background: `${style.accent}18`,
                                      color: style.accent,
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
                </div>
                <div className="mp-drawer-footer">
                  <button className="mp-drawer-clear" onClick={clearFilters}>
                    Clear all
                  </button>
                  <button
                    className="mp-drawer-apply"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Show {filtered.length} results
                  </button>
                </div>
              </div>

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

              <div className="mp-trust">
                {[
                  { e: "🚚", t: "Free Shipping" },
                  { e: "↩️", t: "30-Day Returns" },
                  { e: "🏆", t: "Lifetime Warranty" },
                  { e: "✅", t: "100% BPA Free" },
                  { e: "🧊", t: "24H Ice Cold" },
                ].map((x) => (
                  <span key={x.t} className="mp-trust-item">
                    <span>{x.e}</span> {x.t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
