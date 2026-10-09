import { useState } from 'react'
import { Flashcards } from './components/Flashcards'
import { Learn } from './components/Learn'
import { Quiz } from './components/Quiz'

const tabs = [
  { id: 'learn', icon: '📖', label: "O'rganish" },
  { id: 'cards', icon: '🔁', label: 'Kartochkalar' },
  { id: 'quiz', icon: '🎯', label: 'Quiz' },
] as const

type Tab = (typeof tabs)[number]['id']

export default function App() {
  const [tab, setTab] = useState<Tab>('learn')

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
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'learn' && <Learn />}
        {tab === 'cards' && <Flashcards />}
        {tab === 'quiz' && <Quiz />}
      </main>

      <footer className="muted small footer">🔊 tugmasi so'zning talaffuzini eshittiradi</footer>
    </div>
  )
}
