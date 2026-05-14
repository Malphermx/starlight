import { useState } from "react"
import { ArrowUp, X, Upload, Loader2 } from "lucide-react"
import starlight from "../assets/logo_Starlight-02.png"
import { urlBack } from "@/hooks/url_enpoint"

const footerLinks = {
  servicios: [
    { label: "Atención a Domicilio", href: "#" },
    { label: "Ambulancias", href: "#" },
    { label: "Farmacia", href: "#" },
    { label: "Rehabilitación", href: "#" },
    { label: "Equipo Médico", href: "#" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Trabaja con nosotros", href: "#" },
    { label: "Proveedores", href: "#" },
  ],
  legal: [
    { label: "Aviso de Privacidad", href: "#" },
    { label: "Términos y Condiciones", href: "#" },
    { label: "Política de Cookies", href: "#" },
  ],
}

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre_candidato: "",
    asunto: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
    } else {
      setCvFile(null)
    }
  }

  const resetForm = () => {
    setFormData({ nombre_candidato: "", asunto: "" })
    setCvFile(null)
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre_candidato.trim() || !formData.asunto.trim()) {
      setMessage({ type: "error", text: "Por favor completa todos los campos." })
      return
    }
    if (!cvFile) {
      setMessage({ type: "error", text: "Debes seleccionar un archivo de CV." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    const data = new FormData()
    data.append("nombre_candidato", formData.nombre_candidato.trim())
    data.append("asunto", formData.asunto.trim())
    data.append("cv", cvFile)

    try {
      const response = await fetch(`${urlBack}bolsa.php/registro`, {
        method: "POST",
        body: data,
      })
      const result = await response.json()
      
      if (result.success === true) {
        setMessage({ type: "success", text: "¡Registro exitoso! Pronto nos pondremos en contacto." })
        // resetForm()
        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          setIsModalOpen(false)
          resetForm()
        }, 3000)
      } else {
        setMessage({ type: "error", text: result.error || "Error al registrar. Intenta de nuevo." })
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage({ type: "error", text: "Error de conexión. Verifica tu conexión a internet." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <footer className="bg-foreground text-white relative">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-10">
          <div className="">
            {/* Brand */}
            <div className="md:flex items-center justify-center">
              <a href="/" className="flex items-center gap-2 mb-4">
                <img
                  src={starlight}
                  alt="Starlight Medical Care"
                  width={180}
                  height={60}
                  className="h-12 w-auto transition-all duration-300"
                />
              </a>
              <p className="text-white/60 ms-4 max-w-sm text-pretty leading-relaxed" style={{textAlign:'justify'}}>
                Soluciones médicas integrales, donde y cuando las necesites.
                Atención a domicilio, ambulancias, farmacia y equipo médico en todo México.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © {new Date().getFullYear()} Starlight México. Todos los derechos reservados.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-primary/80 hover:bg-primary rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Bolsa de trabajo
                </button>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors group"
                >
                  <span className="text-sm">Volver arriba</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowUp className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Registro para bolsa de trabajo</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  resetForm()
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre_candidato"
                  value={formData.nombre_candidato}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  placeholder="Ej: Ana López"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto / Puesto *
                </label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  placeholder="Ej: Enfermería"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documento CV (PDF, DOC, DOCX, JPG, PNG) *
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">
                        {cvFile ? cvFile.name : "Seleccionar archivo"}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tamaño máximo: 5MB</p>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-primary/80 text-white"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Registrarme"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}