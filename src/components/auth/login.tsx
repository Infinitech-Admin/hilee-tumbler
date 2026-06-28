"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CircleChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        const token = data.token || data.data?.token || data.access_token;
        const user = data.user || data.data?.user || data.data;
        if (token && user) {
          login({ ...user, token });
          toast.success("Login Successful!", {
            description: "Welcome back to Hilee!",
          });
          const userRole = user?.role?.toLowerCase?.() || user?.role || "";
          const redirectPath = userRole === "admin" ? "/admin/dashboard" : "/";
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_data", JSON.stringify(user));
          document.cookie = `auth_token=${token}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
          setTimeout(() => router.push(redirectPath), 1500);
        }
      } else {
        toast.error("Login Failed", {
          description: data.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      toast.error("Connection Error", {
        description: "Unable to login. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #2E2419 0%, #4A3728 40%, #2E2419 100%)",
        }}
      >
        {/* Blobs */}
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

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <Card
            className="w-full !p-0 overflow-hidden"
            style={{
              background: "#FAF7F2",
              border: "1.5px solid #DDD8CF",
              borderRadius: "24px",
            }}
          >
            {/* Header */}
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
                    Welcome back
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
                  Sign in to your account
                </p>
              </div>
            </CardHeader>

            <CardContent style={{ padding: "1.75rem 2rem" }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <Label
                    htmlFor="email"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#2E2419",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Mail
                      className="w-3.5 h-3.5"
                      style={{ color: "#FF6B35" }}
                    />
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="hilee-input"
                    style={{
                      height: 48,
                      border: "1.5px solid #DDD8CF",
                      borderRadius: 10,
                      background: "#FFFFFF",
                      color: "#2E2419",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label
                    htmlFor="password"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#2E2419",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Lock
                      className="w-3.5 h-3.5"
                      style={{ color: "#FF6B35" }}
                    />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      disabled={isSubmitting}
                      className="hilee-input"
                      style={{
                        height: 48,
                        border: "1.5px solid #DDD8CF",
                        borderRadius: 10,
                        background: "#FFFFFF",
                        color: "#2E2419",
                        fontSize: "0.9rem",
                        paddingRight: "2.75rem",
                      }}
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

                {/* Submit */}
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
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" /> Login
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
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      style={{ color: "#FF6B35", fontWeight: 700 }}
                    >
                      Register here
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
