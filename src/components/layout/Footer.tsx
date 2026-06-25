"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportModal } from "@/components/support-modal";

const Footer = () => {
  const pathname = usePathname();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <footer style={{ background: "#2B2D35", color: "white" }}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Logo + Description */}
            <div className="space-y-4">
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#FAF7F2",
                  fontFamily: "sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Hilee
              </span>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginTop: "0.75rem",
                }}
              >
                Stylish, durable, and eco-friendly tumblers — keeping your
                drinks perfect anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-2">
                {[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FAF7F2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Contact
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: MapPin,
                    label: "Tomas Pinpin St, Binondo, Manila, Philippines",
                    href: "https://www.google.com/maps/search/?api=1&query=Tomas+Pinpin+Street+Binondo+Manila+Philippines",
                    target: "_blank",
                  },
                  {
                    icon: Phone,
                    label: "0956 764 5027",
                    href: "tel:0956 764 5027",
                  },
                  {
                    icon: Mail,
                    label: "hileestore@gmail.com",
                    href: "mailto:hileestore@gmail.com",
                  },
                ].map(({ icon: Icon, label, href, target }) => (
                  <Link
                    key={label}
                    href={href}
                    {...(target ? { target, rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-2"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FAF7F2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                    }
                  >
                    <Icon
                      style={{
                        width: "15px",
                        height: "15px",
                        flexShrink: 0,
                        color: "rgba(255,255,255,0.3)",
                      }}
                    />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Support
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                Need help? Our support team is ready to assist.
              </p>
              <button
                onClick={() => setSupportModalOpen(true)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1rem",
                  borderRadius: "8px",
                  background: "#FAF7F2",
                  color: "#1A1A1A",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f0ece3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#FAF7F2")
                }
              >
                <HelpCircle style={{ width: "15px", height: "15px" }} />
                Get Support
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: "3rem",
              paddingTop: "1.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "0.8rem",
                marginBottom: "0.35rem",
              }}
            >
              © 2026 Hilee. All rights reserved.
            </p>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
              Powered by{" "}
              <Link
                href="https://infinitechphil.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                Infinitech Advertising Corporation
              </Link>
            </p>
          </div>
        </div>
      </footer>

      <SupportModal
        open={supportModalOpen}
        onOpenChange={setSupportModalOpen}
      />
    </>
  );
};

export default Footer;
