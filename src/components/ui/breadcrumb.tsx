'use client'

import { ChevronRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  className?: string
  onNavigate?: (path: string) => void | Promise<void>
}

export function Breadcrumb({ items, showHome = true, className = '', onNavigate }: BreadcrumbProps) {
  const handleNavigation = (href?: string) => {
    if (href) {
      if (onNavigate) {
        onNavigate(href)
      } else {
        // Fallback for development/mock mode
        console.log(`Navigating to: ${href}`)
      }
    }
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm text-slate-600 ${className}`}>
      {showHome && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-slate-600 hover:text-slate-900"
            onClick={() => handleNavigation('/dashboard')}
          >
            <Home className="h-4 w-4" />
          </Button>
          {items.length > 0 && <ChevronRight className="h-4 w-4" />}
        </>
      )}
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {item.href && !item.current ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-slate-600 hover:text-slate-900"
              onClick={() => handleNavigation(item.href)}
            >
              {item.label}
            </Button>
          ) : (
            <span className={`px-2 ${item.current ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
              {item.label}
            </span>
          )}
          
          {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
        </div>
      ))}
    </nav>
  )
}