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
    const timer = setTimeout(() => setLoading(false), 500);
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
      <>
        <style>{`
          .cp-sk-wrap { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); min-height: 100vh; }
          @keyframes cp-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
          .cp-sk {
            background: linear-gradient(90deg, rgba(6,174,213,0.08) 25%, rgba(6,174,213,0.18) 37%, rgba(6,174,213,0.08) 63%);
            background-size: 800px 100%;
            animation: cp-shimmer 1.4s ease-in-out infinite;
            border-radius: 10px;
          }
          .cp-sk-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; }
          .cp-sk-hero { padding: 4rem 2rem 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.1rem; }
          .cp-sk-pill { width: 140px; height: 22px; border-radius: 999px; }
          .cp-sk-title { width: min(85%, 420px); height: 60px; border-radius: 16px; }
          .cp-sk-sub { width: min(70%, 320px); height: 16px; }
          .cp-sk-body { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem 5rem; }
          .cp-sk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
          .cp-sk-left { display: flex; flex-direction: column; gap: 1.25rem; }
          .cp-sk-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .cp-sk-info-card { border-radius: 20px; padding: 1.5rem 1rem; border: 1.5px solid rgba(6,174,213,0.15); background: white; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
          .cp-sk-icon { width: 28px; height: 28px; border-radius: 50%; }
          .cp-sk-biz-card { border-radius: 20px; padding: 1.5rem; border: 1.5px solid #CDEEF9; background: #EAFBFF; display: flex; flex-direction: column; gap: 0.75rem; }
          .cp-sk-form-card { border-radius: 20px; padding: 1.75rem; border: 1.5px solid #CDEEF9; background: white; display: flex; flex-direction: column; gap: 1.1rem; }
          .cp-sk-field { height: 40px; }
          .cp-sk-textarea { height: 90px; }
          .cp-sk-btn { height: 46px; border-radius: 999px; margin-top: 0.25rem; }
          .cp-sk-line { height: 12px; }
          @media (max-width: 860px) { .cp-sk-grid { grid-template-columns: 1fr; } }
          @media (max-width: 500px) { .cp-sk-info-grid { grid-template-columns: 1fr 1fr; } .cp-sk-body { padding: 1rem 1rem 4rem; } }
        `}</style>
        <div className="cp-sk-wrap">
          <div className="cp-sk-hero-band">
            <div className="cp-sk-hero">
              <div className="cp-sk cp-sk-pill" />
              <div className="cp-sk cp-sk-title" />
              <div className="cp-sk cp-sk-sub" />
            </div>
          </div>
          <div className="cp-sk-body">
            <div className="cp-sk-grid">
              <div className="cp-sk-left">
                <div className="cp-sk-info-grid">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="cp-sk-info-card">
                      <div className="cp-sk cp-sk-icon" />
                      <div
                        className="cp-sk cp-sk-line"
                        style={{ width: "70%" }}
                      />
                      <div
                        className="cp-sk cp-sk-line"
                        style={{ width: "55%" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="cp-sk-biz-card">
                  <div
                    className="cp-sk cp-sk-line"
                    style={{ width: "50%", height: 18 }}
                  />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="cp-sk cp-sk-line"
                      style={{ width: `${90 - i * 10}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="cp-sk-form-card">
                <div
                  className="cp-sk cp-sk-line"
                  style={{ width: "45%", height: 20 }}
                />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="cp-sk cp-sk-field" />
                ))}
                <div className="cp-sk cp-sk-textarea" />
                <div className="cp-sk cp-sk-btn" />
              </div>
            </div>
          </div>
        </div>
      </>
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

        .cp { font-family: 'Nunito', sans-serif; background: linear-gradient(160deg, #EAFBFF 0%, #F6FEFF 55%, #FFFFFF 100%); color: #073B4C; min-height: 100vh; }
        .cp * { box-sizing: border-box; }
        .cp-h { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Entry animation */
        @keyframes cp-up { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
        .cp-u { animation: cp-up 0.85s cubic-bezier(.22,1,.36,1) both; }
        .d1 { animation-delay: .06s } .d2 { animation-delay: .18s }
        .d3 { animation-delay: .3s  } .d4 { animation-delay: .44s }
        .d5 { animation-delay: .56s }

        /* Hero — distinct blue band, centered, matching Partnership/Blog pages */
        .cp-hero-band { background: linear-gradient(160deg, #CDEFFB 0%, #A9E1F5 45%, #DFF6FD 100%); border-bottom: 1.5px solid #B7E6F5; width: 100%; }
        .cp-hero { padding: 4rem 2rem 3rem; text-align: center; max-width: 900px; margin: 0 auto; }

        /* Eyebrow pill */
        .cp-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(255,255,255,0.6); border: 1.5px solid rgba(3,105,161,0.3); border-radius: 999px; padding: 0.35rem 0.9rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #0369A1; margin-bottom: 1.5rem; }

        /* Info cards */
        .cp-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cp-info-card {
          background: #FFFFFF; border-radius: 20px; padding: 1.5rem 1rem;
          text-align: center; border: 1.5px solid #CDEEF9;
          box-shadow: 0 8px 24px rgba(6,174,213,0.1);
          transition: all 0.3s ease;
        }
        .cp-info-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(6,174,213,0.2); border-color: #67E8F9; }
        .cp-info-icon  { color: #0EA5E9; margin: 0 auto 0.75rem; display: flex; justify-content: center; }
        .cp-info-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 0.82rem; color: #073B4C; margin-bottom: 0.3rem; }
        .cp-info-value { font-size: 0.78rem; color: #5B7C8D; font-weight: 600; }

        /* Business card */
        .cp-biz-card {
          background: #EAFBFF; border-radius: 20px; padding: 1.5rem;
          border: 1.5px solid #CDEEF9;
        }
        .cp-biz-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.05rem; color: #073B4C; margin-bottom: 0.75rem; }
        .cp-biz-item  { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.82rem; color: #0C4A6E; font-weight: 500; margin-bottom: 0.5rem; line-height: 1.5; }
        .cp-biz-dot   { width: 6px; height: 6px; border-radius: 50%; background: #0EA5E9; flex-shrink: 0; margin-top: 0.45rem; }

        /* Form card */
        .cp-form-card {
          background: white; border-radius: 20px; padding: 1.75rem;
          border: 1.5px solid #CDEEF9; box-shadow: 0 4px 20px rgba(6,58,77,0.06);
        }
        .cp-form-title { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.25rem; color: #073B4C; margin-bottom: 1.25rem; }
        .cp-label { font-size: 0.78rem; font-weight: 700; color: #0C4A6E; margin-bottom: 0.35rem; display: block; }

        /* Inputs */
        .cp-form-card input,
        .cp-form-card textarea {
          font-family: 'Nunito', sans-serif !important;
          background: #F6FEFF !important;
          border: 1.5px solid #CDEEF9 !important;
          color: #073B4C !important;
          border-radius: 10px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }
        .cp-form-card input::placeholder,
        .cp-form-card textarea::placeholder { color: #8FBFCE !important; }
        .cp-form-card input:focus,
        .cp-form-card textarea:focus {
          border-color: #0EA5E9 !important;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.14) !important;
          outline: none !important;
        }

        /* Select */
        .cp-select-trigger {
          font-family: 'Nunito', sans-serif !important;
          background: #F6FEFF !important;
          border: 1.5px solid #CDEEF9 !important;
          color: #073B4C !important;
          border-radius: 10px !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          width: 100% !important;
        }
        .cp-select-trigger:focus { border-color: #0EA5E9 !important; box-shadow: 0 0 0 3px rgba(14,165,233,0.14) !important; }

        /* Submit button */
        .cp-submit {
          width: 100%; padding: 0.8rem; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #0EA5E9, #0369A1); color: white;
          font-family: 'Nunito', sans-serif; font-size: 0.9rem; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          box-shadow: 0 12px 32px rgba(14,165,233,0.35);
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }
        .cp-submit:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 18px 48px rgba(14,165,233,0.45); }
        .cp-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Trust strip */
        .cp-trust { display: flex; align-items: center; justify-content: center; gap: 2rem; flex-wrap: wrap; padding: 1.75rem 2rem; border-top: 1.5px dashed #CDEEF9; margin-top: 0.5rem; }
        .cp-trust-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; font-weight: 700; color: #5B94A6; }

        /* Layout */
        .cp-body { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .cp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .cp-left { display: flex; flex-direction: column; gap: 1.25rem; }
        @media (max-width: 860px) { .cp-grid { grid-template-columns: 1fr; } }
        @media (max-width: 500px) { .cp-info-grid { grid-template-columns: 1fr 1fr; } .cp-body { padding: 2rem 1rem 4rem; } }
      `}</style>

      <div className="cp">
        {/* Hero */}
        <div className="cp-hero-band">
          <div className="cp-hero">
            <div className="cp-eyebrow cp-u d1">✦ Get in Touch</div>

            <div className="cp-u d2" style={{ marginBottom: "0.75rem" }}>
              <h1
                className="cp-h"
                style={{
                  fontSize: "clamp(2.4rem,6vw,4.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  margin: 0,
                  color: "#073B4C",
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
                color: "#2C6478",
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
                    Name <span style={{ color: "#0369A1" }}>*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="cp-label">
                    Email <span style={{ color: "#0369A1" }}>*</span>
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
                    <span style={{ color: "#8FBFCE", fontWeight: 500 }}>
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
                    Message <span style={{ color: "#0369A1" }}>*</span>
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
