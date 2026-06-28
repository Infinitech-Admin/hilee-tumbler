import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Sprout, Brush, Gift } from "lucide-react";

export default function HomePreview() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#E9DCC8] to-white">
      {/* Blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-xl opacity-20 bg-[#FF6B35]" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full blur-lg opacity-15 bg-[#FF6B35]" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full blur-2xl opacity-10 bg-[#FF6B35]" />
      <div className="absolute bottom-40 right-1/3 w-28 h-28 rounded-full blur-xl opacity-15 bg-[#FF6B35]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-800 tracking-widest uppercase text-[#FF6B35] font-extrabold">
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
                className="bg-[#FF6B35] hover:bg-[#e85e2a] text-white px-8 py-3 text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 rounded-full"
              >
                <Link href="/products">View Our Products</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white px-8 py-3 text-base font-bold transition-all duration-200 bg-transparent rounded-full"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 auto-rows-fr">
            {[
              {
                icon: <Flame className="w-6 h-6 text-[#FF6B35]" />,
                title: "Proudly Filipino",
                desc: "Designed and made with local craftsmanship",
              },
              {
                icon: <Sprout className="w-6 h-6 text-[#FF6B35]" />,
                title: "Eco-Friendly",
                desc: "Reusable tumblers that help reduce waste",
              },
              {
                icon: <Brush className="w-6 h-6 text-[#FF6B35]" />,
                title: "Customizable",
                desc: "Personalize your tumbler to match your style",
              },
              {
                icon: <Gift className="w-6 h-6 text-[#FF6B35]" />,
                title: "Perfect Gift",
                desc: "Stylish tumblers ideal for friends and family",
              },
            ].map((card, idx) => (
              <Card
                key={idx}
                className="group hover:border-[#FF6B35]/40 hover:shadow-[0_4px_20px_rgba(255,107,53,0.08)] transition-all duration-200 bg-white border border-black/[0.07] rounded-[20px] h-full flex flex-col"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="w-11 h-11 bg-[#E9DCC8] rounded-xl flex items-center justify-center mb-4">
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
