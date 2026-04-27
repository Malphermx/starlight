"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, ChevronLeft, ChevronRight, Users, Building2, Truck } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import doctor_hero from "@/assets/doctor_hero.png"
import { ModalRegistro } from "./ModalRegistro"
import fondoVideo from "@/assets/video/Loop-VideoStarlight-Website.mp4"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [prospectType, setProspectType] = useState<"general" | "empresa" | "proveedor">("general")

  // Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const openModalWithType = (type: "general" | "empresa" | "proveedor") => {
    setProspectType(type)
    setModalOpen(true)
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    }
  }, [emblaApi])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  // Slides data for carousel
  const carouselSlides = [
    {
      type: "general",
      icon: Users,
      title: "Estamos para cuidarte",
      description: "Atención médica domiciliaria, emergencias y farmacia a un click.",
      buttonText: "Solicitar Atención",
      buttonAction: () => openModalWithType("general"),
      bgClass: "from-blue-500/20 to-primary/20",
    },
    {
      type: "empresa",
      icon: Building2,
      title: "Servicios Corporativos",
      description: "Planes de salud empresarial, prevención de riesgos, revisión médica.",
      buttonText: "Soluciones para tu Empresa",
      buttonAction: () => openModalWithType("empresa"),
      bgClass: "from-green-500/20 to-teal-500/20",
    },
    {
      type: "proveedor",
      icon: Truck,
      title: "Sé parte de nuestra Red",
      description: "Únete a nuestra red nacional, amplía tu alcance y recibe pacientes de forma continua.",
      buttonText: "Únete como Proveedor",
      buttonAction: () => openModalWithType("proveedor"),
      bgClass: "from-yellow-500/20 to-orange-500/20",
    },
  ]

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="/path-to-poster-image.jpg"
      >
        <source src={fondoVideo} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/60 to-secondary/85" />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent -rotate-12 top-1/3 -left-1/4 opacity-40" />
        <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -rotate-12 top-2/3 -left-1/4 opacity-30" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-32 ">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-7 hero-responsive">
            {/* Headline */}
            <div
              className={`hidden lg:flex space-y-3 md:space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-[0.9] tracking-tight text-balance">
                <span className="text-white">CUIDAMOS</span>
                <br />
                <span className="text-white">TU</span>{" "}
                <span className="text-yellow" style={{ color: "rgba(253, 235, 26,1)" }}>
                  SALUD
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className={`hidden lg:flex text-base md:text-lg lg:text-xl max-w-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ color: "white" }}
            >
              Soluciones médicas integrales al alcance de tu mano. Desde atención domiciliaria hasta traslados de
              emergencia, estamos contigo cuando más lo necesitas.
            </p>

            {/* Primary CTA (visible en todos los tamaños) */}
            <div
              className={`hidden lg:flex transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <Button
                size="lg"
                className="bg-yellow text-primary-foreground text-base font-bold px-8 h-12 md:h-14 gap-2 group"
                onClick={() => openModalWithType("general")}
              >
                Solicitar Atención
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Opciones adicionales SOLO en desktop */}
            <div
              className={`hidden lg:flex gap-6 xl:gap-12 pt-6 xl:pt-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <button
                onClick={() => openModalWithType("empresa")}
                className="flex items-center font-black text-primary border-green rounded-2xl p-3 ctaIni transition-colors text-sm xl:text-base"
              >
                Soluciones de Salud para tu Empresa
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => openModalWithType("proveedor")}
                className="flex items-center font-black text-primary border-green rounded-2xl p-3 ctaIni transition-colors text-sm xl:text-base"
              >
                Únete a la Red de Proveedores
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Carousel (reemplaza los botones secundarios) */}
            <div className="lg:hidden  mt-6  w-full">
              <div className=" w-full">
                <h1 className="mt-10 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-[0.9] tracking-tight text-balance">
                  <span className="text-white">CUIDAMOS</span>
                  <br />
                  <span className="text-white">TU</span>{" "}
                  <span className="text-yellow" style={{ color: "rgba(253, 235, 26,1)" }}>
                    SALUD
                  </span>
                </h1>
                <p
                  className={`my-3 text-base md:text-lg lg:text-xl max-w-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  style={{ color: "white" }}
                >
                  Soluciones médicas integrales al alcance de tu mano. Desde atención domiciliaria hasta traslados de
                  emergencia, estamos contigo cuando más lo necesitas.
                </p>
                <div className="overflow-hidden" ref={emblaRef}>

                  <div className="flex">

                    {carouselSlides.map((slide, idx) => (
                      <div
                        key={idx}
                        className="flex-[0_0_50%] min-w-0 mx-4 last:mr-0"
                      >
                        <div
                          className={`bg-gradient-to-br ${slide.bgClass} backdrop-blur-sm bg-white/10 rounded-3xl p-5 border border-white/20 shadow-xl`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/20 rounded-xl">
                              <slide.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                          </div>
                          <p className="text-white/90 text-sm leading-relaxed mb-5">
                            {slide.description}
                          </p>
                          <Button
                            onClick={slide.buttonAction}
                            variant="secondary"
                            className="w-full bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm font-semibold gap-2"
                          >
                            {slide.buttonText}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                {scrollSnaps.length > 1 && (
                  <>
                    <button
                      onClick={() => emblaApi?.scrollPrev()}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/40 transition-colors"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => emblaApi?.scrollNext()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/40 transition-colors"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dots */}
                {scrollSnaps.length > 1 && (
                  <div className="flex justify-center gap-2 mt-5">
                    {scrollSnaps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === selectedIndex
                          ? "w-6 bg-yellow"
                          : "w-2 bg-white/50 hover:bg-white/80"
                          }`}
                        aria-label={`Ir a slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards (solo desktop) */}
          <div
            className={`relative hidden lg:block h-[600px] transition-all duration-1000 delay-300  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            {/* Main Image Card */}
            <div className="absolute top-12 right-12 overflow-hidden">
              <img
                src={doctor_hero}
                alt="Equipo médico"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute card-hero bg-card border border-border p-6 animate-float rounded-2xl">
              <div className="text-4xl font-black text-primary">+10</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>

            {/* Floating Badge 2 */}
            <div
              className="absolute bottom-20 left-12 bg-primary text-primary-foreground p-6 rounded-2xl"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-sm font-bold uppercase tracking-wider">Atención</div>
              <div className="text-2xl font-black">24/7</div>
            </div>

            {/* Floating Badge 3 */}
            <div
              className="absolute card-hero1 bg-blue text-primary-foreground p-6 rounded-2xl"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-sm font-bold uppercase tracking-wider">Cobertura</div>
              <div className="text-2xl font-black">servicios a nivel nacional</div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 -left-8 w-16 h-16 border-2 border-primary/30 rotate-45 rounded-2xl" />
            <div className="absolute top-1 -left-20 w-16 h-16 border-2 border-primary/30 rotate-45 rounded-2xl" />
            <div className="absolute bottom-0 right-1/4 w-24 h-1 bg-primary" />
          </div>
        </div>
      </div>

      <ModalRegistro
        open={modalOpen}
        onOpenChange={setModalOpen}
        tipoProspecto={prospectType}
      />
    </section>
  )
}