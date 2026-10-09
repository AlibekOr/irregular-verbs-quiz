import { describe, expect, it } from 'vitest'
import { isLearned, isWeak, parseProgress, record } from './progress'

describe('parseProgress', () => {
  it('returns empty progress for missing or broken data', () => {
    for (const raw of [null, '', 'not json', 'null', '42', '"text"', '[]', '[{"right":1}]']) {
      expect(parseProgress(raw)).toEqual({})
    }
  })

  it('keeps valid entries and drops invalid ones', () => {
    const raw = JSON.stringify({
      buy: { right: 2, wrong: 1 },
      go: null,
      be: { right: '3', wrong: 0 },
      cut: { right: -1, wrong: 0 },
      see: { right: 1.5, wrong: 0 },
      take: { right: 0 },
    })
    expect(parseProgress(raw)).toEqual({ buy: { right: 2, wrong: 1 } })
  })
})

describe('record', () => {
  it('counts answers without mutating the input', () => {
    const p = {}
    const next = record(record(p, 'buy', true), 'buy', false)
    expect(next).toEqual({ buy: { right: 1, wrong: 1 } })
    expect(p).toEqual({})
  })
})

describe('isLearned / isWeak', () => {
  it('needs two right answers and more right than wrong', () => {
    expect(isLearned({ right: 1, wrong: 0 })).toBe(false)
    expect(isLearned({ right: 2, wrong: 2 })).toBe(false)
    expect(isLearned({ right: 2, wrong: 1 })).toBe(true)
    expect(isWeak({ right: 1, wrong: 1 })).toBe(true)
    expect(isWeak({ right: 2, wrong: 1 })).toBe(false)
    expect(isWeak(undefined)).toBe(false)
  })
})
