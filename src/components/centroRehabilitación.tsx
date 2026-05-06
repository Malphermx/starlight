"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Clock, Users, Heart, Award, Phone, MapPin } from "lucide-react";
import video from '@/video/Video-Starlight_v1.mp4';
import doctora_centro from "@/assets/doctora_centro.png";
import { ModalRegistro } from "./ModalRegistro";

// Características principales
const features = [
    {
        icon: CheckCircle,
        title: "Atención personalizada",
        description:
            "Planes de rehabilitación adaptados a las necesidades específicas de cada paciente.",
    },
    {
        icon: Clock,
        title: "Horarios flexibles",
        description:
            "Disponibilidad de lunes a sábado con horarios extendidos para tu comodidad.",
    },
    {
        icon: Users,
        title: "Equipo multidisciplinario",
        description:
            "Terapeutas físicos, ocupacionales, del lenguaje y neurológicos especializados.",
    },
    {
        icon: Heart,
        title: "Enfoque integral",
        description:
            "Tratamos la causa raíz, no solo los síntomas, para una recuperación duradera.",
    },
    {
        icon: Award,
        title: "Tecnología de vanguardia",
        description: "Equipos modernos y técnicas avanzadas para mejores resultados.",
    },
];

// Datos estadísticos con colores y posiciones alrededor de la doctora
const statsAroundDoctor = [
    { value: "+10", label: "años de experiencia", color: "white", posX: "10%", posY: "-10%" },
    { value: "98%", label: "satisfacción del paciente", color: "green", posX: "85%", posY: "10%" },
    { value: "24/7", label: "disponibilidad de emergencia", color: "blue", posX: "50%", posY: "95%" },
];

// Cruces fijas (7) alrededor de la doctora
const crossesAroundDoctor = [
    { id: 1, size: 28, left: "-15%", top: "10%", rotate: 0 },
    { id: 2, size: 42, left: "105%", top: "20%", rotate: 0 },
    { id: 3, size: 22, left: "-8%", top: "60%", rotate: 0 },
    { id: 4, size: 36, left: "110%", top: "65%", rotate: 0 },
    { id: 5, size: 18, left: "20%", top: "25%", rotate: 0 },
    { id: 6, size: 48, left: "70%", top: "115%", rotate: 0 },
    { id: 7, size: 30, left: "90%", top: "-15%", rotate: 0 },
];

