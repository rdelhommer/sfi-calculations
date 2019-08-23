import { LengthReading, NUM_MIN_FIELDS, ILengthReading, FungalReading, IFungalReading } from "../../src/models/reading.model";
import { LengthField, FungalField } from "../../src/models/field.model";
import { FungalColor } from "../../src/util/enums";

describe('Models', () => {
  describe('Length Reading Model', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new LengthReading();

        expect(test.fields.length).toEqual(NUM_MIN_FIELDS)
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

        expect(test.fields.length).toEqual(NUM_MIN_FIELDS)
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

  describe('Fungal Reading Model', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new FungalReading();

        expect(test.fields.length).toEqual(NUM_MIN_FIELDS)
        expect(test.fields.every(x => x.constructor === FungalField)).toBe(true)
      })

      test('should initialize the fields property with init', () => {
        let init: Partial<IFungalReading> = {
          fields: [{
            lengthRawData: [1, 2, 3],
            diameterRawData: [1, 2, 3],
            color: FungalColor.C
          }, {
            lengthRawData: [4, 5, 6],
            diameterRawData: [4, 5, 6],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }]
        }

        let test = new FungalReading(init);

        expect(test.fields.length).toEqual(NUM_MIN_FIELDS)
        expect(test.fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
      })

      test('should initialize the fields property when higher than min', () => {
        let init: Partial<IFungalReading> = {
          fields: [{
            lengthRawData: [1, 2, 3],
            diameterRawData: [1, 2, 3],
            color: FungalColor.C
          }, {
            lengthRawData: [4, 5, 6],
            diameterRawData: [4, 5, 6],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }, {
            lengthRawData: [7, 8, 9],
            diameterRawData: [7, 8, 9],
            color: FungalColor.C
          }]
        }

        let test = new FungalReading(init);

        expect(test.fields.length).toEqual(7)
        expect(test.fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
        expect(test.fields[1].diameterRawData.slice(0, 3)).toEqual([4,5,6])
        expect(test.fields[1].color).toEqual(FungalColor.C)
      })
    })

    describe('isValid', () => {
      test('all fields are valid', () => {
        let test = new FungalReading();
        test.fields = [{
          isValid: true,
          lengthRawData: [],
          diameterRawData: [],
          color: FungalColor.C
        }]

        expect(test.isValid).toEqual(true)
      })

      test('some fields are invalid', () => {
        let test = new FungalReading();

        test.fields = [{
          isValid: true,
          lengthRawData: [],
          diameterRawData: [],
          color: FungalColor.C
        }, {
          isValid: false,
          lengthRawData: [],
          diameterRawData: [],
          color: FungalColor.C
        }]

        expect(test.isValid).toEqual(false)
      })
    })
  })
})

