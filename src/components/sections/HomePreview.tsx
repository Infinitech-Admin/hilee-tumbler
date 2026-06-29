import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Sprout, Brush, Gift } from "lucide-react";

export default function HomePreview() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-white">
      <style>{`
        @keyframes float-blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(40px) scale(1.05); }
        }
        .blob-animate { animation: float-blob 8s ease-in-out infinite; }
        .blob-animate-delay { animation-delay: 2s; }
        .blob-animate-delay-2 { animation-delay: 4s; }
        .blob-animate-delay-3 { animation-delay: 6s; }
      `}</style>
      {/* Blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] blob-animate" />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-2xl opacity-20 bg-gradient-to-br from-[#22D3EE] to-[#0EA5E9] blob-animate blob-animate-delay" />
      <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-15 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] blob-animate blob-animate-delay-2" />
      <div className="absolute bottom-40 right-1/3 w-36 h-36 rounded-full blur-2xl opacity-20 bg-gradient-to-br from-[#06B6D4] to-[#22D3EE] blob-animate blob-animate-delay-3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-800 tracking-widest uppercase text-[#0EA5E9] font-extrabold">
                About Us
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[#2E2419]">
              Hilee
            </h1>

            <p className="text-lg text-[#7C6F60] leading-relaxed">
              HILEE started with a simple mission: make premium-quality
              insulated drinkware accessible to everyone. Born in the
              Philippines, we&apos;ve become a go-to brand for students,
              athletes, and adventurers who refuse to compromise on quality or
              style.
            </p>

            <p className="text-lg text-[#7C6F60] leading-relaxed">
              Every HILEE flask is crafted from 304 food-grade stainless steel
              with double-wall vacuum insulation — keeping your drinks ice-cold
              for 24 hours or piping hot for up to 8. With free name printing,
              paracord handles, and a range of stunning finishes, your flask is
              as unique as you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] hover:scale-105 hover:shadow-xl text-white px-8 py-3 text-base font-bold shadow-lg transition-all duration-300 rounded-full"
              >
                <Link href="/products">View Our Products</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white px-8 py-3 text-base font-bold transition-all duration-300 bg-linear-gradient-to-r from-transparent to-[#E0F2FE]/20 rounded-full hover:scale-105"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 auto-rows-fr">
            {[
              {
                icon: <Flame className="w-6 h-6 text-[#0EA5E9]" />,
                title: "Proudly Filipino",
                desc: "Designed and made with local craftsmanship",
              },
              {
                icon: <Sprout className="w-6 h-6 text-[#0EA5E9]" />,
                title: "Eco-Friendly",
                desc: "Reusable tumblers that help reduce waste",
              },
              {
                icon: <Brush className="w-6 h-6 text-[#0EA5E9]" />,
                title: "Customizable",
                desc: "Personalize your tumbler to match your style",
              },
              {
                icon: <Gift className="w-6 h-6 text-[#0EA5E9]" />,
                title: "Perfect Gift",
                desc: "Stylish tumblers ideal for friends and family",
              },
            ].map((card, idx) => (
              <Card
                key={idx}
                className="group hover:border-[#0EA5E9]/50 hover:shadow-[0_12px_32px_rgba(14,165,233,0.15)] transition-all duration-300 bg-gradient-to-br from-white to-[#F0F9FF] border border-[#0EA5E9]/15 rounded-[20px] h-full flex flex-col hover:scale-105 hover:-translate-y-2"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all">
                    {card.icon}
                  </div>
                  <h3 className="font-extrabold text-base mb-1 text-[#2E2419]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#7C6F60] flex-1 leading-relaxed">
                    {card.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
