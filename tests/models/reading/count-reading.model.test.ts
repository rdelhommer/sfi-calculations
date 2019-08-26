import { CountReading, ICountReading } from "../../../src/models/reading/count-reading.model";
import { CountField } from "../../../src/models/field/count-field.model";
import { READING_NUM_MIN_FIELDS } from "../../../src/util/reading-model";

describe('Models', () => {
  describe('Count Reading', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new CountReading();

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields.every(x => x.constructor === CountField)).toBe(true)
      })

      test('should initialize the fields property with init', () => {
        let init: Partial<ICountReading> = {
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
        let init: Partial<ICountReading> = {
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
  })
})

