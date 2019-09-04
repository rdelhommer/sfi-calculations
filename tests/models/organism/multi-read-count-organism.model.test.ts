import { MultiReadCountOrganism } from "../../../src/models/organism/multi-read-count-organism.model";
import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
import { CountReading, ICountReading } from "../../../src/models/reading/count-reading.model";
import { ISampleInfoModel, SampleInfo } from "../../../src/models/sample.model";
import { CoverslipSize } from "../../../src/util/enums";

describe('Models', () => {
  describe('Count Organism', () => {
    let placeholderField = {
      count: null 
    }
  
    let placeholders = {
      dataType: null,
      isValid: null,
      addField: null,
      tryRemoveField: null,
      fields: [Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField)]
    }
  
    let sampleData: () => ICountReading[] = () => {
      return [{
        totalCount: 6,
        ...placeholders
      }, {
        totalCount: 0,
        ...placeholders
      }, {
        totalCount: 4,
        ...placeholders
      }, {
        totalCount: 1,
        ...placeholders
      }, {
        totalCount: 4,
        ...placeholders
      }]
    }

    let sample: ISampleInfoModel = new SampleInfo({
      bacteriaDilution: 300,
      mainDilution: 5,
      dropsPerSample: 1,
      coverslipSize: CoverslipSize.EighteenSquare,
      dropsPerMl: 20,
      eyepieceFieldSize: 18
    })

    let validReading: ICountReading = {
      isValid: true,
      fields: [],
      addField: null,
      tryRemoveField: null
    }

    let invalidReading: ICountReading = {
      isValid: false,
      fields: [],
      addField: null,
      tryRemoveField: null
    }
  
    describe('constructor', () => {
      test('should init organismName', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.organismName).toEqual('test')
      })

      test('should throw if no organismName', () => {
        expect(() => {
          new MultiReadCountOrganism(sample, {
            dilution: 25,
          })
        }).toThrow()
      })

      test('should init dilution', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dilution).toEqual(25)
      })

      test('should throw if no dilution', () => {
        expect(() => { 
          new MultiReadCountOrganism(sample, {
            organismName: 'test'
          }) 
        }).toThrow()
      })

      test('should init default readings', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(NUM_READINGS)
      })

      test('should init existing readings', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          readings: [{
            fields: [{
              count: 1
            }, {
              count: 2
            }]
          }, {
            fields: [{
              count: 3
            }, {
              count: 4
            }]
          }],
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(NUM_READINGS)
        expect(test.readings[0].fields[0].count).toEqual(1)
        expect(test.readings[0].fields[1].count).toEqual(2)
        expect(test.readings[1].fields[0].count).toEqual(3)
        expect(test.readings[1].fields[1].count).toEqual(4)
      })

      test('should init readings with correct class type', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.every(x => x.constructor === CountReading)).toEqual(true)
      })

      test('should have correct data type', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dataType).toEqual(DataType.Counting)
      })
    })

    describe('isValid', () => {
      test('should be true if all readings are valid', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        test.readings = [
          validReading,
          validReading,
          validReading,
          validReading,
          validReading
        ]

        expect(test.isValid).toBe(true)
      })

      test('should be false if a reading is not valid', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        test.readings = [
          validReading,
          validReading,
          validReading,
          validReading,
          invalidReading
        ]

        expect(test.isValid).toBe(false)
      })
    })

    describe('meanResult', () => {
      test('happy', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()

        expect(test.meanResult).toBe(122220)
      })

      test('should ignore invalid field data', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()
        test.readings[0].totalCount = null
        test.readings[1].totalCount = null
        test.readings[2].totalCount = null

        expect(test.meanResult).toBe(101850)
      })

      test('should return null for no data', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        expect(test.meanResult).toBe(null)
      })
    })

    describe('stDevResult', () => {
      test('happy', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()

        expect(test.stDevResult).toBe(99792)
      })

      test('should ignore invalid field data', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()
        test.readings[0].totalCount = null
        test.readings[1].totalCount = null
        test.readings[2].totalCount = null

        expect(test.stDevResult).toBe(86423)
      })

      test('should return null for no data', () => {
        let test = new MultiReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        expect(test.stDevResult).toBe(null)     
      })
    })
  })
})
