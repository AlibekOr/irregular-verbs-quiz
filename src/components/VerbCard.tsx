import type { Verb } from '../data/verbs'
import { groupInfo, groupOf } from '../lib/quiz'
import { speak } from '../lib/progress'

interface Props {
  verb: Verb
  /** Highlights one form, e.g. the one the quiz asked for */
  highlight?: 'v1' | 'v2' | 'v3'
}

const columns = [
  { key: 'v1', uz: 'uz1', label: 'V1', name: 'Infinitive', use: 'Hozirgi / kelasi zamon' },
  { key: 'v2', uz: 'uz2', label: 'V2', name: 'Past Simple', use: "O'tgan zamon" },
  { key: 'v3', uz: 'uz3', label: 'V3', name: 'Past Participle', use: 'have/has + V3, majhul nisbat' },
] as const

export function Speak({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="speak"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label={`${text} — talaffuzni eshitish`}
      title="Talaffuzni eshitish"
    >
      🔊
    </button>
  )
}

export function VerbCard({ verb, highlight }: Props) {
  const group = groupOf(verb)
  return (
    <div className="verb-card">
      <div className="forms">
        {columns.map((c) => (
          <div key={c.key} className={`form ${highlight === c.key ? 'is-highlight' : ''}`}>
            <div className="form-label">
              <span className={`tag tag-${c.key}`}>{c.label}</span>
              <span className="muted small">{c.name}</span>
            </div>
            <div className="form-word">
              {verb[c.key].split('/').join(' / ')}
              <Speak text={verb[c.key]} />
            </div>
            <div className="form-uz">{verb[c.uz]}</div>
            <div className="muted small">{c.use}</div>
          </div>
        ))}
      </div>

      <div className="examples">
        <div className="example">
          <span className="tag tag-v2">V2</span>
          <div>
            <p className="en">{verb.ex2}</p>
            <p className="uz">{verb.ex2uz}</p>
          </div>
        </div>
        <div className="example">
          <span className="tag tag-v3">V3</span>
          <div>
            <p className="en">{verb.ex3}</p>
            <p className="uz">{verb.ex3uz}</p>
          </div>
        </div>
      </div>

      <p className="group-note">
        <span className="group-badge">{group}</span>
        {groupInfo[group].title}. {groupInfo[group].hint}
      </p>
    </div>
  )
}
