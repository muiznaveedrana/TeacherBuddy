'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

export function Breadcrumb({ items, showHome = true, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm text-gray-600 ${className}`}>
      {showHome && (
        <>
          <Link
            href="/"
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          {items.length > 0 && <ChevronRight className="h-4 w-4" />}
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {item.href && !item.current ? (
            <Link
              href={item.href}
              className="px-2 py-1 text-gray-600 hover:text-blue-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`px-2 ${item.current ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
              {item.label}
            </span>
          )}

          {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
        </div>
      ))}
    </nav>
  )
}