import { describe, expect, it } from 'vitest'
import { verbs } from '../data/verbs'
import { formsToWrite, groupOf, isCorrect, makeQuestions, regularize, retryOf, isWrittenCorrect, type Question } from './quiz'

const find = (v1: string) => verbs.find((v) => v.v1 === v1)!

describe('isCorrect', () => {
  it('ignores case and spaces', () => {
    expect(isCorrect('  Bought ', 'bought')).toBe(true)
  })

  it('accepts any of several forms', () => {
    expect(isCorrect('was', 'was/were')).toBe(true)
    expect(isCorrect('were', 'was/were')).toBe(true)
    expect(isCorrect('was/were', 'was/were')).toBe(true)
    expect(isCorrect('learned', 'learnt/learned')).toBe(true)
  })

  it('rejects wrong and empty answers', () => {
    expect(isCorrect('buyed', 'bought')).toBe(false)
    expect(isCorrect('', 'bought')).toBe(false)
    expect(isCorrect('was/been', 'was/were')).toBe(false)
  })
})

describe('groupOf', () => {
  it('classifies verbs', () => {
    expect(groupOf(find('cut'))).toBe('AAA')
    expect(groupOf(find('buy'))).toBe('ABB')
    expect(groupOf(find('come'))).toBe('ABA')
    expect(groupOf(find('go'))).toBe('ABC')
  })
})

describe('regularize', () => {
  it('builds the typical learner mistake', () => {
    expect(regularize('buy')).toBe('buyed')
    expect(regularize('fly')).toBe('flied')
    expect(regularize('write')).toBe('writed')
  })
})

describe('makeQuestions', () => {
  it('gives 4 distinct options with exactly one correct answer', () => {
    for (const q of makeQuestions(verbs, 'choice', verbs.length, verbs)) {
      expect(q.options).toHaveLength(4)
      expect(new Set(q.options).size).toBe(4)
      expect(q.options.filter((o) => isCorrect(o, q.verb[q.asked]))).toHaveLength(1)
    }
  })

  it('translate questions contain the right verb', () => {
    for (const q of makeQuestions(verbs, 'translate', 20, verbs)) {
      expect(q.options).toContain(q.verb.v1)
      expect(q.options).toHaveLength(4)
    }
  })

  it('never offers two verbs with the same meaning', () => {
    const take = find('take')
    for (let i = 0; i < 50; i++) {
      const [q] = makeQuestions([take], 'translate', 1, verbs)
      expect(q.options).not.toContain('get')
    }
  })

  it('has no duplicate verbs in the data', () => {
    expect(new Set(verbs.map((v) => v.v1)).size).toBe(verbs.length)
  })
})

describe('retryOf', () => {
  it('marks the question as a retry and reorders its options', () => {
    for (const q of makeQuestions(verbs, 'choice', 30, verbs)) {
      const r = retryOf(q)
      expect(r.retry).toBe(true)
      expect(r.verb).toBe(q.verb)
      expect([...r.options].sort()).toEqual([...q.options].sort())
      expect(r.options).not.toEqual(q.options)
    }
  })

  it('leaves write questions without options alone', () => {
    const [q] = makeQuestions(verbs, 'write', 1, verbs)
    expect(retryOf(q).options).toEqual([])
  })
})

describe('"two" mode', () => {
  const ask = (v1: string, given: Question['given']): Question => ({
    verb: find(v1),
    mode: 'two',
    asked: 'v2',
    given,
    options: [],
  })

  it('shows V2 or V3 at random (never V1) and asks for the other two', () => {
    const shown = new Set<string>()
    for (const q of makeQuestions(verbs, 'two', verbs.length, verbs)) {
      shown.add(q.given)
      expect(formsToWrite(q)).toHaveLength(2)
      expect(formsToWrite(q)).not.toContain(q.given)
    }
    expect([...shown].sort()).toEqual(['v2', 'v3'])
  })

  it('always shows V1 in the classic write mode', () => {
    for (const q of makeQuestions(verbs, 'write', 20, verbs)) expect(q.given).toBe('v1')
  })

  it('accepts only the right pair of forms', () => {
    const q = ask('go', 'v2')
    expect(isWrittenCorrect(q, { v1: 'go', v3: 'gone' })).toBe(true)
    expect(isWrittenCorrect(q, { v1: ' Go ', v3: 'GONE' })).toBe(true)
    expect(isWrittenCorrect(q, { v1: 'go', v3: 'went' })).toBe(false)
    expect(isWrittenCorrect(q, { v1: 'go' })).toBe(false)
  })

  it('checks the forms of the asked verb even when the shown word is shared ("lay")', () => {
    expect(isWrittenCorrect(ask('lie', 'v2'), { v1: 'lie', v3: 'lain' })).toBe(true)
    expect(isWrittenCorrect(ask('lay', 'v1'), { v2: 'laid', v3: 'laid' })).toBe(true)
    expect(isWrittenCorrect(ask('lay', 'v1'), { v2: 'lay', v3: 'lain' })).toBe(false)
  })

  it('accepts any spelling variant of the written forms', () => {
    expect(isWrittenCorrect(ask('be', 'v3'), { v1: 'be', v2: 'were' })).toBe(true)
    expect(isWrittenCorrect(ask('learn', 'v1'), { v2: 'learned', v3: 'learnt' })).toBe(true)
  })
})
