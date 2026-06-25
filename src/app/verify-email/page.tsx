"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. No token provided.")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await response.json()

        if (data.success) {
          setStatus("success")
          setMessage(data.message || "Email verified successfully!")
          setTimeout(() => router.push("/login"), 3000)
        } else {
          setStatus("error")
          setMessage(data.message || "Email verification failed.")
        }
      } catch {
        setStatus("error")
        setMessage("An error occurred during verification. Please try again.")
      }
    }

    verifyEmail()
  }, [token, router])

  return <VerifyCard status={status} message={message} />
}

function VerifyCard({ status, message }: { status: "loading" | "success" | "error"; message: string }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Nunito:wght@400;600;700;800&display=swap');

        .ve-root {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #3B0764 0%, #6D28D9 45%, #7C3AED 75%, #5B21B6 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem; position: relative; overflow: hidden;
        }
        .ve-disp { font-family: 'Bricolage Grotesque', sans-serif; }

        /* Blobs */
        @keyframes ve-morph {
          0%,100%{border-radius:62% 38% 70% 30%/45% 55% 45% 55%}
          25%    {border-radius:40% 60% 45% 55%/60% 40% 60% 40%}
          50%    {border-radius:55% 45% 35% 65%/40% 60% 50% 50%}
          75%    {border-radius:70% 30% 60% 40%/55% 45% 65% 35%}
        }
        .ve-blob { animation: ve-morph 10s ease-in-out infinite; position: absolute; pointer-events: none; }

        /* Dot grid */
        .ve-dotgrid { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.15; pointer-events: none; }

        /* Card */
        @keyframes ve-in { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:none} }
        .ve-card {
          background: white;
          border-radius: 32px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35), 0 0 0 1.5px rgba(167,139,250,0.3);
          width: 100%; max-width: 420px;
          overflow: hidden;
          animation: ve-in 0.7s cubic-bezier(.22,1,.36,1) both;
          position: relative; z-index: 2;
        }

        /* Card header */
        .ve-header {
          background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);
          padding: 2rem 1.5rem 1.75rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .ve-header::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0; height: 24px;
          background: white;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }

        /* Ticker inside header */
        @keyframes ve-tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ve-tick-wrap { overflow: hidden; margin-bottom: 1rem; opacity: 0.6; }
        .ve-tick-track { display: flex; width: max-content; animation: ve-tick 18s linear infinite; }
        .ve-tick-item  { display: flex; align-items: center; gap: 0.75rem; padding: 0 1rem; white-space: nowrap; font-size: 0.55rem; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: white; }
        .ve-tick-dot   { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.7); flex-shrink: 0; }

        /* Icon ring */
        @keyframes ve-spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ve-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        .ve-icon-ring {
          width: 80px; height: 80px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 0.5rem;
          position: relative;
        }
        .ve-icon-ring::before {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px dashed rgba(255,255,255,0.5);
          animation: ve-spin-slow 10s linear infinite;
        }

        /* Body */
        .ve-body { padding: 2rem 2rem 2.25rem; text-align: center; }

        /* Buttons */
        .ve-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          font-family: 'Nunito', sans-serif; font-weight: 800;
          font-size: 0.8rem; letter-spacing: 0.06em;
          padding: 0.75rem 1.75rem; border-radius: 999px;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.25s ease;
        }
        .ve-btn:hover { transform: translateY(-2px); }
        .ve-btn-primary {
          background: linear-gradient(135deg, #7C3AED, #A78BFA);
          color: white;
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }
        .ve-btn-primary:hover { box-shadow: 0 10px 28px rgba(124,58,237,0.5); }
        .ve-btn-outline {
          background: transparent;
          border: 2px solid rgba(124,58,237,0.25) !important;
          color: #7C3AED;
        }
        .ve-btn-outline:hover { background: rgba(124,58,237,0.06); border-color: rgba(124,58,237,0.5) !important; }

        /* Spinner */
        @keyframes ve-rotate { to{transform:rotate(360deg)} }
        .ve-spinner {
          width: 48px; height: 48px; border-radius: 50%;
          border: 3px solid rgba(124,58,237,0.15);
          border-top-color: #7C3AED;
          animation: ve-rotate 0.8s linear infinite;
          margin: 0 auto;
        }

        /* Fade in sections */
        @keyframes ve-fade { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .ve-fade { animation: ve-fade 0.5s ease both; }

        /* Trust strip */
        .ve-trust {
          display: flex; align-items: center; justify-content: center; gap: 1.25rem;
          padding-top: 1.25rem; margin-top: 1.25rem;
          border-top: 1.5px dashed rgba(0,0,0,0.08);
          flex-wrap: wrap;
        }
        .ve-trust-item { font-size: 0.62rem; font-weight: 700; color: #bbb; display: flex; align-items: center; gap: 0.3rem; }
      `}</style>

      <div className="ve-root">
        {/* Blobs */}
        <div className="ve-blob" style={{ top:"-15%", right:"-10%", width:"400px", height:"400px", background:"rgba(167,139,250,0.2)" }} />
        <div className="ve-blob" style={{ bottom:"-15%", left:"-8%", width:"320px", height:"320px", background:"rgba(124,58,237,0.2)", animationDelay:"-5s" }} />
        <div className="ve-blob" style={{ top:"30%", left:"-5%", width:"180px", height:"180px", background:"rgba(196,181,253,0.15)", animationDelay:"-8s" }} />

        {/* Dot grid */}
        <svg className="ve-dotgrid">
          <defs>
            <pattern id="vd" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.6)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vd)" />
        </svg>

        <div className="ve-card">
          {/* Header */}
          <div className="ve-header">
            {/* Mini ticker */}
            <div className="ve-tick-wrap">
              <div className="ve-tick-track">
                {["HILEE PREMIUM","EMAIL VERIFY","ALMOST THERE","HILEE PREMIUM","EMAIL VERIFY","ALMOST THERE"].map((t,i) => (
                  <div key={i} className="ve-tick-item">
                    <span className="ve-tick-dot" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Icon */}
            <div className="ve-icon-ring" style={{
              background: status === "success"
                ? "rgba(52,211,153,0.2)"
                : status === "error"
                ? "rgba(248,113,113,0.2)"
                : "rgba(255,255,255,0.15)",
            }}>
              {status === "loading" && <div className="ve-spinner" style={{ borderTopColor:"white", borderColor:"rgba(255,255,255,0.2)" }} />}
              {status === "success" && <CheckCircle size={40} strokeWidth={2} color="white" style={{ animation:"ve-pulse 2s ease-in-out infinite" }} />}
              {status === "error"   && <XCircle   size={40} strokeWidth={2} color="white" />}
            </div>

            {/* Title */}
            <h1 className="ve-disp" style={{
              fontSize:"1.6rem", fontWeight:800,
              color:"white", margin:"0.5rem 0 0",
              letterSpacing:"-0.02em", lineHeight:1.1,
              paddingBottom:"1rem",
            }}>
              Email Verification
            </h1>
          </div>

          {/* Body */}
          <div className="ve-body">
            {status === "loading" && (
              <div className="ve-fade" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
                <p style={{ fontSize:"1rem", color:"#888", fontWeight:600, margin:0 }}>
                  Verifying your email address…
                </p>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"0.4rem",
                  background:"rgba(124,58,237,0.08)", border:"1.5px solid rgba(124,58,237,0.2)",
                  borderRadius:"999px", padding:"0.4rem 1rem",
                  fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.15em",
                  textTransform:"uppercase", color:"#7C3AED",
                }}>
                  <Loader2 size={11} strokeWidth={2.5} style={{ animation:"ve-rotate 0.8s linear infinite" }} />
                  Processing
                </div>
              </div>
            )}

            {status === "success" && (
              <div className="ve-fade" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
                <div>
                  <h2 className="ve-disp" style={{ fontSize:"1.75rem", fontWeight:800, color:"#16A34A", margin:"0 0 0.4rem", letterSpacing:"-0.02em" }}>
                    All Done! 🎉
                  </h2>
                  <p style={{ fontSize:"0.9rem", color:"#888", margin:0, lineHeight:1.7 }}>{message}</p>
                </div>
                <p style={{ fontSize:"0.72rem", color:"#bbb", margin:0, fontWeight:600 }}>
                  Redirecting you to login in 3 seconds…
                </p>
                <Link href="/login" className="ve-btn ve-btn-primary">
                  <Sparkles size={13} strokeWidth={2.5} />
                  Go to Login
                </Link>

                <div className="ve-trust">
                  {[{e:"🔒",t:"Secure"},{e:"✅",t:"Verified"},{e:"💧",t:"Hilee"}].map(x => (
                    <span key={x.t} className="ve-trust-item"><span>{x.e}</span>{x.t}</span>
                  ))}
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="ve-fade" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
                <div>
                  <h2 className="ve-disp" style={{ fontSize:"1.75rem", fontWeight:800, color:"#DC2626", margin:"0 0 0.4rem", letterSpacing:"-0.02em" }}>
                    Verification Failed
                  </h2>
                  <p style={{ fontSize:"0.9rem", color:"#888", margin:0, lineHeight:1.7 }}>{message}</p>
                </div>
                <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap", justifyContent:"center" }}>
                  <Link href="/login" className="ve-btn ve-btn-outline">
                    Go to Login
                  </Link>
                  <Link href="/register" className="ve-btn ve-btn-primary">
                    Register Again
                  </Link>
                </div>

                <div className="ve-trust">
                  {[{e:"🔒",t:"Secure"},{e:"💧",t:"Hilee"},{e:"📧",t:"Support"}].map(x => (
                    <span key={x.t} className="ve-trust-item"><span>{x.e}</span>{x.t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyCard status="loading" message="" />}>
      <VerifyEmailContent />
    </Suspense>
  )
}