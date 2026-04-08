"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import starlight from "../assets/logo_Starlight-01.png"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Contacto", href: "#contacto" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src={starlight}
              alt="Starlight Medical Care"
              width={200}
              height={120}
              className=" transition-all duration-300"
          
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative font-medium transition-colors duration-300 hover:text-primary",
                  "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              className={cn(
                "gap-2 transition-all duration-300",
                isScrolled 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-green-500 text-white hover:bg-green-600"
              )}
              onClick={() => window.open('https://wa.me/5215635589236', '_blank')}
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </Button>
            <Button 
              className={cn(
                "gap-2 transition-all duration-300",
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span>Portal</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-white")} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button variant="outline" className="gap-2 w-full">
                <Phone className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button className="gap-2 w-full">
                <LogIn className="w-4 h-4" />
                Portal
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
