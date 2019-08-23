import { LengthField, NUM_RAW_DATA, FungalField } from "../../src/models/field.model";
import { FungalColor } from "../../src/util/enums";

describe('Models', () => {
  describe('Length Field Model', () => {
    describe('constructor', () => {
      test('should have the correct initial length raw data', () => {
        let test = new LengthField()
  
        expect(test.lengthRawData.length).toEqual(NUM_RAW_DATA)
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

  describe('Fungal Field Model', () => {
    describe('constructor', () => {
      test('should have the correct initial length raw data', () => {
        let test = new FungalField()
  
        expect(test.lengthRawData.length).toEqual(NUM_RAW_DATA)
        expect(test.lengthRawData.every(x => x === null)).toBe(true)
      })

      test('should have the correct initial diameter raw data', () => {
        let test = new FungalField()
  
        expect(test.diameterRawData.length).toEqual(NUM_RAW_DATA)
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
    })
  })
})

