export interface VerbStat {
  right: number
  wrong: number
}

export type Progress = Record<string, VerbStat>

const KEY = 'irregular-verbs-progress'

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Progress) : {}
  } catch {
    return {}
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // Storage may be unavailable (private mode) — progress just won't persist.
  }
}

export function record(p: Progress, v1: string, ok: boolean): Progress {
  const cur = p[v1] ?? { right: 0, wrong: 0 }
  return { ...p, [v1]: ok ? { ...cur, right: cur.right + 1 } : { ...cur, wrong: cur.wrong + 1 } }
}

/** A verb is "learned" once it has been answered right more often than wrong, at least twice. */
export function isLearned(s: VerbStat | undefined): boolean {
  return !!s && s.right >= 2 && s.right > s.wrong
}

export function isWeak(s: VerbStat | undefined): boolean {
  return !!s && s.wrong > 0 && s.wrong >= s.right
}

export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text.replace(/\//g, ', '))
  u.lang = 'en-US'
  u.rate = 0.85
  window.speechSynthesis.speak(u)
}
