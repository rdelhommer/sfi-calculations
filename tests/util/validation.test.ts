import 'aurelia-polyfills'

import { isNumberArray, CustomRule, initCustomRules, isNumber } from '../../src/util/validation'
import { ValidationRules } from 'aurelia-validation'

describe('Util', () => {
  describe('validation', () => {
    describe('isNumberArray', () => {
      test('should register the rule', () => {
        spyOn(ValidationRules, 'customRule')
        initCustomRules()

        expect(ValidationRules.customRule).toHaveBeenCalledWith(CustomRule.IsNumberArray, isNumberArray, 'Values can only be numbers.')
      })

      test('happy', () => {
        let test = [
          1, 2, 3, 4, 1.1, 2.2, 0.1, null, undefined, -10, 0
        ]

        expect(isNumberArray(test)).toBe(true)
      })

      test('should pass empty array', () => {
        let test = []

        expect(isNumberArray(test)).toBe(true)
      })

      test('should fail array with NaN element', () => {
        let test = [
          '1.1.1'
        ]

        expect(isNumberArray(<any>test)).toBe(false)
      })

      test('should fail array with only null elements', () => {
        let test = [
          null,
          null
        ]

        expect(isNumberArray(<any>test)).toBe(false)
      })

      test('should fail array with only empty string elements', () => {
        let test = [
          '',
          ''
        ]

        expect(isNumberArray(<any>test)).toBe(false)
      })
    })

    describe('isNumber', () => {
      test('should register the rule', () => {
        spyOn(ValidationRules, 'customRule')
        initCustomRules()

        expect(ValidationRules.customRule).toHaveBeenCalledWith(CustomRule.IsNumber, isNumber, '${$displayName} must be a number.')
      })

      test('happy integer', () => {
        let test = 1

        expect(isNumber(test)).toBe(true)
      })

      test('happy float', () => {
        let test = 1.1

        expect(isNumber(test)).toBe(true)
      })

      test('happy 0', () => {
        let test = 0

        expect(isNumber(test)).toBe(true)
      })

      test('happy null', () => {
        let test = null

        expect(isNumber(test)).toBe(true)
      })

      test('happy undefined', () => {
        let test = undefined

        expect(isNumber(test)).toBe(true)
      })

      test('should fail NaN value', () => {
        let test = '1.1.1'

        expect(isNumber(test)).toBe(false)
      })
    })
  })
})