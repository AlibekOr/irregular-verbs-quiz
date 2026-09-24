import { describe, expect, it } from 'vitest'
import { verbs } from '../data/verbs'
import { groupOf, isCorrect, makeQuestions, regularize } from './quiz'

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
