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

// Todos los servicios con título y descripción corta
const allServices = [
  {
    image: domicilio,
    title: "Atención Médica a Domicilio",
    description: "Médicos generales y especialistas que te visitan en casa.",
  },
  {
    image: ambulence,
    title: "Servicios de Ambulancias",
    description: "Traslados de emergencia 24/7 en CDMX y área metropolitana.",
  },
  {
    image: "/images/service-nursing.jpg",
    title: "Enfermería",
    description: "Auxiliares y enfermeras especialistas para cuidados continuos.",
  },
  {
    image: rehab,
    title: "Rehabilitación",
    description: "Terapia física, ocupacional, neurológica y de lenguaje.",
  },
  {
    image: "/images/service-oxygen.jpg",
    title: "Oxigenoterapia",
    description: "Equipos de oxigenoterapia y ventilación mecánica a domicilio.",
  },
  {
    image: farm,
    title: "Farmacias Corporativas",
    description: "Medicamentos de alta especialidad con entrega nacional.",
  },
  {
    image: curacion,
    title: "Material de Curación",
    description: "Suministros médicos e implantes con disponibilidad inmediata.",
  },
  {
    image: equipomedico,
    title: "Venta y Renta de Equipo Médico",
    description: "Camas hospitalarias, sillas de ruedas y más.",
  },
];

export function Services1() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalServices = allServices.length;

  // Estado para el swipe táctil
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 50;

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

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  };

  // Manejadores de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleOpenModal = (service: typeof allServices[0]) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const currentService = allServices[currentIndex];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900 border"
      style={{ paddingTop: "50px" }}
    >
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/medical-equipment.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/85" />

      <div className="relative z-10">
        {/* Header vacío (opcional, ya no se usa) */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto pt-10 pb-8 px-4 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        />

        {/* Carrusel tradicional con contenido sobre la imagen */}
        <div className="w-full px-4 md:px-0 py-5">
          <div className="relative flex items-center justify-center">
            {/* Botón anterior */}
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-4 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300"
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

            {/* Contenedor de la imagen actual con dimensiones responsive */}
            <div
              className="relative w-full md:w-4/5 mx-auto overflow-hidden rounded-2xl shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Imagen de fondo */}
              <div className="w-full h-[600px] md:h-[400px]">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Degradado sutil para mejorar legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Contenido textual y botón */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 drop-shadow-lg">
                  {currentService.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-3 md:mb-4 max-w-lg drop-shadow">
                  {currentService.description}
                </p>
                <Button
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
                  onClick={() => handleOpenModal(currentService)}
                >
                  Solicitar información
                </Button>
              </div>
            </div>

            {/* Botón siguiente */}
            <button
              onClick={goNext}
              className="absolute right-2 md:right-4 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300"
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

          {/* Indicadores de posición (puntos) */}
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
        </div>

        {/* Modal - ahora recibe el servicio seleccionado */}
        <ModalRegistro
          open={modalOpen}
          onOpenChange={setModalOpen}
          tipoProspecto={selectedService?.title || "general"}
        />
      </div>
    </section>
  );
}