import { CountReading, ICountReading } from "../../../src/models/reading/count-reading.model";
import { CountField } from "../../../src/models/field/count-field.model";
import { READING_NUM_MIN_FIELDS } from "../../../src/util/reading-model";
import { DataType } from "../../../src/models/organism/organism.model";

describe('Models', () => {
  describe('Count Reading', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new CountReading();

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields.every(x => x.constructor === CountField)).toBe(true)
      })

      test('should initialize the fields property with init', () => {
        let init: RecursivePartial<ICountReading> = {
          fields: [{
            count: 1
          }, {
            count: 2
          }, {
            count: 3
          }]
        }

        let test = new CountReading(init);

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields[1].count).toEqual(2)
      })

      test('should initialize the fields property when higher than min', () => {
        let init: RecursivePartial<ICountReading> = {
          fields: [{
            count: 1
          }, {
            count: 2
          }, {
            count: 3
          }, {
            count: 1
          }, {
            count: 2
          }, {
            count: 3
          }, {
            count: 1
          }, {
            count: 2
          }, {
            count: 3
          }]
        }

        let test = new CountReading(init);

        expect(test.fields.length).toEqual(9)
        expect(test.fields[1].count).toEqual(2)
      })
    })

    describe('dataType', () => {
      test('should return Counting', () => {
        let test = new CountReading()

        expect(test.dataType).toBe(DataType.Counting)
      })
    })

    describe('isValid', () => {
      test('all fields are valid', () => {
        let test = new CountReading();
        test.fields = [{
          isValid: true,
          count: 1
        }]

        expect(test.isValid).toEqual(true)
      })

      test('some fields are invalid', () => {
        let test = new CountReading();

        test.fields = [{
          isValid: true,
          count: 1
        }, {
          isValid: false,
          count: 1
        }]

        expect(test.isValid).toEqual(false)
      })
    })

    describe('totalCount', () => {
      test('should return null for no field data', () => {
        let test = new CountReading()
        test.fields = []

        expect(test.totalCount).toBe(null)
      })

      test('should return the totalCount', () => {
        let test = new CountReading();
        test.fields = <any>[{
          totalCount: 5
        }, {
          totalCount: null
        }, {
          totalCount: 10
        }, {
          totalCount: 7
        }]

        expect(test.totalCount).toBe(22);
      })
    })
  })
})

