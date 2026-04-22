"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import ambulence from "@/assets/Amb.jpg"
import rehab from "@/assets/rehab.jpg"
import oficinas from "@/assets/oficinas.jpg"
import personal from "@/assets/personal.jpeg"
import atencion_domicilio from "@/assets/atencion_domicilio.jpeg"
import centro_rehab from "@/assets/centro_rehab.jpeg"
import consultas from "@/assets/consultas.jpeg"

const galleryImages = [
  { src: ambulence, title: "Ambulancias de Emergencia", category: "Urgencias" },
  { src: atencion_domicilio, title: "Atención a Domicilio", category: "Consultas" },
  { src: "/images/medical-equipment.jpg", title: "Equipo Médico", category: "Equipamiento" },
  { src: "/images/pharmacy.jpg", title: "Farmacia Corporativa", category: "Farmacia" },
  { src: rehab, title: "Rehabilitación", category: "Terapias" },
  { src: oficinas, title: "Oficinas", category: "Instalaciones" },
  { src: personal, title: "Equipo", category: "Empresas" },
  { src: consultas, title: "Consultas", category: "Terapias" },
  { src: "/images/hero-medical.jpg", title: "Atención Integral", category: "Servicios" },
  { src: centro_rehab, title: "Centro de Rehabilitación", category: "Servicios" },
]

export function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState("Todos")
  const sectionRef = useRef<HTMLDivElement>(null)

  const categories = ["Todos", ...new Set(galleryImages.map(img => img.category))]

  const filteredImages = activeFilter === "Todos" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

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

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setSelectedImage(null)
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-12 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Galería
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Nuestras Instalaciones y Servicios
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Conoce más sobre nuestra infraestructura y equipo profesional
          </p>
        </div>

        {/* Category Filters */}
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-foreground hover:bg-primary/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid with Masonry-like Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700",
                index % 5 === 0 ? "md:col-span-2 md:row-span-2" : "",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className={cn(
                "relative overflow-hidden",
                index % 5 === 0 ? "h-[400px] md:h-[500px]" : "h-[200px] md:h-[240px]"
              )}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-primary-foreground/80 text-xs uppercase tracking-wider mb-1">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg animate-in fade-in zoom-in-95 duration-300"
            />
            <div className="text-center mt-4">
              <h3 className="text-white font-bold text-xl">{filteredImages[selectedImage].title}</h3>
              <p className="text-white/60">{filteredImages[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
