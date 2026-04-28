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
import car1 from "@/assets/carr1.jpeg";
import { ModalRegistro } from "./ModalRegistro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Definición de detalles extendidos para cada servicio
const serviceDetails: Record<string, { fullDescription: string; highlights: string[] }> = {
  "Atención Médica a Domicilio": {
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
  "Servicios de Ambulancias": {
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

// Modal de información detallada
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
          {/* Imagen del servicio */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img
              src={typeof service.image === "string" ? service.image : service.image.src}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Descripción extendida */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Descripción</h4>
            <p className="text-gray-700 dark:text-gray-300">{details.fullDescription}</p>
          </div>

          {/* Beneficios y características (viñetas) */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Características y beneficios</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {details.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Botón CTA extra opcional */}
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

// Todos los servicios con título y descripción corta
const allServices = [
  {
    image: car1,
    title: "Membresias",
    description: "Obtén los mejores servicios.",
  },
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
  const [moreInfoModalOpen, setMoreInfoModalOpen] = useState(false);
  const [selectedServiceForMoreInfo, setSelectedServiceForMoreInfo] = useState<typeof allServices[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalServices = allServices.length;

  // Estado para el swipe táctil
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Estado para el arrastre con ratón
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [mouseEndX, setMouseEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  // Manejadores de swipe táctil
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

  // Manejadores de arrastre con ratón
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    
    setMouseStartX(e.clientX);
    setMouseEndX(null);
    setIsDragging(false);
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX === null) return;
    setIsDragging(true);
    setMouseEndX(e.clientX);
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartX === null || mouseEndX === null) {
      setMouseStartX(null);
      setMouseEndX(null);
      setIsDragging(false);
      document.body.style.userSelect = '';
      return;
    }
    
    const distance = mouseEndX - mouseStartX;
    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) goPrev();
      else goNext();
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
        <div
          className={cn(
            "text-center max-w-3xl mx-auto pt-10 pb-8 px-4 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        />

        {/* Carrusel */}
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

            {/* Contenedor de imagen con arrastre */}
            <div
              className="relative w-full md:w-4/5 mx-auto overflow-hidden rounded-2xl shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="w-full h-[800px] md:h-[400px]">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

              {/* Contenido textual y botones */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 drop-shadow-lg">
                  {currentService.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-3 md:mb-4 max-w-lg drop-shadow">
                  {currentService.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="default"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
                    onClick={() => handleOpenModal(currentService)}
                  >
                    Solicitar información
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full shadow-lg"
                    onClick={() => handleOpenMoreInfo(currentService)}
                  >
                    Ver más información
                  </Button>
                </div>
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

          {/* Indicadores */}
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

        {/* Modales */}
        <ModalRegistro
          open={modalOpen}
          onOpenChange={setModalOpen}
          tipoProspecto={"general"}
        />
        <ModalMoreInfo
          open={moreInfoModalOpen}
          onOpenChange={setMoreInfoModalOpen}
          service={selectedServiceForMoreInfo}
        />
      </div>
    </section>
  );
}