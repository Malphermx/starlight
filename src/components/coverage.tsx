"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, MapPin, Truck, Zap } from "lucide-react"

const coverageItems = [
  {
    icon: Zap,
    number: "01",
    title: "Urgencias",
    description: "Prestamos servicio de emergencias las 24 horas del día, los 7 días de la semana",
    highlight: "24/7",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Cobertura Nacional",
    description: "Cobertura de servicios a nivel nacional en toda la República Mexicana",
    highlight: "32 Estados",
  },
  {
    icon: Truck,
    number: "03",
    title: "Montaje de Servicios",
    description: "CDMX y Edo. Méx de 2 a 24 horas. Interior de la república de 24 a 48 horas",
    highlight: "2-48 hrs",
  },
  {
    icon: Clock,
    number: "04",
    title: "Respuesta Rápida",
    description: "Tiempos de respuesta optimizados para urgencias y servicios programados",
    highlight: "Express",
  },
]

const serviceTypes = [
  "Ambulancias",
  "Farmacia",
  "Rehabilitación",
  "Equipos Médicos",
  "Enfermería",
  "Oxígeno",
]

export function Coverage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
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

  // Auto-rotate active item
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % coverageItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section 
      id="cobertura"
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/ambulance.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/85" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
            Starlight México
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Tiempos de Respuesta y Cobertura
          </h2>
          <p className="text-white/70 text-lg text-pretty">
            Proveedor médico integral especializado con presencia en todo el país
          </p>
        </div>

        {/* Coverage Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {coverageItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeItem === index

            return (
              <div
                key={index}
                className={cn(
                  "relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-500",
                  isActive ? "bg-white/20 scale-105 shadow-2xl" : "hover:bg-white/15",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveItem(index)}
              >
                {/* Number */}
                <span className="absolute top-4 right-4 text-white/20 text-5xl font-bold">
                  {item.number}
                </span>

                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500",
                  isActive ? "bg-white text-primary" : "bg-white/20 text-white"
                )}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm mb-4 text-pretty">{item.description}</p>

                {/* Highlight Badge */}
                <div className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-bold transition-all duration-300",
                  isActive ? "bg-white text-primary" : "bg-white/20 text-white"
                )}>
                  {item.highlight}
                </div>

                {/* Progress Bar (for active) */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden">
                    <div className="h-full bg-white animate-[progress_4s_linear]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Service Types Marquee */}
        <div className={cn(
          "overflow-hidden transition-all duration-1000 delay-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex animate-marquee">
            {[...serviceTypes, ...serviceTypes, ...serviceTypes].map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full mx-2 whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-white font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Number */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-baseline gap-4">
            <span className="text-8xl md:text-9xl font-bold text-white">10+</span>
            <div className="text-left">
              <p className="text-white font-bold text-xl">Años siendo tu</p>
              <p className="text-white/70">proveedor médico integral</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
