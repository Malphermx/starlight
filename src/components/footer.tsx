"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react"

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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-foreground text-white relative">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-xl text-white">
                S
              </div>
              <span className="text-xl font-bold">Starlight</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm text-pretty leading-relaxed">
              Soluciones médicas integrales, donde y cuando las necesites. 
              Atención a domicilio, ambulancias, farmacia y equipo médico en todo México.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-white/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-white/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-white/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
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
    </footer>
  )
}
