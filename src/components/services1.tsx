"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import car1 from "@/assets/imageCarrusel-1.jpg";
import car11 from "@/assets/imageCarrusel-1-responsive.jpeg";
import car2 from "@/assets/imageCarrusel-2.jpeg";
import car21 from "@/assets/imageCarrusel-2-responsive.jpg";
import car3 from "@/assets/imageCarrusel-3.jpeg";
import car31 from "@/assets/imageCarrusel-3-responsive.jpg";
import car4 from "@/assets/Enfermeria-1.jpg";
import car41 from "@/assets/Enfermeria-2.jpg";
import car5 from "@/assets/Rehabilitacion-1.jpg";
import car51 from "@/assets/Rehabilitacion-2.jpg";
import car6 from "@/assets/EquipoMed-1.jpg";
import car61 from "@/assets/EquipoMed-2.jpg";
import { ModalRegistro } from "./ModalRegistro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Definición de detalles extendidos para cada servicio (sin cambios)
const serviceDetails: Record<string, { fullDescription: string; highlights: string[] }> = {
  "Starlight medical care": {
    fullDescription:
      "Ofrecemos atención médica integral en la comodidad de tu hogar. Nuestro equipo de profesionales de la salud está capacitado para brindar diagnósticos precisos, tratamientos personalizados y seguimiento continuo, evitando traslados innecesarios.",
    highlights: [
      "Médicos generales y especialistas (cardiología, pediatría, geriatría, etc.)",
      "Toma de muestras de laboratorio a domicilio",
      "Atención para pacientes postquirúrgicos y crónico-degenerativos",
      "Disponibilidad 24/7 en CDMX y área metropolitana",
      "Reporte médico detallado después de cada visita",
    ],
  },
  "Servicios a domicilio": {
    fullDescription:
      "Contamos con una flota de ambulancias totalmente equipadas para traslados de emergencia, programados y de alta especialidad. Nuestros paramédicos están certificados y capacitados para brindar atención prehospitalaria de calidad.",
    highlights: [
      "Ambulancias de terapia intensiva móvil (UTIM)",
      "Traslados básicos y avanzados con monitoreo cardiaco",
      "Servicio de ambulancias aéreo (helicóptero) coordinado",
      "Disponibilidad inmediata las 24 horas, los 365 días",
      "Atención a eventos masivos y concentraciones",
    ],
  },
  "Membresías": {
    fullDescription: "Ofrecemos planes de membresía anual que garantizan acceso preferente y cobertura en servicios de ambulancia y atención prehospitalaria. Ideal para familias, empresas o personas que buscan tranquilidad y respuesta inmediata ante una emergencia médica, con costos reducidos y beneficios exclusivos.",
    highlights: [
      "Cobertura nacional en traslados terrestres y aéreos",
      "Sin costo adicional por horario nocturno, fines de semana o días festivos",
      "Descuentos exclusivos en servicios de ambulancia para no miembros",
      "Atención prioritaria con tiempo de respuesta garantizado",
      "Planes para individuos, familias y empresas con facturación mensual o anual"
    ]
  },
  Enfermería: {
    fullDescription:
      "Cuidados profesionales de enfermería las 24 horas, tanto en hospital como en domicilio. Nuestras enfermeras y auxiliares cuentan con amplia experiencia en diversas áreas, garantizando bienestar y seguridad.",
    highlights: [
      "Curación de heridas y manejo de úlceras por presión",
      "Administración de medicamentos vía oral, intramuscular, endovenosa",
      "Cuidados paliativos y acompañamiento oncológico",
      "Manejo de sondas, catéteres y ostomías",
      "Capacitación a familiares para cuidados básicos",
    ],
  },
  Rehabilitación: {
    fullDescription:
      "Terapias de rehabilitación física, ocupacional y de lenguaje, adaptadas a cada paciente. Trabajamos con equipos de última generación y técnicas innovadoras para acelerar la recuperación funcional.",
    highlights: [
      "Terapia física para recuperación de movilidad y fuerza",
      "Terapia ocupacional para reinserción en actividades diarias",
      "Rehabilitación neurológica (derrames, lesiones medulares)",
      "Terapia de lenguaje y deglución",
      "Equipo de rehabilitación a domicilio o en centro especializado",
    ],
  },
  Oxigenoterapia: {
    fullDescription:
      "Suministro de equipos de oxigenoterapia y ventilación mecánica no invasiva para pacientes con enfermedades respiratorias crónicas o agudas. Garantizamos la disponibilidad continua y el mantenimiento de los equipos.",
    highlights: [
      "Concentradores de oxígeno estacionarios y portátiles",
      "Tanques de oxígeno líquido y cilindros recargables",
      "Ventiladores mecánicos no invasivos (BiPAP, CPAP)",
      "Monitores de saturación de oxígeno (pulsioxímetros)",
      "Servicio técnico y entrega a domicilio en menos de 2 horas",
    ],
  },
  "Farmacias Corporativas": {
    fullDescription:
      "Abastecimiento de medicamentos de alta especialidad, genéricos y de patente para hospitales, clínicas, empresas y particulares. Contamos con cadena de frío y distribución a nivel nacional.",
    highlights: [
      "Medicamentos oncológicos, huérfanos y biotecnológicos",
      "Entrega justo a tiempo con trazabilidad completa",
      "Farmacovigilancia y control de inventarios personalizado",
      "Precios competitivos para compras por volumen",
      "Asesoría farmacéutica permanente",
    ],
  },
  "Material de Curación": {
    fullDescription:
      "Distribuimos material de curación de primeras marcas, incluyendo apósitos especializados, sistemas de fijación, insumos para heridas crónicas y agudas.",
    highlights: [
      "Apósitos de hidrocoloide, hidrofibra, espuma de poliuretano",
      "Cintas adhesivas microporosas y de seda",
      "Gasas estériles, compresas y algodón",
      "Soluciones antisépticas (clorhexidina, povidona yodada)",
      "Vendas elásticas, yeso y férulas premoldeadas",
    ],
  },
  "Venta y Renta de Equipo Médico": {
    fullDescription:
      "Amplio catálogo de equipo médico para hospitales, clínicas y uso doméstico, tanto en venta como en renta. Todos nuestros equipos son certificados y reciben mantenimiento preventivo.",
    highlights: [
      "Camas hospitalarias eléctricas y manuales",
      "Sillas de ruedas estándar, bariátricas, pediátricas",
      "Andaderas, bastones y muletas",
      "Monitores de presión arterial y glucómetros",
      "Equipos de fisioterapia y rehabilitación (TENS, ultrasonido)",
    ],
  },
};

