"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Paciente",
    image: "/images/doctor-home.jpg",
    rating: 5,
    text: "Excelente servicio de atención a domicilio. El médico llegó puntual y fue muy profesional. La atención fue cálida y resolvieron mis dudas completamente.",
  },
  {
    name: "Carlos Mendoza",
    role: "Director de RRHH - Empresa XYZ",
    image: "/images/corporate.jpg",
    rating: 5,
    text: "Starlight ha sido nuestro proveedor de servicios médicos corporativos por 3 años. Su profesionalismo y tiempos de respuesta son excepcionales.",
  },
  {
    name: "Ana Rodríguez",
    role: "Familiar de paciente",
    image: "/images/therapy.jpg",
    rating: 5,
    text: "El servicio de rehabilitación para mi madre fue extraordinario. Los terapeutas son muy capacitados y la evolución ha sido notable.",
  },
  {
    name: "Roberto Sánchez",
    role: "Médico Asociado",
    image: "/images/team.jpg",
    rating: 5,
    text: "Formar parte de la red Starlight ha sido una gran decisión. La organización, el apoyo y la calidad de los pacientes es excelente.",
  },
]

const clientLogos = [
  { name: "Aseguradora A", initial: "A" },
  { name: "Hospital B", initial: "H" },
  { name: "Clínica C", initial: "C" },
  { name: "Empresa D", initial: "E" },
  { name: "Farmacéutica F", initial: "F" },
  { name: "Gobierno G", initial: "G" },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
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

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className={cn(
          "relative max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-primary/10" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 text-pretty">
                {`"${testimonials[activeIndex].text}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonials[activeIndex].name}</p>
                  <p className="text-muted-foreground text-sm">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-primary w-8" 
                    : "bg-primary/30 hover:bg-primary/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className={cn(
          "transition-all duration-1000 delay-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <p className="text-center text-muted-foreground mb-8">
            Convenios con aseguradoras, administradoras de salud y proveedores
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center hover:bg-primary/10 transition-colors group"
              >
                <span className="text-2xl md:text-3xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                  {logo.initial}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
