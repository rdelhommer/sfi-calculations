import { FungalColor } from "../../../src/util/enums";
import { FungalField } from "../../../src/models/field/fungal-field.model";
import { FIELD_NUM_RAW_DATA } from "../../../src/util/field-model";
import { DataType } from "../../../src/models/organism/organism.model";

describe('Models', () => {
  describe('Fungal Field', () => {
    describe('constructor', () => {
      test('should have the correct initial length raw data', () => {
        let test = new FungalField()
  
        expect(test.lengthRawData.length).toEqual(FIELD_NUM_RAW_DATA)
        expect(test.lengthRawData.every(x => x === null)).toBe(true)
      })

      test('should have the correct initial diameter raw data', () => {
        let test = new FungalField()
  
        expect(test.diameterRawData.length).toEqual(FIELD_NUM_RAW_DATA)
        expect(test.diameterRawData.every(x => x === null)).toBe(true)
      })

      test('should use the init object properties', () => {
        let test = new FungalField({
          lengthRawData: [
            11,2,3,4,5,6,7,8,9,0
          ],
          diameterRawData: [
            1,2,3,4,5,6,7,8,9,0
          ],
          color: FungalColor.C
        })

        expect(test.lengthRawData).toEqual([11,2,3,4,5,6,7,8,9,0])
        expect(test.diameterRawData).toEqual([1,2,3,4,5,6,7,8,9,0])
        expect(test.color).toEqual(FungalColor.C)
      })
    })

    describe('dataType', () => {
      test('should return Diameter', () => {
        let test = new FungalField()

        expect(test.dataType).toBe(DataType.Diameter)
      })
    })

    describe('isValid', () => {
      test('happy', () => {
        let test = new FungalField({
          lengthRawData: [
            1
          ],
          diameterRawData: [
            1
          ],
          color: FungalColor.C
        })

        expect(test.isValid).toBe(true)
      })

      test('should not be valid if there is no valid length raw data entry', () => {
        let test = new FungalField({
          lengthRawData: [],
          diameterRawData: [
            1
          ],
          color: FungalColor.C
        })

        expect(test.isValid).toBe(false)

        test.lengthRawData[0] = 1
        expect(test.isValid).toBe(true)

        test.lengthRawData[0] = <any>'blah'
        expect(test.isValid).toBe(false)
      })

      test('should not be valid if there is no valid diameter raw data entry', () => {
        let test = new FungalField({
          lengthRawData: [1],
          diameterRawData: [],
          color: FungalColor.C
        })
        
        expect(test.isValid).toBe(false)

        test.diameterRawData[0] = 1
        expect(test.isValid).toBe(true)

        test.diameterRawData[0] = <any>'blah'
        expect(test.isValid).toBe(false)
      })

      test('should not be valid if there is no color', () => {
        let test = new FungalField({
          lengthRawData: [1],
          diameterRawData: [1],
        })
        
        expect(test.isValid).toBe(false)

        test.color = FungalColor.C
        expect(test.isValid).toBe(true)
      })
    })

    describe('totalLength', () => {
      test('should ignore non-number raw data', () => {
        let test = new FungalField()
        test.lengthRawData = [<any>'blah', 1, 2, null, null]

        expect(test.totalLength).toBe(3)
      })

      test('should correctly calculate when all raw data is valid', () => {
        let test = new FungalField()
        test.lengthRawData = [1, 2, 3, 4]

        expect(test.totalLength).toBe(10)
      })

      test('should return null for empty array', () => {
        let test = new FungalField()
        test.lengthRawData = []

        expect(test.totalLength).toBe(null)
      })
    })

    describe('averageDiameter', () => {
      test('should ignore non-number raw data', () => {
        let test = new FungalField()
        test.lengthRawData = [2]
        test.diameterRawData = [<any>'blah', 2, 2, null, null]

        expect(test.averageDiameter).toBe(2)
      })

      test('should correctly calculate when all raw data is valid', () => {
        let test = new FungalField()
        test.lengthRawData = [2]
        test.diameterRawData = [1, 2, 3, 4]

        expect(test.averageDiameter).toBe(5)
      })

      test('should return null for empty array', () => {
        let test = new FungalField()
        test.diameterRawData = []

        expect(test.averageDiameter).toBe(null)
      })
    })

    describe('totalVolume', () => {
      test('should ignore non-number raw data', () => {
        let test = new FungalField()
        test.lengthRawData = [2, 2, 3, null, 5]
        test.diameterRawData = [<any>'blah', 2, 2, null, -1]

        expect(test.totalVolume).toBe(10)
      })

      test('happy', () => {
        let test = new FungalField()
        test.lengthRawData = [2, 3, 4, 5]
        test.diameterRawData = [1, 2, 3, 4]

        expect(test.totalVolume).toBe(40)
      })

      test('should return null for empty array', () => {
        let test = new FungalField()
        test.lengthRawData = []
        test.diameterRawData = []

        expect(test.totalVolume).toBe(null)
      })
    })
  })
})

