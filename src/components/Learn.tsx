import { useMemo, useState } from 'react'
import { verbs } from '../data/verbs'
import { groupInfo, groupOf, type Group } from '../lib/quiz'
import { Speak, VerbCard } from './VerbCard'

const groups = Object.keys(groupInfo) as Group[]

export function Learn() {
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
            const isOpen = open === v.v1
            return (
              <div key={v.v1} className={`verb-item ${isOpen ? 'open' : ''}`}>
                <button type="button" className="verb-row" onClick={() => setOpen(isOpen ? null : v.v1)} aria-expanded={isOpen}>
                  <span className="v1">{v.v1}</span>
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
