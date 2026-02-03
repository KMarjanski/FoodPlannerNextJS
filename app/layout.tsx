import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SettingsProvider } from '@/lib/settings-context'
import { cookies } from 'next/headers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Meal Planner - Weekly Planning Dashboard',
  description: 'Plan your meals for the week with our modern meal planning dashboard',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Pobierz motyw z cookie ustawionego przez middleware
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'dark'
  const themeClass = theme === 'dark' ? 'dark' : ''
  return (
    <html lang="en" suppressHydrationWarning className={themeClass}>
      <body className={`font-sans antialiased`}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  )
}