// Modal de información detallada (sin cambios)
function ModalMoreInfo({
  open,
  onOpenChange,
  service,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: typeof allServices[0] | null;
}) {
  if (!service) return null;
  const details = serviceDetails[service.title] || {
    fullDescription: "Descripción no disponible.",
    highlights: ["Información en proceso de actualización."],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Información detallada del servicio
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <picture>
              <source media="(max-width: 768px)" srcSet={service.imageMobile} />
              <img
                src={service.imageDesktop}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Descripción</h4>
            <p className="text-gray-700 dark:text-gray-300">{details.fullDescription}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Características y beneficios</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {details.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Todos los servicios con imágenes desktop y mobile
const allServices = [
  {
    imageDesktop: car2,
    imageMobile: car21,
    title: "Starlight medical care",
    description: "Atención médica, terapias, medicamentos y soporte especializado directamente en casa.",
  },
  {
    imageDesktop: car4,
    imageMobile: car41,
    title: "Enfermería",
    description: "Cuidados profesionales de enfermería las 24 horas, tanto en hospital como en domicilio.",
  },
  {
    imageDesktop: car5,
    imageMobile: car51,
    title: "Rehabilitación",
    description: "Terapias de rehabilitación física, ocupacional y de lenguaje, adaptadas a cada paciente.",
  },
  {
    imageDesktop: car3,
    imageMobile: car31,
    title: "Servicios a domicilio",
    description: "Brindamos servicios de salud a domicilio que combinan atención clínica, soporte terapéutico y suministro de insumos.",
  },
  {
    imageDesktop: car1,
    imageMobile: car11,
    title: "Membresías",
    description: "Obtén los mejores servicios.",
  },
  {
    imageDesktop: car6,
    imageMobile: car61,
    title: "Venta y Renta de Equipo Médico",
    description: "Amplio catálogo de equipo médico para hospitales, clínicas y uso doméstico.",
  },
];

export function Services1() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null);
  const [moreInfoModalOpen, setMoreInfoModalOpen] = useState(false);
  const [selectedServiceForMoreInfo, setSelectedServiceForMoreInfo] = useState<typeof allServices[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const totalServices = allServices.length;

  // Referencias
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Duración de la animación de zoom (700ms)
  const TRANSITION_DURATION = 700;
  // Intervalo de autoplay: 4 segundos
  const AUTOPLAY_INTERVAL = 4000;

  // Transición con solo zoom (sin fade)
  const transitionTo = (newIndex: number) => {
    if (fading || newIndex === currentIndex) return;
    setFading(true);
    setNextIndex(newIndex);

    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex(newIndex);
      setNextIndex(null);
      setFading(false);
      fadeTimeoutRef.current = null;
    }, TRANSITION_DURATION);
  };

  const goPrev = () => {
    const newIndex = (currentIndex - 1 + totalServices) % totalServices;
    transitionTo(newIndex);
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % totalServices;
    transitionTo(newIndex);
  };

  // Autoplay continuo cada 4 segundos
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  // Observador de visibilidad (sin cambios)
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

  // Swipe y arrastre (sin cambios relevantes)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [mouseEndX, setMouseEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (fading) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (fading) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (fading || touchStartX === null || touchEndX === null) return;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || fading) return;
    setMouseStartX(e.clientX);
    setMouseEndX(null);
    setIsDragging(false);
    document.body.style.userSelect = 'none';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX === null || fading) return;
    setIsDragging(true);
    setMouseEndX(e.clientX);
    e.preventDefault();
  };
  const handleMouseUp = () => {
    if (mouseStartX !== null && mouseEndX !== null && !fading) {
      const distance = mouseEndX - mouseStartX;
      if (Math.abs(distance) >= minSwipeDistance) {
        if (distance > 0) goPrev();
        else goNext();
      }
    }
    setMouseStartX(null);
    setMouseEndX(null);
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const handleOpenModal = (service: typeof allServices[0]) => {
    setSelectedService(service);
    setModalOpen(true);
  };
  const handleOpenMoreInfo = (service: typeof allServices[0]) => {
    setSelectedServiceForMoreInfo(service);
    setMoreInfoModalOpen(true);
  };

  const currentService = allServices[currentIndex];
  const nextService = nextIndex !== null ? allServices[nextIndex] : null;

  // Componente interno para evitar repetir el markup del texto
  const ServiceContent = ({ service }: { service: typeof allServices[0] }) => (
    <>
      {/* Gradiente sobre la imagen para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
      
      {/* Contenido textual (título, descripción y botones) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-10">
        <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          {service.title}
        </h3>
        <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl drop-shadow">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
            onClick={() => handleOpenModal(service)}
          >
            Solicitar información
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full shadow-lg"
            onClick={() => handleOpenMoreInfo(service)}
          >
            Ver más información
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900"
      style={{ minHeight: "100vh" }}
    >
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4 md:px-0" style={{ marginTop: '50px' }}>
          <div className="relative w-full">
            <div
              className="relative w-full overflow-hidden shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="relative w-full" style={{ height: "calc(100vh - 120px)", maxHeight: "80vh" }}>
                
                {/* Imagen actual (desaparece instantáneamente cuando hay nextIndex) */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: nextIndex !== null ? 0 : 1,
                    transition: 'none',
                  }}
                >
                  <picture className="block w-full h-full">
                    <source media="(max-width: 768px)" srcSet={currentService.imageMobile} />
                    <img
                      src={currentService.imageDesktop}
                      alt={currentService.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </picture>
                  <ServiceContent service={currentService} />
                </div>

                {/* Nueva imagen (entra solo con zoom, sin fade) */}
                {nextService && (
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: 1,
                      animation: 'zoomIn 700ms ease-out forwards',
                    }}
                  >
                    <picture className="block w-full h-full">
                      <source media="(max-width: 768px)" srcSet={nextService.imageMobile} />
                      <img
                        src={nextService.imageDesktop}
                        alt={nextService.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </picture>
                    <ServiceContent service={nextService} />
                  </div>
                )}

                {/* Botones de navegación (siempre visibles) */}
                <button
                  onClick={goPrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 disabled:opacity-50"
                  aria-label="Anterior servicio"
                  disabled={fading}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={goNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 disabled:opacity-50"
                  aria-label="Siguiente servicio"
                  disabled={fading}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicadores (siempre visibles) */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-6 z-20">
                  {allServices.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!fading && idx !== currentIndex) transitionTo(idx);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 disabled:opacity-50",
                        idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                      )}
                      aria-label={`Ir al servicio ${idx + 1}`}
                      disabled={fading}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animación CSS personalizada: solo zoom, sin opacidad */}
      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <ModalRegistro open={modalOpen} onOpenChange={setModalOpen} tipoProspecto={"general"} />
      <ModalMoreInfo
        open={moreInfoModalOpen}
        onOpenChange={setMoreInfoModalOpen}
        service={selectedServiceForMoreInfo}
      />
    </section>
  );
}