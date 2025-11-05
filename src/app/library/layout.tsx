import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Printable Worksheets Library',
  description: 'Browse our collection of free printable worksheets for Reception to Year 6.',
}

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
