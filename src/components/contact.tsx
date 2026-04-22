"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react"
import { urlBack } from "@/hooks/url_enpoint"

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "56 3558 9236",
    description: "Línea directa de atención",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "52 1 56-35-58-92-36",
    description: "Respuesta inmediata",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contacto@starlightmc.com",
    description: "Escríbenos",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "24/7",
    description: "Siempre disponibles",
  },
]

const serviciosDisponibles = [
  { id: "atencionmedica", label: "Atención médica" },
  { id: "ambulancias", label: "Ambulancias y urgencias" },
  { id: "farmacia", label: "Farmacia" },
  { id: "rehabilitacion", label: "Rehabilitación" },
  { id: "enfermeria", label: "Enfermería" },
  { id: "oxigeno", label: "Oxígeno y ventilación" },
  { id: "equipo", label: "Equipo médico y material de curación" },
]

// Constantes de validación
const MAX_LENGTH_NAME_EMAIL_PHONE = 100
const MAX_LENGTH_MESSAGE = 1000

// Función para eliminar emojis y truncar texto (nombre y mensaje)
const sanitizeInput = (value: string, maxLength: number): string => {
  const withoutEmojis = value.replace(/[\p{Emoji}]/gu, '')
  return withoutEmojis.slice(0, maxLength)
}

// Función específica para correo: solo elimina emojis, permite números y todo lo demás
const sanitizeEmail = (value: string, maxLength: number): string => {
  const withoutEmojis = value.replace(/[\p{Emoji}]/gu, '')
  return withoutEmojis.slice(0, maxLength)
}

// Función específica para el teléfono: solo números
const sanitizePhone = (value: string, maxLength: number): string => {
  const onlyNumbers = value.replace(/\D/g, '')
  return onlyNumbers.slice(0, maxLength)
}

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviciosSolicitados: [] as string[],
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value

    if (name === "message") {
      sanitizedValue = sanitizeInput(value, MAX_LENGTH_MESSAGE)
    } else if (name === "phone") {
      sanitizedValue = sanitizePhone(value, MAX_LENGTH_NAME_EMAIL_PHONE)
    } else if (name === "email") {
      sanitizedValue = sanitizeEmail(value, MAX_LENGTH_NAME_EMAIL_PHONE)
    } else if (name === "name") {
      sanitizedValue = sanitizeInput(value, MAX_LENGTH_NAME_EMAIL_PHONE)
    }

    setFormState(prev => ({ ...prev, [name]: sanitizedValue }))
    setError(null)
  }

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    setFormState(prev => ({
      ...prev,
      serviciosSolicitados: checked
        ? [...prev.serviciosSolicitados, serviceId]
        : prev.serviciosSolicitados.filter(id => id !== serviceId)
    }))
    setError(null)
  }

  const validateForm = (): boolean => {
    if (!formState.name.trim()) {
      setError("El nombre completo es obligatorio")
      return false
    }
    if (!formState.email.trim()) {
      setError("El correo electrónico es obligatorio")
      return false
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setError("Correo electrónico inválido")
      return false
    }
    if (!formState.phone.trim()) {
      setError("El teléfono es obligatorio")
      return false
    }
    if (!/^\d+$/.test(formState.phone)) {
      setError("El teléfono solo puede contener números")
      return false
    }
    if (formState.serviciosSolicitados.length === 0) {
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
      nombreCompleto: formState.name.trim(),
      correoElectronico: formState.email.trim(),
      telefono: formState.phone.trim(),
      mensaje: formState.message.trim() || null,
      tipoProspecto: "general",
      serviciosSolicitados: formState.serviciosSolicitados,
    }

    try {
      const response = await fetch(`${urlBack}prospectos.php/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (data?.error) {
        throw new Error(data.error || "Error al registrar")
      }

      setSuccess(true)
      // Resetear formulario después de 2 segundos
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
          serviciosSolicitados: [],
        })
        setSuccess(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section 
      id="contacto"
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Contacto
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            ¿Listo para comenzar?
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className={cn(
            "transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className={cn(
                      "bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 group hover:-translate-y-1",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-primary font-semibold">{item.value}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <div className="relative rounded-2xl overflow-hidden h-[250px] bg-muted">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-medical.jpg')" }}
              />
              <div className="absolute inset-0 bg-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-bold text-foreground">Starlight México</p>
                    <p className="text-muted-foreground text-sm">Ciudad de México</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={cn(
            "transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-foreground mb-2">Envíanos un mensaje</h3>
              <p className="text-muted-foreground mb-6">
                Completa el formulario y nos pondremos en contacto contigo
              </p>

              {success ? (
                <div className="py-8 text-center">
                  <div className="text-green-600 text-lg font-semibold mb-2">¡Registro exitoso!</div>
                  <p className="text-muted-foreground">Gracias por contactarnos. En breve recibirá respuesta.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      name="name"
                      placeholder="Tu nombre"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl"
                      disabled={isSubmitting}
                      maxLength={MAX_LENGTH_NAME_EMAIL_PHONE}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="h-12 rounded-xl"
                        disabled={isSubmitting}
                        maxLength={MAX_LENGTH_NAME_EMAIL_PHONE}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Teléfono *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="55 1234 5678"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="h-12 rounded-xl"
                        disabled={isSubmitting}
                        maxLength={MAX_LENGTH_NAME_EMAIL_PHONE}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      name="message"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formState.message}
                      onChange={handleInputChange}
                      className="min-h-[120px] rounded-xl resize-none"
                      disabled={isSubmitting}
                      maxLength={MAX_LENGTH_MESSAGE}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Servicios que solicita *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {serviciosDisponibles.map(service => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={service.id}
                            checked={formState.serviciosSolicitados.includes(service.id)}
                            onCheckedChange={(checked) => handleServiceToggle(service.id, checked as boolean)}
                            disabled={isSubmitting}
                          />
                          <label
                            htmlFor={service.id}
                            className="text-sm font-normal cursor-pointer text-foreground"
                          >
                            {service.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>
                  )}

                  <Button type="submit" size="lg" className="w-full rounded-xl gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}