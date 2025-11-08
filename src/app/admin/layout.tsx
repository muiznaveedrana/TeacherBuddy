import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth/authHelpers'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is admin
  const admin = await isAdmin()

  if (!admin) {
    // Redirect to login page with return URL
    redirect('/login?returnTo=/admin/library')
  }

  return <>{children}</>
}
