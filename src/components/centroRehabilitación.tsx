"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Heart, Award, Phone } from "lucide-react";
import video from '@/video/Video-Starlight_v1.mp4';


// Características principales (sin imágenes, solo texto e iconos)
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

// Datos estadísticos (sin fotos)
const stats = [
    { value: "+10", label: "años de experiencia" },
    { value: "98%", label: "satisfacción del paciente" },
    { value: "24/7", label: "disponibilidad de emergencia" }
];

export function CentroRehabilitacion() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

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
            {/* Fondo con imagen y overlay oscuro */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/fondo.avif')" }}
            />
            <div className="absolute inset-0 bg-white/65" />

            {/* Header de sección */}
            <div className="relative z-10">
                <div
                    className={cn(
                        "text-center max-w-3xl mx-auto pt-20 pb-8 px-4 transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
                        ¿Conoces nuestro centro de rehabilitación?
                    </h2>
                    <p className="text-white/70 text-lg text-pretty max-w-2xl mx-auto">
                        Ofrecemos terapias especializadas: física, pulmonar, ocupacional, de deglución, neurológica y de lenguaje.
                    </p>
                </div>

                {/* Contenedor principal */}
                <div className="w-full md:w-4/5 mx-auto px-4 py-8 lg:py-16">
                    {/* Layout dos columnas: video izquierda | contenido derecho */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Columna izquierda: Video vertical */}
                        <div
                            className={cn(
                                "transition-all duration-700 delay-300",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}
                        >
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl">
                                {/* Título interno */}
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                    ¿Por qué elegirnos?
                                </h3>

                                {/* Lista de características */}
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

                                {/* Estadísticas (sin fotos) */}
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

                                {/* Botón de acción */}
                                <Button
                                    size="lg"
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base rounded-full shadow-lg hover:shadow-xl transition-all group"
                                >
                                    <Phone className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Solicitar información
                                </Button>
                                <p className="text-white/40 text-xs text-center mt-3">
                                    Respuesta en menos de 24 horas
                                </p>
                            </div>
                        </div>


                        {/* Columna derecha: Contenido sin fotos (solo texto, iconos, estadísticas) */}
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
                                {/* Degradado suave para dar profundidad */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}