import { MultiReadLengthOrganism } from "../../../src/models/organism/multi-read-length-organism.model";
import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
import { LengthReading } from "../../../src/models/reading/length-reading.model";

describe('Models', () => {
  describe('Length Organism', () => {
    describe('constructor', () => {
      test('should init dilution', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.dilution).toEqual(25)
      })

      test('should throw if no dilution', () => {
        expect(() => { 
          new MultiReadLengthOrganism({
            coverslipNumFields: 35
          }) 
        }).toThrow()

      test('should init coverslipNumFields', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.coverslipNumFields).toEqual(35)
      })

      test('should throw if no coverslipNumFields', () => {
        expect(() => {
          new MultiReadLengthOrganism({
            dilution: 25
          })
        }).toThrow()
      })

      test('should init default readings', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.readings.length).toEqual(5)
      })

      test('should init existing readings', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35,
          readings: [{
            fields: [{
              lengthRawData: [1, 2, 3]
            }, {
              lengthRawData: [4, 5, 6]
            }]
          }, {
            fields: [{
              lengthRawData: [7, 8, 9]
            }, {
              lengthRawData: [10, 11, 12]
            }]
          }]
        })

        expect(test.readings.length).toEqual(NUM_READINGS)
        expect(test.readings[0].fields[0].lengthRawData.slice(0, 3)).toEqual([1,2,3])
        expect(test.readings[0].fields[1].lengthRawData.slice(0, 3)).toEqual([4,5,6])
        expect(test.readings[1].fields[0].lengthRawData.slice(0, 3)).toEqual([7,8,9])
        expect(test.readings[1].fields[1].lengthRawData.slice(0, 3)).toEqual([10,11,12])
      })

      test('should init readings with correct class type', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.readings.every(x => x.constructor === LengthReading)).toEqual(true)
      })

      test('should have correct data type', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.dataType).toEqual(DataType.Length)
      })
      
      test('should have correct name', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        expect(test.organismName).toEqual('Actinobacteria')
      })
    })

    describe('isValid', () => {
      test('should be true if all readings are valid', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35,
        })

        test.readings = [{
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }]

        expect(test.isValid).toBe(true)
      })

      test('should be false if a reading is not valid', () => {
        let test = new MultiReadLengthOrganism({
          dilution: 25,
          coverslipNumFields: 35
        })

        test.readings = [{
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: true,
          fields: []
        }, {
          isValid: false,
          fields: []
        }]

        expect(test.isValid).toBe(false)
      })
    })

    describe('meanResult', () => {
      test('happy', () => {

      })

      test('should ignore invalid field data', () => {
        
      })
    })

    describe('stDevResult', () => {
      test('happy', () => {

      })

      test('should ignore invalid field data', () => {
        
      })
    })
  })
})

