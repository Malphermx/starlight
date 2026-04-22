"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Heart, Award, Phone } from "lucide-react";
import video from '@/video/Video-Starlight_v1.mp4';
import doctora_centro from "@/assets/doctora_centro.png";
import { ModalRegistro } from "./ModalRegistro";

// Características principales
const features = [
    {
        icon: CheckCircle,
        title: "Atención personalizada",
        description: "Planes de rehabilitación adaptados a las necesidades específicas de cada paciente."
    },
    {
        icon: Clock,
        title: "Horarios flexibles",
        description: "Disponibilidad de lunes a sábado con horarios extendidos para tu comodidad."
    },
    {
        icon: Users,
        title: "Equipo multidisciplinario",
        description: "Terapeutas físicos, ocupacionales, del lenguaje y neurológicos especializados."
    },
    {
        icon: Heart,
        title: "Enfoque integral",
        description: "Tratamos la causa raíz, no solo los síntomas, para una recuperación duradera."
    },
    {
        icon: Award,
        title: "Tecnología de vanguardia",
        description: "Equipos modernos y técnicas avanzadas para mejores resultados."
    }
];

// Datos estadísticos
const stats = [
    { value: "+10", label: "años de experiencia" },
    { value: "98%", label: "satisfacción del paciente" },
    { value: "24/7", label: "disponibilidad de emergencia" }
];

// Componente de fondo con cruces animadas
const CrossesBackground = () => {
    const [crosses, setCrosses] = useState<Array<{ id: number; size: number; left: number; top: number; opacity: number; rotate: number; duration: number; delay: number }>>([]);

    useEffect(() => {
        // Generar 40 cruces para mayor densidad
        const generatedCrosses = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            size: Math.floor(Math.random() * 100) + 5, // 20px - 120px
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity: Math.random() * 0.2 + 0.7, // 0.05 - 0.25
            // rotate: Math.random() * 360,
            duration: Math.random() * 3 + 2, // 2 - 5 segundos
            // delay: Math.random() * 2 // 0 - 2 segundos
        }));
        setCrosses(generatedCrosses);
    }, []);

    // SVG de cruz médica en data URI
    const crossSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='2' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3C/svg%3E")`;

    // Inyectar keyframes globales para la animación de escala
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseCross {
                0% { transform: scale(1) rotate(var(--rotate, 0deg)); }
                50% { transform: scale(1.3) rotate(var(--rotate, 0deg)); }
                100% { transform: scale(1) rotate(var(--rotate, 0deg)); }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {crosses.map((cross) => (
                <div
                    key={cross.id}
                    className="absolute bg-no-repeat bg-center"
                    style={{
                        width: `${cross.size}px`,
                        height: `${cross.size}px`,
                        left: `${cross.left}%`,
                        top: `${cross.top}%`,
                        opacity: cross.opacity,
                        backgroundImage: crossSvg,
                        backgroundSize: 'contain',
                        // '--rotate': `${cross.rotate}deg`,
                        animation: `pulseCross ${cross.duration}s ease-in infinite`,
                        animationDelay: `${cross.delay}s`,
                        transformOrigin: 'center center',
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};

export function CentroRehabilitacion() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState(false);

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
        >
            {/* Fondo con imagen */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/fondo.avif')" }}
            />

            {/* Overlay claro */}
            <div className="absolute inset-0 bg-white/65" />

            {/* Cruces animadas de fondo */}
            <CrossesBackground />

            {/* Contenido principal */}
            <div className="relative z-10">
                {/* Header de sección */}
                <div
                    className={cn(
                        "text-center max-w-3xl mx-auto pt-4 pb-8 px-4 transition-all duration-1000 card-centro",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance text-blue">
                        ¿Conoces nuestro centro de rehabilitación?
                    </h2>
                    <p className="text-white text-lg  max-w-2xl mx-auto text-green">
                        Ofrecemos terapias especializadas: física, pulmonar, ocupacional, de deglución, neurológica y de lenguaje.
                    </p>
                </div>

                {/* Contenedor principal con posicionamiento relativo para la imagen flotante */}
                <div className="relative w-full md:w-4/5 mx-auto px-4 py-8 lg:py-16">
                    {/* Imagen de la doctora centrada y arriba de ambas columnas */}
                    <div className={cn(
                        "absolute left-1/2 -translate-x-1/2  z-20 transition-all duration-700 delay-300",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"

                    )}
                    >
                        <div className="relative md-none">
                            <img
                                src={doctora_centro}
                                alt="Doctora Centro de Rehabilitación"
                                className="w-28 h-auto md:w-44 lg:w-56 drop-shadow-2xl"
                            />
                            {/* Anillo decorativo detrás */}
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 scale-125" />
                        </div>
                    </div>

                    {/* Layout dos columnas con padding superior para la imagen */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start  pt-12 md:pt-20 lg:pt-24">
                        {/* Columna izquierda: Información y características */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-300",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}
                        >
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl">
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

                                <div className="grid grid-cols-3 gap-3 py-5 border-t border-white/20 mb-6">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-2xl md:text-3xl font-bold text-primary">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-white/60 uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-full shadow-lg hover:shadow-xl transition-all group"
                                    onClick={()=>{
                                        setModalOpen(true)
                                    }}
                                >
                                    <Phone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Solicitar información
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

                <ModalRegistro
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    tipoProspecto={"general"}
                />
            </div>
        </section>
    );
}