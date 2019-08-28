import { FungalReading, IFungalReading } from "../../../src/models/reading/fungal-reading.model";
import { FungalField } from "../../../src/models/field/fungal-field.model";
import { FungalColor } from "../../../src/util/enums";
import { READING_NUM_MIN_FIELDS } from "../../../src/util/reading-model";
import { DataType } from "../../../src/models/organism/organism.model";

describe('Models', () => {
  describe('Fungal Reading', () => {
    describe('constructor', () => {
      test('should initialize the fields property with no init', () => {
        let test = new FungalReading();

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields.every(x => x.constructor === FungalField)).toBe(true)
      })

      test('should initialize the fields property with init', () => {
        let init: RecursivePartial<IFungalReading> = {
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

        expect(test.fields.length).toEqual(READING_NUM_MIN_FIELDS)
        expect(test.fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
      })

      test('should initialize the fields property when higher than min', () => {
        let init: RecursivePartial<IFungalReading> = {
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

    describe('dataType', () => {
      test('should return Diameter', () => {
        let test = new FungalField()

        expect(test.dataType).toBe(DataType.Diameter)
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

