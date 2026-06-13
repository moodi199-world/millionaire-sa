import { NextRequest, NextResponse } from 'next/server'

const staticIdeas = [
  { id: 1, title: 'متجر إلكتروني', category: 'تجارة', capital: 'أقل من 5K', capital_color: 'yellow', description: 'ابدأ متجرك الإلكتروني على Salla أو Zid وبع منتجات بدون مخزون عبر dropshipping', monthly_profit: '1,000-5,000 ريال', how_to_start: 'اختر منتجاً واحداً، افتح متجراً على Salla بـ99 ريال، واستهدف جمهورك عبر سناب وانستقرام', first_step: 'سجل على salla.sa اليوم مجاناً', time_to_profit: '1-3 أشهر' },
  { id: 2, title: 'عمل حر - تصميم', category: 'إبداع', capital: 'بدون رأس مال', capital_color: 'green', description: 'قدم خدمات تصميم جرافيك للمحلات والشركات الصغيرة عبر الإنترنت', monthly_profit: '500-3,000 ريال', how_to_start: 'سجل على مستقل.com وأضف خدمة تصميم شعارات', first_step: 'أنشئ حساباً على مستقل.com الآن', time_to_profit: 'أسبوعان' },
  { id: 3, title: 'إدارة سوشيال ميديا', category: 'خدمات', capital: 'بدون رأس مال', capital_color: 'green', description: 'المطاعم والمحلات تحتاج من يدير حساباتهم — مهارة تتعلمها في أسبوع', monthly_profit: '500-2,000 ريال/عميل', how_to_start: 'تواصل مع 10 محلات قريبة منك وعرض خدمتك', first_step: 'اكتب قائمة بـ10 محلات قريبة منك الآن', time_to_profit: 'شهر' },
  { id: 4, title: 'تدريس خاص', category: 'تعليم', capital: 'بدون رأس مال', capital_color: 'green', description: 'علّم مادة أو مهارة تتقنها — الطلب على التدريس الخاص في تزايد مستمر', monthly_profit: '100-300 ريال/ساعة', how_to_start: 'أعلن في مجموعات واتساب المدرسية في منطقتك', first_step: 'اكتب إعلاناً بسيطاً وأرسله لـ5 مجموعات واتساب', time_to_profit: 'أسبوع' },
  { id: 5, title: 'تأجير سيارة', category: 'خدمات', capital: 'أقل من 5K', capital_color: 'yellow', description: 'أجّر سيارتك عبر تطبيقات التأجير واكسب دخلاً إضافياً بدون جهد', monthly_profit: '500-1,500 ريال', how_to_start: 'سجل سيارتك على تطبيق Lumi أو هاهو', first_step: 'حمّل تطبيق Lumi وسجل سيارتك', time_to_profit: 'أسبوعان' },
  { id: 6, title: 'بيع حلويات من البيت', category: 'طعام', capital: 'أقل من 5K', capital_color: 'yellow', description: 'الطلب على الحلويات المنزلية كبير — كيك، كنافة، حلويات خليجية', monthly_profit: '1,000-4,000 ريال', how_to_start: 'ابدأ بطلبات الأهل والجيران، ثم انشر في انستقرام', first_step: 'صوّر منتجاتك بشكل جميل وانشر في قصصك', time_to_profit: 'شهر' },
  { id: 7, title: 'كتابة محتوى', category: 'إبداع', capital: 'بدون رأس مال', capital_color: 'green', description: 'اكتب مقالات ومحتوى للمواقع والشركات — الطلب كبير على الكتّاب العرب', monthly_profit: '500-2,000 ريال', how_to_start: 'سجل على مستقل.com وأضف خدمة كتابة محتوى', first_step: 'اكتب نموذجاً من مقالين وأضفهم لملفك', time_to_profit: 'شهر' },
  { id: 8, title: 'تصوير مناسبات', category: 'إبداع', capital: 'أقل من 5K', capital_color: 'yellow', description: 'تصوير الأعراس والمناسبات والمنتجات — مهنة مربحة جداً في السعودية', monthly_profit: '2,000-8,000 ريال', how_to_start: 'ابدأ بتصوير مناسبات الأصدقاء لبناء محفظة أعمال', first_step: 'التقط 20 صورة احترافية وانشرها في انستقرام', time_to_profit: '2-3 أشهر' },
  { id: 9, title: 'استيراد وبيع منتجات', category: 'تجارة', capital: '5K-50K', capital_color: 'orange', description: 'استورد منتجات من الصين أو تركيا وبعها في السوق السعودي بهامش ربح جيد', monthly_profit: '2,000-10,000 ريال', how_to_start: 'ابحث عن منتج مطلوب، تواصل مع موردين على Alibaba', first_step: 'اختر 3 منتجات وابحث عن أسعارها على Alibaba', time_to_profit: '3-6 أشهر' },
  { id: 10, title: 'تطبيق جوال بسيط', category: 'تقنية', capital: 'أقل من 5K', capital_color: 'yellow', description: 'طور تطبيقاً بسيطاً لحل مشكلة محددة — سوق التطبيقات السعودي ضخم', monthly_profit: '1,000-20,000 ريال', how_to_start: 'حدد مشكلة يعانيها الناس واصنع حلاً بسيطاً لها', first_step: 'اكتب فكرة تطبيقك في ورقة وشاركها مع 5 أشخاص', time_to_profit: '3-6 أشهر' },
  { id: 11, title: 'خدمة توصيل محلية', category: 'خدمات', capital: 'بدون رأس مال', capital_color: 'green', description: 'سجّل في تطبيقات التوصيل واكسب من وقت فراغك', monthly_profit: '1,500-4,000 ريال', how_to_start: 'سجل في مرسول أو جاهز واعمل في أوقات فراغك', first_step: 'حمّل تطبيق مرسول وأكمل التسجيل', time_to_profit: 'أسبوع' },
  { id: 12, title: 'بيع عبايات مصممة', category: 'تجارة', capital: 'أقل من 5K', capital_color: 'yellow', description: 'العبايات المصممة والمطرزة لها سوق كبير في السعودية والخليج', monthly_profit: '2,000-6,000 ريال', how_to_start: 'تواصل مع مصممات وأنشئ حساب انستقرام لعرض المنتجات', first_step: 'صوّر 5 عبايات واعمل حساب انستقرام مخصص', time_to_profit: '2-3 أشهر' },
  { id: 13, title: 'أكاديمية تعليمية أونلاين', category: 'تعليم', capital: 'أقل من 5K', capital_color: 'yellow', description: 'درّس مهارة تتقنها عبر فيديوهات مسجلة وبعها للمهتمين', monthly_profit: '1,000-10,000 ريال', how_to_start: 'سجّل 5 فيديوهات تعليمية وانشرها على يوتيوب', first_step: 'اختر مهارة واحدة وسجّل أول فيديو تعليمي', time_to_profit: '3-6 أشهر' },
  { id: 14, title: 'خدمة تنظيف منازل', category: 'خدمات', capital: 'أقل من 5K', capital_color: 'yellow', description: 'الطلب على خدمات التنظيف المنزلي في ارتفاع مستمر في المدن الكبيرة', monthly_profit: '2,000-6,000 ريال', how_to_start: 'أعلن خدمتك في مجموعات الحي والواتساب', first_step: 'اشترِ أدوات التنظيف وأعلن في 10 مجموعات واتساب', time_to_profit: 'شهر' },
  { id: 15, title: 'ترجمة وتدقيق لغوي', category: 'خدمات', capital: 'بدون رأس مال', capital_color: 'green', description: 'الشركات والأفراد يحتاجون مترجمين دائماً — خاصة بين العربية والإنجليزية', monthly_profit: '500-2,500 ريال', how_to_start: 'سجل على مستقل.com وأضف خدمة ترجمة', first_step: 'أنشئ حسابك على مستقل.com الآن', time_to_profit: 'أسبوعان' },
  { id: 16, title: 'مونتاج فيديو', category: 'إبداع', capital: 'بدون رأس مال', capital_color: 'green', description: 'كل يوتيوبر ومنشئ محتوى يحتاج مونتاج — الطلب أكبر من العرض', monthly_profit: '500-3,000 ريال', how_to_start: 'تعلم الكابكت أو بريمير وأعلن خدمتك', first_step: 'سجّل فيديو تعريفي لنفسك وأرسله لـ10 يوتيوبرز', time_to_profit: 'شهر' },
  { id: 17, title: 'بيع عطور ومعطرات', category: 'تجارة', capital: 'أقل من 5K', capital_color: 'yellow', description: 'السوق السعودي من أكبر أسواق العطور في العالم — فرصة ذهبية', monthly_profit: '1,000-5,000 ريال', how_to_start: 'اشترِ عطوراً بالجملة وبعها عبر سناب وواتساب', first_step: 'ابحث عن موردي عطور في منطقتك وقارن الأسعار', time_to_profit: '1-2 شهر' },
  { id: 18, title: 'تصميم مواقع', category: 'تقنية', capital: 'بدون رأس مال', capital_color: 'green', description: 'كل شركة تحتاج موقعاً — وورد برس أو Webflow تمكنك من البناء بدون برمجة', monthly_profit: '1,000-5,000 ريال/مشروع', how_to_start: 'تعلم وورد برس وصمّم 3 مواقع تجريبية لبناء محفظتك', first_step: 'ابدأ بدورة وورد برس مجانية على يوتيوب', time_to_profit: '2-3 أشهر' },
  { id: 19, title: 'تجارة السيارات', category: 'تجارة', capital: 'أكثر من 50K', capital_color: 'red', description: 'شراء وبيع السيارات المستعملة بهامش ربح — يحتاج خبرة ورأس مال', monthly_profit: '3,000-15,000 ريال', how_to_start: 'ابدأ بتعلم تقييم السيارات وتابع أسعار حراج', first_step: 'راقب أسعار 20 سيارة في حراج لمدة شهر', time_to_profit: '3-6 أشهر' },
  { id: 20, title: 'محتوى يوتيوب', category: 'إبداع', capital: 'بدون رأس مال', capital_color: 'green', description: 'أنشئ قناة في مجال تحبه — الإعلانات والرعايات تصنع دخلاً ممتازاً', monthly_profit: '500-20,000 ريال', how_to_start: 'اختر مجالاً تتقنه وابدأ بـ3 فيديوهات هذا الشهر', first_step: 'اختر موضوع أول فيديو وسجّله اليوم', time_to_profit: '6-12 شهر' },
  { id: 21, title: 'صالون متنقل', category: 'خدمات', capital: 'أقل من 5K', capital_color: 'yellow', description: 'خدمات التجميل في البيت طلبها عالٍ — خاصة في المناسبات', monthly_profit: '2,000-6,000 ريال', how_to_start: 'تدربي على خدمات محددة وأعلني في مجموعات الحي', first_step: 'أعلني خدمتك في 10 مجموعات واتساب في منطقتك', time_to_profit: 'شهر' },
  { id: 22, title: 'استشارات مالية', category: 'خدمات', capital: 'بدون رأس مال', capital_color: 'green', description: 'لو عندك خلفية مالية، قدم استشارات للأفراد والشركات الصغيرة', monthly_profit: '1,000-5,000 ريال', how_to_start: 'أنشئ محتوى مالي في سوشيال ميديا لبناء الثقة', first_step: 'انشر 5 نصائح مالية في تويتر هذا الأسبوع', time_to_profit: '2-3 أشهر' },
  { id: 23, title: 'طباعة حسب الطلب', category: 'تجارة', capital: 'أقل من 5K', capital_color: 'yellow', description: 'تيشرتات وأكواب وهدايا مطبوعة حسب الطلب — سوق متنامٍ', monthly_profit: '500-3,000 ريال', how_to_start: 'تعاقد مع محل طباعة وأنشئ متجراً على سلة', first_step: 'تواصل مع 3 محلات طباعة في منطقتك', time_to_profit: '1-2 شهر' },
  { id: 24, title: 'تركيب وصيانة أجهزة', category: 'خدمات', capital: 'أقل من 5K', capital_color: 'yellow', description: 'تركيب شاشات وكاميرات وأنظمة صوت — الطلب دائم في المنازل والمحلات', monthly_profit: '2,000-6,000 ريال', how_to_start: 'تعلم التركيب من يوتيوب وأعلن خدمتك', first_step: 'سجّل فيديو قصير وأرسله لمجموعات الأحياء', time_to_profit: 'شهر' },
  { id: 25, title: 'بيع مستلزمات الرياضة', category: 'تجارة', capital: 'أقل من 5K', capital_color: 'yellow', description: 'الاهتمام بالصحة في ارتفاع — ملابس ومعدات رياضية لها سوق كبير', monthly_profit: '1,000-4,000 ريال', how_to_start: 'استورد منتجات رياضية وبعها عبر متجر إلكتروني', first_step: 'ابحث عن أكثر 10 منتجات رياضية مطلوبة في السعودية', time_to_profit: '2-3 أشهر' },
]

