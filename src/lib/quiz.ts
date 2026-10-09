import type { Verb } from '../data/verbs'

export type Group = 'AAA' | 'ABB' | 'ABA' | 'ABC'

export const groupInfo: Record<Group, { title: string; hint: string; sample: string }> = {
  AAA: {
    title: 'Uchala shakli bir xil',
    hint: "Eng oson guruh: V1 = V2 = V3. Faqat bitta so'zni yodlash kifoya.",
    sample: 'cut – cut – cut',
  },
  ABB: {
    title: 'V2 va V3 bir xil',
    hint: "O'tgan zamon (V2) va sifatdosh (V3) bir xil. Eng katta guruh.",
    sample: 'buy – bought – bought',
  },
  ABA: {
    title: 'V1 va V3 bir xil',
    hint: 'Faqat V2 boshqacha, V3 esa V1 ga qaytadi.',
    sample: 'come – came – come',
  },
  ABC: {
    title: 'Uchala shakli har xil',
    hint: 'Eng qiyin guruh: uchala shaklni alohida yodlash kerak.',
    sample: 'go – went – gone',
  },
}

/** Lowercases, trims and collapses whitespace so "  Bought " matches "bought". */
export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[’`]/g, "'")
}

/** All accepted spellings of a form written as "a/b". */
export function variants(form: string): string[] {
  return form.split('/').map(normalize)
}

/**
 * True when the answer matches one of the accepted forms.
 * "was", "were" and "was/were" are all correct for "was/were".
 */
export function isCorrect(answer: string, form: string): boolean {
  const accepted = variants(form)
  const given = normalize(answer)
  if (!given) return false
  if (accepted.includes(given)) return true
  const parts = given.split(/\s*[/,]\s*|\s+or\s+/).filter(Boolean)
  return parts.length > 1 && parts.every((p) => accepted.includes(p))
}

export function groupOf(verb: Verb): Group {
  const [a] = variants(verb.v1)
  const b = variants(verb.v2)
  const c = variants(verb.v3)
  const same = (x: string[], y: string[]) => x.some((v) => y.includes(v))
  if (b.includes(a) && c.includes(a)) return 'AAA'
  if (same(b, c)) return 'ABB'
  if (c.includes(a)) return 'ABA'
  return 'ABC'
}

export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** The mistake a learner makes when they treat the verb as regular: buy → buyed. */
export function regularize(v1: string): string {
  if (v1.endsWith('e')) return v1 + 'd'
  if (/[^aeiou]y$/.test(v1)) return v1.slice(0, -1) + 'ied'
  return v1 + 'ed'
}

export type QuizMode = 'choice' | 'write' | 'translate'
export type AskedForm = 'v2' | 'v3'

export interface Question {
  verb: Verb
  mode: QuizMode
  /** Which form a "choice" question asks for */
  asked: AskedForm
  /** Options for "choice" and "translate" questions */
  options: string[]
  /** Set when a wrongly answered question is asked again at the end */
  retry?: boolean
}

function choiceOptions(verb: Verb, asked: AskedForm, pool: Verb[], rand: () => number): string[] {
  const correct = verb[asked]
  const correctSet = new Set(variants(correct))
  const options = new Set<string>([correct])
  const add = (o: string) => {
    if (options.size < 4 && !variants(o).some((v) => correctSet.has(v))) options.add(o)
  }
  // Plausible traps first: the other form of the same verb, the "regular" mistake, V1 itself
  add(asked === 'v2' ? verb.v3 : verb.v2)
  add(regularize(verb.v1))
  add(verb.v1)
  for (const other of shuffle(pool, rand)) {
    if (options.size >= 4) break
    if (other !== verb) add(other[asked])
  }
  return shuffle([...options], rand)
}

function translateOptions(verb: Verb, pool: Verb[], rand: () => number): string[] {
  // Skip verbs sharing a meaning (take/get = "olmoq"), otherwise two options would be right
  const meanings = (v: Verb) => v.uz1.split(',').map((m) => normalize(m.replace(/\(.*?\)/g, '')))
  const own = meanings(verb)
  const others = shuffle(
    pool.filter((v) => v !== verb && !meanings(v).some((m) => own.includes(m))),
    rand,
  ).slice(0, 3)
  return shuffle([verb.v1, ...others.map((v) => v.v1)], rand)
}

export function makeQuestions(
  selected: Verb[],
  mode: QuizMode,
  count: number,
  pool: Verb[],
  rand: () => number = Math.random,
): Question[] {
  return shuffle(selected, rand)
    .slice(0, count)
    .map((verb) => {
      const asked: AskedForm = rand() < 0.5 ? 'v2' : 'v3'
      const options =
        mode === 'choice'
          ? choiceOptions(verb, asked, pool, rand)
          : mode === 'translate'
            ? translateOptions(verb, pool, rand)
            : []
      return { verb, mode, asked, options }
    })
}

/** A wrongly answered question asked again, with its options in a new order so position can't be memorised. */
export function retryOf(q: Question, rand: () => number = Math.random): Question {
  let options = q.options
  for (let i = 0; i < 5 && options.length > 1 && options.every((o, j) => o === q.options[j]); i++) {
    options = shuffle(q.options, rand)
  }
  return { ...q, options, retry: true }
}
