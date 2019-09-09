import { SingleReadCountOrganism } from "../../../src/models/organism/single-read-count-organism.model";
import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
import { CountReading, ICountReading } from "../../../src/models/reading/count-reading.model";
import { ISampleInfoModel, SampleInfo } from "../../../src/models/sample.model";
import { CoverslipSize } from "../../../src/util/enums";

describe('Models', () => {
  describe('Single Read Count Organism', () => {
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
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.organismName).toEqual('test')
      })

      test('should throw if no organismName', () => {
        expect(() => {
          new SingleReadCountOrganism(sample, {
            dilution: 25,
          })
        }).toThrow()
      })

      test('should init dilution', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dilution).toEqual(25)
      })

      test('should throw if no dilution', () => {
        expect(() => { 
          new SingleReadCountOrganism(sample, {
            organismName: 'test'
          }) 
        }).toThrow()
      })

      test('should init default readings', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(1)
      })

      test('should init existing readings', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          readings: [{
            fields: [{
              count: 1
            }]
          }],
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(1)
        expect(test.readings[0].fields[0].count).toEqual(1)
      })

      test('should init reading fields', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings[0].fields.length).toEqual(1)
      })

      test('should init readings with correct class type', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.every(x => x.constructor === CountReading)).toEqual(true)
      })

      test('should have correct data type', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dataType).toEqual(DataType.Counting)
      })
    })

    describe('isValid', () => {
      test('should be true if all readings are valid', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        test.readings = [
          validReading,
        ]

        expect(test.isValid).toBe(true)
      })

      test('should be false if a reading is not valid', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        test.readings = [
          invalidReading
        ]

        expect(test.isValid).toBe(false)
      })
    })

    describe('meanResult', () => {
      test('happy', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()

        expect(test.meanResult).toBe(600)
      })

      test('should return null for no data', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        expect(test.meanResult).toBe(null)
      })
    })

    describe('stDevResult', () => {
      test('should be null', () => {
        let test = new SingleReadCountOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        })

        test.readings = sampleData()

        expect(test.stDevResult).toBe(null)
      })
    })
  })
})
