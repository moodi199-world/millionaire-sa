import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'متى تصبح مليونير؟',
  description: 'احسب خلال 30 ثانية متى ستصل لأول مليون ريال',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