let cachedIdeas: string | null = null
let cacheTime: number = 0
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  try {
    const now = Date.now()

    if (cachedIdeas && now - cacheTime < CACHE_DURATION) {
      return NextResponse.json({ result: cachedIdeas, cached: true })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (apiKey) {
      try {
        const prompt = `أنت خبير ريادة أعمال سعودي. ولّد 25 فكرة مشروع جديدة ومحدّثة للسوق السعودي 2025-2026. أجب بـ JSON فقط: {"ideas": [{"id": 1, "title": "...", "category": "تقنية/تجارة/خدمات/إبداع/تعليم/طعام/عقارات", "capital": "بدون رأس مال/أقل من 5K/5K-50K/أكثر من 50K", "capital_color": "green/yellow/orange/red", "description": "...", "monthly_profit": "...", "how_to_start": "...", "first_step": "...", "time_to_profit": "..."}]}`

        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 4000, messages: [{ role: 'user', content: prompt }] }),
        })
        const data = await res.json()
        if (!data.error && data.content?.[0]?.text) {
          const text = data.content[0].text.replace(/```json|```/g, '').trim()
          const parsed = JSON.parse(text)
          const combined = { ideas: [...staticIdeas, ...parsed.ideas] }
          const result = JSON.stringify(combined)
          cachedIdeas = result
          cacheTime = now
          return NextResponse.json({ result, cached: false })
        }
      } catch {}
    }

    // Fallback - الأفكار الجاهزة
    const result = JSON.stringify({ ideas: staticIdeas })
    return NextResponse.json({ result, cached: false })

  } catch (error: any) {
    const result = JSON.stringify({ ideas: staticIdeas })
    return NextResponse.json({ result, cached: false })
  }
}
