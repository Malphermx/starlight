"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import Image from "next/image"

const services = [
  {
    image: "/images/service-home-care.jpg",
    title: "Atención Médica a Domicilio",
    description: "Médicos generales y especialistas que te visitan en casa. Consultas, diagnósticos y seguimiento personalizado.",
  },
  {
    image: "/images/service-ambulance.jpg",
    title: "Ambulancias y Urgencias",
    description: "Traslados de emergencia 24/7 en CDMX, Estado de México, Querétaro, Hidalgo y Morelos.",
  },
  {
    image: "/images/service-pharmacy.jpg",
    title: "Farmacia Especializada",
    description: "Medicamentos de alta especialidad, inmunológicos, reumatológicos y vacunas con entrega nacional.",
  },
  {
    image: "/images/service-rehab.jpg",
    title: "Rehabilitación",
    description: "Terapia física, pulmonar, ocupacional, de deglución, neurológica y de lenguaje.",
  },
  {
    image: "/images/service-nursing.jpg",
    title: "Enfermería",
    description: "Auxiliares, enfermeras generales y especialistas para cuidados continuos.",
  },
  {
    image: "/images/service-oxygen.jpg",
    title: "Oxígeno y Ventilación",
    description: "Equipos de oxigenoterapia y ventilación mecánica para pacientes que lo requieran.",
  },
  {
    image: "/images/service-equipment.jpg",
    title: "Equipo Médico",
    description: "Renta y venta de camas hospitalarias, sillas de ruedas, marcos ortopédicos y más.",
  },
  {
    image: "/images/service-supplies.jpg",
    title: "Material de Curación",
    description: "Suministros médicos, material de curación e implantes con disponibilidad inmediata.",
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="servicios"
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
    >
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/medical-equipment.jpg')" }}
      />
      <div className="absolute inset-0 bg-foreground/95" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/20 px-4 py-1 rounded-full">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Servicios Integrales para tu Salud
          </h2>
          <p className="text-white/70 text-lg text-pretty">
            Contamos con una amplia gama de servicios médicos diseñados para cubrir todas tus necesidades de salud
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const isActive = activeIndex === index

            return (
              <div
                key={index}
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 h-[320px]",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                  isActive ? "scale-105" : ""
                )}
                style={{ transitionDelay: `${index * 75}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed text-pretty transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className={cn(
          "text-center mt-12 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 rounded-full">
            Ver Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  )
}
