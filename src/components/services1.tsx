"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import video from '@/video/IMG_4774.mp4';
// import ambulence from "@/assets/Amb.jpg"
import ambulence from "@/assets/servicios_medicos.jpg"
import rehab from "@/assets/rehab.jpg"
// import farm from "@/assets/farm.jpg"
import farm from "@/assets/farmacia.jpg"
import curacion from "@/assets/curacion.jpg"
import domicilio from "@/assets/domicilio.jpeg"
import equipomedico from "@/assets/equipomedico.jpg"
import { ModalRegistro } from "./ModalRegistro";

// Todos los servicios (8 en total)
const allServices = [
  {
    image: domicilio,
    title: "Atención Médica a Domicilio",
    description: "Médicos generales y especialistas que te visitan en casa. Consultas, diagnósticos y seguimiento personalizado.",
  },
  {
    image: ambulence,
    title: "Servicios de Ambulancias",
    description: "Traslados de emergencia 24/7 en CDMX, Estado de México, Querétaro, Hidalgo y Morelos.",
  },
  {
    image: "/images/service-nursing.jpg",
    title: "Enfermería",
    description: "Auxiliares, enfermeras generales y especialistas para cuidados continuos.",
  },
  {
    image: rehab,
    title: "Rehabilitación",
    description: "Terapia física, pulmonar, ocupacional, de deglución, neurológica y de lenguaje.",
  },
  {
    image: "/images/service-oxygen.jpg",
    title: "Oxigenoterapia",
    description: "Equipos de oxigenoterapia y ventilación mecánica para pacientes que lo requieran.",
  },
  {
    image: farm,
    title: "Farmacias Corporativas",
    description: "Medicamentos de alta especialidad, inmunológicos, reumatológicos y vacunas con entrega nacional.",
  },
  {
    image:curacion,
    // title: "Material de Curación",
    title: "Material de Curación",
    description: "Suministros médicos, material de curación e implantes con disponibilidad inmediata.",
  },
  {
    image: equipomedico,
    title: "Venta y Renta de Equipo Médico",
    description: "Renta y venta de camas hospitalarias, sillas de ruedas, marcos ortopédicos y más.",
  },
];

export function Services1() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Definimos el orden de los servicios alrededor del video (para grid 3x3)
  // Las posiciones en orden de izquierda a derecha, fila por fila, saltando el centro.
  // Posiciones: 0,1,2 en fila1; 3,4 en fila2 (centro es 4? mejor usar índices planos)
  // Usaremos un grid con áreas explícitas para mayor claridad.
  // Para simplificar, asignamos a cada servicio una posición en el grid mediante clases CSS.

  // Creamos un array con 9 elementos (incluyendo null para el centro)
  const gridItems = [
    allServices[0], // (0,0)
    allServices[1], // (0,1)
    allServices[2], // (0,2)
    allServices[3], // (1,0)
    null,           // (1,1) -> video
    allServices[4], // (1,2)
    allServices[5], // (2,0)
    allServices[6], // (2,1)
    allServices[7], // (2,2)
  ];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900"
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/medical-equipment.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto pt-20 pb-8 px-4 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4 bg-primary/20 px-4 py-1 rounded-full">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Servicios Integrales para tu Salud
          </h2>
          <p className="text-white/70 text-lg text-pretty max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios médicos, diseñados para atender de manera integral todas tus necesidades de salud.
          </p>
        </div>

        {/* Contenedor principal */}
        <div className="w-full md:w-4/5 mx-auto px-4 py-8 lg:py-16">
          {/* Grid 3x3 en desktop, en móvil se apila */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {gridItems.map((item, idx) => {
              // Si es la posición central (idx === 4), mostramos el video
              if (idx === 4) {
                return (
                  <div
                    key="video-center"
                    className={cn(
                      "transition-all duration-700 delay-200 row-span-1 col-span-1",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                    // style={{border:'1px solid orange', borderRadius:'18px'}}
                  >
                    <div className="relative aspect-[9/16] max-h-[450px] mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                );
              }

              // Para los servicios
              const service = item;
              if (!service) return null;
              const actualIndex = idx < 4 ? idx : idx - 1; // reajuste del índice real para activeIndex (opcional)
              return (
                <div
                  key={idx}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 h-full",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${idx * 75}ms` }}
                  onMouseEnter={() => setActiveIndex(actualIndex)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {service.description}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-all duration-300",
                      activeIndex === actualIndex ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    )}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className={cn(
              "text-center mt-12 transition-all duration-1000 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => setModalOpen(true)}
            >
              Solicitar Información
            </Button>
          </div>

          <ModalRegistro open={modalOpen} onOpenChange={setModalOpen} tipoProspecto={"general"} />
        </div>
      </div>
    </section>
  );
}