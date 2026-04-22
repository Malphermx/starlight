"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
// import { LeadModal } from "@/components/LeadModal";
// Ya no necesitas la imagen de oficinas
// import oficinas from "@/assets/oficinas.jpg"
// import ambulancia from "@/assets/hero_ambulancia.png"
import doctor_hero from "@/assets/doctor_hero.png"
import { ModalRegistro } from "./ModalRegistro"
// import { motion } from "framer-motion";

// Importa el video (ajusta la ruta según donde guardes tu archivo)
// Puedes usar un video de la carpeta public o assets
import fondoVideo from "@/assets/video/Loop-VideoStarlight-Website.mp4" // <-- Cambia por la ruta de tu video

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false);
  const [prospectType, setProspectType] = useState<"general" | "empresa" | "proveedor">("general");

  const openModalWithType = (type: "general" | "empresa" | "proveedor") => {
    setProspectType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

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
        poster="/path-to-poster-image.jpg" // Opcional: imagen mientras carga
      >
        <source src={fondoVideo} type="video/mp4" />
        {/* Fallback en caso de que el navegador no soporte video */}
        Tu navegador no soporta videos.
      </video>

      {/* Degradado blanco superpuesto (ahora sobre el video) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white/50 pointer-events-none z-10" />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent -rotate-12 top-1/3 -left-1/4 opacity-40" />
        <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -rotate-12 top-2/3 -left-1/4 opacity-30" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-7">
            {/* Headline */}
            <div
              className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight text-balance">
                <span className="text-foreground">CUIDAMOS</span>
                <br />
                <span className="text-foreground">TU</span>{" "}
                <span className="text-primary">SALUD</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl  max-w-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              Soluciones médicas integrales al alcance de tu mano. Desde atención domiciliaria hasta traslados de emergencia, estamos contigo cuando más lo necesitas.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 h-14 gap-2 group"
                onClick={() => openModalWithType("general")}
              >
                Solicitar Atención
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Opciones adicionales como botones clickeables */}
            <div
              className={`flex gap-12 pt-8 border-top-green transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <button
                onClick={() => openModalWithType("empresa")}
                className="flex items-center font-black text-primary border-green rounded-2xl p-3 ctaIni transition-colors"
              >
                Soluciones de Salud para tu Empresa
                <ArrowRight className="w-7 h-7 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => openModalWithType("proveedor")}
                className="flex items-center font-black text-primary border-green rounded-2xl p-3 ctaIni transition-colors"
              >
                Únete a la Red de Proveedores
                <ArrowRight className="w-7 h-7 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div
            className={`relative hidden lg:block h-[600px] transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            {/* Main Image Card */}
            <div className="absolute top-12 right-12 overflow-hidden">
              <img
                src={doctor_hero}
                alt="Equipo médico"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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