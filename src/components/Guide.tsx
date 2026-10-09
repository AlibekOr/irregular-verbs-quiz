import { verbs } from '../data/verbs'
import { groupInfo, groupOf, type Group } from '../lib/quiz'
import { Speak } from './VerbCard'

const groups = Object.keys(groupInfo) as Group[]

const examplesByGroup = (g: Group) => verbs.filter((v) => groupOf(v) === g).slice(0, 8)

interface Example {
  en: string
  uz: string
}

function Examples({ items }: { items: Example[] }) {
  return (
    <ul className="ex-list">
      {items.map((e) => (
        <li key={e.en}>
          <span className="en">{e.en}</span>
          <span className="uz">{e.uz}</span>
        </li>
      ))}
    </ul>
  )
}

const mistakes: { wrong: string; right: string; why: string }[] = [
  {
    wrong: 'Yesterday I buyed a book.',
    right: 'Yesterday I bought a book.',
    why: "buy — noto'g'ri fe'l, unga -ed qo'shilmaydi. V2 shaklini yodlash kerak: bought.",
  },
  {
    wrong: "I didn't went to school.",
    right: "I didn't go to school.",
    why: "did / didn't dan keyin har doim V1 keladi. O'tgan zamonni did o'zi ko'rsatib turibdi.",
  },
  {
    wrong: 'Did you saw him?',
    right: 'Did you see him?',
    why: "So'roq gapda ham did + V1: Did you see…? Did she go…?",
  },
  {
    wrong: 'I have went there.',
    right: 'I have gone there.',
    why: 'have / has dan keyin V2 emas, V3 keladi: went — V2, gone — V3.',
  },
  {
    wrong: 'The letter was wrote yesterday.',
    right: 'The letter was written yesterday.',
    why: 'Majhul nisbatda (ish kim tomonidandir bajarilgan) be + V3 ishlatiladi: was written.',
  },
  {
    wrong: 'I seen this film.',
    right: 'I have seen this film. / I saw this film.',
    why: "V3 yolg'iz ishlatilmaydi — oldida have/has/had yoki be bo'lishi shart. Aks holda V2 ishlating.",
  },
]

const tips = [
  "Har kuni 5–10 ta fe'l o'rganing. Hammasini birdaniga yodlashga urinmang.",
  "Uchala shaklni ritm bilan, ovoz chiqarib ayting: «buy – bought – bought». Quloq ham eslab qoladi — 🔊 tugmasidan foydalaning.",
  'Avval eng oson guruhdan boshlang (AAA), keyin ABB, ABA va oxirida ABC.',
  "Har bir fe'l bilan o'zingiz haqingizda bitta gap tuzing: «Yesterday I ate plov».",
  "Kartochkalar bilan takrorlang, keyin Quizdagi «Yozish» va «Ikkitasini yoz» mashqlari bilan o'zingizni tekshiring.",
  "Xato qilgan fe'llaringizni daftarga yozib, ertasi kuni yana takrorlang.",
]

const cheatRows: [string, 'V1' | 'V2' | 'V3', string][] = [
  ["Hech narsa (oddiy darak gap, o'tgan zamon)", 'V2', 'I went'],
  ["did / didn't", 'V1', "I didn't go"],
  ['have / has / had', 'V3', 'I have gone'],
  ['am / is / are / was / were (majhul)', 'V3', 'It was made'],
  ['will / can / must / to', 'V1', 'I will go'],
]

