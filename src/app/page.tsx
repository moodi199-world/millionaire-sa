'use client'

import { useState } from 'react'
import {
  calcMonthsToGoal,
  monthsToLabel,
  targetDate,
  formatNumber,
  buildChartData,
} from '@/lib/calculator'
import GrowthChart from '@/components/GrowthChart'
import ShareCard from '@/components/ShareCard'
import UpsellCard from '@/components/UpsellCard'

interface FormData {
  age: number
  salary: number
  expenses: number
  savings: number
  investments: number
  rate: number
  goal: number
}

interface Result {
  totalMonths: number
  netWorth: number
  monthlySaving: number
  chartLabels: string[]
  chartData: number[]
  scenarios: { label: string; months: number }[]
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    age: 28,
    salary: 8000,
    expenses: 5000,
    savings: 20000,
    investments: 10000,
    rate: 7,
    goal: 1000000,
  })
  const [result, setResult] = useState<Result | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) })
  }

  const calculate = () => {
    const netWorth = form.savings + form.investments
    const monthlySaving = form.salary - form.expenses
    const totalMonths = calcMonthsToGoal(netWorth, monthlySaving, form.rate, form.goal)
    const { labels, data } = buildChartData(netWorth, monthlySaving, form.rate, totalMonths)

    const scenarios = [
      { label: 'وضعك الحالي', months: totalMonths },
      { label: '+ ادخار 500 ريال/شهر', months: calcMonthsToGoal(netWorth, monthlySaving + 500, form.rate, form.goal) },
      { label: '+ ادخار 1000 ريال/شهر', months: calcMonthsToGoal(netWorth, monthlySaving + 1000, form.rate, form.goal) },
      { label: '+ دخل إضافي 2000 ريال', months: calcMonthsToGoal(netWorth, monthlySaving + 2000, form.rate, form.goal) },
      { label: '🌟 عائد أعلى (10%)', months: calcMonthsToGoal(netWorth, monthlySaving, 10, form.goal) },
    ]

    setResult({ totalMonths, netWorth, monthlySaving, chartLabels: labels, chartData: data, scenarios })
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const fields = [
    { name: 'age', label: 'العمر الحالي', placeholder: '28' },
    { name: 'salary', label: 'الراتب الشهري (ريال)', placeholder: '8000' },
    { name: 'expenses', label: 'المصروف الشهري (ريال)', placeholder: '5000' },
    { name: 'savings', label: 'المدخرات الحالية (ريال)', placeholder: '20000' },
    { name: 'investments', label: 'الاستثمارات الحالية (ريال)', placeholder: '0' },
    { name: 'rate', label: 'نسبة العائد السنوي (%)', placeholder: '7', hint: 'متوسط سوق الأسهم ≈ 7–10%' },
    { name: 'goal', label: 'الهدف المالي (ريال)', placeholder: '1000000' },
  ]

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white font-tajawal" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            متى تصبح <span className="text-gold">مليونير</span>؟
          </h1>
          <p className="text-gray-400 text-base">
            احسب خلال 30 ثانية متى ستصل لأول مليون ريال
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="text-sm text-gray-400 font-medium">{f.label}</label>
                <input
                  type="number"
                  name={f.name}
                  value={form[f.name as keyof FormData]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-base focus:outline-none focus:border-gold transition-colors"
                />
                {f.hint && <span className="text-xs text-gray-500">{f.hint}</span>}
              </div>
            ))}
          </div>
          <button
            onClick={calculate}
            className="w-full mt-5 py-3.5 bg-gold hover:bg-yellow-600 text-white font-bold text-lg rounded-xl transition-all active:scale-95"
          >
            احسب متى تصبح مليونير 🚀
          </button>
        </div>

        {/* Results */}
        {result && (
          <div id="results" className="space-y-4">

            {/* Result Hero */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">إذا استمريت بنفس وضعك ستصل للهدف خلال</p>
              <div className="text-5xl font-extrabold text-gold leading-tight">
                {monthsToLabel(result.totalMonths)}
              </div>
              {result.totalMonths < 99999 && (
                <div className="text-lg font-bold mt-3">
                  📅 {targetDate(result.totalMonths)}
                </div>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'صافي ثروتك الآن', value: formatNumber(result.netWorth) + ' ريال', gold: true },
                { label: 'الادخار الشهري', value: formatNumber(result.monthlySaving) + ' ريال', gold: false },
                { label: 'الادخار السنوي', value: formatNumber(result.monthlySaving * 12) + ' ريال', gold: false },
                { label: 'الهدف المالي', value: formatNumber(form.goal) + ' ريال', gold: false },
              ].map((m) => (
                <div key={m.label} className="bg-white/5 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">{m.label}</div>
                  <div className={`text-lg font-bold ${m.gold ? 'text-gold' : 'text-white'}`}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-4">نمو ثروتك بمرور الوقت (ريال)</p>
              <GrowthChart labels={result.chartLabels} data={result.chartData} goal={form.goal} />
            </div>

            {/* Share Card */}
            <ShareCard
              years={monthsToLabel(result.totalMonths)}
              date={targetDate(result.totalMonths)}
              netWorth={formatNumber(result.netWorth)}
              saving={formatNumber(result.monthlySaving)}
              goal={formatNumber(form.goal)}
            />

            {/* Upsell */}
            <UpsellCard scenarios={result.scenarios} />

          </div>
        )}
      </div>
    </main>
  )
}
