"use client";

import { Droplets, Palette, Shield, Snowflake } from "lucide-react";

export default function InfoSection() {
  return (
    <section
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="relative bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-white py-16 border-b border-[#0EA5E9]/10 overflow-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@400;600;700;800&display=swap');
        @keyframes float-blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(40px) scale(1.05); }
        }
        .info-blob { animation: float-blob 8s ease-in-out infinite; position: absolute; pointer-events: none; }
      `}</style>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] info-blob -z-10" />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-2xl opacity-8 bg-gradient-to-tl from-[#22D3EE] to-[#0EA5E9] info-blob -z-10"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight bg-gradient-to-r from-[#0C1C2E] to-[#0EA5E9] bg-clip-text text-transparent mb-3"
          >
            Why choose HILEE?
          </h2>
          <p className="text-[1rem] text-[#7C6F60] leading-relaxed max-w-[42ch] mx-auto font-normal">
            Premium hydration at an unbeatable price — built for daily life,
            school, workouts & adventure.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Snowflake className="w-5 h-5 text-[#0EA5E9]" />,
              title: "24-hour cold",
              desc: "Double-wall vacuum insulation keeps drinks ice-cold all day long.",
            },
            {
              icon: <Shield className="w-5 h-5 text-[#0EA5E9]" />,
              title: "Food-grade steel",
              desc: "304 stainless steel — BPA-free, durable, and corrosion-resistant.",
            },
            {
              icon: <Droplets className="w-5 h-5 text-[#0EA5E9]" />,
              title: "3-way lid",
              desc: "Sip, straw, or pour — versatile lids for every drinking style.",
            },
            {
              icon: <Palette className="w-5 h-5 text-[#0EA5E9]" />,
              title: "Custom styles",
              desc: "Glossy, matte, and signature series with free name printing.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-gradient-to-br from-white to-[#F0F9FF] rounded-[20px] border border-[#0EA5E9]/15 p-5
                         hover:border-[#0EA5E9]/40 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)]
                         transition-all duration-300 group hover:scale-105 hover:-translate-y-2"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all">
                {card.icon}
              </div>
              <p
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                className="text-[1.05rem] font-extrabold text-[#0C1C2E] mb-2"
              >
                {card.title}
              </p>
              <p className="text-[0.82rem] text-[#7C6F60] leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
