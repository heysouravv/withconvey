"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function AppleInspiredWithConvey() {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set())
  const [chatStep, setChatStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const chatRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const chatMessages = [
    { type: "customer", text: "I need something for date night." },
    { type: "agent", text: "You bought a black shirt last month. How about these dark jeans to match?" },
    { type: "customer", text: "Show me." },
    {
      type: "agent",
      text: "Here's the full look. Arrives tomorrow.",
      hasImage: true,
    },
    { type: "customer", text: "Perfect." },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementIndex = Number.parseInt(entry.target.getAttribute("data-reveal") || "0")
            setVisibleElements((prev) => new Set([...prev, elementIndex]))
          }
        })
      },
      { threshold: 0.15, rootMargin: "-50px" },
    )

    const elements = document.querySelectorAll("[data-reveal]")
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const chatObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && chatStep === 0) {
          startChatAnimation()
        }
      },
      { threshold: 0.6 },
    )

    if (chatRef.current) {
      chatObserver.observe(chatRef.current)
    }

    return () => chatObserver.disconnect()
  }, [chatStep])

  const startChatAnimation = () => {
    let step = 0
    const animateNext = () => {
      if (step >= chatMessages.length) return

      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setChatStep(step + 1)
        step++
        setTimeout(animateNext, 1800)
      }, 1200)
    }
    animateNext()
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Captivating Header with Parallax */}
      <header ref={headerRef} className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div
            data-reveal="0"
            className={`transition-all duration-[1800ms] ease-out ${
              visibleElements.has(0) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-none apple-font-display animate-breathe metal-shine-text">
              WithConvey
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-12 transform transition-all duration-1000 delay-300 scale-x-0 animate-expand"></div>
            <p className="text-2xl md:text-3xl font-semibold text-gray-600 leading-relaxed mb-16 apple-font-text">
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                Where conversation
              </span>
              <br />
              <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
                becomes commerce
              </span>
            </p>
          </div>
          <div
            data-reveal="1"
            className={`transition-all duration-1000 delay-1000 ${
              visibleElements.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center text-sm font-medium text-gray-400 tracking-wide apple-font-text">
              <span className="animate-pulse-subtle">Scroll to discover</span>
              <div className="ml-3 w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce-gentle"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Narrative Content */}
      <div className="max-w-3xl mx-auto px-6 pb-32">
        {/* The Problem */}
        <div className="py-24">
          <div
            data-reveal="2"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display animate-text-reveal">
              Shopping feels broken.
            </h2>
            <div className="space-y-8">
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                Your customers navigate endless menus, fill out countless forms, and click through pages that never seem
                to understand what they actually want.
              </p>
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                They're tired of being treated like <span className="highlight-pink">data points</span> instead of
                people with real needs, preferences, and stories.
              </p>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="py-24">
          <div
            data-reveal="3"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display">
              <span className="inline-block animate-slide-in-left">What if shopping felt like</span>
              <br />
              <span className="inline-block animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                talking to your smartest friend?
              </span>
            </h2>
            <div className="space-y-8">
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Someone who remembers that you prefer minimalist designs. Someone who knows you have a wedding coming
                up. Someone who understands that when you say "something for date night," you mean something that makes
                you feel confident and authentic.
              </p>
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                That friend exists. It's our <span className="highlight-blue">AI agent</span>, and it's transforming how
                people discover, explore, and buy the things they love.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-24">
          <div
            data-reveal="4"
            className={`transition-all duration-1000 ease-out ${
              visibleElements.has(4) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center apple-font-display animate-text-glow">
              Watch how it works
            </h2>
          </div>

          <div
            ref={chatRef}
            data-reveal="5"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(5) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-lg mx-auto hover:shadow-md transition-all duration-500 ease-out hover:scale-[1.02]">
              <div className="space-y-4">
                {chatMessages.slice(0, chatStep).map((message, index) => (
                  <div key={index} className="space-y-3">
                    <div
                      className={`flex ${message.type === "customer" ? "justify-end" : "justify-start"} animate-message-appear`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl text-sm font-medium apple-font-text transition-all duration-300 hover:scale-105 ${
                          message.type === "customer"
                            ? "bg-blue-600 text-white rounded-br-md hover:bg-blue-700"
                            : "bg-gray-100 text-gray-800 rounded-bl-md hover:bg-gray-150"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>

                    {/* Show image after "Here's the full look" message */}
                    {message.hasImage && (
                      <div
                        className="flex justify-start animate-fade-in-up"
                        style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                      >
                        <div className="max-w-xs">
                          <img
                            src="/placeholder.svg?height=200&width=160&text=Date+Night+Outfit"
                            alt="Date night outfit - black shirt and dark jeans"
                            className="rounded-2xl shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-300"
                            width={160}
                            height={200}
                          />
                          <div className="mt-2 px-2">
                            <p className="text-xs font-medium text-gray-500 apple-font-text">
                              Black shirt + Dark jeans
                            </p>
                            <p className="text-xs text-gray-400 apple-font-text">Arrives tomorrow</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-gentle"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-gentle"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-gentle"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The Intelligence */}
        <div className="py-24">
          <div
            data-reveal="6"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(6) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display">
              <span className="inline-block animate-text-reveal">It remembers everything</span>
              <br />
              <span className="inline-block animate-text-reveal text-gray-600" style={{ animationDelay: "0.3s" }}>
                that matters.
              </span>
            </h2>
            <div className="space-y-8">
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Not through invasive tracking or creepy surveillance, but through{" "}
                <span className="highlight-green">natural conversation</span>. It builds a complete picture of who you
                are, what you love, and what you need—creating a shopping experience that feels personal and intuitive.
              </p>
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                Every interaction becomes smarter. Every recommendation becomes more relevant. Every purchase becomes
                part of a larger story about your life and style.
              </p>
            </div>
          </div>
        </div>

        {/* Product Intelligence */}
        <div className="py-24">
          <div
            data-reveal="7"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(7) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display animate-text-reveal">
              We make products intelligent.
            </h2>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8 hover:shadow-lg transition-all duration-700 ease-out hover:scale-[1.01] animate-card-float">
              <div className="text-center space-y-8">
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <p className="text-sm font-semibold text-gray-400 mb-3 apple-font-text">
                    Traditional product description
                  </p>
                  <p className="text-lg text-gray-600 font-medium apple-font-text">
                    "Black T-shirt, Size M, 100% Cotton"
                  </p>
                </div>
                <div
                  className="w-px h-12 bg-gray-200 mx-auto animate-expand-vertical"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <p className="text-sm font-semibold text-gray-400 mb-3 apple-font-text">WithConvey description</p>
                  <p className="text-lg text-gray-900 font-semibold apple-font-text animate-text-glow">
                    "Minimalist essential that works with everything. Perfect for layering or wearing solo.{" "}
                    <span className="highlight-purple">Matches 12 items</span> in your current wardrobe and complements
                    your understated style."
                  </p>
                </div>
              </div>
            </div>
            <p
              className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              Every product becomes a relationship opportunity. Every description tells a story. Every recommendation
              connects to your broader lifestyle and preferences.
            </p>
          </div>
        </div>

        {/* Cross-Brand Magic */}
        <div className="py-24">
          <div
            data-reveal="8"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(8) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display">
              <span className="inline-block animate-slide-in-left">One conversation,</span>
              <br />
              <span className="inline-block animate-slide-in-right text-gray-600" style={{ animationDelay: "0.3s" }}>
                infinite possibilities.
              </span>
            </h2>
            <div className="space-y-8">
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Your AI agent doesn't just know one store—it understands your entire lifestyle. Sports equipment from
                Brand A connects to apparel from Brand B, which complements tech from Brand C, which enhances your home
                setup from Brand D.
              </p>
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                It's not about selling you more things. It's about creating a{" "}
                <span className="highlight-blue">seamless, connected experience</span> where every purchase makes sense
                in the context of your life.
              </p>
            </div>
          </div>
        </div>

        {/* The Transformation */}
        <div className="py-24">
          <div
            data-reveal="9"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(9) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display animate-text-reveal">
              This changes everything.
            </h2>
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl font-bold text-gray-900 mb-2 apple-font-display animate-number-count">85%</div>
                <div className="text-sm font-semibold text-gray-500 apple-font-text">Higher conversion rates</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="text-3xl font-bold text-gray-900 mb-2 apple-font-display animate-number-count">3x</div>
                <div className="text-sm font-semibold text-gray-500 apple-font-text">Customer lifetime value</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <div className="text-3xl font-bold text-gray-900 mb-2 apple-font-display animate-number-count">60%</div>
                <div className="text-sm font-semibold text-gray-500 apple-font-text">Reduction in support tickets</div>
              </div>
            </div>
            <p
              className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              While others optimize for clicks, you optimize for conversations. While others hire more support staff, AI
              handles it all. While others chase metrics, you build relationships.
            </p>
          </div>
        </div>

        {/* The Future */}
        <div className="py-24">
          <div
            data-reveal="10"
            className={`transition-all duration-1200 ease-out ${
              visibleElements.has(10) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight apple-font-display">
              <span className="inline-block animate-text-reveal">Commerce is becoming</span>
              <br />
              <span className="inline-block animate-text-reveal text-gray-700" style={{ animationDelay: "0.3s" }}>
                conversational.
              </span>
            </h2>
            <div className="space-y-8">
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Just like mobile replaced desktop, and apps replaced websites, conversation will replace clicking. The
                future of commerce isn't about better interfaces—it's about no interface at all.
              </p>
              <p
                className="text-xl font-medium text-gray-600 leading-relaxed apple-font-text animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                It's about natural, human interaction that feels effortless, personal, and genuinely helpful. That
                future is here, and it starts with a simple conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-32">
          <div
            data-reveal="11"
            className={`text-center transition-all duration-1200 ease-out ${
              visibleElements.has(11) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight apple-font-display animate-text-reveal">
              Ready to transform your commerce?
            </h2>
            <p
              className="text-lg font-semibold text-gray-600 mb-12 leading-relaxed apple-font-text animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Join the conversation revolution and discover what happens when shopping becomes as natural as talking to
              a friend.
            </p>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-12 py-4 rounded-full border-0 text-lg apple-font-text transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg animate-button-float metal-shine-button"
                style={{ animationDelay: "0.6s" }}
              >
                Start the Conversation
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <div>
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 font-semibold text-lg apple-font-text transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: "0.8s" }}
                >
                  <MessageCircle className="mr-2 h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                  See How It Works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="py-16 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6 animate-expand"></div>
          <p className="text-sm font-medium text-gray-400 tracking-wide apple-font-text animate-fade-in">
            © 2025 WithConvey. Where conversation becomes commerce.
          </p>
        </div>
      </footer>
    </div>
  )
}
