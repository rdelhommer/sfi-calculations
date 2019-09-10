import { SuccessionRange } from "../../../src/models/succession/succession-range.model"
import { SuccessionRequirement } from "../../../src/models/succession/succession-requirement.model"

describe('Models', () => {
  describe('Succession Range', () => {
    describe('fromPartial', () => {
      test('should assign min', () => {
        expect(SuccessionRange.fromPartial({ min: 1000 }).min).toBe(1000)
      })

      test('should assign max', () => {
        expect(SuccessionRange.fromPartial({ max: 2000 }).max).toBe(2000)
      })
    })

    describe('isValid', () => {
      test('no min', () => {
        let test = SuccessionRange.fromPartial({
          max: 1
        })

        expect(test.isValid).toBe(true)
      })

      test('no max', () => {
        let test = SuccessionRange.fromPartial({
          min: 0,
        })

        expect(test.isValid).toBe(true)
      })
    })
  })
})