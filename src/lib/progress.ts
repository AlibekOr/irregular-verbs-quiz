export interface VerbStat {
  right: number
  wrong: number
}

export type Progress = Record<string, VerbStat>

const KEY = 'irregular-verbs-progress'

const isCount = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 0

/** Parses stored progress, dropping anything that isn't a valid { right, wrong } entry. */
export function parseProgress(raw: string | null): Progress {
  if (!raw) return {}
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return {}
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return {}
  const out: Progress = {}
  for (const [v1, s] of Object.entries(data as Record<string, Partial<Record<keyof VerbStat, unknown>> | null>)) {
    if (s && isCount(s.right) && isCount(s.wrong)) out[v1] = { right: s.right, wrong: s.wrong }
  }
  return out
}

export function loadProgress(): Progress {
  try {
    return parseProgress(localStorage.getItem(KEY))
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
