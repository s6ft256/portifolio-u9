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
  const [matrixChars, setMatrixChars] = useState<
    Array<{ id: number; x: number; delay: number; duration: number; char: string; type: string }>
  >([])
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
    const generateMatrixChars = () => {
      const chars = []
      const matrixCharacters = [
        "0",
        "1",
        "ア",
        "イ",
        "ウ",
        "エ",
        "オ",
        "カ",
        "キ",
        "ク",
        "ケ",
        "コ",
        "サ",
        "シ",
        "ス",
        "セ",
        "ソ",
        "タ",
        "チ",
        "ツ",
        "テ",
        "ト",
        "ナ",
        "ニ",
        "ヌ",
        "ネ",
        "ノ",
        "ハ",
        "ヒ",
        "フ",
        "ヘ",
        "ホ",
        "マ",
        "ミ",
        "ム",
        "メ",
        "モ",
        "ヤ",
        "ユ",
        "ヨ",
        "ラ",
        "リ",
        "ル",
        "レ",
        "ロ",
        "ワ",
        "ヲ",
        "ン",
      ]
      const animationTypes = [
        "animate-matrix-fall",
        "animate-matrix-fall-fast",
        "animate-matrix-fall-slow",
        "animate-matrix-fall-medium",
      ]

      for (let i = 0; i < 80; i++) {
        chars.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 2 + Math.random() * 4,
          char: matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)],
          type: animationTypes[Math.floor(Math.random() * animationTypes.length)],
        })
      }
      setMatrixChars(chars)
    }

    generateMatrixChars()

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {matrixChars.map((char) => (
          <div
            key={char.id}
            className={`absolute matrix-char text-lg font-mono ${char.type}`}
            style={{
              left: `${char.x}%`,
              animationDelay: `${char.delay}s`,
              animationDuration: `${char.duration}s`,
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        <div
          className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-float-complex matrix-glow"
          style={{
            left: `${20 + Math.sin(scrollY * 0.001) * 10}%`,
            top: `${30 + Math.cos(scrollY * 0.002) * 15}%`,
          }}
        />
        <div
          className="absolute w-3 h-3 bg-emerald-300/20 rounded-full animate-spin-slow matrix-glow"
          style={{
            right: `${15 + Math.cos(scrollY * 0.0015) * 20}%`,
            top: `${60 + Math.sin(scrollY * 0.001) * 10}%`,
          }}
        />
        <div
          className="absolute w-1 h-1 bg-green-500/40 rounded-full animate-pulse"
          style={{
            left: `${70 + Math.sin(scrollY * 0.003) * 25}%`,
            bottom: `${40 + Math.cos(scrollY * 0.002) * 20}%`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-matrix border-b border-green-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold gradient-text">Elius Niwamanya</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-green-400 hover:text-green-300 transition-colors">
                About
              </a>
              <a href="#experience" className="text-green-400 hover:text-green-300 transition-colors">
                Experience
              </a>
              <a href="#skills" className="text-green-400 hover:text-green-300 transition-colors">
                Skills
              </a>
              <a href="#certifications" className="text-green-400 hover:text-green-300 transition-colors">
                Certifications
              </a>
              <a href="#contact" className="text-green-400 hover:text-green-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden glass-matrix-card p-2 matrix-glow">
              <img
                src="/el.jpg"
                alt="Elius Niwamanya"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-slide-in-up">Elius Niwamanya</h1>

          <p className="text-xl md:text-2xl text-green-300/80 mb-8 animate-slide-in-up stagger-1">
            Safety Officer • Developer • Data Analyst
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-in-up stagger-2">
            <Badge className="glass-matrix text-green-400 border-green-500/30">IOSH Certified</Badge>
            <Badge className="glass-matrix text-green-400 border-green-500/30">Full Stack Developer</Badge>
            <Badge className="glass-matrix text-green-400 border-green-500/30">ML Engineer</Badge>
            <Badge className="glass-matrix text-green-400 border-green-500/30">Cybersecurity</Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up stagger-3">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold matrix-glow transition-all duration-300"
              asChild
            >
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all duration-300 bg-transparent"
              asChild
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-lg text-green-300/70 max-w-3xl mx-auto">
              Combining safety expertise with cutting-edge technology to create secure, innovative solutions for the
              modern workplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-green-200/80 leading-relaxed">
                As an IOSH-certified Safety Officer with a passion for technology, I bridge the gap between traditional
                safety management and modern digital solutions. My unique combination of safety expertise and technical
                skills allows me to develop comprehensive HSE management systems that not only ensure compliance but
                also drive operational efficiency.
              </p>

              <p className="text-green-200/80 leading-relaxed">
                With experience in Python, machine learning, and cybersecurity, I bring a data-driven approach to safety
                management, helping organizations make informed decisions through advanced analytics and real-time
                monitoring systems.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="glass-matrix-card p-6 text-center matrix-glow">
                  <div className="text-2xl font-bold text-green-400 mb-2">IOSH</div>
                  <div className="text-sm text-green-300/70">Certified Professional</div>
                </div>
                <div className="glass-matrix-card p-6 text-center matrix-glow">
                  <div className="text-2xl font-bold text-green-400 mb-2">2019</div>
                  <div className="text-sm text-green-300/70">Coding Since</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-matrix-card p-8 matrix-glow">
                <img src="/el.jpg" alt="Elius Niwamanya Professional" className="w-full h-80 object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Featured Projects</h2>
            <p className="text-lg text-green-300/70 max-w-2xl mx-auto">
              Innovative solutions combining safety management with modern technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* HSE Management System */}
            <div className="glass-matrix-card p-8 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-400 mb-3">HSE Management System</h3>
                <p className="text-green-200/70 mb-4">
                  Comprehensive safety management platform with real-time monitoring, incident reporting, and compliance
                  tracking.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="glass-matrix text-green-400 border-green-500/30">React</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Node.js</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">MongoDB</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Express</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Chart.js</Badge>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    500+ active users
                  </div>
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Real-time incident reporting
                  </div>
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Automated compliance tracking
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold"
                >
                  <a href="https://github.com/s6ft256/track" target="_blank" rel="noopener noreferrer">
                    View Source Code
                  </a>
                </Button>
              </div>
            </div>

            {/* Weather Forecast App */}
            <div className="glass-matrix-card p-8 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-400 mb-3">Weather Forecast App</h3>
                <p className="text-green-200/70 mb-4">
                  Modern weather application with 7-day forecasts, interactive maps, and severe weather alerts.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="glass-matrix text-green-400 border-green-500/30">React</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">OpenWeather API</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Chart.js</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Geolocation</Badge>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    7-day detailed forecasts
                  </div>
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Interactive weather maps
                  </div>
                  <div className="flex items-center text-sm text-green-300/70">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Real-time weather alerts
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                >
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Professional Experience</h2>
            <p className="text-lg text-green-300/70 max-w-2xl mx-auto">
              Real-world impact in safety management and construction projects
            </p>
          </div>

          <div className="glass-matrix-card p-8 matrix-glow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Safety Officer</h3>
                <p className="text-lg text-green-300/80 mb-2">Trojan / National Project Construction</p>
                <p className="text-green-300/60">Construction Site • Full-time</p>
              </div>
              <div className="text-green-400 font-semibold mt-4 md:mt-0">2025 - Present</div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-green-400 mb-4">Key Achievements</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-200/80">
                      Implemented HSE management systems reducing workplace incidents by 40%
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-200/80">
                      Conducted daily safety inspections and risk assessments for 500+ workers
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-200/80">
                      Developed and delivered safety training programs achieving 98% compliance
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-200/80">
                      Created digital incident reporting system improving response time by 60%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-green-200/80">
                    Maintained IOSH safety standards across multiple construction phases
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-4">Core Skills Applied</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30">HSE Management</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30">Risk Assessment</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30">IOSH Standards</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30">Safety Training</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30">Incident Investigation</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30">Compliance Management</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Technical Skills</h2>
            <p className="text-lg text-green-300/70 max-w-2xl mx-auto">
              Diverse technical expertise spanning multiple domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Web Development */}
            <div className="glass-matrix-card p-6 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black font-bold">💻</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">Web Development</h3>
              </div>
              <div className="space-y-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">React</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">Node.js</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  JavaScript
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  HTML/CSS
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">MongoDB</Badge>
              </div>
            </div>

            {/* Python & ML */}
            <div className="glass-matrix-card p-6 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black font-bold">🐍</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">Python & ML</h3>
              </div>
              <div className="space-y-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Machine Learning
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">Pandas</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">NumPy</Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Scikit-learn
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  TensorFlow
                </Badge>
              </div>
            </div>

            {/* Data Analysis */}
            <div className="glass-matrix-card p-6 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black font-bold">📊</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">Data Analysis</h3>
              </div>
              <div className="space-y-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Data Mining
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Statistical Analysis
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Data Visualization
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Matplotlib
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">Seaborn</Badge>
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="glass-matrix-card p-6 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black font-bold">🔒</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">Cybersecurity</h3>
              </div>
              <div className="space-y-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Penetration Testing
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Vulnerability Assessment
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Network Security
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Security Auditing
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Risk Analysis
                </Badge>
              </div>
            </div>

            {/* HSE & Events */}
            <div className="glass-matrix-card p-6 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black font-bold">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-green-400">HSE & Events</h3>
              </div>
              <div className="space-y-2">
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  HSE Officer
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Plant Operations
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Equipment Management
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Event Industry
                </Badge>
                <Badge className="glass-matrix text-green-400 border-green-500/30 w-full justify-center">
                  Safety Compliance
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Certifications */}
      <section id="certifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Professional Certifications</h2>
            <p className="text-lg text-green-300/70 max-w-2xl mx-auto">
              Validated expertise in safety management and technical development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* IOSH Certificate */}
            <div className="glass-matrix-card p-8 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-6">
                <div
                  className="w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handlePreviewCertificate("/iosh-certificate.jpg")}
                >
                  <img
                    src="/iosh-certificate.jpg"
                    alt="IOSH Managing Safely Certificate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">IOSH Managing Safely</h3>
                <p className="text-green-300/70 mb-4">
                  Institution of Occupational Safety and Health certification in safety management, issued May 2025
                  through Speed Way Safety Training Centre LLC.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Safety Management</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Risk Assessment</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">IOSH Standards</Badge>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold"
                >
                  <a href="/iosh-certificate.jpg" download="IOSH_Certificate_Elius_Niwamanya.jpg">
                    Download Certificate
                  </a>
                </Button>
              </div>
            </div>

            {/* Coding Certificate */}
            <div className="glass-matrix-card p-8 hover:scale-105 transition-all duration-300 matrix-glow">
              <div className="text-center mb-6">
                <div
                  className="w-full h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handlePreviewCertificate("/certificate.jpg")}
                >
                  <img
                    src="/certificate.jpg"
                    alt="Coding Fundamentals Certificate"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Coding Fundamentals</h3>
                <p className="text-green-300/70 mb-4">
                  Certificate of completion for coding fundamentals from Grasshopper, awarded July 2019 by Laura Holmes,
                  Founder & CEO.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Programming Basics</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">JavaScript</Badge>
                  <Badge className="glass-matrix text-green-400 border-green-500/30">Problem Solving</Badge>
                </div>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold"
                >
                  <a href="/certificate.jpg" download="Coding_Certificate_Elius_Niwamanya.jpg">
                    Download Certificate
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClosePreview}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Certificate Preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={handleClosePreview}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Let's Work Together</h2>
            <p className="text-lg text-green-300/70 max-w-2xl mx-auto">
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
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-black">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">Email</p>
                      <p className="text-green-300/70">niwamanyaelius95@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-black">
                      📱
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">Phone</p>
                      <p className="text-green-300/70">+971 55 262 3327</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-black">
                      🌍
                    </div>
                    <div>
                      <p className="font-semibold text-green-400">Location</p>
                      <p className="text-green-300/70">UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Services Offered</h4>
                <ul className="space-y-2 text-green-300/70">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>HSE Management System Development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Safety Training & Compliance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Web Application Development</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Data Analysis & Visualization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Cybersecurity Assessment</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold"
                >
                  <a href="https://wa.me/971552623327" target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all duration-300 bg-transparent"
                >
                  <a href="tel:+971552623327">📞 Schedule a Call</a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-matrix-card p-8 matrix-glow">
              <h3 className="text-xl font-bold mb-6 gradient-text">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-green-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-black/20 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-green-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-green-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-black/20 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-green-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-green-400">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/20 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-green-200"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium mb-2 text-green-400">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/20 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-green-200"
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
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-green-400">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-black/20 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none text-green-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-semibold transition-all duration-300"
                >
                  Send Message
                </Button>
                <p className="text-xs text-green-300/60 text-center">
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
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
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
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <a href="https://www.facebook.com/share/1BGED9N6Ax/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <a href="https://x.com/Elius7c" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <a href="https://www.instagram.com/niwamanyaelius95/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
              >
                <a href="https://www.reddit.com/u/NIWAMANYAELIUS/" target="_blank" rel="noopener noreferrer">
                  Reddit
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="glass-matrix border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
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
