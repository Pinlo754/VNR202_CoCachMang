import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cờ cách mạng',
  description: 'A strategic 2-player game set in Vietnamese revolutionary history (1930-1945). Battle between Revolutionary and Colonial forces.',
  icons: {
    icon: [
      {
        url: '/VNRGame.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/VNRGame.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/VNRGame.png',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
