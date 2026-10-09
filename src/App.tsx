import { useEffect, useState } from 'react'
import { Flashcards } from './components/Flashcards'
import { Learn } from './components/Learn'
import { Quiz } from './components/Quiz'
import { Stats } from './components/Stats'
import { verbs } from './data/verbs'
import { isLearned, loadProgress, record, saveProgress, type Progress } from './lib/progress'

const tabs = [
  { id: 'learn', icon: '📖', label: "O'rganish" },
  { id: 'cards', icon: '🔁', label: 'Kartochkalar' },
  { id: 'quiz', icon: '🎯', label: 'Quiz' },
  { id: 'stats', icon: '📊', label: 'Natijalar' },
] as const

type Tab = (typeof tabs)[number]['id']

export default function App() {
  const [tab, setTab] = useState<Tab>('learn')
  const [progress, setProgress] = useState<Progress>(loadProgress)

  useEffect(() => saveProgress(progress), [progress])

  const onAnswer = (v1: string, ok: boolean) => setProgress((p) => record(p, v1, ok))
  const learned = verbs.filter((v) => isLearned(progress[v.v1])).length

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="logo">V3</span>
          <div>
            <h1>Irregular Verbs</h1>
            <p className="muted small">Noto'g'ri fe'llarni V1 · V2 · V3 bilan o'rganing</p>
          </div>
        </div>
        <span className="pill" title="O'rganilgan fe'llar">
          ⭐ {learned}/{verbs.length}
        </span>
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'learn' && <Learn progress={progress} />}
        {tab === 'cards' && <Flashcards />}
        {tab === 'quiz' && <Quiz progress={progress} onAnswer={onAnswer} />}
        {tab === 'stats' && <Stats progress={progress} onReset={() => setProgress({})} />}
      </main>

      <footer className="muted small footer">🔊 tugmasi so'zning talaffuzini eshittiradi</footer>
    </div>
  )
}
