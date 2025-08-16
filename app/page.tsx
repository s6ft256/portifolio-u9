"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Github, ExternalLink, Phone, Mail } from "lucide-react"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
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

  const projects = [
    {
      id: 1,
      title: "HSE Monitoring Web App",
      category: "Safety Management",
      image: "/modern-saas-dashboard.png",
      tags: ["React", "Safety", "Monitoring", "IOSH"],
      description:
        "Comprehensive Health, Safety & Environment monitoring system for workplace compliance and risk management",
      github: "https://github.com/s6ft256/track.git",
      live: "https://hse-monitoring.vercel.app",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "Web Development",
      image: "/modern-ecommerce-interface.png",
      tags: ["React", "Next.js", "Stripe"],
      description: "A full-stack e-commerce solution with modern UI/UX",
      github: "https://github.com/eliusniwamanya/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
    },
    {
      id: 3,
      title: "Safety Management System",
      category: "Web Development",
      image: "/modern-saas-dashboard.png",
      tags: ["IOSH", "Safety", "Management", "React"],
      description: "Comprehensive safety management platform for workplace safety compliance",
      github: "https://github.com/eliusniwamanya/safety-management",
      live: "https://safety-mgmt.vercel.app",
    },
    {
      id: 4,
      title: "Mobile App UI",
      category: "UI/UX Design",
      image: "/sleek-mobile-app-interface.png",
      tags: ["Mobile", "Figma", "Prototyping"],
      description: "Intuitive mobile app design for fitness tracking with smooth animations",
      github: "https://github.com/eliusniwamanya/fitness-app-ui",
      live: "https://fitness-ui-demo.vercel.app",
    },
    {
      id: 5,
      title: "Photography Portfolio",
      category: "Photography",
      image: "/artistic-photography-portfolio.png",
      tags: ["Portrait", "Commercial", "Editorial"],
      description: "Professional photography showcase website with gallery management",
      github: "https://github.com/eliusniwamanya/photo-portfolio",
      live: "https://photo-showcase.vercel.app",
    },
    {
      id: 6,
      title: "Art Direction Platform",
      category: "Creative Direction",
      image: "/creative-art-direction.png",
      tags: ["Campaign", "Visual", "Strategy"],
      description: "Creative campaign management platform for luxury fashion brands",
      github: "https://github.com/eliusniwamanya/art-direction",
      live: "https://creative-platform.vercel.app",
    },
  ]

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden">
      <div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${scrollY > 100 ? 1.8 : 1}) rotate(${scrollY * 0.5}deg)`,
          boxShadow: `0 0 20px rgba(59, 130, 246, 0.3)`,
        }}
      />
      <div
        className="fixed w-3 h-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full pointer-events-none z-49 mix-blend-multiply transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${scrollY > 100 ? 1.2 : 0.8}) rotate(${-scrollY * 0.3}deg)`,
        }}
      />

      <nav className="fixed top-0 w-full z-40 glass border-b border-white/20 transition-all duration-700 hover:backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold gradient-text animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-blue-500">
              Elius Niwamanya
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#work"
                className="text-sm font-medium hover:text-primary transition-all duration-500 hover:scale-110 relative group"
              >
                Work
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
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
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden soft-shadow animate-float relative group cursor-pointer">
              <img
                src="/el.jpg"
                alt="Elius Niwamanya - Professional portrait"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:contrast-110"
                style={{
                  transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.05})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-spin-slow"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="inline-block animate-slide-in-left hover:animate-bounce">Elius</span>
              <span className="gradient-text block animate-slide-in-right hover:animate-pulse">Niwamanya</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{
                animationDelay: "0.3s",
                background: "linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite, fade-in-up 1s ease-out 0.3s both",
              }}
            >
              Safety Professional & Developer crafting secure digital experiences with IOSH certification and coding
              expertise.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
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

      <section id="work" className="py-20 px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has("work") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-fade-in-up">Selected Work</h2>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              A curated collection of projects showcasing creativity, technical expertise, and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={`group glass-card border-white/10 overflow-hidden hover-lift cursor-pointer transform transition-all duration-700 hover:scale-110 hover:rotate-2 hover:shadow-2xl ${
                  visibleSections.has("work") ? "animate-slide-in-up" : "opacity-0 translate-y-20"
                }`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  transform: `translateY(${Math.sin((scrollY + index * 100) * 0.005) * 8}px) rotateX(${Math.cos((scrollY + index * 50) * 0.003) * 2}deg)`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110 group-hover:saturate-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  <Badge className="absolute top-4 left-4 glass border-white/20 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-3">
                    {project.category}
                  </Badge>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="glass border-white/20 bg-white/10 hover:bg-white/20 transform hover:scale-125 hover:rotate-12 transition-all duration-300"
                      asChild
                      style={{ animationDelay: "0.1s" }}
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="glass border-white/20 bg-white/10 hover:bg-white/20 transform hover:scale-125 hover:-rotate-12 transition-all duration-300"
                      asChild
                      style={{ animationDelay: "0.2s" }}
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-all duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed group-hover:text-foreground transition-colors duration-500">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs transform transition-all duration-500 hover:scale-125 hover:rotate-6 group-hover:bg-primary/10"
                        style={{
                          animationDelay: `${tagIndex * 0.1}s`,
                          transitionDelay: `${tagIndex * 0.05}s`,
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-gradient-to-r from-slate-50/50 to-blue-50/50" data-animate>
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
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden soft-shadow">
                <img
                  src="/el.jpg"
                  alt="Elius Niwamanya - Professional portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Professional Certifications</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-6 soft-shadow">
                <div className="mb-4">
                  <img
                    src="/iosh-certificate.jpg"
                    alt="IOSH Managing Safely Certificate"
                    className="w-full rounded-lg"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2">IOSH Managing Safely</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Institution of Occupational Safety and Health certification for workplace safety management.
                  Certificate #09690803-01-IHQK, issued May 13, 2025.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    IOSH
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Safety Management
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Workplace Safety
                  </Badge>
                </div>
                <Button
                  className="w-full glass border-white/20 bg-transparent"
                  variant="outline"
                  onClick={() => handleDownload("/iosh-certificate.jpg", "Elius_Niwamanya_IOSH_Certificate.jpg")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download IOSH Certificate
                </Button>
              </div>

              <div className="glass-card p-6 soft-shadow">
                <div className="mb-4">
                  <img src="/certificate.jpg" alt="Coding Fundamentals Certificate" className="w-full rounded-lg" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Coding Fundamentals</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive coding fundamentals certification from Grasshopper, completed July 11, 2019. Foundation
                  in JavaScript, HTML, and CSS.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    JavaScript
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    HTML
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    CSS
                  </Badge>
                </div>
                <Button
                  className="w-full glass border-white/20 bg-transparent"
                  variant="outline"
                  onClick={() => handleDownload("/certificate.jpg", "Elius_Niwamanya_Coding_Certificate.jpg")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Coding Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6" data-animate>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold mb-6 gradient-text transition-all duration-1000 ${visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            Let's Create Together
          </h2>
          <p
            className={`text-xl text-muted-foreground mb-8 leading-relaxed transition-all duration-1000 ${visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
            style={{ animationDelay: "0.2s" }}
          >
            Ready to bring your vision to life? I'd love to hear about your project and explore how we can work
            together.
          </p>

          <div
            className={`grid md:grid-cols-2 gap-6 mb-8 transition-all duration-1000 ${visibleSections.has("contact") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="glass-card p-6 hover-lift transform hover:scale-110 hover:-rotate-2 transition-all duration-500 group">
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary group-hover:animate-bounce" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">+971 55 262 3327</p>
              <Button
                className="w-full glass border-white/20 bg-transparent hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-500 relative overflow-hidden group/btn"
                variant="outline"
                asChild
              >
                <a
                  href="https://wa.me/971552623327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 group-hover/btn:animate-pulse" />
                  Message on WhatsApp
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                </a>
              </Button>
            </div>
            <div className="glass-card p-6 hover-lift transform hover:scale-110 hover:rotate-2 transition-all duration-500 group">
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary group-hover:animate-bounce" />
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Email</h3>
              <p className="text-muted-foreground mb-4">niwamanyaelius95@gmail.com</p>
              <Button
                className="w-full glass border-white/20 bg-transparent hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden group/btn"
                variant="outline"
                asChild
              >
                <a href="mailto:niwamanyaelius95@gmail.com" className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 group-hover/btn:animate-pulse" />
                  Send Email
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                </a>
              </Button>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button size="lg" className="soft-shadow hover-lift transform hover:scale-110 transition-all duration-500">
              Start a Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-card border-white/20 hover-lift bg-transparent transform hover:scale-110 transition-all duration-500"
            >
              Schedule a Call
            </Button>
          </div>

          <div
            className="flex justify-center space-x-6 flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href="https://www.linkedin.com/in/elius-niwamanya-026228187"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/share/1BGED9N6Ax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              Facebook
            </a>
            <a
              href="https://x.com/Elius7c"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/niwamanyaelius95/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              Instagram
            </a>
            <a
              href="https://www.reddit.com/u/NIWAMANYAELIUS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              Reddit
            </a>
            <a
              href="https://discord.gg/BzhZpcvC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-500 transform hover:scale-110"
            >
              Discord
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground animate-fade-in">
            © 2024 Elius Niwamanya. Crafted with passion and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  )
}
