import { useState } from 'react'
import { verbs } from '../data/verbs'
import { shuffle } from '../lib/quiz'
import { Speak, VerbCard } from './VerbCard'

interface Props {
  onAnswer: (v1: string, ok: boolean) => void
}

export function Flashcards({ onAnswer }: Props) {
  const [deck, setDeck] = useState(() => shuffle(verbs))
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)

  const verb = deck[i % deck.length]
  const next = (ok: boolean) => {
    onAnswer(verb.v1, ok)
    if (ok) setKnown((k) => k + 1)
    setFlipped(false)
    if (i + 1 >= deck.length) {
      setDeck(shuffle(verbs))
      setI(0)
    } else {
      setI(i + 1)
    }
  }

  return (
    <section className="panel">
      <div className="quiz-top">
        <h2>Kartochkalar</h2>
        <span className="muted">
          {i + 1} / {deck.length} · bilaman: {known}
        </span>
      </div>
      <p className="muted">
        Fe'lni ko'ring, V2 va V3 ni ichingizda ayting, keyin kartani ochib o'zingizni tekshiring.
      </p>

      {!flipped ? (
        <button className="flashcard" onClick={() => setFlipped(true)}>
          <span className="tag tag-v1">V1</span>
          <span className="q-word">{verb.v1}</span>
          <span className="muted">{verb.uz1}</span>
          <span className="flip-hint">👆 Javobni ko'rish uchun bosing</span>
        </button>
      ) : (
        <div className="flashcard back">
          <p className="formula">
            <b>{verb.v1}</b> – <b>{verb.v2}</b> – <b>{verb.v3}</b>
            <Speak text={`${verb.v1}, ${verb.v2}, ${verb.v3}`} />
          </p>
          <VerbCard verb={verb} />
          <div className="actions">
            <button className="btn bad" onClick={() => next(false)}>
              😕 Bilmadim
            </button>
            <button className="btn good" onClick={() => next(true)}>
              😊 Bildim
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
