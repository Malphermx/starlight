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
import car7 from "@/assets/Farmacias-1920x530.jpg";
import car71 from "@/assets/Farmacias-500x800.jpg";
import car8 from "@/assets/Oxigenoterapia-1920x530.jpg";
import car81 from "@/assets/Oxigenoterapia-500x800.jpg";
// import car71 from "@/assets/Farmacias-500x800.jpg";
import car9 from "@/assets/Ambulancia-1920x530.jpg";
import car91 from "@/assets/Ambulancia-500x800.jpg";
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
      "Atención médica integral, tecnología inteligente y soluciones de salud diseñadas para cuidar tu bienestar en todo momento.",
    highlights: [
      "Expediente Clínico Electrónico Inteligente",
      "Automatización End-to-End de procesos",
      "Validaciones inteligentes y seguridad por diseño",
      "Arquitectura conversacional inteligente",
      "Análisis y detección de intención en tiempo real",
      "Inteligencia adaptativa y mejora continua",
      "Orquestación total de sistemas",
      "Capa de integración avanzada mediante APIs",
      "Soluciones personalizadas para clientes y proveedores",
    ],
  },
  "Medico a Domicilio": {
    fullDescription:
      "Atención médica a domicilio con calidad, confianza y cuidado profesional, llevando bienestar y tranquilidad hasta la puerta de tu hogar.",
    highlights: [
      "Valoraciones y tratamientos médicos",
      "Seguimiento médico y Case Management",
      "Atención para adultos mayores y pacientes en recuperación",
      "Seguridad, eficiencia y puntualidad en cada servicio",
      "Ajuste a tabuladores",
      "Seguimiento administrativo y médico mediante sistema web sin costo",
    ],
  },
  "Entregas a domicilio": {
    fullDescription:
      "Servicio especializado en entrega de medicamentos, material de curación y equipo médico a domicilio.",
    highlights: [
      "Medicamentos generales",
      "Medicamentos de alta especialidad",
      "Medicamentos inmunológicos",
      "Medicamentos reumatológicos",
      "Vacunas",
      "Material de curación",
      "Equipo médico básico y especializado",
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
  "Oxigenoterapia": {
    fullDescription:
      "Servicio especializado con suministro de oxígeno medicinal y equipos certificados para brindar soporte respiratorio seguro y eficiente a domicilio.",
    highlights: [
      "Concentradores de oxígeno",
      "Nebulizadores",
      "Respiradores",
      "Equipos Cough Assist",
      "Soporte y terapia respiratoria a domicilio",
      "Cobertura nacional y atención especializada",
    ],
  },
  Enfermería: {
    fullDescription:
      "Servicio de enfermería a domicilio 24/7 con atención especializada, profesional y personalizada. ",
    highlights: [
      "Auxiliar de enfermería: apoyo en cuidados básicos, higiene, movilidad, administración de medicamentos bajo indicación y acompañamiento al paciente.",
      "Enfermera general: atención integral en monitoreo de signos vitales, curaciones, administración de medicamentos, seguimiento médico y cuidados generales.",
      "Enfermera especialista: personal con capacitación especializada para atender pacientes con requerimientos médicos específicos, tratamientos avanzados y cuidados de mayor complejidad.",
    ],
  },
  Rehabilitación: {
    fullDescription:
      "Servicio de terapias de rehabilitación a domicilio, enfocado en la recuperación física, funcional y respiratoria mediante atención profesional y personalizada.",
    highlights: [
      "Terapia física: enfocada en mejorar movilidad, fuerza, equilibrio y recuperación muscular o articular.",
      "Terapia pulmonar: orientada a fortalecer la función respiratoria y mejorar la capacidad pulmonar.",
      "Terapia ocupacional: diseñada para ayudar al paciente a recuperar habilidades funcionales e independencia en sus actividades diarias.",
      "Terapia de lenguaje: enfocada en mejorar la comunicación, expresión y funciones relacionadas con el habla y la deglución."
    ],
  },
  "Servicios a domicilio": {
    fullDescription:
      "Atención médica, medicamentos, material de curación y equipo médico a domicilio.",
    highlights: [
      "Medicamentos generales",
      "Medicamentos de alta especialidad",
      "Medicamentos inmunológicos",
      "Medicamentos reumatológicos",
      "Vacunas",
      "Material de curación",
      "Equipo médico especializado",
      "Bombas de alimentación enteral",
      "Bombas de alimentación parenteral",
    ],
  },
  "Membresías": {
    fullDescription: "Obtén acceso rápido y confiable a servicios médicos con nuestras membresías de salud.",
    highlights: [
      "Médico a domicilio sin copago",
      "Ambulancia sencilla para urgencias o traslados",
      "Videoconsulta médica general 24/7",
      "Orientación médica por chat en múltiples especialidades",
      "Videoconsultas especializadas",
      "Plan dental e interpretación de estudios",
      "Cobertura en gastos funerarios",
    ]
  },


  "Farmacias Corporativas": {
    fullDescription:
      "Farmacias corporativas con soluciones médicas integrales, medicamentos y atención confiable para empresas y colaboradores.",
    highlights: [
      "Medicamentos generales",
      "Medicamentos de alta especialidad",
      "Insumos médicos y material de curación",
      "Atención personalizada y procesos ágiles",
      "Acceso oportuno a tratamientos y requerimientos médicos",
    ],
  },
  "Venta y Renta de Equipo Médico": {
    fullDescription:
      "Especializado para soporte clínico y atención integral",
    highlights: [
      "Camas hospitalarias eléctricas y manuales",
      "Sillas de ruedas estándar, bariátricas, pediátricas",
      "Andaderas, bastones y muletas",
      "Monitores de presión arterial y glucómetros",
      "Equipos de fisioterapia y rehabilitación (TENS, ultrasonido)",
    ],
  },
  "Servicio de ambulancias": {
    fullDescription:
      "Urgencias y traslados médicos con atención rápida, segura y profesional.",
    highlights: [
      "Ambulancias para urgencias médicas",
      "Traslados programados y hospitalarios",
      "Unidades equipadas y personal capacitado",
      "Atención y monitoreo durante el traslado",
      "Cobertura y servicio oportuno",
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
    imageDesktop: car2,
    imageMobile: car21,
    title: "Medico a Domicilio",
    description: "Atención médica a domicilio con calidad, confianza y cuidado profesional, llevando bienestar y tranquilidad hasta la puerta de tu hogar.",
  },
  {
    imageDesktop: car2,
    imageMobile: car21,
    title: "Entregas a domicilio",
    description: "Servicio especializado en entrega de medicamentos, material de curación y equipo médico a domicilio.",
  },
  {
    imageDesktop: car3,
    imageMobile: car31,
    title: "Servicios a domicilio",
    description: "Atención médica, medicamentos, material de curación y equipo médico a domicilio.",
  },
  {
    imageDesktop: car8,
    imageMobile: car81,
    title: "Oxigenoterapia",
    description: "Servicio especializado con suministro de oxígeno medicinal y equipos certificados para brindar soporte respiratorio seguro y eficiente a domicilio.",
  },
  {
    imageDesktop: car4,
    imageMobile: car41,
    title: "Enfermería",
    description: "Servicio de enfermería a domicilio 24/7 con atención especializada, profesional y personalizada.",
  },
  {
    imageDesktop: car5,
    imageMobile: car51,
    title: "Rehabilitación",
    description: "Servicio de terapias de rehabilitación a domicilio, enfocado en la recuperación física, funcional y respiratoria mediante atención profesional y personalizada.",
  },
  {
    imageDesktop: car1,
    imageMobile: car11,
    title: "Membresías",
    description: "Obtén acceso rápido y confiable a servicios médicos con nuestras membresías de salud.",
  },
  {
    imageDesktop: car7,
    imageMobile: car71,
    title: "Farmacias Corporativas",
    description: "Farmacias corporativas con soluciones médicas integrales, medicamentos y atención confiable para empresas y colaboradores.",
  },
  {
    imageDesktop: car6,
    imageMobile: car61,
    title: "Venta y Renta de Equipo Médico",
    description: "Amplio catálogo de equipo médico para hospitales, clínicas y uso doméstico.",
  },
  {
    imageDesktop: car9,
    imageMobile: car91,
    title: "Servicio de ambulancias",
    description: "Urgencias y traslados médicos con atención rápida, segura y profesional.",
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
  // Nuevo estado para el tipo de prospecto
  const [prospectType, setProspectType] = useState<"general" | "empresas" | "proveedores">("general");
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
    setProspectType("general");   // Para el botón "Solicitar información"
    setModalOpen(true);
  };
  // Nuevas funciones para los botones de empresa y proveedor
  const handleOpenEmpresas = () => {
    setProspectType("empresa");
    setModalOpen(true);
  };
  const handleOpenProveedores = () => {
    setProspectType("proveedor");
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
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-10 h-300px">
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

          {service.title === "Servicio de ambulancias" ?
            <Button
              size="lg"
              variant="outline"
              className="bgUrgencia text-white  rounded-full shadow-lg"
              onClick={() => {
                const numero = "+5215595620581";
                window.location.href = `tel:${numero}`;

              }}
            >
              Urgencia
            </Button>
            : null}
        </div>
      </div>
    </>
  );

  return (
    <>
      <section
        id="servicios"
        ref={sectionRef}
        className="relative overflow-hidden bg-gray-900"
        style={{ minHeight: "100vh" }}
      >
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center pt-4 md:px-0" style={{ marginTop: '100px' }}>
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
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 disabled:opacity-50 hidden-mobile"
                    aria-label="Anterior servicio"
                    disabled={fading}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={goNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-primary transition-all duration-300 disabled:opacity-50 hidden-mobile"
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

          {/* SECCIÓN MODIFICADA: dos botones para empresas y proveedores */}
          <div className="bg-white py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-center items-stretch">
              {/* Botón / Tarjeta para Empresas */}
              <button
                onClick={handleOpenEmpresas}
                className="group flex-1 flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  {/* Icono de edificio/empresa (SVG inline) */}
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-gray-800">¿Eres una empresa?</div>
                  <div className="text-sm text-gray-500">Contacta con Starlight para soluciones corporativas</div>
                </div>
                <div className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Botón / Tarjeta para Proveedores */}
              <button
                onClick={handleOpenProveedores}
                className="group flex-1 flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                  {/* Icono de apretón de manos / proveedores */}
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-gray-800">Únete como proveedor</div>
                  <div className="text-sm text-gray-500">Forma parte de nuestra red de servicios y suministros</div>
                </div>
                <div className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
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

        <ModalRegistro open={modalOpen} onOpenChange={setModalOpen} tipoProspecto={prospectType} />
        <ModalMoreInfo
          open={moreInfoModalOpen}
          onOpenChange={setMoreInfoModalOpen}
          service={selectedServiceForMoreInfo}
        />
      </section>
    </>
  );
}