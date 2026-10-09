import { useEffect, useRef, useState } from 'react'
import { verbs, type Verb } from '../data/verbs'
import {
  formsToWrite,
  groupInfo,
  groupOf,
  isCorrect,
  isWrittenCorrect,
  makeQuestions,
  retryOf,
  type Form,
  type Group,
  type Question,
  type QuizMode,
} from '../lib/quiz'
import { VerbCard } from './VerbCard'

const modes: { id: QuizMode; icon: string; title: string; text: string }[] = [
  { id: 'choice', icon: '🅰️', title: 'Variantli test', text: "V1 berilgan — to'g'ri V2 yoki V3 ni 4 ta variantdan tanlang." },
  { id: 'write', icon: '⌨️', title: 'Yozish', text: "V1 berilgan — V2 va V3 ni o'zingiz yozing. Eng foydali mashq!" },
  {
    id: 'two',
    icon: '🎲',
    title: 'Ikkitasini yoz',
    text: "V1, V2 yoki V3 dan bittasi tasodifiy beriladi — qolgan ikkitasini o'zingiz yozasiz.",
  },
  { id: 'translate', icon: '🌐', title: 'Tarjima', text: "O'zbekcha tarjima berilgan — inglizcha fe'lni toping." },
]

type Scope = 'all' | Group

interface Answer {
  question: Question
  ok: boolean
  given: string
}

export function Quiz() {
  const [mode, setMode] = useState<QuizMode>('write')
  const [count, setCount] = useState(10)
  const [scope, setScope] = useState<Scope>('all')
  const [queue, setQueue] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const pick = (s: Scope): Verb[] => (s === 'all' ? verbs : verbs.filter((v) => groupOf(v) === s))

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
    // A wrong answer comes back once more at the end of the quiz
    if (!ok && !question.retry) setQueue((q) => [...q!, retryOf(question)])
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

const uzOf = { v1: 'uz1', v2: 'uz2', v3: 'uz3' } as const

const placeholders: Record<Form, string> = { v1: 'asosiy shakl', v2: "o'tgan zamon", v3: 'sifatdosh' }

interface QuestionProps {
  question: Question
  answered: Answer | null
  onAnswer: (ok: boolean, given: string) => void
  onNext: () => void
}

function QuestionView({ question, answered, onAnswer, onNext }: QuestionProps) {
  const { verb, mode, asked, given, options } = question
  const [written, setWritten] = useState<Record<Form, string>>({ v1: '', v2: '', v3: '' })
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
  } else if (mode === 'two') {
    prompt = (
      <>
        <p className="q-hint">
          <span className={`tag tag-${given}`}>{given.toUpperCase()}</span> shakli berilgan — qolgan ikkitasini
          yozing
        </p>
        <p className="q-word">{verb[given].split('/').join(' / ')}</p>
        <p className="muted">{verb[uzOf[given]]}</p>
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

  const toWrite = formsToWrite(question)
  const nothingWritten = toWrite.every((f) => !written[f].trim())

  const submitWrite = () => {
    if (answered || nothingWritten) return
    onAnswer(isWrittenCorrect(question, written), toWrite.map((f) => written[f].trim() || '—').join(' – '))
  }

  return (
    <div className="question">
      {prompt}

      {mode === 'write' || mode === 'two' ? (
        <form
          className="write"
          onSubmit={(e) => {
            e.preventDefault()
            submitWrite()
          }}
        >
          {toWrite.map((k, i) => {
            const value = written[k]
            const state = answered ? (isCorrect(value, verb[k]) ? 'good' : 'bad') : ''
            return (
              <label key={k} className={`field ${state}`}>
                <span className={`tag tag-${k}`}>{k.toUpperCase()}</span>
                <input
                  ref={i === 0 ? firstInput : undefined}
                  value={value}
                  onChange={(e) => setWritten((w) => ({ ...w, [k]: e.target.value }))}
                  disabled={!!answered}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={placeholders[k]}
                />
                {answered && state === 'bad' && <span className="fix">✓ {verb[k]}</span>}
              </label>
            )
          })}
          {!answered && (
            <button className="btn primary" type="submit" disabled={nothingWritten}>
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
          <VerbCard
            verb={verb}
            highlight={mode === 'choice' ? asked : mode === 'translate' ? 'v1' : mode === 'two' ? given : undefined}
          />
          <button ref={nextBtn} className="btn primary" onClick={onNext}>
            Keyingi savol →
          </button>
        </div>
      )}
    </div>
  )
}
