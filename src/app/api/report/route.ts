import { NextRequest, NextResponse } from 'next/server'

function generateStaticReport(salary: number, expenses: number, monthlySaving: number, totalMonths: number, netWorth: number) {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const yearsLabel = months > 0 ? `${years} سنة و${months} شهر` : `${years} سنة`
  const savingRate = salary > 0 ? Math.round((monthlySaving / salary) * 100) : 0

  return {
    motivational_opener: `راتبك ${salary.toLocaleString('ar-SA')} ريال كافٍ تماماً للوصول للمليون — ${yearsLabel} فقط وتغير حياتك للأبد. كثير من الناس بدأوا بأقل منك ووصلوا.`,
    reality_check: `أنت تدخر ${monthlySaving.toLocaleString('ar-SA')} ريال كل شهر — هذا ${savingRate}% من راتبك. الرقم ما يهم بقدر الاستمرارية. كل ريال تدخره اليوم يساوي ريالين غداً بفضل التراكم.`,
    strengths: [
      { title: `ادخار منتظم ${monthlySaving.toLocaleString('ar-SA')} ريال/شهر`, description: `هذا المبلغ إذا استمريت عليه سيبني ثروتك تدريجياً. الاستمرارية هي السر الحقيقي للوصول للمليون.` },
      { title: 'وعيك المالي', description: 'مجرد استخدامك لهذه الأداة يعني أنك تفكر في مستقبلك — وهذا يميزك عن 90% من الناس.' },
      { title: 'الوقت في صفك', description: `${yearsLabel} تبدو طويلة لكنها كافية لبناء ثروة حقيقية إذا بدأت الآن.` }
    ],
    weaknesses: [
      { title: 'المصاريف تأخذ نسبة كبيرة من الراتب', fix: 'راجع مصاريفك الشهرية وحدد 3 بنود تقدر تخفضها بـ 10% فقط — هذا يوفر لك مئات الريالات.' },
      { title: 'غياب مصدر دخل إضافي', fix: 'دخل جانبي بسيط 500-1000 ريال/شهر يقلل المدة بسنوات كاملة.' }
    ],
    scenarios: [
      { label: 'زيادة الادخار 500 ريال', action: 'قلل مصاريف الكافيه والاشتراكات', months: Math.round(totalMonths * 0.85), monthly_saving: monthlySaving + 500, difficulty: 'سهل' },
      { label: 'دخل جانبي 1000 ريال', action: 'عمل حر أو تجارة صغيرة في وقت الفراغ', months: Math.round(totalMonths * 0.72), monthly_saving: monthlySaving + 1000, difficulty: 'متوسط' },
      { label: 'دخل جانبي 2000 ريال', action: 'مشروع جانبي بنصف وقت', months: Math.round(totalMonths * 0.58), monthly_saving: monthlySaving + 2000, difficulty: 'يحتاج جهد' },
      { label: 'استثمار بعائد 10%', action: 'صناديق الأسهم أو العقارات', months: Math.round(totalMonths * 0.75), monthly_saving: monthlySaving, difficulty: 'يحتاج تعلم' }
    ],
    income_ideas: [
      { title: 'التجارة الإلكترونية', description: 'بيع منتجات أونلاين بدون مخزون — آلاف الشباب السعودي يكسبون منها من البيت', potential: '1,000-5,000 ريال/شهر', difficulty: 'متوسط', how_to_start: 'افتح متجر على Salla اليوم وابدأ ببيع منتج واحد' },
      { title: 'العمل الحر', description: 'بع مهاراتك أونلاين — تصميم، كتابة، ترجمة، برمجة، مونتاج', potential: '500-3,000 ريال/شهر', difficulty: 'سهل', how_to_start: 'سجل على مستقل.com وأضف خدمة بناءً على مهارة تتقنها' },
      { title: 'إدارة السوشيال ميديا', description: 'المحلات والمطاعم تحتاج من يدير صفحاتهم — مهارة تتعلمها في أسبوع', potential: '500-2,000 ريال/عميل', difficulty: 'سهل', how_to_start: 'تواصل مع 5 محلات قريبة منك وعرض خدمتك' },
      { title: 'التدريس الخاص', description: 'إذا تتقن أي مادة أو مهارة، علّمها للآخرين. الطلب في تزايد مستمر', potential: '100-300 ريال/ساعة', difficulty: 'سهل', how_to_start: 'أعلن في مجموعات واتساب المدرسية' },
      { title: 'تأجير ما تملكه', description: 'سيارتك، غرفة، أجهزة — الاقتصاد التشاركي يخلي أي شيء مصدر دخل', potential: '300-1,500 ريال/شهر', difficulty: 'سهل جداً', how_to_start: 'ضع إعلان في حراج اليوم' },
      { title: 'محتوى رقمي', description: 'أنشئ محتوى في مجالك على يوتيوب أو تيك توك — يبني دخلاً متراكماً', potential: '500-5,000 ريال/شهر', difficulty: 'يحتاج وقت', how_to_start: 'ابدأ بفيديو واحد هذا الأسبوع عن شيء تعرفه' }
    ],
    monthly_plan: [
      { week: 'الأسبوع الأول', task: 'راجع كل مصاريفك وسجلها في جدول بسيط', why: 'ما تقدر تحسن ما لا تعرفه — التسجيل يكشف أين تذهب فلوسك' },
      { week: 'الأسبوع الثاني', task: 'حدد 3 مصاريف تقدر تخفضها أو تلغيها', why: 'تخفيض 10% فقط من المصاريف = مئات الريالات إضافية كل شهر' },
      { week: 'الأسبوع الثالث', task: 'ابحث عن فكرة دخل جانبي واحدة وابدأ بها', why: 'الدخل الإضافي يسرع وصولك للمليون بشكل كبير' },
      { week: 'الأسبوع الرابع', task: 'افتح حساب ادخار منفصل وحول مدخراتك تلقائياً', why: 'الادخار التلقائي يمنعك من إنفاق ما يجب ادخاره' }
    ],
    mindset_tips: [
      'المليون لا يأتي دفعة واحدة — يأتي ريالاً ريالاً كل شهر',
      'الاستمرارية أهم من المبلغ — 500 ريال كل شهر لسنوات تصنع فارقاً هائلاً',
      'لا تقارن بداياتك ببداية أحد آخر — قارن نفسك بنفسك الشهر الماضي',
      'الخوف من البدء يكلفك أكثر من أي خسارة محتملة — الفرصة الحقيقية هي الوقت'
    ],
    closing_message: `هذه اللحظة التي تقرأ فيها هذا التقرير هي نقطة التحول. ${yearsLabel} ليست كثيرة — هي كل ما تحتاجه لتغير واقعك المالي إلى الأبد. البداية الآن.`
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { salary = 0, expenses = 0, monthlySaving = 0, totalMonths = 120, netWorth = 0 } = body

    // جرب API أولاً لو في مفتاح
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (apiKey) {
      try {
        const { prompt } = body
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 3000,
            messages: [{ role: 'user', content: prompt }],
          }),
        })
        const data = await res.json()
        if (!data.error && data.content?.[0]?.text) {
          const text = data.content[0].text
          const clean = text.replace(/```json|```/g, '').trim()
          try {
            JSON.parse(clean)
            return NextResponse.json({ result: clean })
          } catch {}
        }
      } catch {}
    }

    // fallback — تقرير جاهز
    const report = generateStaticReport(salary, expenses, monthlySaving, totalMonths, netWorth)
    return NextResponse.json({ result: JSON.stringify(report) })

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
