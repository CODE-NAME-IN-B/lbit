import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'اليوم الوطني لتقنية المعلومات',
  description: 'ألعاب تعليمية احتفالاً باليوم الوطني لتقنية المعلومات',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
