"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Building,
  Hash,
  UserPlus,
  CircleChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    password: "",
    password_confirmation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (field === "phone") {
      setFormData((prev) => ({ ...prev, [field]: value.replace(/\D/g, "") }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
      });
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      toast.error("Password Mismatch", {
        description: "Passwords do not match.",
      });
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password Too Short", {
        description: "Password must be at least 8 characters.",
      });
      return;
    }
    if (formData.phone && formData.phone.length !== 11) {
      toast.error("Invalid Phone Number", {
        description: "Phone number must be exactly 11 digits.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Registration Successful!", {
          description: "Please check your email to verify your account.",
          duration: 5000,
        });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error("Registration Failed", {
          description: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Connection Error", {
        description: "Unable to register. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldStyle = {
    height: 48,
    border: "1.5px solid #DDD8CF",
    borderRadius: 10,
    background: "#FFFFFF",
    color: "#2E2419",
    fontSize: "0.9rem",
  };
  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#2E2419",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    marginBottom: "0.5rem",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap');
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .hilee-blob { animation: blob 7s infinite; }
        .hilee-blob-2 { animation-delay: 2s; }
        .hilee-blob-3 { animation-delay: 4s; }
        .hilee-input:focus {
          border-color: #FF6B35 !important;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.12) !important;
          outline: none !important;
        }
        .hilee-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(255,107,53,0.45) !important; }
      `}</style>

      <div
        className="relative min-h-screen overflow-y-auto"
        style={{
          background:
            "linear-gradient(160deg, #2E2419 0%, #4A3728 40%, #2E2419 100%)",
        }}
      >
        <div
          className="hilee-blob absolute top-16 left-8 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "#E9DCC8", filter: "blur(80px)", opacity: 0.18 }}
        />
        <div
          className="hilee-blob hilee-blob-2 absolute top-1/3 right-8 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "#FF6B35", filter: "blur(80px)", opacity: 0.18 }}
        />
        <div
          className="hilee-blob hilee-blob-3 absolute bottom-12 left-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#C4AA8A", filter: "blur(80px)", opacity: 0.18 }}
        />

        <div className="min-h-screen flex justify-center px-4 py-10 relative z-10">
          <Card
            className="w-full max-w-2xl !p-0 overflow-hidden h-fit"
            style={{
              background: "#FAF7F2",
              border: "1.5px solid #DDD8CF",
              borderRadius: "24px",
            }}
          >
            <CardHeader className="!p-0 !m-0">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #2E2419 0%, #4A3728 100%)",
                  borderBottom: "2px solid #FF6B35",
                  padding: "1.75rem 2rem 1.5rem",
                }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Link
                    href="/"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(233,220,200,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E9DCC8",
                      flexShrink: 0,
                    }}
                  >
                    <CircleChevronLeft className="w-5 h-5" />
                  </Link>
                  <h2
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "1.9rem",
                      fontWeight: 800,
                      color: "#FAF7F2",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    Create account
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(233,220,200,0.6)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    paddingLeft: 44,
                  }}
                >
                  Get the latest updates and discounts
                </p>
              </div>
            </CardHeader>

            <CardContent style={{ padding: "1.75rem 2rem" }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" style={labelStyle}>
                      <User
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      Full name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                      className="hilee-input"
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" style={labelStyle}>
                      <Mail
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className="hilee-input"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" style={labelStyle}>
                    <Phone
                      className="w-3.5 h-3.5"
                      style={{ color: "#FF6B35" }}
                    />{" "}
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="09123456789 (11 digits)"
                    maxLength={11}
                    disabled={isSubmitting}
                    className="hilee-input"
                    style={fieldStyle}
                  />
                </div>

                <div>
                  <Label htmlFor="address" style={labelStyle}>
                    <MapPin
                      className="w-3.5 h-3.5"
                      style={{ color: "#FF6B35" }}
                    />{" "}
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter your address"
                    disabled={isSubmitting}
                    className="hilee-input"
                    style={fieldStyle}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" style={labelStyle}>
                      <Building
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="Enter your city"
                      disabled={isSubmitting}
                      className="hilee-input"
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip_code" style={labelStyle}>
                      <Hash
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      ZIP code
                    </Label>
                    <Input
                      id="zip_code"
                      value={formData.zip_code}
                      onChange={(e) =>
                        handleInputChange("zip_code", e.target.value)
                      }
                      placeholder="12345"
                      disabled={isSubmitting}
                      className="hilee-input"
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" style={labelStyle}>
                      <Lock
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Min. 8 characters"
                        required
                        minLength={8}
                        disabled={isSubmitting}
                        className="hilee-input"
                        style={{ ...fieldStyle, paddingRight: "2.75rem" }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#ACA193",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="password_confirmation" style={labelStyle}>
                      <Lock
                        className="w-3.5 h-3.5"
                        style={{ color: "#FF6B35" }}
                      />{" "}
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.password_confirmation}
                        onChange={(e) =>
                          handleInputChange(
                            "password_confirmation",
                            e.target.value,
                          )
                        }
                        placeholder="Confirm password"
                        required
                        disabled={isSubmitting}
                        className="hilee-input"
                        style={{ ...fieldStyle, paddingRight: "2.75rem" }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{
                          color: "#ACA193",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                        }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full hilee-btn"
                  style={{
                    height: 52,
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #FF6B35, #FF8C5A)",
                    color: "#FAF7F2",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    letterSpacing: "0.03em",
                    boxShadow: "0 6px 24px rgba(255,107,53,0.35)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" /> Create account
                    </span>
                  )}
                </Button>

                <div className="text-center pt-2">
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#7C6F60",
                      fontWeight: 500,
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      style={{ color: "#FF6B35", fontWeight: 700 }}
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
