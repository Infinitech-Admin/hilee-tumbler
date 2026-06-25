"use client";

import { Droplets, Palette, Shield, Snowflake } from "lucide-react";

export default function InfoSection() {
  return (
    <section
      style={{ fontFamily: "'Nunito', sans-serif" }}
      className="bg-[#FAF7F2] py-16 border-b border-black/[0.06]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Nunito:wght@400;600;700;800&display=swap');
      `}</style>

      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-[#1A1A1A] mb-3"
          >
            Why choose <span className="text-[#FF6B35]">HILEE?</span>
          </h2>
          <p className="text-[1rem] text-[#888] leading-relaxed max-w-[42ch] mx-auto font-normal">
            Premium hydration at an unbeatable price — built for daily life,
            school, workouts & adventure.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Snowflake className="w-5 h-5 text-[#FF6B35]" />,
              title: "24-hour cold",
              desc: "Double-wall vacuum insulation keeps drinks ice-cold all day long.",
            },
            {
              icon: <Shield className="w-5 h-5 text-[#FF6B35]" />,
              title: "Food-grade steel",
              desc: "304 stainless steel — BPA-free, durable, and corrosion-resistant.",
            },
            {
              icon: <Droplets className="w-5 h-5 text-[#FF6B35]" />,
              title: "3-way lid",
              desc: "Sip, straw, or pour — versatile lids for every drinking style.",
            },
            {
              icon: <Palette className="w-5 h-5 text-[#FF6B35]" />,
              title: "Custom styles",
              desc: "Glossy, matte, and signature series with free name printing.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-[20px] border border-black/[0.07] p-5
                         hover:border-[#FF6B35]/35 hover:shadow-[0_4px_20px_rgba(255,107,53,0.08)]
                         transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FFF3E0] flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <p
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                className="text-[1.05rem] font-extrabold text-[#1A1A1A] mb-2"
              >
                {card.title}
              </p>
              <p className="text-[0.82rem] text-[#888] leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
