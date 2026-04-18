"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { LeadModal } from "@/components/LeadModal";
import oficinas from "@/assets/oficinas.jpg"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false);

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
      style={{
        backgroundImage: `url('${oficinas}')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Degradado blanco superpuesto */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/50 pointer-events-none z-0" />

      {/* Diagonal accent lines - ahora sobre el degradado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent -rotate-12 top-1/3 -left-1/4 opacity-40" />
        <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -rotate-12 top-2/3 -left-1/4 opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-32">
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
              className={`text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              Soluciones médicas integrales a tu alcance. Desde atención domiciliaria
              hasta traslados de emergencia, estamos cuando más nos necesitas.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 h-14 gap-2 group"
                onClick={() => setModalOpen(true)}
              >
                Solicitar Atención
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`flex gap-12 pt-8 border-t border-border transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              {[
                { value: "Soluciones de Salud para tu Empresa", label: "" },
                { value: "Únete a la Red de Proveedores", label: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center font-black text-primary border rounded-2xl p-3 ctaIni">
                    {stat.value}
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div
            className={`relative hidden lg:block h-[600px] transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            {/* Main Image Card */}
            <div className="absolute top-12 right-12 w-[500px] h-[450px] overflow-hidden bg-card">
              <img
                src={oficinas}
                alt="Equipo médico"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute top-0 left-0 bg-card border border-border p-6 animate-float rounded-2xl">
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

            {/* Decorative Elements */}
            <div className="absolute top-1/2 -left-8 w-16 h-16 border-2 border-primary/30 rotate-45 rounded-2xl" />
            <div className="absolute top-1 -left-20 w-16 h-16 border-2 border-primary/30 rotate-45 rounded-2xl" />
            <div className="absolute bottom-0 right-1/4 w-24 h-1 bg-primary" />
          </div>
        </div>
      </div>

      <LeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  )
}