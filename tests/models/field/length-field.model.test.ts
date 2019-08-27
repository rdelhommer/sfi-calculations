import { LengthField } from "../../../src/models/field/length-field.model";
import { FIELD_NUM_RAW_DATA } from "../../../src/util/field-model";
import { DataType } from "../../../src/models/organism/organism.model";

describe('Models', () => {
  describe('Length Field', () => {
    describe('constructor', () => {
      test('should have the correct initial length raw data', () => {
        let test = new LengthField()
  
        expect(test.lengthRawData.length).toEqual(FIELD_NUM_RAW_DATA)
        expect(test.lengthRawData.every(x => x === null)).toBe(true)
      })

      test('should use the init object properties', () => {
        let test = new LengthField({
          lengthRawData: [
            1,2,3,4,5,6,7,8,9,0
          ]
        })

        expect(test.lengthRawData).toEqual([1,2,3,4,5,6,7,8,9,0])
      })
    })

    describe('dataType', () => {
      test('should return Length', () => {
        let test = new LengthField()

        expect(test.dataType).toBe(DataType.Length)
      })
    })

    describe('isValid', () => {
      test('should be valid if there is at least one raw data entry', () => {
        let test = new LengthField({
          lengthRawData: [
            1
          ]
        })

        expect(test.isValid).toBe(true)
      })

      test('should not be valid if there is no valid raw data entry', () => {
        let test = new LengthField()
        expect(test.isValid).toBe(false)

        let invalid = ['blah']
        test.lengthRawData = <any>invalid
        expect(test.isValid).toBe(false)
      })
    })

    describe('totalLength', () => {
      test('should ignore non-number raw data', () => {
        let test = new LengthField()
        test.lengthRawData = [<any>'blah', 1, 2, null, null]

        expect(test.totalLength).toBe(3)
      })

      test('should correctly calculate when all raw data is valid', () => {
        let test = new LengthField()
        test.lengthRawData = [1, 2, 3, 4]

        expect(test.totalLength).toBe(10)
      })
    })
  })
})

