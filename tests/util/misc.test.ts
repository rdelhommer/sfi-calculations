import '../../src/util/misc'

describe('Util', () => {
  describe('misc', () => {
    describe('mean', () => {
      test('should return null for empty array', () => {
        expect([].mean()).toBe(null)
      })
    })

    describe('stdev', () => {
      test('should return null for empty array', () => {
        expect([].stDev()).toBe(null)
      })
    })

    describe('sum', () => {
      test('should return null for empty array', () => {
        expect([].sum()).toBe(null)
      })

      test('should return sum', () => {
        expect([1, 2, 3, 4].sum()).toBe(10)
      })

      test('should ignore non-numbers', () => {
        expect([1, 2, 3, 'asdf', null, 5].sum()).toBe(11)
      })
    })
  })
})