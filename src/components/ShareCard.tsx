'use client'

import { useRef, useState } from 'react'

interface Props {
  years: string
  date: string
  netWorth: string
  saving: string
  goal: string
}

export default function ShareCard({ years, date, netWorth, saving, goal }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const challengeText = `🏆 تحدي المليون!\n\nأنا سأصل للمليون خلال:\n${years}\n\nوأنت؟ كم سنة عندك؟\nاحسب نتيجتك: millionaire-sa.netlify.app\n\n#تحدي_المليون #كم_سنة_عندك`

  const copyChallenge = () => {
    navigator.clipboard.writeText(challengeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareWhatsapp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(challengeText)}`, '_blank')

  const shareX = () =>
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(challengeText)}`, '_blank')

  const downloadCard = async () => {
    setDownloading(true)
    try {
      const { default: html2canvas } = await import('html2canvas')
      if (!cardRef.current) return
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0A0F1C',
        scale: 3,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'تحدي-المليون.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error(e)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-4">

      {/* البطاقة */}
      <div
        ref={cardRef}
        style={{
          background: '#0A0F1C',
          border: '2px solid #D4A017',
          borderRadius: '20px',
          padding: '28px 24px',
          textAlign: 'center',
          fontFamily: 'Tajawal, sans-serif',
          direction: 'rtl',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* خلفية زخرفية */}
        <div style={{ position: 'absolute', fontSize: '120px', opacity: 0.04, top: '-20px', right: '-10px', lineHeight: 1 }}>💰</div>
        <div style={{ position: 'absolute', fontSize: '120px', opacity: 0.04, bottom: '-20px', left: '-10px', lineHeight: 1 }}>🏆</div>

        {/* شعار التحدي */}
        <div style={{
          display: 'inline-block',
          background: '#D4A017',
          color: '#0A0F1C',
          fontSize: '11px',
          fontWeight: 800,
          padding: '4px 14px',
          borderRadius: '20px',
          marginBottom: '16px',
          letterSpacing: '1px',
        }}>
          🔥 تحدي المليون
        </div>

        {/* النتيجة */}
        <div style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '8px' }}>
          أنا سأصل للمليون خلال
        </div>

        {/* خط فاصل علوي */}
        <div style={{ height: '1px', background: 'rgba(212,160,23,0.3)', margin: '0 20px 16px' }} />

        <div style={{ color: '#D4A017', fontSize: '42px', fontWeight: 900, lineHeight: 1.1, marginBottom: '8px' }}>
          {years}
        </div>

        {date && (
          <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>
            📅 {date}
          </div>
        )}

        {/* خط فاصل سفلي */}
        <div style={{ height: '1px', background: 'rgba(212,160,23,0.3)', margin: '0 20px 16px' }} />

        {/* التحدي */}
        <div style={{
          background: 'rgba(212,160,23,0.1)',
          border: '1px solid rgba(212,160,23,0.3)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '16px',
        }}>
          <div style={{ color: '#D4A017', fontSize: '16px', fontWeight: 800, marginBottom: '4px' }}>
            وأنت؟ كم سنة عندك؟ 🤔
          </div>
          <div style={{ color: '#6B7280', fontSize: '12px' }}>
            تحدّ أصدقائك واكتشف من الأقرب للمليون
          </div>
        </div>

        {/* معلومات إضافية */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#6B7280', fontSize: '10px' }}>ثروتي الحالية</div>
            <div style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700 }}>{netWorth} ريال</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#6B7280', fontSize: '10px' }}>أدخر شهرياً</div>
            <div style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700 }}>{saving} ريال</div>
          </div>
        </div>

        {/* الرابط */}
        <div style={{
          background: 'rgba(212,160,23,0.15)',
          borderRadius: '8px',
          padding: '6px 12px',
          display: 'inline-block',
        }}>
          <span style={{ color: '#D4A017', fontSize: '11px', fontWeight: 700 }}>
            millionaire-sa.netlify.app
          </span>
        </div>

        {/* الهاشتاق */}
        <div style={{ color: '#4B5563', fontSize: '11px', marginTop: '10px' }}>
          #تحدي_المليون #كم_سنة_عندك
        </div>
      </div>

      {/* عنوان التحدي */}
      <div className="text-center">
        <p className="text-sm font-bold text-white mb-1">🔥 تحدّ أصدقائك!</p>
        <p className="text-xs text-gray-400">شارك نتيجتك وشوف من الأقرب للمليون</p>
      </div>

      {/* أزرار المشاركة */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={downloadCard}
          disabled={downloading}
          className="py-3 bg-gold/20 border border-gold/40 text-gold text-sm font-bold rounded-xl hover:bg-gold/30 transition-all disabled:opacity-50"
        >
          {downloading ? '⏳ جاري...' : '📥 حمّل الصورة'}
        </button>
        <button
          onClick={copyChallenge}
          className="py-3 bg-white/5 border border-white/20 text-gray-300 text-sm font-bold rounded-xl hover:bg-white/10 transition-all"
        >
          {copied ? '✅ تم النسخ!' : '📋 نسخ التحدي'}
        </button>
        <button
          onClick={shareWhatsapp}
          className="py-3 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold rounded-xl hover:bg-green-500/30 transition-all"
        >
          📱 تحدّ على واتساب
        </button>
        <button
          onClick={shareX}
          className="py-3 bg-white/10 border border-white/20 text-gray-300 text-sm font-bold rounded-xl hover:bg-white/20 transition-all"
        >
          𝕏 تحدّ على X
        </button>
      </div>

      {/* هاشتاق */}
      <div className="text-center">
        <span className="text-xs text-gray-600">#تحدي_المليون · #كم_سنة_عندك</span>
      </div>

    </div>
  )
}
