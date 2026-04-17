import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface UserSegmentProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  segment: "pacientes" | "corporativos" | "proveedores";
}

// ---------- Partículas ----------
const ParticlesEffect = () => {
  const particles = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 26 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * 4,
    })), []);

  return (
    <div className="absolute inset-0" >
      {particles.map((p) => (
        <div
          key={p.id}
          className=" rounded-full bg-white/60"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animation: `floatParticle ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
            // border:'1px solid red'
          }}
        />
      ))}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-30px) translateX(15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ---------- Comentarios flotantes ----------
interface FloatingCommentsProps {
  segment: "corporativos" | "proveedores";
}

const FloatingComments = ({ segment }: FloatingCommentsProps) => {
  const commentsPool = useMemo(() => {
    return segment === "corporativos"
      ? [
        "10 años de experiencia",
        "Cobertura nacional",
        "+7 empresas aliadas",
        "Atención 24/7",
        // "Certificación ISO",
        "Equipo especializado",
      ]
      : [
        // "Únete a la Red de Proveedores",
        "Red médica líder en México",
        // "Conecta con miles de pacientes",
        "Aumenta tu visibilidad",
        "Accede a corporativos",
        "Sin costos de afiliación",
      ];
  }, [segment]);

  const [comments, setComments] = useState<string[]>([]);

  const getRandomComments = () => {
    const shuffled = [...commentsPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setComments(getRandomComments());
    const interval = setInterval(() => {
      setComments(getRandomComments());
    }, 5000);
    return () => clearInterval(interval);
  }, [segment]);

  return (
    // <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[180px] z-10" >
    <div className="absolute inset-0 w-full  rounded-[180px] " >

      {comments.map((text, idx) => (
        <motion.div
          key={text + idx}
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          className="absolute bg-white/90 backdrop-blur-sm text-gray-800 text-sm md:text-base font-medium px-4 py-2 rounded-full shadow-lg floating-comment"
          style={{
            top: `${120 + idx * 80}px`,
            right: `${20 + idx * 30}px`,
            maxWidth: "85%",
            textAlign: 'center'
          }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};

// ---------- Hero ----------
export function Hero1({
  title,
  description,
  reversed = false,
  segment,
}: UserSegmentProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const renderExtraEffect = () => {
    // if (segment === "pacientes") return <ParticlesEffect />;
    if (segment === "corporativos" || segment === "proveedores") {
      return <FloatingComments segment={segment} />;
    }
    return null;
  };

  return (
    <>
      <div
        className="w-full lg:w-4/5 mx-auto px-4 lg:px-0 mb-8 lg:mb-12"
        
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center justify-center py-12 lg:py-16 rounded-[180px] relative overflow-hidden z-50`}
        >
          {/* Texto */}
          <div className="flex-1 space-y-6 p-6 lg:px-12 z-20">
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">
              {title}
            </h2>

            <p className="text-base lg:text-lg text-white/90 max-w-lg">
              {description}
            </p>

            <Button
              size="lg"
              className="group gap-2 text-base font-semibold rounded-full px-8"
              onClick={() => setModalOpen(true)}
            >
              Solicitar Información
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Visual */}
          <div className="flex-1 flex justify-center relative min-h-[280px] lg:min-h-[400px]">
            <div className="relative w-64 lg:w-80 h-full">
              {/* Fondo */}
              <div className="absolute inset-0  bg-accent rounded-[180px]  shadow-2xl" />

              {/* Efectos */}
              {renderExtraEffect()}
            </div>
          </div>
        </motion.div>
      </div>

      <LeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        segment={segment}
      />
    </>
  );
}