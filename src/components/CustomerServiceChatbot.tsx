"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const FAQ_DATA = [
  {
    question: "What is Hilee Thumbler?",
    answer:
      "Hilee Thumbler is your go-to online store for trendy and affordable fashion finds! We offer a wide selection of clothing, accessories, and lifestyle products delivered right to your doorstep.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order directly through our website or reach us via our Facebook page at facebook.com/p/Hilee-Store-61565449175554/ or on Instagram @hilee.ph. We're happy to assist you!",
  },
  {
    question: "What are your contact details?",
    answer:
      "You can reach us through the following:\n📧 Email: hileestore@gmail.com\n📞 Phone/Viber/WhatsApp: +639567645027\n📘 Facebook: facebook.com/p/Hilee-Store-61565449175554/\n📸 Instagram: @hilee.ph",
  },
  {
    question: "Do you offer delivery or shipping?",
    answer:
      "Yes! We ship nationwide. Shipping fees and delivery times vary depending on your location. Please message us on Facebook or Instagram for more details about shipping to your area.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including GCash, bank transfer, and cash on delivery (COD) for selected areas. Please contact us at hileestore@gmail.com or +639567645027 for payment details.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, we have a return and exchange policy for items that are defective or incorrect. Please contact us within 3 days of receiving your order at hileestore@gmail.com or message us on Facebook/Instagram.",
  },
];

export default function CustomerServiceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isChatEnded) {
      setTimeout(() => {
        addBotMessage(
          "Hello! Welcome to Hilee Thumbler 🖤 Please select a question below to get started!",
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string) => {
    const messageId = Date.now().toString();
    const newMessage: Message = {
      id: messageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: text.substring(0, currentIndex + 1) }
              : msg,
          ),
        );
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
  };

  const handleEndChat = () => {
    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(
        "Thank you for chatting with us! This conversation has ended. If you have more questions, please start a new chat. Have a great day! 🖤",
      );
      setIsTyping(false);
      setIsChatEnded(true);
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsChatEnded(false);
    setTimeout(() => {
      addBotMessage(
        "Hello! Welcome back to Hilee Thumbler 🖤 Please select a question below to get started!",
      );
    }, 500);
  };

  const handleFAQClick = (question: string, answer: string) => {
    if (isChatEnded) return;

    const questionMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, questionMessage]);

    setIsTyping(true);
    setTimeout(() => {
      addBotMessage(answer);
      setIsTyping(false);
    }, 2000);
  };

  if (pathname !== "/" && pathname !== "/user") return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl bg-[#1a1a1a] hover:bg-black z-50 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[420px] h-[85vh] md:h-[700px] max-h-[700px] shadow-2xl z-50 flex flex-col border-[#e5e0d8] rounded-t-2xl md:rounded-2xl overflow-hidden p-0">
          {/* Header */}
          <CardHeader className="bg-[#1a1a1a] text-white flex flex-row items-center justify-between p-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-white">
                  Customer Service
                </CardTitle>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Hilee Thumbler
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-[#f5f0e8]">
            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full px-4 py-3">
                <div className="space-y-3 pb-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          message.sender === "user"
                            ? "bg-[#1a1a1a] text-white rounded-tr-sm"
                            : "bg-white text-gray-800 border border-[#e5e0d8] rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            message.sender === "user"
                              ? "text-white/60"
                              : "text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e0d8]">
                        <div className="flex gap-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Quick Replies Section */}
            {!isChatEnded && (
              <div className="border-t-2 border-[#e5e0d8] bg-white px-4 py-3 flex-shrink-0">
                <p className="text-[11px] font-semibold text-gray-400 mb-2.5 uppercase tracking-wide">
                  Quick replies:
                </p>
                <div className="max-h-[140px] overflow-y-auto">
                  <div className="flex flex-wrap gap-2 pr-1">
                    {FAQ_DATA.map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(faq.question, faq.answer)}
                        disabled={isTyping}
                        className="text-[11px] px-3 py-1.5 rounded-full border-2 border-gray-300 text-gray-700 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium whitespace-normal text-left leading-snug"
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-[#e5e0d8] px-4 py-3 bg-white flex-shrink-0">
              {!isChatEnded ? (
                <Button
                  onClick={handleEndChat}
                  variant="outline"
                  className="w-full text-sm border-2 border-gray-300 text-gray-700 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] bg-white font-medium rounded-xl h-10 transition-all duration-200"
                  disabled={isTyping}
                >
                  End Chat
                </Button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3 font-medium">
                    Chat has ended
                  </p>
                  <Button
                    onClick={handleNewChat}
                    className="w-full bg-[#1a1a1a] hover:bg-black text-white font-medium rounded-xl h-10 shadow-md transition-all duration-200"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Start New Chat
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
