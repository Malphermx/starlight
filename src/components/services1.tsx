"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import ambulence from "@/assets/servicios_medicos.jpg";
// import rehab from "@/assets/rehab.jpg";
// import farm from "@/assets/farmacia.jpg";
// import curacion from "@/assets/curacion.jpg";
// import domicilio from "@/assets/domicilio.jpeg";
// import equipomedico from "@/assets/equipomedico.jpg";
import car1 from "@/assets/imageCarrusel-1.jpg";
import car11 from "@/assets/imageCarrusel-1-responsive.jpg";
import car2 from "@/assets/imageCarrusel-2.jpg";
import car21 from "@/assets/imageCarrusel-2-responsive.jpg";
import car3 from "@/assets/imageCarrusel-3.jpg";
import car31 from "@/assets/imageCarrusel-3-responsive.jpg";
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

// Todos los servicios con imágenes desktop (horizontal) y mobile (vertical)
// Reemplaza las rutas con las tuyas
const allServices = [
  {
    imageDesktop: car2,
    imageMobile: car21,
    title: "Starlight medical care",
    description: "Atención médica, terapias, medicamentos y soporte especializado directamente en casa.",
  },
  {
    imageDesktop: car1,
    imageMobile: car11,
    title: "Membresías",
    description: "Obtén los mejores servicios.",
  },
   {
    imageDesktop: car3,
    imageMobile: car31,
    title: "Servicios a domicilio",
    description: "Brindamos servicios de salud a domicilio que combinan atención clínica, soporte terapéutico y suministro de insumos, permitiendo una atención continua y organizada.",
  },
  
  // {
  //   imageDesktop: ambulence,
  //   imageMobile: ambulence,
  //   title: "Servicios de Ambulancias",
  //   description: "Traslados de emergencia 24/7 en CDMX y área metropolitana.",
  // },
  // {
  //   imageDesktop: "/images/service-nursing.jpg",
  //   imageMobile: "/images/service-nursing-mobile.jpg",
  //   title: "Enfermería",
  //   description: "Auxiliares y enfermeras especialistas para cuidados continuos.",
  // },
  // {
  //   imageDesktop: rehab,
  //   imageMobile: rehab,
  //   title: "Centro de rehabilitación",
  //   description: "Un espacio diseñado para la recuperación integral, respaldado por personal certificado y equipamiento especializado.",
  // },
  // {
  //   imageDesktop: "/images/service-oxygen.jpg",
  //   imageMobile: "/images/service-oxygen-mobile.jpg",
  //   title: "Oxigenoterapia",
  //   description: "Equipos de oxigenoterapia y ventilación mecánica a domicilio.",
  // },
  // {
  //   imageDesktop: farm,
  //   imageMobile: farm,
  //   title: "Farmacias Corporativas",
  //   description: "Medicamentos de alta especialidad con entrega nacional.",
  // },
  // {
  //   imageDesktop: curacion,
  //   imageMobile: curacion,
  //   title: "Material de Curación",
  //   description: "Suministros médicos e implantes con disponibilidad inmediata.",
  // },
  // {
  //   imageDesktop: equipomedico,
  //   imageMobile: equipomedico,
  //   title: "Venta y Renta de Equipo Médico",
  //   description: "Camas hospitalarias, sillas de ruedas y más.",
  // },
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

  // Swipe y arrastre
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [mouseStartX, setMouseStartX] = useState<number | null>(null);
  const [mouseEndX, setMouseEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50;

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

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Evitar que los botones activen el drag
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

  const handleMouseUp = () => {
    if (mouseStartX !== null && mouseEndX !== null) {
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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900"
      style={{ minHeight: "100vh" }}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/85" /> */}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Carrusel principal - ocupa todo el espacio vertical disponible */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-0 md:py-0" style={{marginTop:'50px'}}>
          <div className="relative w-full">
            {/* Contenedor de la imagen con swipe - AHORA también contiene los botones de navegación dentro */}
            <div
              className="relative w-full overflow-hidden  shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {/* Altura dinámica: en desktop ocupa casi toda la pantalla */}
              <div className="relative w-full" style={{ height: "calc(100vh - 120px)", maxHeight: "80vh" }}>
                <picture className="block w-full h-full">
                  <source media="(max-width: 768px)" srcSet={currentService.imageMobile} />
                  <img
                    src={currentService.imageDesktop}
                    alt={currentService.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </picture>

                {/* Gradiente oscuro para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                {/* Botón anterior - DENTRO de la imagen */}
                <button
                  onClick={goPrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300"
                  aria-label="Anterior servicio"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Botón siguiente - DENTRO de la imagen */}
                <button
                  onClick={goNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300"
                  aria-label="Siguiente servicio"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Texto y botones de acción - también dentro de la imagen */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {currentService.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/90 mb-4 max-w-2xl drop-shadow">
                    {currentService.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
                      onClick={() => handleOpenModal(currentService)}
                    >
                      Solicitar información
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 rounded-full shadow-lg"
                      onClick={() => handleOpenMoreInfo(currentService)}
                    >
                      Ver más información
                    </Button>
                  </div>
                  {/* Indicadores (puntos) fuera de la imagen pero dentro del viewport */}
                  <div className="flex justify-center gap-2 pb-6 pt-2">
                    {allServices.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                        )}
                        aria-label={`Ir al servicio ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <ModalRegistro open={modalOpen} onOpenChange={setModalOpen} tipoProspecto={"general"} />
      <ModalMoreInfo
        open={moreInfoModalOpen}
        onOpenChange={setMoreInfoModalOpen}
        service={selectedServiceForMoreInfo}
      />
    </section>
  );
}