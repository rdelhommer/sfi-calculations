import { LengthReading, ILengthReading } from "../../../src/models/reading/length-reading.model";
import { READING_NUM_MIN_FIELDS } from "../../../src/util/reading-model";
import { LengthField } from "../../../src/models/field/length-field.model";
import { DataType } from "../../../src/models/organism/organism.model";

describe('Models', () => {
  describe('Length Reading', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new LengthReading();

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields.every(x => x.constructor === LengthField)).toBe(true)
      })

      test('should initialize the fields property with init', () => {
        let init: Partial<ILengthReading> = {
          fields: [{
            lengthRawData: [1, 2, 3]
          }, {
            lengthRawData: [4, 5, 6]
          }, {
            lengthRawData: [7, 8, 9]
          }]
        }

        let test = new LengthReading(init);

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
      })

      test('should initialize the fields property when higher than min', () => {
        let init: Partial<ILengthReading> = {
          fields: [{
            lengthRawData: [1, 2, 3]
          }, {
            lengthRawData: [4, 5, 6]
          }, {
            lengthRawData: [7, 8, 9]
          }, {
            lengthRawData: [7, 8, 9]
          }, {
            lengthRawData: [7, 8, 9]
          }, {
            lengthRawData: [7, 8, 9]
          }, {
            lengthRawData: [7, 8, 9]
          }]
        }

        let test = new LengthReading(init);

        expect(test.fields.length).toEqual(7)
        expect(test.fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
      })
    })

    describe('dataType', () => {
      test('should return Length', () => {
        let test = new LengthReading()

        expect(test.dataType).toBe(DataType.Length)
      })
    })

    describe('isValid', () => {
      test('all fields are valid', () => {
        let test = new LengthReading();
        test.fields = [{
          isValid: true,
          lengthRawData: []
        }]

        expect(test.isValid).toEqual(true)
      })

      test('some fields are invalid', () => {
        let test = new LengthReading();

        test.fields = [{
          isValid: true,
          lengthRawData: []
        }, {
          isValid: false,
          lengthRawData: []
        }]

        expect(test.isValid).toEqual(false)
      })
    })
  })
})

