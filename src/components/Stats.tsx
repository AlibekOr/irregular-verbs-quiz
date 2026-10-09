import { verbs } from '../data/verbs'
import { isLearned, isWeak, type Progress } from '../lib/progress'

interface Props {
  progress: Progress
  onReset: () => void
}

export function Stats({ progress, onReset }: Props) {
  const learned = verbs.filter((v) => isLearned(progress[v.v1]))
  const weak = verbs
    .filter((v) => isWeak(progress[v.v1]))
    .sort((a, b) => progress[b.v1].wrong - progress[a.v1].wrong)
  const seen = verbs.filter((v) => progress[v.v1])
  const totals = seen.reduce(
    (t, v) => ({ right: t.right + progress[v.v1].right, wrong: t.wrong + progress[v.v1].wrong }),
    { right: 0, wrong: 0 },
  )
  const pct = Math.round((learned.length / verbs.length) * 100)

  return (
    <section className="panel">
      <h2>Mening natijalarim</h2>
      <div className="stat-grid">
        <div className="stat">
          <b>{learned.length}</b>
          <span className="muted">o'rganilgan fe'l</span>
        </div>
        <div className="stat">
          <b>{seen.length}</b>
          <span className="muted">ko'rilgan fe'l</span>
        </div>
        <div className="stat">
          <b>{totals.right}</b>
          <span className="muted">to'g'ri javob</span>
        </div>
        <div className="stat">
          <b>{totals.wrong}</b>
          <span className="muted">xato javob</span>
        </div>
      </div>

      <p className="muted small">
        Umumiy progress: {learned.length} / {verbs.length} ({pct}%)
      </p>
      <div className="progress big">
        <div style={{ width: `${pct}%` }} />
      </div>
      <p className="muted small">
        Fe'l kamida 2 marta to'g'ri topilsa va to'g'ri javoblar xatolardan ko'p bo'lsa, u "o'rganilgan" hisoblanadi.
      </p>

      <h3>Qiyin fe'llar ({weak.length})</h3>
      {weak.length === 0 ? (
        <p className="muted">Hozircha xato yo'q. Quiz ishlab ko'ring!</p>
      ) : (
        <>
          <p className="muted small">Bu fe'llarni Quiz bo'limida «Xatolarim» tugmasi orqali alohida mashq qilishingiz mumkin.</p>
          <div className="mistakes">
            {weak.map((v) => (
              <div key={v.v1} className="mistake">
                <b>{v.v1}</b> – <b>{v.v2}</b> – <b>{v.v3}</b>
                <span className="muted"> · {v.uz1}</span>
                <span className="count">
                  ✅ {progress[v.v1].right} ❌ {progress[v.v1].wrong}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {seen.length > 0 && (
        <button
          className="btn ghost"
          onClick={() => {
            if (confirm("Barcha natijalar o'chiriladi. Davom etasizmi?")) onReset()
          }}
        >
          Natijalarni tozalash
        </button>
      )}
    </section>
  )
}
