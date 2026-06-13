'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData, UserData } from '@/lib/store'
import { monthsToLabel, formatNumber, calcMonthsToGoal } from '@/lib/calculator'

interface ReportData {
  summary: string
  strengths: string[]
  weaknesses: string[]
  scenarios: { label: string; action: string; months: number; saving: number }[]
  bestScenario: string
  monthlyPlan: string[]
  firstSteps: string[]
}

function LoadingReport() {
  const [step, setStep] = useState(0)
  const steps = [
    'جاري تحليل وضعك المالي...',
    'نحسب أفضل السيناريوهات...',
    'نبني خطتك الشخصية...',
    'يتولد التقرير...',
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 1200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-6 animate-bounce">🤖</div>
      <h2 className="text-xl font-bold mb-3">الذكاء الاصطناعي يحلل وضعك</h2>
      <p className="text-gold font-bold mb-8">{steps[step]}</p>
      <div className="w-full bg-white/10 rounded-full h-2 max-w-xs mx-auto">
        <div
          className="bg-gold h-2 rounded-full transition-all duration-1000"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function ReportPage() {
  const router = useRouter()
  const [data, setData] = useState<UserData | null>(null)
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const d = getUserData()
    if (!d) { router.push('/'); return }
    setData(d)
    generateReport(d)
  }, [router])

  const generateReport = async (d: UserData) => {
    try {
      const prompt = `أنت مستشار مالي سعودي خبير. بناءً على البيانات التالية، اكتب تقريراً مالياً شاملاً باللغة العربية.

البيانات:
- الراتب الشهري: ${d.salary} ريال
- المصروف الشهري: ${d.expenses} ريال  
- الادخار الشهري: ${d.monthlySaving} ريال
- المدخرات الحالية: ${d.savings} ريال
- الاستثمارات: ${d.investments} ريال
- نسبة العائد: ${d.rate}%
- صافي الثروة: ${d.netWorth} ريال
- المدة الحالية للوصول للمليون: ${monthsToLabel(d.totalMonths)}

اكتب التقرير بصيغة JSON فقط بدون أي نص إضافي، بهذا الشكل:
{
  "summary": "ملخص الوضع المالي في جملتين",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3"],
  "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2"],
  "scenarios": [
    {"label": "زيادة الادخار 500 ريال", "action": "تقليل مصروف القهوة والترفيه", "months": ${calcMonthsToGoal(d.netWorth, d.monthlySaving + 500, d.rate, 1000000)}, "saving": ${d.monthlySaving + 500}},
    {"label": "زيادة الادخار 1000 ريال", "action": "راجع اشتراكاتك الشهرية والإيجار", "months": ${calcMonthsToGoal(d.netWorth, d.monthlySaving + 1000, d.rate, 1000000)}, "saving": ${d.monthlySaving + 1000}},
    {"label": "دخل إضافي 2000 ريال", "action": "عمل جانبي أو استشارات", "months": ${calcMonthsToGoal(d.netWorth, d.monthlySaving + 2000, d.rate, 1000000)}, "saving": ${d.monthlySaving + 2000}},
    {"label": "استثمار بعائد 10%", "action": "صناديق الأسهم أو العقارات", "months": ${calcMonthsToGoal(d.netWorth, d.monthlySaving, 10, 1000000)}, "saving": ${d.monthlySaving}}
  ],
  "bestScenario": "جملة واحدة عن أفضل سيناريو",
  "monthlyPlan": ["خطوة شهرية 1", "خطوة شهرية 2", "خطوة شهرية 3", "خطوة شهرية 4"],
  "firstSteps": ["خطوة أولى اليوم", "خطوة هذا الأسبوع", "خطوة هذا الشهر"]
}`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1500,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const json = await res.json()
      const text = json.content?.[0]?.text || ''
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setReport(parsed)
    } catch (e) {
      setError('حدث خطأ في توليد التقرير')
    } finally {
      setLoading(false)
    }
  }

  if (!data) return null

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white font-tajawal" dir="rtl">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push('/')} className="text-gray-400 text-sm hover:text-white transition-colors">
            ← الرئيسية
          </button>
          <div className="text-xs bg-gold/20 text-gold px-3 py-1 rounded-full font-bold border border-gold/30">
            تقرير مدفوع ✓
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold mb-1">تقرير تسريع ثروتك</h1>
          <p className="text-gray-400 text-sm">مولّد بالذكاء الاصطناعي · مخصص لك</p>
        </div>

        {loading && <LoadingReport />}

        {error && (
          <div className="text-center text-red-400 py-10">
            <div className="text-4xl mb-4">⚠️</div>
            <p>{error}</p>
            <button onClick={() => router.push('/')} className="mt-4 text-gold underline">عد للرئيسية</button>
          </div>
        )}

        {report && !loading && (
          <div className="space-y-5">

            {/* ملخص */}
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-5">
              <p className="text-xs text-gold font-bold mb-2">📋 ملخص وضعك المالي</p>
              <p className="text-sm text-gray-200 leading-relaxed">{report.summary}</p>
            </div>

            {/* نقاط القوة والضعف */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                <p className="text-xs text-green-400 font-bold mb-3">💪 نقاط قوتك</p>
                <ul className="space-y-2">
                  {report.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <p className="text-xs text-red-400 font-bold mb-3">⚠️ نقاط تحتاج تحسين</p>
                <ul className="space-y-2">
                  {report.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">!</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* السيناريوهات */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-bold mb-4">🎯 السيناريوهات المقارنة</p>
              <div className="space-y-3">
                {/* السيناريو الحالي */}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-sm font-bold">وضعك الحالي</p>
                    <p className="text-xs text-gray-500">ادخار {formatNumber(data.monthlySaving)} ريال/شهر</p>
                  </div>
                  <span className="text-red-400 font-bold text-sm">{monthsToLabel(data.totalMonths)}</span>
                </div>
                {/* السيناريوهات الأفضل */}
                {report.scenarios.map((s, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${i === report.scenarios.length - 1 ? 'border-gold bg-gold/10' : 'border-white/10 bg-white/5'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-sm font-bold ${i === report.scenarios.length - 1 ? 'text-gold' : 'text-white'}`}>{s.label}</p>
                      <span className={`font-bold text-sm ${i === report.scenarios.length - 1 ? 'text-gold' : 'text-green-400'}`}>{monthsToLabel(s.months)}</span>
                    </div>
                    <p className="text-xs text-gray-400">💡 {s.action}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gold/10 rounded-xl border border-gold/20">
                <p className="text-xs text-gold font-bold">🌟 أفضل توصية</p>
                <p className="text-sm text-gray-300 mt-1">{report.bestScenario}</p>
              </div>
            </div>

            {/* الخطة الشهرية */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-bold mb-4">📅 خطتك الشهرية</p>
              <div className="space-y-3">
                {report.monthlyPlan.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs text-gold font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* الخطوات الأولى */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs text-gray-400 font-bold mb-4">⚡ ابدأ الآن</p>
              <div className="space-y-3">
                {[
                  { time: 'اليوم', item: report.firstSteps[0] },
                  { time: 'هذا الأسبوع', item: report.firstSteps[1] },
                  { time: 'هذا الشهر', item: report.firstSteps[2] },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-lg font-bold shrink-0 mt-0.5">{s.time}</span>
                    <p className="text-sm text-gray-300">{s.item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upsell التقرير المتقدم */}
            <div className="bg-white/5 border-2 border-gold/50 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="text-lg font-bold mb-1">التقرير المتكامل PDF</h3>
              <p className="text-gray-400 text-sm mb-4">
                تقرير 10 صفحات بالكامل مع خطة استثمار مفصلة وأهداف سنوية
              </p>
              <div className="text-2xl font-extrabold text-gold mb-3">49 ريال</div>
              <button
                onClick={() => alert('قريباً! سنتواصل معك عبر البريد الإلكتروني')}
                className="w-full py-3 bg-gold/20 border border-gold text-gold font-bold rounded-xl hover:bg-gold hover:text-white transition-all"
              >
                اطلب التقرير المتكامل
              </button>
            </div>

            {/* زر مشاركة */}
            <button
              onClick={() => {
                const text = `💰 حصلت على تقرير مالي مخصص!\nسأصل للمليون خلال ${monthsToLabel(data.totalMonths)}\nاحسب هدفك: millionaire-sa.netlify.app`
                navigator.share?.({ text }) ?? navigator.clipboard.writeText(text)
              }}
              className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-all"
            >
              📤 شارك نتيجتك مع أصدقائك
            </button>

          </div>
        )}

      </div>
    </main>
  )
}
