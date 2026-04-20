// components/LeadModal.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { urlBack } from "@/hooks/url_enpoint";


interface LeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tipoProspecto?: "general" | "empresa" | "proveedor"
}

const serviciosDisponibles = [
  { id: "atencionmedica", label: "Atención médica" },
  { id: "ambulancias", label: "Ambulancias y urgencias" },
  { id: "farmacia", label: "Farmacia" },
  { id: "rehabilitacion", label: "Rehabilitación" },
  { id: "enfermeria", label: "Enfermería" },
  { id: "oxigeno", label: "Oxígeno y ventilación" },
  { id: "equipo", label: "Equipo médico y material de curación" },
]

export function ModalRegistro({ open, onOpenChange, tipoProspecto = "general" }: LeadModalProps) {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    telefono: "",
    mensaje: "",
    serviciosSolicitados: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      serviciosSolicitados: checked
        ? [...prev.serviciosSolicitados, serviceId]
        : prev.serviciosSolicitados.filter(id => id !== serviceId)
    }))
    setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.nombreCompleto.trim()) {
      setError("El nombre completo es obligatorio")
      return false
    }
    if (!formData.correoElectronico.trim()) {
      setError("El correo electrónico es obligatorio")
      return false
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
    if (!emailRegex.test(formData.correoElectronico)) {
      setError("Correo electrónico inválido")
      return false
    }
    if (!formData.telefono.trim()) {
      setError("El teléfono es obligatorio")
      return false
    }
    if (tipoProspecto === "general" && formData.serviciosSolicitados.length === 0) {
      setError("Debes seleccionar al menos un servicio")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setError(null)

    const payload = {
      nombreCompleto: formData.nombreCompleto.trim(),
      correoElectronico: formData.correoElectronico.trim(),
      telefono: formData.telefono.trim(),
      mensaje: formData.mensaje.trim() || null,
      tipoProspecto,
      ...(tipoProspecto === "general" && { serviciosSolicitados: formData.serviciosSolicitados }),
    }

    try {
      const response = await fetch(`${urlBack}prospectos.php/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log(data.error, "response.ok")
      if (data?.error) {
      
        throw new Error(data.error || "Error al registrar")
      }

      setSuccess(true)
      // Reset form después de 2 segundos y cerrar modal
      setTimeout(() => {
        setFormData({
          nombreCompleto: "",
          correoElectronico: "",
          telefono: "",
          mensaje: "",
          serviciosSolicitados: [],
        })
        setSuccess(false)
        onOpenChange(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determinar título y descripción según tipo
  const getTitle = () => {
    switch (tipoProspecto) {
      case "general":
        return "Solicitar Atención Médica"
      case "empresa":
        return "Soluciones de Salud para tu Empresa"
      case "proveedor":
        return "Únete a la Red de Proveedores"
    }
  }

  const getDescription = () => {
    switch (tipoProspecto) {
      case "general":
        return "Complete el formulario y seleccione los servicios que necesita. Nos pondremos en contacto con usted."
      case "empresa":
        return "Déjenos sus datos y uno de nuestros asesores comerciales le contactará para ofrecerle un plan a medida."
      case "proveedor":
        return "Regístrese para formar parte de nuestra red de proveedores de servicios médicos y equipamiento."
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {getTitle()}
          </DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="text-green-600 text-lg font-semibold mb-2">¡Registro exitoso!</div>
            <p className="text-muted-foreground">Gracias por contactarnos. En breve recibirá respuesta.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto">Nombre completo *</Label>
              <Input
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                placeholder="Ej: Juan Pérez"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correoElectronico">Correo electrónico *</Label>
              <Input
                id="correoElectronico"
                name="correoElectronico"
                type="email"
                value={formData.correoElectronico}
                onChange={handleInputChange}
                placeholder="ejemplo@dominio.com"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Ej: 5551234567"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje (opcional)</Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="Escriba su mensaje aquí..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            {tipoProspecto === "general" && (
              <div className="space-y-3">
                <Label>Servicios que solicita *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviciosDisponibles.map(service => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={formData.serviciosSolicitados.includes(service.id)}
                        onCheckedChange={(checked) => handleServiceToggle(service.id, checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar solicitud
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}