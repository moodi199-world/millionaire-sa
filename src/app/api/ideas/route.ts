import { NextRequest, NextResponse } from 'next/server'

// Cache الأفكار في الذاكرة — تتجدد كل أسبوع
let cachedIdeas: string | null = null
let cacheTime: number = 0
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // أسبوع

export async function GET(req: NextRequest) {
  try {
    const now = Date.now()

    // لو الكاش موجود وما انتهت مدته
    if (cachedIdeas && now - cacheTime < CACHE_DURATION) {
      return NextResponse.json({ result: cachedIdeas, cached: true })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const prompt = `أنت خبير ريادة أعمال سعودي. ولّد قائمة بـ 40 فكرة مشروع ناجحة ومحدّثة ومناسبة للسوق السعودي الحالي 2025-2026.

الأفكار يجب أن تكون:
- واقعية ومجربة في السوق السعودي أو الخليجي
- متنوعة بين تقنية، تجارة، خدمات، إبداع، تعليم، طعام، عقارات
- شاملة لكل مستويات رأس المال
- محفّزة وتشجع على البدء

أجب بـ JSON فقط بدون أي نص إضافي:
{
  "ideas": [
    {
      "id": 1,
      "title": "اسم المشروع",
      "category": "تقنية",
      "capital": "بدون رأس مال",
      "capital_color": "green",
      "description": "وصف مشوق للفكرة",
      "monthly_profit": "500 - 3000 ريال/شهر",
      "how_to_start": "شرح واضح كيف تبدأ",
      "first_step": "خطوة واحدة محددة اليوم",
      "time_to_profit": "1-3 أشهر"
    }
  ]
}

capital_color: green=بدون رأس مال، yellow=أقل من 5K، orange=5K-50K، red=أكثر من 50K
تأكد التنوع: 10 بدون رأس مال، 15 أقل من 5K، 10 من 5K-50K، 5 أكثر من 50K`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const text = data.content?.[0]?.text || ''
    const clean = text.replace(/```json|```/g, '').trim()

    // خزن في الكاش
    cachedIdeas = clean
    cacheTime = now

    return NextResponse.json({ result: clean, cached: false })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
