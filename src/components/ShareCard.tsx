'use client'

interface Props {
  years: string
  date: string
  netWorth: string
  saving: string
  goal: string
}

export default function ShareCard({ years, date, netWorth, saving, goal }: Props) {
  const text = `💰 متى تصبح مليونير؟\n\n🏆 سأصل للمليون خلال: ${years}\n📅 ${date}\n\nثروتي الحالية: ${netWorth} ريال\nأدخر: ${saving} ريال شهرياً\n\nاحسب هدفك: millionaire-sa.netlify.app`

  const copyResult = () => navigator.clipboard.writeText(text).catch(() => {})
  const shareWhatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  const shareX = () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')

  return (
    <div className="bg-[#FDF6DC] border-2 border-gold rounded-2xl p-5 text-center relative overflow-hidden">
      <div className="absolute text-8xl opacity-10 right-0 top-0 select-none">💰</div>
      <p className="text-xs text-yellow-800 mb-2 font-medium">بطاقة نتيجتك — شارك مع أصدقائك</p>
      <div className="text-2xl font-extrabold text-yellow-900 mb-1">{years}</div>
      <div className="text-sm text-yellow-800 mb-2">{date && `🎯 تاريخ الوصول: ${date}`}</div>
      <div className="inline-flex items-center gap-2 bg-gold text-white rounded-full px-4 py-1.5 text-sm font-bold mb-3">
        💰 الهدف: {goal} ريال
      </div>
      <div className="text-xs text-yellow-800 mb-4">
        ثروتي الحالية: <strong>{netWorth} ريال</strong> | أدخر: <strong>{saving} ريال</strong> شهرياً
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        <button onClick={copyResult} className="px-4 py-2 rounded-lg bg-white/70 text-yellow-900 text-sm font-semibold border border-yellow-300 hover:bg-white transition-all">
          📋 نسخ
        </button>
        <button onClick={shareWhatsapp} className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all">
          واتساب
        </button>
        <button onClick={shareX} className="px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all">
          X
        </button>
      </div>
    </div>
  )
}
