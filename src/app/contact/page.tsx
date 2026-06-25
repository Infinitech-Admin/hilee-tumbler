"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, phone: numbersOnly }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone && formData.phone.length !== 11) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 11 digits.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message Sent!",
          description:
            data.message ||
            "Thank you for contacting us. We'll respond within 24 hours.",
          action: <CheckCircle className="h-5 w-5 text-green-500" />,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send message.",
          variant: "destructive",
          action: <AlertCircle className="h-5 w-5 text-red-500" />,
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Unable to send message. Please try again.",
        variant: "destructive",
        action: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FAF7F2" }}
      ></div>
    );
  }

  const infoCards = [
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Showroom / Pickup",
      value: "Pasig City, Philippines",
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Call Us",
      value: "0912 345 6789",
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email",
      value: "support@yourbrand.com",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Hours",
      value: "Mon–Sat · 9AM–6PM",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@300;400;600;700;800&display=swap');

        .cp { font-family: 'Nunito', sans-serif; background: #FAF7F2; color: #1A1A1A; min-height: 100vh; }
        .cp * { box-sizing: border-box; }
        .cp-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Ticker — identical to products page */
        @keyframes cp-tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .cp-ticker      { background: #FFF3E0; border-bottom: 2px solid rgba(0,0,0,0.05); height: 40px; overflow: hidden; display: flex; align-items: center; }
        .cp-tick-track  { display: flex; width: max-content; animation: cp-tick 28s linear infinite; }
        .cp-tick-item   { display: flex; align-items: center; gap: 1.25rem; padding: 0 1.75rem; white-space: nowrap; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; color: #1A1A1A; }
        .cp-tick-dot    { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        /* Entry animation */
        @keyframes cp-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        .cp-u { animation: cp-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1 { animation-delay: .06s } .d2 { animation-delay: .18s }
        .d3 { animation-delay: .3s  } .d4 { animation-delay: .44s }
        .d5 { animation-delay: .56s }

        /* Float badges */
        @keyframes cp-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .cp-badge { display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; animation: cp-float 4s ease-in-out infinite; }

        /* Hero */
        .cp-hero { position: relative; overflow: hidden; background: #FAF7F2; padding: 4rem 2rem 3rem; text-align: center; border-bottom: 1.5px solid rgba(0,0,0,0.06); }

        /* Info cards */
        .cp-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cp-info-card {
          background: white; border-radius: 20px; padding: 1.5rem 1rem;
          text-align: center; border: 1.5px solid rgba(0,0,0,0.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cp-info-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.09); }
        .cp-info-icon { color: #FF6B35; margin: 0 auto 0.75rem; display: flex; justify-content: center; }
        .cp-info-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.82rem; color: #1A1A1A; margin-bottom: 0.3rem; }
        .cp-info-value { font-size: 0.78rem; color: #888; font-weight: 600; }

        /* Business card */
        .cp-biz-card {
          background: white; border-radius: 20px; padding: 1.5rem;
          border: 1.5px solid rgba(0,0,0,0.06); box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .cp-biz-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.05rem; color: #1A1A1A; margin-bottom: 0.75rem; }
        .cp-biz-item { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.82rem; color: #666; font-weight: 500; margin-bottom: 0.5rem; line-height: 1.5; }
        .cp-biz-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B35; flex-shrink: 0; margin-top: 0.45rem; }

        /* Form card */
        .cp-form-card {
          background: white; border-radius: 20px; padding: 1.75rem;
          border: 1.5px solid rgba(0,0,0,0.06); box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .cp-form-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.25rem; color: #1A1A1A; margin-bottom: 1.25rem; }
        .cp-label { font-size: 0.78rem; font-weight: 700; color: #555; margin-bottom: 0.35rem; display: block; }

        /* Override shadcn inputs to match products page style */
        .cp-form-card input,
        .cp-form-card textarea {
          font-family: 'Nunito', sans-serif !important;
          background: #FAF7F2 !important;
          border: 1.5px solid rgba(0,0,0,0.1) !important;
          color: #1A1A1A !important;
          border-radius: 10px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }
        .cp-form-card input::placeholder,
        .cp-form-card textarea::placeholder { color: #bbb !important; }
        .cp-form-card input:focus,
        .cp-form-card textarea:focus {
          border-color: #FF6B35 !important;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.1) !important;
          outline: none !important;
        }

        /* Select trigger override */
        .cp-select-trigger {
          font-family: 'Nunito', sans-serif !important;
          background: #FAF7F2 !important;
          border: 1.5px solid rgba(0,0,0,0.1) !important;
          color: #1A1A1A !important;
          border-radius: 10px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          width: 100% !important;
        }
        .cp-select-trigger:focus { border-color: #FF6B35 !important; box-shadow: 0 0 0 3px rgba(255,107,53,0.1) !important; }

        /* Submit button */
        .cp-submit {
          width: 100%; padding: 0.8rem; border-radius: 999px; border: none;
          background: #FF6B35; color: white;
          font-family: 'Nunito', sans-serif; font-size: 0.9rem; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: filter 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .cp-submit:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
        .cp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Trust strip */
        .cp-trust { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 1.75rem 2rem; border-top: 1.5px dashed rgba(0,0,0,0.08); margin-top: 0.5rem; }
        .cp-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #bbb; }

        /* Layout */
        .cp-body { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .cp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .cp-left { display: flex; flex-direction: column; gap: 1.25rem; }
        @media (max-width: 860px) { .cp-grid { grid-template-columns: 1fr; } }
        @media (max-width: 500px) { .cp-info-grid { grid-template-columns: 1fr 1fr; } .cp-body { padding: 2rem 1rem 4rem; } }
      `}</style>

      <div className="cp">
        {/* Ticker */}
        <div className="cp-ticker">
          <div className="cp-tick-track">
            {[
              "GET IN TOUCH",
              "WE'D LOVE TO HELP",
              "CUSTOM ORDERS",
              "BULK REQUESTS",
              "NATIONWIDE SHIPPING",
              "FAST RESPONSE",
              "GET IN TOUCH",
              "WE'D LOVE TO HELP",
              "CUSTOM ORDERS",
              "BULK REQUESTS",
              "NATIONWIDE SHIPPING",
              "FAST RESPONSE",
            ].map((t, i) => (
              <div key={i} className="cp-tick-item">
                <span
                  className="cp-tick-dot"
                  style={{
                    background: [
                      "#FF6B35",
                      "#4ECDC4",
                      "#A8E6CF",
                      "#FFD93D",
                      "#C77DFF",
                      "#FF6B6B",
                    ][i % 6],
                  }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Hero */}
        <div className="cp-hero">
          <div
            className="cp-u d1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            <span
              className="cp-badge"
              style={{
                background: "rgba(255,107,53,0.1)",
                border: "1.5px solid rgba(255,107,53,0.25)",
                color: "#FF6B35",
                animationDelay: "0s",
              }}
            >
              💬 Get in Touch
            </span>
            <span
              className="cp-badge"
              style={{
                background: "#FFF3CD",
                border: "1.5px solid rgba(184,134,11,0.2)",
                color: "#B8860B",
                animationDelay: "0.7s",
              }}
            >
              ⚡ Fast Response
            </span>
            <span
              className="cp-badge"
              style={{
                background: "rgba(78,205,196,0.12)",
                border: "1.5px solid rgba(78,205,196,0.3)",
                color: "#2AAA9E",
                animationDelay: "1.3s",
              }}
            >
              📦 Custom Orders
            </span>
          </div>

          <div className="cp-u d2" style={{ marginBottom: "0.75rem" }}>
            <h1
              className="cp-h"
              style={{
                fontSize: "clamp(3.2rem,8vw,6.5rem)",
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#1A1A1A",
              }}
            >
              Contact Us
            </h1>
          </div>

          <p
            className="cp-u d3"
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#888",
              maxWidth: "42ch",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
            Questions about tumblers, customization, or orders?
            <br />
            We&apos;d love to help.
          </p>
        </div>

        {/* Body */}
        <div className="cp-body">
          <div className="cp-grid">
            {/* Left col */}
            <div className="cp-left cp-u d4">
              <div className="cp-info-grid">
                {infoCards.map((c) => (
                  <div key={c.title} className="cp-info-card">
                    <div className="cp-info-icon">{c.icon}</div>
                    <div className="cp-info-title">{c.title}</div>
                    <div className="cp-info-value">{c.value}</div>
                  </div>
                ))}
              </div>

              <div className="cp-biz-card">
                <div className="cp-biz-title">
                  Custom Orders & Bulk Requests
                </div>
                {[
                  "Create personalized tumblers for gifts, teams, or branding.",
                  "Bulk & corporate orders available for giveaways and events.",
                  "Nationwide shipping and pickup options supported.",
                ].map((t) => (
                  <div key={t} className="cp-biz-item">
                    <span className="cp-biz-dot" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — Form */}
            <div className="cp-form-card cp-u d5">
              <div className="cp-form-title">Send Us a Message</div>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label className="cp-label">
                    Name <span style={{ color: "#FF6B35" }}>*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="cp-label">
                    Email <span style={{ color: "#FF6B35" }}>*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="cp-label">
                    Phone{" "}
                    <span style={{ color: "#bbb", fontWeight: 500 }}>
                      (optional)
                    </span>
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    maxLength={11}
                    placeholder="09XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="cp-label">Subject</label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) => handleInputChange("subject", v)}
                  >
                    <SelectTrigger className="cp-select-trigger">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orders">Orders & Shipping</SelectItem>
                      <SelectItem value="custom">
                        Customization Request
                      </SelectItem>
                      <SelectItem value="bulk">
                        Bulk / Corporate Order
                      </SelectItem>
                      <SelectItem value="product">Product Questions</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="cp-label">
                    Message <span style={{ color: "#FF6B35" }}>*</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    required
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="cp-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Trust strip */}
          <div className="cp-trust">
            {[
              { e: "🚚", t: "Free Shipping" },
              { e: "↩️", t: "30-Day Returns" },
              { e: "🏆", t: "Lifetime Warranty" },
              { e: "✅", t: "100% BPA Free" },
              { e: "🧊", t: "24H Ice Cold" },
            ].map((x) => (
              <span key={x.t} className="cp-trust-item">
                <span>{x.e}</span> {x.t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
