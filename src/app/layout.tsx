import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'متى تصبح مليونير؟',
  description: 'احسب خلال 30 ثانية متى ستصل لأول مليون ريال. أداة مجانية لحساب هدفك المالي.',
  keywords: 'مليونير, ادخار, استثمار, حاسبة مالية, ثروة, ريال سعودي',
  authors: [{ name: 'millionaire-sa' }],
  openGraph: {
    title: 'متى تصبح مليونير؟ 💰',
    description: 'احسب خلال 30 ثانية متى ستصل لأول مليون ريال',
    url: 'https://millionaire-sa.netlify.app',
    siteName: 'متى تصبح مليونير؟',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'متى تصبح مليونير؟ 💰',
    description: 'احسب خلال 30 ثانية متى ستصل لأول مليون ريال',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://millionaire-sa.netlify.app'),
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
