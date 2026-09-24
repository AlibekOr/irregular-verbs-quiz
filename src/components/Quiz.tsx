import { useEffect, useRef, useState } from 'react'
import { verbs, type Verb } from '../data/verbs'
import { groupInfo, groupOf, isCorrect, makeQuestions, type Group, type Question, type QuizMode } from '../lib/quiz'
import { isWeak, type Progress } from '../lib/progress'
import { VerbCard } from './VerbCard'

const modes: { id: QuizMode; icon: string; title: string; text: string }[] = [
  { id: 'choice', icon: '🅰️', title: 'Variantli test', text: "V1 berilgan — to'g'ri V2 yoki V3 ni 4 ta variantdan tanlang." },
  { id: 'write', icon: '⌨️', title: 'Yozish', text: "V1 berilgan — V2 va V3 ni o'zingiz yozing. Eng foydali mashq!" },
  { id: 'translate', icon: '🌐', title: 'Tarjima', text: "O'zbekcha tarjima berilgan — inglizcha fe'lni toping." },
]

type Scope = 'all' | 'weak' | Group

interface Answer {
  question: Question
  ok: boolean
  given: string
}

interface Props {
  progress: Progress
  onAnswer: (v1: string, ok: boolean) => void
}

export function Quiz({ progress, onAnswer }: Props) {
  const [mode, setMode] = useState<QuizMode>('write')
  const [count, setCount] = useState(10)
  const [scope, setScope] = useState<Scope>('all')
  const [queue, setQueue] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const weakVerbs = verbs.filter((v) => isWeak(progress[v.v1]))
  const pick = (s: Scope): Verb[] =>
    s === 'all' ? verbs : s === 'weak' ? weakVerbs : verbs.filter((v) => groupOf(v) === s)

  const start = (selected: Verb[], m = mode) => {
    if (selected.length === 0) return
    setQueue(makeQuestions(selected, m, count, verbs))
    setIndex(0)
    setAnswers([])
  }

  if (!queue) {
    const available = pick(scope).length
    return (
      <section className="panel">
        <h2>Quiz sozlamalari</h2>
        <h3 className="label">1. Mashq turi</h3>
        <div className="mode-grid">
          {modes.map((m) => (
            <button key={m.id} className={`mode ${mode === m.id ? 'on' : ''}`} onClick={() => setMode(m.id)}>
              <span className="mode-icon">{m.icon}</span>
              <b>{m.title}</b>
              <span className="muted small">{m.text}</span>
            </button>
          ))}
        </div>

        <h3 className="label">2. Qaysi fe'llar</h3>
        <div className="chips">
          <button className={`chip ${scope === 'all' ? 'on' : ''}`} onClick={() => setScope('all')}>
            Hammasi ({verbs.length})
          </button>
          <button
            className={`chip ${scope === 'weak' ? 'on' : ''}`}
            onClick={() => setScope('weak')}
            disabled={weakVerbs.length === 0}
          >
            Xatolarim ({weakVerbs.length})
          </button>
          {(Object.keys(groupInfo) as Group[]).map((g) => (
            <button key={g} className={`chip ${scope === g ? 'on' : ''}`} onClick={() => setScope(g)} title={groupInfo[g].title}>
              {g} ({pick(g).length})
            </button>
          ))}
        </div>

        <h3 className="label">3. Savollar soni</h3>
        <div className="chips">
          {[10, 20, 50, Infinity].map((n) => (
            <button key={n} className={`chip ${count === n ? 'on' : ''}`} onClick={() => setCount(n)}>
              {n === Infinity ? 'Hammasi' : n}
            </button>
          ))}
        </div>

        <button className="btn primary big" onClick={() => start(pick(scope))} disabled={available === 0}>
          Boshlash ▶ ({Math.min(count, available)} ta savol)
        </button>
      </section>
    )
  }

  if (index >= queue.length) {
    const firstTry = answers.filter((a) => !a.question.retry)
    const right = firstTry.filter((a) => a.ok).length
    const wrongVerbs = [...new Map(answers.filter((a) => !a.ok).map((a) => [a.question.verb.v1, a.question.verb])).values()]
    const pct = Math.round((right / Math.max(firstTry.length, 1)) * 100)
    return (
      <section className="panel result">
        <div className="score-ring" style={{ '--pct': pct } as React.CSSProperties}>
          <span>{pct}%</span>
        </div>
        <h2>
          {pct === 100 ? 'Ajoyib! 🎉' : pct >= 70 ? 'Yaxshi natija! 👍' : "Mashq qilishda davom eting 💪"}
        </h2>
        <p className="muted">
          {firstTry.length} ta savoldan birinchi urinishda <b>{right}</b> tasiga to'g'ri javob berdingiz.
        </p>

        {wrongVerbs.length > 0 && (
          <>
            <h3>Xato qilingan fe'llar — yana bir marta ko'rib chiqing:</h3>
            <div className="mistakes">
              {wrongVerbs.map((v) => (
                <div key={v.v1} className="mistake">
                  <b>{v.v1}</b> – <b>{v.v2}</b> – <b>{v.v3}</b>
                  <span className="muted"> · {v.uz1}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="actions">
          {wrongVerbs.length > 0 && (
            <button className="btn primary" onClick={() => start(wrongVerbs)}>
              Xatolar ustida ishlash
            </button>
          )}
          <button className="btn" onClick={() => start(pick(scope))}>
            Yana bir marta
          </button>
          <button className="btn ghost" onClick={() => setQueue(null)}>
            Sozlamalar
          </button>
        </div>
      </section>
    )
  }

  const question = queue[index]
  const handleAnswer = (ok: boolean, given: string) => {
    setAnswers((a) => [...a, { question, ok, given }])
    if (!question.retry) onAnswer(question.verb.v1, ok)
    // A wrong answer comes back once more at the end of the quiz
    if (!ok && !question.retry) setQueue((q) => [...q!, { ...question, retry: true }])
  }
  const answered = answers.length > index ? answers[index] : null
  const firstTotal = queue.filter((q) => !q.retry).length

  return (
    <section className="panel">
      <div className="quiz-top">
        <button className="btn ghost small" onClick={() => setQueue(null)}>
          ✕ Chiqish
        </button>
        <span className="muted">
          {Math.min(index + 1, firstTotal)} / {firstTotal}
          {question.retry && ' · takrorlash'}
        </span>
        <span className="score">✅ {answers.filter((a) => a.ok).length}</span>
      </div>
      <div className="progress">
        <div style={{ width: `${(index / queue.length) * 100}%` }} />
      </div>

      <QuestionView
        key={index}
        question={question}
        answered={answered}
        onAnswer={handleAnswer}
        onNext={() => {
          setIndex((i) => i + 1)
          window.scrollTo({ top: 0 })
        }}
      />
    </section>
  )
}

interface QuestionProps {
  question: Question
  answered: Answer | null
  onAnswer: (ok: boolean, given: string) => void
  onNext: () => void
}

function QuestionView({ question, answered, onAnswer, onNext }: QuestionProps) {
  const { verb, mode, asked, options } = question
  const [v2, setV2] = useState('')
  const [v3, setV3] = useState('')
  const firstInput = useRef<HTMLInputElement>(null)
  const nextBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (answered) nextBtn.current?.focus()
    else firstInput.current?.focus()
  }, [answered])

  const correctOption = mode === 'translate' ? verb.v1 : verb[asked]
  const formLabel = asked === 'v2' ? 'V2 (Past Simple)' : 'V3 (Past Participle)'

  let prompt: React.ReactNode
  if (mode === 'translate') {
    prompt = (
      <>
        <p className="q-hint">Bu fe'l inglizchada qanday bo'ladi?</p>
        <p className="q-word">{verb.uz1}</p>
      </>
    )
  } else if (mode === 'choice') {
    prompt = (
      <>
        <p className="q-hint">
          <b>{verb.v1}</b> fe'lining <span className={`tag tag-${asked}`}>{formLabel}</span> shakli qaysi?
        </p>
        <p className="q-word">{verb.v1}</p>
        <p className="muted">{verb.uz1}</p>
      </>
    )
  } else {
    prompt = (
      <>
        <p className="q-hint">V2 va V3 shakllarini yozing</p>
        <p className="q-word">{verb.v1}</p>
        <p className="muted">{verb.uz1}</p>
      </>
    )
  }

  const submitWrite = () => {
    if (answered || (!v2.trim() && !v3.trim())) return
    onAnswer(isCorrect(v2, verb.v2) && isCorrect(v3, verb.v3), `${v2.trim() || '—'} – ${v3.trim() || '—'}`)
  }

  return (
    <div className="question">
      {prompt}

      {mode === 'write' ? (
        <form
          className="write"
          onSubmit={(e) => {
            e.preventDefault()
            submitWrite()
          }}
        >
          {(['v2', 'v3'] as const).map((k) => {
            const value = k === 'v2' ? v2 : v3
            const state = answered ? (isCorrect(value, verb[k]) ? 'good' : 'bad') : ''
            return (
              <label key={k} className={`field ${state}`}>
                <span className={`tag tag-${k}`}>{k.toUpperCase()}</span>
                <input
                  ref={k === 'v2' ? firstInput : undefined}
                  value={value}
                  onChange={(e) => (k === 'v2' ? setV2 : setV3)(e.target.value)}
                  disabled={!!answered}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={k === 'v2' ? "o'tgan zamon" : 'sifatdosh'}
                />
                {answered && state === 'bad' && <span className="fix">✓ {verb[k]}</span>}
              </label>
            )
          })}
          {!answered && (
            <button className="btn primary" type="submit" disabled={!v2.trim() && !v3.trim()}>
              Tekshirish
            </button>
          )}
        </form>
      ) : (
        <div className="options">
          {options.map((o) => {
            const isRight = o === correctOption
            const cls = answered ? (isRight ? 'good' : answered.given === o ? 'bad' : 'dim') : ''
            return (
              <button key={o} className={`option ${cls}`} disabled={!!answered} onClick={() => onAnswer(isRight, o)}>
                {o}
              </button>
            )
          })}
        </div>
      )}

      {answered && (
        <div className={`feedback ${answered.ok ? 'good' : 'bad'}`}>
          <p className="verdict">
            {answered.ok ? "✅ To'g'ri!" : `❌ Noto'g'ri. Siz: “${answered.given}”`}
          </p>
          <p className="formula">
            <b>{verb.v1}</b> – <b>{verb.v2}</b> – <b>{verb.v3}</b>
          </p>
          <VerbCard verb={verb} highlight={mode === 'choice' ? asked : mode === 'translate' ? 'v1' : undefined} />
          <button ref={nextBtn} className="btn primary" onClick={onNext}>
            Keyingi savol →
          </button>
        </div>
      )}
    </div>
  )
}