export function Guide() {
  return (
    <>
      <section className="panel guide">
        <h2>Noto'g'ri fe'llar nima?</h2>
        <p>
          Ingliz tilida har bir fe'lning <b>uchta asosiy shakli</b> bor. Ular qisqacha <b>V1, V2, V3</b> deb
          ataladi (V — <i>verb</i>, ya'ni fe'l).
        </p>
        <p>
          Ko'p fe'llar o'tgan zamonda oddiygina oxiriga <b>-ed</b> qo'shib yasaladi. Ular <b>to'g'ri</b>{' '}
          (<i>regular</i>) fe'llar deyiladi:
        </p>
        <div className="formula-box">
          <span className="en">play → played → played</span>
          <span className="uz">o'ynamoq → o'ynadi → o'ynalgan</span>
        </div>
        <p>
          <b>Noto'g'ri</b> (<i>irregular</i>) fe'llar esa bu qoidaga bo'ysunmaydi. Ularning shakli o'zgacha
          bo'ladi, shuning uchun ularni <b>yodlash</b> kerak:
        </p>
        <div className="formula-box">
          <span className="en">buy → bought → bought</span>
          <span className="uz">«buyed» emas!</span>
        </div>
        <p className="note">
          💡 Kundalik nutqda ishlatiladigan noto'g'ri fe'llar taxminan 100 ta. Shu ilovadagi ro'yxatni bilsangiz,
          ko'p holatda yetarli.
        </p>
      </section>

      <section className="panel guide">
        <h2>
          <span className="tag tag-v1">V1</span> Asosiy shakl (Infinitive)
        </h2>
        <p>
          Bu fe'lning <b>lug'atdagi shakli</b>. Hozirgi va kelasi zamonda, shuningdek <b>to</b>, <b>can</b>,{' '}
          <b>must</b>, <b>will</b> dan keyin ishlatiladi.
        </p>
        <p className="muted small">
          Eslatma: he / she / it bilan hozirgi zamonda oxiriga <b>-s</b> qo'shiladi: <i>she goes, he buys</i>.
        </p>
        <Examples
          items={[
            { en: 'I go to school every day.', uz: 'Men har kuni maktabga boraman.' },
            { en: 'She eats breakfast at 7.', uz: 'U soat 7 da nonushta qiladi.' },
            { en: 'I will buy a car.', uz: 'Men mashina sotib olaman.' },
            { en: 'I want to see it.', uz: "Men buni ko'rishni xohlayman." },
          ]}
        />
      </section>

      <section className="panel guide">
        <h2>
          <span className="tag tag-v2">V2</span> O'tgan zamon (Past Simple)
        </h2>
        <p>
          <b>O'tmishda bo'lib, tugagan</b> ish-harakat uchun ishlatiladi. Ko'pincha shu so'zlar bilan keladi:{' '}
          <i>yesterday</i> (kecha), <i>last week</i> (o'tgan hafta), <i>two days ago</i> (ikki kun oldin),{' '}
          <i>in 2020</i>.
        </p>
        <div className="formula-box">
          <span className="en">Ega + V2</span>
          <span className="uz">I went · She saw · They bought</span>
        </div>
        <Examples
          items={[
            { en: 'Yesterday I went to the market.', uz: 'Kecha men bozorga bordim.' },
            { en: 'She saw a beautiful bird.', uz: "U chiroyli qushni ko'rdi." },
            { en: 'We ate plov last Sunday.', uz: "O'tgan yakshanba biz osh yedik." },
          ]}
        />
        <p className="note warn">
          ⚠️ <b>Inkor va so'roq gapda V2 ishlatilmaydi!</b> O'tgan zamonni <b>did</b> ko'rsatadi, fe'l esa V1 ga
          qaytadi.
        </p>
        <div className="formula-box">
          <span className="en">Ega + didn't + V1 · Did + ega + V1?</span>
        </div>
        <Examples
          items={[
            { en: "I didn't go to the market.", uz: 'Men bozorga bormadim.' },
            { en: 'Did you see the bird?', uz: "Sen qushni ko'rdingmi?" },
          ]}
        />
      </section>

      <section className="panel guide">
        <h2>
          <span className="tag tag-v3">V3</span> Sifatdosh (Past Participle)
        </h2>
        <p>
          V3 <b>hech qachon yolg'iz kelmaydi</b>. Uning oldida doim yordamchi so'z turadi. Eng ko'p uchraydigan 3
          holat:
        </p>

        <h3>1. have / has + V3 — Present Perfect</h3>
        <p>
          Ish bajarilgan va <b>natijasi hozir muhim</b>, yoki «hayotimda hech bo'lganmi?» degan ma'noda. Ko'pincha{' '}
          <i>already</i> (allaqachon), <i>just</i> (hozirgina), <i>ever</i> (hech), <i>never</i> (hech qachon)
          bilan keladi.
        </p>
        <Examples
          items={[
            { en: 'I have lost my keys.', uz: "Men kalitlarimni yo'qotib qo'ydim (hozir ham yo'q)." },
            { en: 'She has already eaten.', uz: "U allaqachon ovqatlanib bo'lgan." },
            { en: 'Have you ever been to Samarkand?', uz: "Samarqandda hech bo'lganmisiz?" },
          ]}
        />

        <h3>2. had + V3 — Past Perfect</h3>
        <p>
          O'tmishdagi bir voqeadan <b>ham oldinroq</b> bo'lgan ish uchun.
        </p>
        <Examples
          items={[{ en: 'When I came, the bus had left.', uz: "Men kelganimda avtobus ketib bo'lgan edi." }]}
        />

        <h3>3. be (am / is / are / was / were) + V3 — majhul nisbat</h3>
        <p>
          Ishni <b>kim qilgani muhim emas</b>, ishning o'zi muhim bo'lganda. O'zbek tilidagi <i>-il, -in</i>{' '}
          qo'shimchalariga o'xshaydi: <i>qurildi, yozilgan</i>.
        </p>
        <Examples
          items={[
            { en: 'This house was built in 1990.', uz: 'Bu uy 1990-yilda qurilgan.' },
            { en: 'English is spoken here.', uz: 'Bu yerda ingliz tilida gaplashiladi.' },
          ]}
        />
      </section>

      <section className="panel guide">
        <h2>V1, V2 yoki V3? Qisqa jadval</h2>
        <div className="cheat">
          <div className="cheat-row head" aria-hidden="true">
            <span>Fe'ldan oldin nima bor?</span>
            <span>Shakl</span>
            <span>Misol</span>
          </div>
          {cheatRows.map(([when, form, ex]) => (
            <div key={when} className="cheat-row">
              <span>{when}</span>
              <span>
                <span className={`tag tag-${form.toLowerCase()}`}>{form}</span>
              </span>
              <span className="en">{ex}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel guide">
        <h2>Yodlashni osonlashtiradigan 4 guruh</h2>
        <p>
          Noto'g'ri fe'llarni tartibsiz yodlagandan ko'ra, ularni <b>o'xshashligiga qarab</b> guruhlab o'rganish
          osonroq. Har bir guruhdan misollar:
        </p>
        <div className="rule-grid two">
          {groups.map((g) => (
            <div key={g} className="rule">
              <span className="group-badge">{g}</span>
              <h3>{groupInfo[g].title}</h3>
              <p className="muted small">{groupInfo[g].hint}</p>
              <ul className="group-list">
                {examplesByGroup(g).map((v) => (
                  <li key={v.v1}>
                    <span className="en">
                      {v.v1} – {v.v2} – {v.v3}
                    </span>
                    <Speak text={`${v.v1}, ${v.v2}, ${v.v3}`} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="panel guide">
        <h2>Ko'p uchraydigan xatolar</h2>
        <div className="mistake-list">
          {mistakes.map((m) => (
            <div key={m.wrong} className="mistake-item">
              <p className="wrong">❌ {m.wrong}</p>
              <p className="right">✅ {m.right}</p>
              <p className="muted small">{m.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel guide">
        <h2>Qanday yodlash kerak?</h2>
        <ol className="tips">
          {tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>
    </>
  )
}
