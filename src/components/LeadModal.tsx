import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  segment: "pacientes" | "corporativos" | "proveedores";
}

const segmentLabels = {
  pacientes: {
    title: "Solicitar Servicios Médicos",
    description: "Déjanos tus datos y un asesor se pondrá en contacto contigo.",
  },
  corporativos: {
    title: "Servicios para tu Empresa",
    description: "Cuéntanos sobre tu empresa y te enviaremos una propuesta personalizada.",
  },
  proveedores: {
    title: "Únete a nuestra Red",
    description: "Completa el formulario para que evaluemos tu perfil como proveedor.",
  },
};

export function LeadModal({ open, onOpenChange, segment }: LeadModalProps) {
  const [loading, setLoading] = useState(false);
  const labels = segmentLabels[segment];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast.success("¡Gracias! Nos pondremos en contacto contigo pronto.");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{labels?.title}</DialogTitle>
          <DialogDescription>{labels?.description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" placeholder="Tu nombre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" type="tel" placeholder="55 1234 5678" required />
          </div>
          {segment === "corporativos" && (
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" placeholder="Nombre de tu empresa" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" placeholder="¿En qué podemos ayudarte?" rows={3} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Solicitar Información"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}