'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, PlusCircle, LogOut, FileText, Library, Menu, X } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface LibraryNavigationProps {
  currentPage?: 'home' | 'library' | 'create' | 'free-printables'
  rightContent?: React.ReactNode
}

export function LibraryNavigation({ currentPage = 'library', rightContent }: LibraryNavigationProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

          setIsAdmin(profile?.role === 'admin')
        }
      } catch (error) {
        console.error('LibraryNavigation: Error checking admin status:', error)
      }
    }
    checkAdmin()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Home, page: 'home' as const },
    { href: '/free-printables', label: 'Free Printables', icon: FileText, page: 'free-printables' as const },
    { href: '/create', label: 'Create', icon: PlusCircle, page: 'create' as const },
    { href: '/library', label: 'Browse All', icon: Library, page: 'library' as const },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[hsl(48,20%,99%)]/95 backdrop-blur-md border-b-2 border-[hsl(38,30%,85%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FreeMathPrintable.com</h1>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-700 font-medium bg-[hsl(38,50%,92%)]'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-[hsl(38,30%,95%)]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {rightContent}
            {isAdmin && (
              <Button size="sm" variant="outline" onClick={handleLogout} className="hidden md:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[hsl(38,30%,85%)] py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-700 font-medium bg-[hsl(38,50%,92%)]'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-[hsl(38,30%,95%)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
