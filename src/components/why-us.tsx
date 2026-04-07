"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Award, Heart, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: MapPin,
    title: "Cobertura Nacional",
    description: "Presencia en toda la República Mexicana con servicios de emergencia y atención programada.",
  },
  {
    icon: Clock,
    title: "Atención 24/7",
    description: "Disponibles las 24 horas del día, los 365 días del año para cualquier emergencia.",
  },
  {
    icon: Award,
    title: "Personal Certificado",
    description: "Médicos, enfermeras y técnicos con las más altas certificaciones y capacitación continua.",
  },
  {
    icon: Heart,
    title: "Solución Integral",
    description: "Un solo proveedor para todas tus necesidades de salud: atención, equipo y farmacia.",
  },
]



export function WhyUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Especializados en servicios médicos a domicilio
            </h2>
            <p className="text-muted-foreground text-lg mb-8 text-pretty leading-relaxed">
              Nuestra misión es ofrecer servicios médicos eficientes y oportunos, 
              con los más altos estándares de calidad y calidez que respondan a las 
              necesidades de nuestros pacientes y clientes.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-4 p-4 rounded-xl hover:bg-muted transition-all duration-500",
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm text-pretty">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Stats & Image */}
          <div className={cn(
            "relative transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden mb-8">
              <img
                src="/images/team.jpg"
                alt="Equipo médico Starlight"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg">Fundada en 2016</p>
                    <p className="text-muted-foreground text-sm">
                      Contigo durante toda tu recuperación
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
