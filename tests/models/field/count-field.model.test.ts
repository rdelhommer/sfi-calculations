import { CountField } from "../../../src/models/field/count-field.model";

describe('Models', () => {
  describe('Count Field', () => {
    describe('constructor', () => {
      test('should default count to undefined', () => {
        let test = new CountField()

        expect(test.count).toEqual(undefined)
      })

      test('should use the init object properties', () => {
        let test = new CountField({
          count: 5
        })

        expect(test.count).toEqual(5)
      })
    })

    describe('isValid', () => {
      test('should be true if count is a number', () => {
        let test = new CountField({
          count: 0
        })

        expect(test.isValid).toBe(true)
      })

      test('should be false if count is not a umber', () => {
        let test = new CountField()

        expect(test.isValid).toBe(false)
      })
    })
  })
})

