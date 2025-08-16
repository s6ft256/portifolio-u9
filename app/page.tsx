"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [raindrops, setRaindrops] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
  })

  useEffect(() => {
    const generateRaindrops = () => {
      const drops = []
      for (let i = 0; i < 50; i++) {
        drops.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 2 + Math.random() * 3,
        })
      }
      setRaindrops(drops)
    }

    generateRaindrops()

    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observerRef.current?.observe(section))

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      observerRef.current?.disconnect()
    }
  }, [])

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `${formData.inquiryType || "General Inquiry"} - ${formData.name}`
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`

    // Show options to user
    const choice = window.confirm("Choose how to send your message:\n\nOK = Email\nCancel = WhatsApp")

    if (choice) {
      // Send via email
      const mailtoLink = `mailto:niwamanyaelius95@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
      window.location.href = mailtoLink
    } else {
      // Send via WhatsApp
      const whatsappMessage = `*${subject}*\n\n${message}`
      const whatsappLink = `https://wa.me/971552623327?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappLink, "_blank")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePreviewCertificate = (imageSrc: string) => {
    setPreviewImage(imageSrc)
  }

  const handleClosePreview = () => {
    setPreviewImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-200/30 to-transparent rounded-full animate-rainfall"
            style={{
              left: `${drop.x}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              transform: `rotate(15deg)`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        <div
          className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-float-complex"
          style={{
            top: "10%",
            left: "5%",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute w-1 h-1 bg-purple-300/25 rounded-full animate-float-complex"
          style={{
            top: "20%",
            right: "10%",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-3 h-3 bg-cyan-300/15 rounded-full animate-float-complex"
          style={{
            bottom: "30%",
            left: "15%",
            animationDelay: "4s",
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 bg-pink-300/20 rounded-full animate-float-complex"
          style={{
            top: "60%",
            right: "20%",
            animationDelay: "1s",
          }}
        />
      </div>

      <div
        className="fixed w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out animate-pulse-slow"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${scrollY > 100 ? 2.2 : 1.5}) rotate(${scrollY * 0.8}deg)`,
          boxShadow: `0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2)`,
        }}
      />
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full pointer-events-none z-49 mix-blend-multiply transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${scrollY > 100 ? 1.8 : 1.2}) rotate(${-scrollY * 0.5}deg)`,
        }}
      />

      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClosePreview}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={handleClosePreview}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Certificate Preview"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <nav className="fixed top-0 w-full z-40 glass border-b border-white/20 transition-all duration-700 hover:backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold gradient-text animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-blue-500">
              Elius Niwamanya
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary transition-all duration-500 hover:scale-110 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-all duration-500 hover:scale-110 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20 bg-transparent hover:scale-110 transition-all duration-500 relative overflow-hidden group"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Button>
          </div>
        </div>
      </nav>

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-animate
        id="hero"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-pink-100/50 transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002}) rotate(${scrollY * 0.02}deg)`,
          }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-100/30 via-transparent to-rose-100/30 transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.01}deg) scale(${1 + scrollY * 0.0001})`,
          }}
        />

        <div
          className="absolute inset-0 opacity-30 transition-all duration-2000"
          style={{
            background: `radial-gradient(circle at ${50 + Math.sin(scrollY * 0.01) * 20}% ${50 + Math.cos(scrollY * 0.01) * 20}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${visibleSections.has("hero") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden soft-shadow animate-float relative group cursor-pointer">
              <img
                src="/el.jpg"
                alt="Elius Niwamanya - Professional portrait"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
                style={{
                  transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-spin-slow text-5xl font-normal"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="inline-block animate-slide-in-left hover:animate-bounce">Elius</span>
              <span className="gradient-text block animate-slide-in-right hover:animate-pulse">Niwamanya</span>
            </h1>

            <div
              className="flex flex-col gap-4 animate-fade-in-up sm:flex-row justify-between"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                size="lg"
                className="soft-shadow hover-lift transform hover:scale-110 transition-all duration-500 relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-card border-white/20 hover-lift bg-transparent transform hover:scale-110 transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10">Download Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </Button>
            </div>
          </div>
        </div>

        <div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-xl animate-float transition-all duration-2000"
          style={{
            transform: `translateX(${Math.sin(scrollY * 0.01) * 30 + Math.cos(scrollY * 0.005) * 10}px) translateY(${Math.cos(scrollY * 0.01) * 20 + Math.sin(scrollY * 0.008) * 15}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/40 to-orange-200/40 rounded-full blur-xl animate-float transition-all duration-2000"
          style={{
            animationDelay: "2s",
            transform: `translateX(${Math.cos(scrollY * 0.008) * -35 + Math.sin(scrollY * 0.012) * 15}px) translateY(${Math.sin(scrollY * 0.008) * 25 + Math.cos(scrollY * 0.006) * 10}px) rotate(${scrollY * 0.1}deg)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-lg animate-float transition-all duration-2000"
          style={{
            animationDelay: "4s",
            transform: `translateX(${Math.sin(scrollY * 0.012) * 40 + Math.cos(scrollY * 0.007) * 20}px) translateY(${Math.cos(scrollY * 0.012) * -30 + Math.sin(scrollY * 0.009) * 15}px) scale(${1 + Math.cos(scrollY * 0.01) * 0.3})`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-br from-violet-200/25 to-indigo-200/25 rounded-full blur-md animate-float transition-all duration-1500"
          style={{
            animationDelay: "1s",
            transform: `translateX(${Math.sin(scrollY * 0.015) * 25}px) translateY(${Math.cos(scrollY * 0.015) * 25}px)`,
          }}
        />
      </section>

      <section id="about" className="py-20 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 gradient-text">About Me</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm Elius Niwamanya, a certified safety professional and developer with IOSH Managing Safely
                certification and a strong foundation in coding fundamentals. I combine workplace safety expertise with
                technical skills to create secure, user-friendly digital solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My unique background spans safety management and web development, allowing me to build applications that
                prioritize both user experience and security. I'm passionate about creating technology that makes
                workplaces safer and more efficient.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">IOSH</div>
                  <div className="text-sm text-muted-foreground">Certified Safety Professional</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">2019</div>
                  <div className="text-sm text-muted-foreground">Coding Since</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden soft-shadow">
                <img
                  src="/el.jpg"
                  alt="Elius Niwamanya - Professional portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Featured Projects</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Real-world applications showcasing the intersection of technology and safety management
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* HSE Management System */}
              <div className="glass-card p-8 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-xs">
                    Safety Management
                  </Badge>
                  <div className="text-2xl">🛡️</div>
                </div>

                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  HSE Management System
                </h4>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Comprehensive Health, Safety & Environment management platform for construction projects. Features
                  risk assessment tools, incident reporting, safety training modules, and compliance tracking.
                </p>

                <div className="mb-6">
                  <h5 className="font-semibold mb-3 text-sm text-primary">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      MongoDB
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Express
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Chart.js
                    </Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold mb-3 text-sm text-primary">Key Features</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Real-time incident reporting</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Risk assessment workflows</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Safety training tracking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Compliance dashboard</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Mobile-responsive design</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="text-lg mr-2">💡</span>
                    Used by 500+ construction workers at Trojan/National Project
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 glass border-white/20 bg-transparent hover:bg-blue-500/10 transition-all duration-300"
                    asChild
                  >
                    <a href="https://github.com/s6ft256/track" target="_blank" rel="noopener noreferrer">
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>

              {/* Weather Forecast App */}
              <div className="glass-card p-8 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-xs">
                    Web Application
                  </Badge>
                  <div className="text-2xl">🌤️</div>
                </div>

                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  Weather Forecast App
                </h4>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Modern weather application with real-time forecasts, interactive maps, and severe weather alerts.
                  Clean, intuitive interface with location-based services and 7-day forecasts.
                </p>

                <div className="mb-6">
                  <h5 className="font-semibold mb-3 text-sm text-primary">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      OpenWeather API
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Chart.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Geolocation API
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      CSS3
                    </Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold mb-3 text-sm text-primary">Key Features</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Real-time weather data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>7-day forecast</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Interactive weather maps</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Severe weather alerts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Location-based services</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="text-lg mr-2">💡</span>
                    Clean, user-friendly interface with responsive design
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 glass border-white/20 bg-transparent hover:bg-blue-500/10 transition-all duration-300"
                    disabled
                  >
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Professional Experience</h3>
            <div className="glass-card p-8 soft-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold mb-2">Safety Officer</h4>
                  <p className="text-lg text-primary font-semibold mb-1">Trojan / National Project Construction</p>
                  <p className="text-sm text-muted-foreground">Construction Site • Full-time</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Badge variant="secondary" className="text-sm">
                    2023 - Present
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Real-world impact in safety management and construction projects, implementing comprehensive HSE systems
                and ensuring workplace safety compliance across large-scale construction operations.
              </p>

              <div className="mb-6">
                <h5 className="font-semibold mb-4 text-primary">Key Achievements</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Implemented HSE management systems reducing workplace incidents by 40%
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Conducted daily safety inspections and risk assessments for 500+ workers
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Developed and delivered safety training programs achieving 98% compliance
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Created digital incident reporting system improving response time by 60%
                    </p>
                  </div>
                  <div className="flex items-start space-x-3 md:col-span-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Maintained IOSH safety standards across multiple construction phases
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-4 text-primary">Core Skills Applied</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    HSE Management
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Risk Assessment
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Safety Training
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Incident Investigation
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    IOSH Standards
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Construction Safety
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Digital Systems
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Team Leadership
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Technical Skills</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Comprehensive technical expertise spanning development, data analysis, machine learning, and cybersecurity
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Web Development */}
              <div className="glass-card p-6 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="text-3xl mb-4 text-center">💻</div>
                <h4 className="text-lg font-bold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                  Web Development
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Node.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    JavaScript
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    HTML/CSS
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    MongoDB
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Express
                  </Badge>
                </div>
              </div>

              {/* Python & ML */}
              <div className="glass-card p-6 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="text-3xl mb-4 text-center">🐍</div>
                <h4 className="text-lg font-bold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                  Python & ML
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    Python
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Machine Learning
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Pandas
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    NumPy
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Scikit-learn
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    TensorFlow
                  </Badge>
                </div>
              </div>

              {/* Data Analysis */}
              <div className="glass-card p-6 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="text-3xl mb-4 text-center">📊</div>
                <h4 className="text-lg font-bold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                  Data Analysis
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    Data Mining
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Statistical Analysis
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Visualization
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Matplotlib
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Seaborn
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Jupyter
                  </Badge>
                </div>
              </div>

              {/* Cybersecurity */}
              <div className="glass-card p-6 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="text-3xl mb-4 text-center">🔒</div>
                <h4 className="text-lg font-bold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                  Cybersecurity
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    Penetration Testing
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Vulnerability Assessment
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Network Security
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Ethical Hacking
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Security Auditing
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="glass-card p-6 max-w-4xl mx-auto">
                <h4 className="text-lg font-semibold mb-4 text-primary">Technical Expertise Overview</h4>
                <p className="text-muted-foreground leading-relaxed">
                  My technical skill set combines traditional web development with advanced data science and
                  cybersecurity capabilities. This unique combination allows me to build secure, data-driven
                  applications while maintaining the highest standards of safety and security - essential for modern
                  digital solutions in safety-critical environments.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Professional Certifications</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Professional credentials demonstrating expertise in safety management and technical development
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* IOSH Certificate */}
              <div className="glass-card p-8 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="text-xs">
                    Safety Management
                  </Badge>
                  <div className="text-2xl">🛡️</div>
                </div>

                <div className="mb-6">
                  <img
                    src="/iosh-certificate.jpg"
                    alt="IOSH Managing Safely Certificate"
                    className="w-full h-48 object-cover rounded-lg soft-shadow group-hover:scale-105 transition-all duration-500 cursor-pointer"
                    onClick={() => handlePreviewCertificate("/iosh-certificate.jpg")}
                  />
                </div>

                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  IOSH Managing Safely
                </h4>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Institution of Occupational Safety and Health certification in safety management, awarded by Speed Way
                  Safety Training Centre LLC.
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      Certificate #09690803-01-IHQK
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Issued: May 13, 2025
                    </Badge>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Key Areas:</span> Risk Assessment, Incident
                      Investigation, Safety Leadership, Legal Compliance
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleDownload("/iosh-certificate.jpg", "IOSH_Certificate_Elius_Niwamanya.jpg")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Download Certificate
                </Button>
              </div>

              {/* Coding Fundamentals Certificate */}
              <div className="glass-card p-8 soft-shadow hover-lift transform hover:scale-105 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="secondary" className="text-xs">
                    Programming
                  </Badge>
                  <div className="text-2xl">💻</div>
                </div>

                <div className="mb-6">
                  <img
                    src="/certificate.jpg"
                    alt="Coding Fundamentals Certificate"
                    className="w-full h-48 object-cover rounded-lg soft-shadow group-hover:scale-105 transition-all duration-500 cursor-pointer"
                    onClick={() => handlePreviewCertificate("/certificate.jpg")}
                  />
                </div>

                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  Coding Fundamentals
                </h4>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Certificate of completion from Grasshopper, demonstrating foundational programming skills and
                  technical competency.
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      Grasshopper Certified
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Completed: July 11, 2019
                    </Badge>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Foundation:</span> Programming Logic, Problem
                      Solving, Code Structure, Development Principles
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleDownload("/certificate.jpg", "Coding_Certificate_Elius_Niwamanya.jpg")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Download Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring safety expertise and technical innovation to your next project? Let's discuss how we can
              create secure, efficient solutions together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 gradient-text">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">niwamanyaelius95@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      📱
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-muted-foreground">+971 55 262 3327</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      🌍
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-primary">Services Offered</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>HSE Management System Development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Safety Training & Compliance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Web Application Development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Data Analysis & Visualization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Cybersecurity Assessment</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300"
                >
                  <a href="https://wa.me/971552623327" target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="glass border-white/20 bg-transparent hover:bg-blue-500/10 transition-all duration-300"
                >
                  <a href="tel:+971552623327">📞 Schedule a Call</a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 gradient-text">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select an option</option>
                    <option value="HSE Consultation">HSE Consultation</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Send Message
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Choose between Email or WhatsApp when sending your message
                </p>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6 gradient-text">Connect With Me</h4>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a
                  href="https://www.linkedin.com/in/elius-niwamanya-026228187"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a href="https://www.facebook.com/share/1BGED9N6Ax/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a href="https://x.com/Elius7c" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a href="https://www.instagram.com/niwamanyaelius95/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a href="https://www.reddit.com/u/NIWAMANYAELIUS/" target="_blank" rel="noopener noreferrer">
                  Reddit
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass border-white/20 bg-transparent hover:bg-blue-500/10"
              >
                <a href="https://discord.gg/BzhZpcvC" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
