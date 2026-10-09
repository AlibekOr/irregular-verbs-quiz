# Irregular Verbs Quiz

Ingliz tilidagi **noto'g'ri fe'llarni (irregular verbs)** o'rganish uchun web ilova.
Har bir fe'l uchala shakli bilan ko'rsatiladi — **V1, V2, V3** — va har bir shaklning
o'zbekcha tarjimasi hamda misol gaplar bilan tushuntiriladi:

| V1 | V2 | V3 |
|----|----|----|
| buy — sotib olmoq | bought — sotib oldi | bought — sotib olingan |

## Imkoniyatlar

- **📘 Qoidalar** — sodda tilda tushuntirish: noto'g'ri fe'l nima, V1/V2/V3 qachon ishlatiladi,
  inkor va so'roq gaplar, «V1, V2 yoki V3?» jadvali, yodlash uchun 4 guruh
  (AAA: cut–cut–cut, ABB: buy–bought–bought, ABA: come–came–come, ABC: go–went–gone),
  ko'p uchraydigan xatolar va yodlash bo'yicha maslahatlar.
- **📖 Fe'llar** — 100 ta eng ko'p ishlatiladigan fe'l ro'yxati, qidiruv va guruhlar bo'yicha filtr.
- **🔁 Kartochkalar** — fe'lni ko'rib, shakllarini eslang, keyin kartani ochib tekshiring.
- **🎯 Quiz** — 3 xil mashq:
  - *Variantli test* — V2 yoki V3 ni 4 ta variantdan tanlash;
  - *Yozish* — V2 va V3 ni o'zingiz yozasiz;
  - *Tarjima* — o'zbekcha ma'nosi bo'yicha inglizcha fe'lni topish.

  Har bir javobdan keyin to'liq tushuntirish chiqadi: uchala shakl, tarjimalar,
  V2 va V3 bilan misol gaplar. Xato topilgan fe'l quiz oxirida yana bir bor so'raladi.
- Ilova hech qanday natija yoki shaxsiy ma'lumot saqlamaydi.
- 🔊 Har bir so'zning talaffuzini eshitish, telefon uchun moslashgan dizayn, tungi rejim.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # testlar
npm run build    # dist/ papkasiga tayyor sayt
```

## Internetga joylash (GitHub Pages)

`.github/workflows/deploy.yml` `main` branchiga push qilinganda saytni avtomatik joylaydi.
Buning uchun repo sozlamalarida **Settings → Pages → Source: GitHub Actions** ni tanlang.

## Yangi fe'l qo'shish

Barcha fe'llar `src/data/verbs.ts` faylida. Yangi qator qo'shing:

```ts
['buy', 'bought', 'bought', 'sotib olmoq', 'sotib oldi', 'sotib olingan',
 'I bought a new car.', 'Men yangi mashina sotib oldim.',
 'I have bought the tickets.', 'Men chiptalarni sotib olganman.'],
```

Bir nechta to'g'ri shakl bo'lsa, `/` bilan ajrating: `'learnt/learned'`.

Texnologiyalar: React 19, TypeScript, Vite, Vitest.
