import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YURA | Midnight Vault',
  description: 'Secure digital vault for tangible luxury.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}