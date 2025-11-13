'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Library, PlusCircle, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface LibraryNavigationProps {
  currentPage?: 'home' | 'library' | 'create'
  rightContent?: React.ReactNode
}

export function LibraryNavigation({ currentPage = 'library', rightContent }: LibraryNavigationProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

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
          console.log('LibraryNavigation: isAdmin =', profile?.role === 'admin')
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

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl font-bold text-blue-700">FreeMathPrintable.com</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`transition-colors ${currentPage === 'home' ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'}`}
              >
                <Home className="w-4 h-4 inline mr-1" />
                Home
              </Link>
              <Link
                href="/library"
                className={`transition-colors ${currentPage === 'library' ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'}`}
              >
                <Library className="w-4 h-4 inline mr-1" />
                Browse Library
              </Link>
              <Link
                href="/create"
                className={`transition-colors ${currentPage === 'create' ? 'text-blue-700 font-medium' : 'text-gray-600 hover:text-blue-700'}`}
              >
                <PlusCircle className="w-4 h-4 inline mr-1" />
                Create Printable
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {rightContent}
            {isAdmin && (
              <Button size="sm" variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
