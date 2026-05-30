import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Occitanie Posture',
  description: 'Dashboard posture commerciale E&C — Damien Duplan',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Occitanie Posture',
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <head>
        <meta name="theme-color" content="#0F0F0F" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body style={{ fontFamily: "'Fira Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
