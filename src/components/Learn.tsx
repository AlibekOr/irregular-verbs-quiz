import { useMemo, useState } from 'react'
import { verbs } from '../data/verbs'
import { groupInfo, groupOf, type Group } from '../lib/quiz'
import { isLearned, isWeak, type Progress } from '../lib/progress'
import { Speak, VerbCard } from './VerbCard'

const groups = Object.keys(groupInfo) as Group[]

export function Rules() {
  return (
    <section className="panel rules">
      <h2>V1, V2, V3 nima?</h2>
      <p>
        Ingliz tilida ko'p fe'llar o'tgan zamonda oddiygina <b>-ed</b> qo'shimchasini oladi:{' '}
        <i>play → played</i>. Bular <b>to'g'ri (regular)</b> fe'llar. <b>Noto'g'ri (irregular)</b>{' '}
        fe'llar esa bu qoidaga bo'ysunmaydi — ularning shakllarini yodlash kerak:{' '}
        <i>buy → bought</i> (buyed emas!).
      </p>
      <div className="rule-grid">
        <div className="rule">
          <span className="tag tag-v1">V1</span>
          <h3>Infinitive — asosiy shakl</h3>
          <p>Lug'atdagi shakl. Hozirgi va kelasi zamonda ishlatiladi.</p>
          <p className="en">I <b>buy</b> bread every day.</p>
          <p className="uz">Men har kuni non sotib olaman.</p>
        </div>
        <div className="rule">
          <span className="tag tag-v2">V2</span>
          <h3>Past Simple — o'tgan zamon</h3>
          <p>Tugagan ish-harakat uchun. Ko'pincha <i>yesterday, last week, ago</i> bilan keladi.</p>
          <p className="en">Yesterday I <b>bought</b> bread.</p>
          <p className="uz">Kecha men non sotib oldim.</p>
        </div>
        <div className="rule">
          <span className="tag tag-v3">V3</span>
          <h3>Past Participle — sifatdosh</h3>
          <p>
            <b>have/has + V3</b> (Present Perfect), <b>had + V3</b> (Past Perfect) va{' '}
            <b>be + V3</b> (majhul nisbat) da ishlatiladi.
          </p>
          <p className="en">I have <b>bought</b> bread. / It was <b>bought</b> here.</p>
          <p className="uz">Men non sotib oldim (olganman). / U shu yerdan sotib olingan.</p>
        </div>
      </div>
      <h3>Yodlashni osonlashtiradigan 4 guruh</h3>
      <div className="rule-grid four">
        {groups.map((g) => (
          <div key={g} className="rule">
            <span className="group-badge">{g}</span>
            <h3>{groupInfo[g].title}</h3>
            <p className="en">{groupInfo[g].sample}</p>
            <p className="muted small">{groupInfo[g].hint}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Learn({ progress }: { progress: Progress }) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<Group | 'all'>('all')
  const [open, setOpen] = useState<string | null>(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return verbs.filter((v) => {
      if (group !== 'all' && groupOf(v) !== group) return false
      if (!q) return true
      return [v.v1, v.v2, v.v3, v.uz1].some((s) => s.toLowerCase().includes(q))
    })
  }, [query, group])

  return (
    <>
      <Rules />
      <section className="panel">
        <h2>Fe'llar ro'yxati ({verbs.length} ta)</h2>
        <div className="toolbar">
          <input
            type="search"
            placeholder="Qidirish: buy, bought, sotib olmoq…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="chips">
            <button className={`chip ${group === 'all' ? 'on' : ''}`} onClick={() => setGroup('all')}>
              Hammasi
            </button>
            {groups.map((g) => (
              <button key={g} className={`chip ${group === g ? 'on' : ''}`} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="verb-table">
          <div className="verb-row head" aria-hidden="true">
            <span>V1</span>
            <span>V2</span>
            <span>V3</span>
            <span className="hide-sm">Tarjima</span>
          </div>
          {list.map((v) => {
            const s = progress[v.v1]
            const isOpen = open === v.v1
            return (
              <div key={v.v1} className={`verb-item ${isOpen ? 'open' : ''}`}>
                <button type="button" className="verb-row" onClick={() => setOpen(isOpen ? null : v.v1)} aria-expanded={isOpen}>
                  <span className="v1">
                    {isLearned(s) && <span className="dot ok" role="img" aria-label="O'rganilgan" title="O'rganilgan" />}
                    {isWeak(s) && <span className="dot bad" role="img" aria-label="Xato qilingan" title="Xato qilingan" />}
                    {v.v1}
                  </span>
                  <span>{v.v2}</span>
                  <span>{v.v3}</span>
                  <span className="muted hide-sm">{v.uz1}</span>
                </button>
                {isOpen && (
                  <div className="verb-detail">
                    <div className="detail-head">
                      <b>
                        {v.v1} – {v.v2} – {v.v3}
                      </b>
                      <Speak text={`${v.v1}, ${v.v2}, ${v.v3}`} />
                    </div>
                    <VerbCard verb={v} />
                  </div>
                )}
              </div>
            )
          })}
          {list.length === 0 && <p className="muted empty">Hech narsa topilmadi.</p>}
        </div>
      </section>
    </>
  )
}
