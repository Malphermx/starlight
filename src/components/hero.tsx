import { useState } from "react";
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

export function Hero1({
  title,
  description,
  imageSrc,
  imageAlt,
  reversed = false,
  segment,
}: UserSegmentProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full lg:w-4/5 mx-auto px-4 lg:px-0 mb-8 lg:mb-12" >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`flex justify-center flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center py-12 lg:py-16  rounded-[180px]  z-99`}
          
        >
          {/* Text side */}
          <div className="flex-1 space-y-6 p-6 lg:px-12">
            <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {title}
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ color: 'white' }}>
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

          {/* Pill with person */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 lg:w-80">
              {/* Blue pill background */}
              <div className="absolute inset-0 rounded-[180px] bg-accent shadow-2xl" />
              {/* Person image overlapping the pill */}
              {/* <div className="relative z-1 flex items-end justify-center pt-6 lg:pt-8">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="w-56 lg:w-72 h-auto object-contain drop-shadow-xl"
                />
              </div> */}
            </div>
          </div>
        </motion.div>
      </div>

      <LeadModal open={modalOpen} onOpenChange={setModalOpen} segment={segment} />
    </>
  );
}