// Componente que envuelve la imagen de la doctora con cruces y comentarios animados
const DoctoraWithDecorations = ({ isVisible }: { isVisible: boolean }) => {
    // SVG de cruz médica blanca
    const crossSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='2' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3C/svg%3E")`;

    // Animación sutil izquierda-derecha para los comentarios
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
      @keyframes subtleSlide {
        0% { transform: translateX(-6px); }
        50% { transform: translateX(6px); }
        100% { transform: translateX(-6px); }
      }
      .animate-subtle-slide {
        animation: subtleSlide 3s ease-in-out infinite;
      }
      .animate-subtle-slide-delayed {
        animation: subtleSlide 3.5s ease-in-out infinite reverse;
      }
      .animate-subtle-slide-slow {
        animation: subtleSlide 4s ease-in-out infinite;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div
            className={cn(
                "absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-700 delay-300 md-none",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
        >
            <div className="relative">
                {/* Imagen de la doctora */}
                <img
                    src={doctora_centro}
                    alt="Doctora Centro de Rehabilitación"
                    className="w-28 h-auto md:w-44 lg:w-80 drop-shadow-2xl"
                />
                {/* Anillo decorativo detrás */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 scale-125" />

                {/* Cruces fijas alrededor de la imagen */}
                {crossesAroundDoctor.map((cross) => (
                    <div
                        key={cross.id}
                        className="absolute bg-no-repeat bg-center pointer-events-none"
                        style={{
                            width: `${cross.size}px`,
                            height: `${cross.size}px`,
                            left: cross.left,
                            top: cross.top,
                            backgroundImage: crossSvg,
                            backgroundSize: "contain",
                            transform: `rotate(${cross.rotate}deg)`,
                            opacity: 0.85,
                        }}
                    />
                ))}

                {/* Comentarios estadísticos animados (blanco, verde, azul) */}
                {statsAroundDoctor.map((stat, idx) => {
                    let bgColor = "";
                    let textColor = "";
                    let animationClass = "";
                    switch (stat.color) {
                        case "white":
                            bgColor = "bg-white/95";
                            textColor = "text-gray-800";
                            animationClass = "animate-subtle-slide";
                            break;
                        case "green":
                            bgColor = "bg-green-500/95";
                            textColor = "text-white";
                            animationClass = "animate-subtle-slide-delayed";
                            break;
                        case "blue":
                            bgColor = "bg-blue-500/95";
                            textColor = "text-white";
                            animationClass = "animate-subtle-slide-slow";
                            break;
                    }
                    return (
                        <div
                            key={idx}
                            className={`absolute rounded-xl shadow-lg backdrop-blur-sm px-3 py-2 text-center ${bgColor} ${textColor} ${animationClass}`}
                            style={{
                                left: stat.posX,
                                top: stat.posY,
                                transform: "translate(-50%, -50%)",
                                minWidth: "90px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <div className="text-lg md:text-xl font-bold">{stat.value}</div>
                            <div className="text-xs md:text-sm font-medium opacity-90">{stat.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export function CentroRehabilitacion() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [mapModalOpen, setMapModalOpen] = useState(false);
    const [rhombuses, setRhombuses] = useState<
        Array<{
            id: number;
            left: string;
            top: string;
            size: number;
            bgColor: string;
            opacity: number;
            rotation: number;
            speed: number;
        }>
    >([]);

    const scrollAnimationRef = useRef<number | null>(null);
    const isScrollingRef = useRef(false);

    // Generar rombos aleatorios
    useEffect(() => {
        const colors = [
            "rgba(255, 255, 255, 0.15)", // blanco
        ];

        const count = 35;
        const newRhombuses = [];

        for (let i = 0; i < count; i++) {
            // Posiciones aleatorias (porcentajes, pueden salir ligeramente fuera para efecto)
            const left = Math.random() * 110 - 10; // -10% a 100%
            const top = Math.random() * 120 - 20; // -20% a 100%
            // Tamaño entre 20px y 140px
            const size = 20 + Math.random() * 120;
            // Color aleatorio de la lista
            const bgColor = colors[Math.floor(Math.random() * colors.length)];
            // Opacidad adicional entre 0.4 y 1 (sobre el color base)
            const opacity = 0.4 + Math.random() * 0.6;
            // Rotación base 45° (rombo) + extra aleatorio
            const rotation = 45 + Math.random() * 360;
            // Velocidad parallax: entre 0.1 y 1.2
            const speed = 0.15 + Math.random() * 1.05;

            newRhombuses.push({
                id: i,
                left: `${left}%`,
                top: `${top}%`,
                size,
                bgColor,
                opacity,
                rotation,
                speed,
            });
        }

        setRhombuses(newRhombuses);
    }, []);

    // Efecto parallax en scroll
    useEffect(() => {
        if (!sectionRef.current || rhombuses.length === 0) return;

        const updateParallax = () => {
            if (!sectionRef.current) return;

            const scrollY = window.scrollY;
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const sectionTop = sectionRect.top + scrollY;
            const scrollDelta = scrollY - sectionTop;

            // Aplicar transform a cada rombo
            const rhombusElements = document.querySelectorAll(".parallax-rhombus");
            rhombusElements.forEach((el, index) => {
                const speed = parseFloat((el as HTMLElement).dataset.speed || "0.5");
                const rotation = parseFloat((el as HTMLElement).dataset.rotation || "45");
                const yOffset = scrollDelta * speed;
                (el as HTMLElement).style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
            });

            isScrollingRef.current = false;
        };

        const handleScroll = () => {
            if (!isScrollingRef.current) {
                isScrollingRef.current = true;
                if (scrollAnimationRef.current) {
                    cancelAnimationFrame(scrollAnimationRef.current);
                }
                scrollAnimationRef.current = requestAnimationFrame(updateParallax);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Llamada inicial para posicionar correctamente
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollAnimationRef.current) {
                cancelAnimationFrame(scrollAnimationRef.current);
            }
        };
    }, [rhombuses]);

    // Observer para animación de entrada
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="servicios"
            ref={sectionRef}
            className="relative overflow-hidden bg-gray-900"
            style={{ paddingTop: "30px" }}
        >
            {/* Fondo con imagen */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/fondo.avif')" }}
            />

            {/* Overlay claro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Rombo de fondo con parallax */}
            <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
                {rhombuses.map((rhombus) => (
                    <div
                        key={rhombus.id}
                        className="parallax-rhombus absolute"
                        style={{
                            left: rhombus.left,
                            top: rhombus.top,
                            width: `${rhombus.size}px`,
                            height: `${rhombus.size}px`,
                            border: `2px solid ${rhombus.bgColor}`,
                            borderRadius: "10px",
                            opacity: rhombus.opacity,
                            transform: `rotate(${rhombus.rotation}deg)`,
                            boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                            backdropFilter: "blur(1px)",
                        }}
                        data-speed={rhombus.speed}
                        data-rotation={rhombus.rotation}
                    />
                ))}
            </div>

            {/* Contenido principal */}
            <div className="relative z-10">
                {/* Header de sección */}
                <div
                    className={cn(
                        "text-center max-w-3xl mx-auto pt-4 pb-8 px-4 transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
                        ¿Conoces nuestro centro de rehabilitación?
                    </h2>
                    <p className="text-white text-lg max-w-2xl mx-auto">
                        Ofrecemos terapias especializadas: física, pulmonar, ocupacional, de deglución,
                        neurológica y de lenguaje.
                    </p>
                </div>

                {/* Contenedor principal con posicionamiento relativo para la imagen flotante */}
                <div className="relative w-full md:w-4/5 mx-auto px-4 py-8 lg:py-16">
                    {/* Imagen de la doctora con cruces y comentarios alrededor */}
                    <DoctoraWithDecorations isVisible={isVisible} />

                    {/* Layout dos columnas con padding superior para la imagen */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-12 md:pt-20 lg:pt-24">
                        {/* Columna izquierda: Información y características */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-300",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}
                        >
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl w-why-80">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                    ¿Por qué elegirnos?
                                </h3>

                                <div className="space-y-5 mb-8">
                                    {features.map((feature, idx) => {
                                        const Icon = feature.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className="flex gap-4 items-start group"
                                                style={{ transitionDelay: `${idx * 50}ms` }}
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-lg">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-white/70 text-sm leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-full shadow-lg hover:shadow-xl transition-all group"
                                    onClick={() => setModalOpen(true)}
                                >
                                    <Phone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Solicitar información
                                </Button>

                                {/* Botón secundario para ver ubicación */}
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full mt-3 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white rounded-full shadow-md transition-all group"
                                    onClick={() => setMapModalOpen(true)}
                                >
                                    <MapPin className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Ver ubicación del centro
                                </Button>

                                <p className="text-white/40 text-xs text-center mt-3">
                                    Respuesta en menos de 24 horas
                                </p>
                            </div>
                        </div>

                        {/* Columna derecha: Video */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-200",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}
                        >
                            <div className="relative aspect-[9/16] max-h-[700px] mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
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
                    </div>
                </div>

                {/* Diagonal accent lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    <div className="absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent -rotate-12 top-1/3 -left-1/4 opacity-40" />
                    <div className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -rotate-12 top-2/3 -left-1/4 opacity-30" />
                </div>

                {/* Modal de registro (existente) */}
                <ModalRegistro
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    tipoProspecto={"general"}
                />

                {/* Modal del mapa */}
                <Dialog open={mapModalOpen} onOpenChange={setMapModalOpen}>
                    <DialogContent className="sm:max-w-3xl bg-gray-900/95 backdrop-blur-md border-white/20">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white">
                                Ubicación del centro de rehabilitación
                            </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3763.6983067387946!2d-99.18108752478689!3d19.382211681886496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDIyJzU2LjAiTiA5OcKwMTAnNDIuNyJX!5e0!3m2!1ses!2smx!4v1777412629598!5m2!1ses!2smx" 
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow-2xl"
                                title="Mapa del centro de rehabilitación"></iframe>
                        </div>
                        <p className="text-white/60 text-sm text-center mt-2">
                            Holbein 174, Cd. de los Deportes, Benito Juárez, 03710 Ciudad de México, CDMX
                        </p>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}