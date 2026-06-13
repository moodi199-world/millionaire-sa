'use client'

import { monthsToLabel } from '@/lib/calculator'

interface Scenario {
  label: string
  months: number
}

interface Props {
  scenarios: Scenario[]
}

export default function UpsellCard({ scenarios }: Props) {
  return (
    <div className="bg-white/5 border-2 border-gold rounded-2xl p-6 text-center">
      <div className="text-4xl mb-2">🚀</div>
      <h2 className="text-xl font-bold mb-1">كيف تصل للمليون أسرع؟</h2>
      <p className="text-gray-400 text-sm mb-4">قارن سيناريوهات مختلفة واعرف أفضل خطة لتقليل المدة</p>

      <div className="flex flex-col gap-2 mb-5 text-right">
        {scenarios.map((s, i) => (
          <div
            key={i}
            className={`flex justify-between items-center px-4 py-2.5 rounded-xl text-sm ${
              i === 0
                ? 'bg-white/5 border border-white/10'
                : i === scenarios.length - 1
                ? 'bg-[#FDF6DC] border border-gold'
                : 'bg-white/5'
            }`}
          >
            <span className={i === scenarios.length - 1 ? 'text-yellow-900' : 'text-gray-300'}>
              {s.label}
            </span>
            <span className={`font-bold ${i === scenarios.length - 1 ? 'text-gold' : 'text-white'}`}>
              {monthsToLabel(s.months)}
            </span>
          </div>
        ))}
      </div>

      <div className="text-4xl font-extrabold text-gold mb-1">
        10 <span className="text-2xl">ريال</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">تقرير مخصص + أفضل خطة للوصول للمليون</p>

      <button className="w-full py-3.5 bg-gold hover:bg-yellow-600 text-white font-bold text-base rounded-xl transition-all active:scale-95">
        اشتر التقرير الآن ← 10 ريال
      </button>
      <p className="mt-3 text-xs text-gray-500">
        أو احصل على تقرير PDF متكامل بالذكاء الاصطناعي ← 49 ريال
      </p>
    </div>
  )
}
