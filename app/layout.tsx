import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cheap Houses — Underpriced properties, curated weekly',
  description: 'One curator. Every listing reviewed by hand. Underpriced properties across 8 countries, delivered every Friday.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
