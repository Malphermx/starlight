"use client"

import { useEffect, useRef, useState } from "react"
import { User, Building2, Handshake, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const userTypes = [
  {
    icon: User,
    title: "Paciente / Usuario",
    description: "Necesito atención médica a domicilio, ambulancia o servicios de salud personalizados.",
    cta: "Solicitar Atención",
    color: "bg-hero",
    bgImage: "/images/doctor-home.jpg",
  },
  {
    icon: Building2,
    title: "Corporativo / Empresa",
    description: "Busco soluciones de salud integrales para mi empresa, convenios y ferias de salud.",
    cta: "Cotizar Servicios",
    color: "bg-userSelector2",
    bgImage: "/images/corporate.jpg",
  },
  {
    icon: Handshake,
    title: "Proveedor / Red Médica",
    description: "Quiero formar parte de la red de profesionales y proveedores de Starlight.",
    cta: "Únete a la Red",
    color: "bg-userSelector",
    bgImage: "/images/team.jpg",
  },
]

export function UserSelector() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Empieza Aquí
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            ¿Cómo podemos ayudarte?
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Selecciona tu perfil para brindarte la mejor experiencia y soluciones personalizadas
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {userTypes.map((type, index) => {
            const Icon = type.icon
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20",
                  isHovered ? "scale-105 z-10" : "scale-100 z-0"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ 
                    backgroundImage: `url('${type.bgImage}')`,
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
                  type.color,
                  isHovered ? "opacity-90" : "opacity-80"
                )} />

                {/* Content */}
                <div className="relative z-10 p-8 min-h-[380px] flex flex-col">
                  {/* Icon */}
                  <div style={type.title === "Paciente / Usuario"?{background:'rgba(7, 67, 140, 0.7)'}:type.title === "Corporativo / Empresa"?{background:'rgba(0, 128, 53, 0.7)'}:{background:'rgba(191, 0, 0, 0.6)'}} className={cn(
                    "w-16 h-16 rounded-2xl  flex items-center justify-center mb-6 transition-all duration-500",
                    isHovered ? "scale-110 bg-white/30" : ""
                  )}>
                    <Icon className="w-8 h-8 text-white"  />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {type.title}
                  </h3>
                  <p className="text-white/80 text-pretty leading-relaxed flex-grow">
                    {type.description}
                  </p>

                  {/* CTA */}
                  <div className={cn(
                    "mt-6 flex items-center gap-2 text-white font-semibold transition-all duration-500",
                    isHovered ? "translate-x-2" : ""
                  )}
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span>{type.cta}</span>
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isHovered ? "translate-x-2" : ""
                    )} />
                  </div>
                </div>

                {/* Shine Effect */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000",
                  isHovered ? "translate-x-full" : ""
                )} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
