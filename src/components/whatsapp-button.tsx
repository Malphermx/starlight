"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-white rounded-xl shadow-xl px-4 py-3 relative">
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-foreground font-medium text-sm whitespace-nowrap">
              ¿Necesitas ayuda?
            </p>
            <p className="text-muted-foreground text-xs">
              Escríbenos por WhatsApp
            </p>
            {/* Arrow */}
            <div className="absolute bottom-0 right-6 translate-y-full">
              <div className="w-3 h-3 bg-white transform rotate-45 -translate-y-1.5 shadow-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/5256355892360"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-3 bg-green-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105",
          isHovered ? "pl-5 pr-6 py-3" : "p-4"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MessageCircle className={cn(
          "transition-all duration-300",
          isHovered ? "w-6 h-6" : "w-7 h-7"
        )} />
        <span className={cn(
          "font-semibold whitespace-nowrap overflow-hidden transition-all duration-300",
          isHovered ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
        )}>
          Chatea con nosotros
        </span>
      </a>

      {/* Pulse Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
      </div>
    </div>
  )
}
