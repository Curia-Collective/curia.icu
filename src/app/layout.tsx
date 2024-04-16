import type { Metadata } from 'next'
import { Ibarra_Real_Nova } from 'next/font/google'

import { siteConfig } from '@/lib/siteConfig'
import Bg from './bg'
import { Footer } from './footer'
import { RootProvider } from './root-provider'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'

const serif = Ibarra_Real_Nova({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <RootProvider>
        <body className={serif.className}>{children}</body>
        <Footer />
        <Bg />
      </RootProvider>
    </html>
  )
}
