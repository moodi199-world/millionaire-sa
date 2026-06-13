'use client'

import { useRef } from 'react'

interface Props {
  years: string
  date: string
  netWorth: string
  saving: string
  goal: string
}

export default function ShareCard({ years, date, netWorth, saving, goal }: Props) {

  const cardRef = useRef<HTMLDivElement>(null)

  const getText = () =>
    `💰 متى تصبح مليونير؟\n\n🏆 سأصل للمليون خلال: ${years}\n📅 ${date}\n\nثروتي الحالية: ${netWorth} ريال\nأدخر: ${saving} ريال شهرياً\n\nاحسب هدفك: millionaire-sa.netlify.app`

  const copyResult = () => navigator.clipboard.writeText(getText()).catch(() => {})

  const shareWhatsapp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(getText())}`, '_blank')

  const shareX = () =>
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(getText())}`, '_blank')

  const downloadCard = async () => {
    const { default: html2canvas } = await import('html2canvas')
    if (!cardRef.current) return
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#0A0F1C',
      scale: 2,
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = 'millionaire-result.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="space-y-3">
      {/* البطاقة المرئية */}
      <div
        ref={cardRef}
        className="bg-[#0A0F1C] border-2 border-[#D4A017] rounded-2xl p-6 text-center relative overflow-hidden"
        style={{ fontFamily: 'Tajawal, sans-serif' }}
      >
        <div className="absolute text-8xl opacity-5 right-2 top-2 select-none">💰</div>
        <div className="absolute text-8xl opacity-5 left-2 bottom-2 select-none">🏆</div>

        <div className="text-[#D4A017] text-xs font-bold mb-3 tracking-widest">متى تصبح مليونير؟</div>

        <div className="text-white text-sm mb-2">سأصل للمليون خلال</div>
        <div className="text-[#D4A017] text-4xl font-extrabold mb-1 leading-tight">{years}</div>
        {date && <div className="text-white text-sm font-bold mb-4">📅 {date}</div>}

        <div className="flex justify-center gap-6 text-center mb-4">
          <div>
            <div className="text-gray-400 text-xs">ثروتي الحالية</div>
            <div className="text-white text-sm font-bold">{netWorth} ريال</div>
          </div>
          <div className="w-px bg-white/20"></div>
          <div>
            <div className="text-gray-400 text-xs">أدخر شهرياً</div>
            <div className="text-white text-sm font-bold">{saving} ريال</div>
          </div>
        </div>

        <div className="bg-[#D4A017]/20 border border-[#D4A017]/40 rounded-xl px-4 py-2 inline-block">
          <span className="text-[#D4A017] text-xs font-bold">millionaire-sa.netlify.app</span>
        </div>
      </div>

      {/* أزرار المشاركة */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={downloadCard}
          className="py-2.5 bg-gold/20 border border-gold/40 text-gold text-sm font-bold rounded-xl hover:bg-gold/30 transition-all"
        >
          📥 تحميل صورة
        </button>
        <button
          onClick={copyResult}
          className="py-2.5 bg-white/5 border border-white/20 text-gray-300 text-sm font-bold rounded-xl hover:bg-white/10 transition-all"
        >
          📋 نسخ النص
        </button>
        <button
          onClick={shareWhatsapp}
          className="py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold rounded-xl hover:bg-green-500/30 transition-all"
        >
          📱 واتساب
        </button>
        <button
          onClick={shareX}
          className="py-2.5 bg-white/10 border border-white/20 text-gray-300 text-sm font-bold rounded-xl hover:bg-white/20 transition-all"
        >
          𝕏 تويتر
        </button>
      </div>
    </div>
  )
}
