"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ambulence from "@/assets/servicios_medicos.jpg";
import rehab from "@/assets/rehab.jpg";
import farm from "@/assets/farmacia.jpg";
import curacion from "@/assets/curacion.jpg";
import domicilio from "@/assets/domicilio.jpeg";
import equipomedico from "@/assets/equipomedico.jpg";
import { ModalRegistro } from "./ModalRegistro";

// Todos los servicios (8 en total)
const allServices = [
  {
    image: domicilio,
    title: "Atención Médica a Domicilio",
    description:
      "Médicos generales y especialistas que te visitan en casa. Consultas, diagnósticos y seguimiento personalizado.",
  },
  {
    image: ambulence,
    title: "Servicios de Ambulancias",
    description:
      "Traslados de emergencia 24/7 en CDMX, Estado de México, Querétaro, Hidalgo y Morelos.",
  },
  {
    image: "/images/service-nursing.jpg",
    title: "Enfermería",
    description:
      "Auxiliares, enfermeras generales y especialistas para cuidados continuos.",
  },
  {
    image: rehab,
    title: "Rehabilitación",
    description:
      "Terapia física, pulmonar, ocupacional, de deglución, neurológica y de lenguaje.",
  },
  {
    image: "/images/service-oxygen.jpg",
    title: "Oxigenoterapia",
    description:
      "Equipos de oxigenoterapia y ventilación mecánica para pacientes que lo requieran.",
  },
  {
    image: farm,
    title: "Farmacias Corporativas",
    description:
      "Medicamentos de alta especialidad, inmunológicos, reumatológicos y vacunas con entrega nacional.",
  },
  {
    image: curacion,
    title: "Material de Curación",
    description:
      "Suministros médicos, material de curación e implantes con disponibilidad inmediata.",
  },
  {
    image: equipomedico,
    title: "Venta y Renta de Equipo Médico",
    description:
      "Renta y venta de camas hospitalarias, sillas de ruedas, marcos ortopédicos y más.",
  },
];

export function Services1() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null); // Referencia para el contenedor del carrusel
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5); // desktop por defecto

  // Estado para el swipe táctil
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 50; // distancia mínima en píxeles para considerar un swipe

  const totalServices = allServices.length;

  // Observador de entrada para animaciones
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

  // Ajustar cantidad de elementos visibles según el ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCount(5);
      } else if (width >= 768) {
        setVisibleCount(3);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navegación del carrusel
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  };

  // Calcula los índices a mostrar en el carrusel, con el índice actual en el centro (o cerca)
  const getVisibleIndices = (): number[] => {
    const indices: number[] = [];
    const half = Math.floor(visibleCount / 2);
    let start = currentIndex - half;

    for (let i = 0; i < visibleCount; i++) {
      let idx = (start + i) % totalServices;
      if (idx < 0) idx += totalServices;
      indices.push(idx);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();
  const centerPosition = Math.floor(visibleCount / 2);

  // --- Manejadores de swipe táctil ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null); // reiniciar valor final
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Guardamos la posición actual continuamente mientras se desliza
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchEndX - touchStartX;
    const absDistance = Math.abs(distance);

    // Solo navegar si el desplazamiento supera el umbral mínimo
    if (absDistance >= minSwipeDistance) {
      if (distance > 0) {
        // Deslizar hacia la derecha -> ir al anterior
        goPrev();
      } else {
        // Deslizar hacia la izquierda -> ir al siguiente
        goNext();
      }
    }

    // Reiniciar valores
    setTouchStartX(null);
    setTouchEndX(null);
  };
  // ---------------------------------

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
            Ofrecemos una amplia gama de servicios médicos, diseñados para
            atender de manera integral todas tus necesidades de salud.
          </p>
        </div>

        {/* Carrusel */}
        <div className="w-full md:w-4/5 mx-auto px-4 py-8 lg:py-16">
          <div className="relative flex items-center justify-center">
            {/* Botón anterior */}
            <button
              onClick={goPrev}
              className="absolute left-0 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 -translate-x-2 lg:-translate-x-6"
              aria-label="Anterior servicio"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Contenedor de tarjetas - con soporte táctil y touch-action para permitir scroll vertical */}
            <div
              ref={carouselRef}
              className="flex justify-center items-center gap-3 md:gap-5 overflow-visible touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {visibleIndices.map((serviceIdx, position) => {
                const service = allServices[serviceIdx];
                const isCenter = position === centerPosition;
                const distanceFromCenter = Math.abs(position - centerPosition);
                // Escala dinámica: el centro es más grande
                let scale = 1;
                let opacity = 1;
                let zIndex = 10;
                if (visibleCount === 1) {
                  scale = 1.1;
                } else if (visibleCount === 3) {
                  if (distanceFromCenter === 0) {
                    scale = 1.2;
                    zIndex = 20;
                  } else {
                    scale = 0.85;
                    opacity = 0.8;
                    zIndex = 5;
                  }
                } else if (visibleCount === 5) {
                  if (distanceFromCenter === 0) {
                    scale = 1.2;
                    zIndex = 20;
                  } else if (distanceFromCenter === 1) {
                    scale = 0.9;
                    zIndex = 15;
                    opacity = 0.9;
                  } else {
                    scale = 0.7;
                    opacity = 0.6;
                    zIndex = 5;
                  }
                }

                return (
                  <div
                    key={`service-${serviceIdx}-${position}`}
                    className="transition-all duration-500 ease-out cursor-pointer mx-2"
                    style={{
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      transitionProperty: "transform, opacity, z-index",
                    }}
                  >
                    <div
                      className={cn(
                        "relative rounded-2xl overflow-hidden bg-gray-800 shadow-xl",
                        "w-[220px] sm:w-[260px] md:w-[280px]",
                        isCenter && "ring-2 ring-primary shadow-2xl"
                      )}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <h3
                          className={cn(
                            "font-bold text-green mb-1 transition-all",
                            isCenter ? "text-xl md:text-2xl" : "text-base md:text-lg"
                          )}
                        >
                          {service.title}
                        </h3>
                        {isCenter && (
                          <p className="text-white/80 text-sm leading-relaxed mt-2 animate-fadeIn">
                            {service.description}
                          </p>
                        )}
                        {!isCenter && (
                          <p className="text-white/50 text-xs line-clamp-2 mt-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={goNext}
              className="absolute right-0 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 translate-x-2 lg:translate-x-6"
              aria-label="Siguiente servicio"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Indicadores de posición */}
          <div className="flex justify-center gap-2 mt-8">
            {allServices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Ir al servicio ${idx + 1}`}
              />
            ))}
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

          <ModalRegistro
            open={modalOpen}
            onOpenChange={setModalOpen}
            tipoProspecto={"general"}
          />
        </div>
      </div>
    </section>
  );
}