import { MultiReadLengthOrganism } from "../../../src/models/organism/multi-read-length-organism.model";
import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
import { LengthReading, ILengthReading } from "../../../src/models/reading/length-reading.model";
import { ISampleInfoModel, SampleInfo } from "../../../src/models/sample.model";
import { CoverageMap } from "istanbul-lib-coverage";
import { CoverslipSize } from "../../../src/util/enums";

describe('Models', () => {
  let sampleData: () => ILengthReading[] = () => {
    return [{
      totalLength: 0.3,
      fields: [{ lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }],
      addField: null,
      tryRemoveField: null
    }, {
      totalLength: 0.25,
      fields: [{ lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }],
      addField: null,
      tryRemoveField: null
    }, {
      totalLength: 0.1,
      fields: [{ lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }],
      addField: null,
      tryRemoveField: null
    }, {
      totalLength: 0.7,
      fields: [{ lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }],
      addField: null,
      tryRemoveField: null
    }, {
      totalLength: 0.25,
      fields: [{ lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }, { lengthRawData: [] }],
      addField: null,
      tryRemoveField: null
    }]
  }

  let validReading: ILengthReading = {
    isValid: true,
    fields: [],
    addField: null,
    tryRemoveField: null
  }

  let invalidReading: ILengthReading = {
    isValid: false,
    fields: [],
    addField: null,
    tryRemoveField: null
  }

  let sample: ISampleInfoModel = new SampleInfo({
    bacteriaDilution: 300,
    mainDilution: 5,
    dropsPerSample: 1,
    coverslipSize: CoverslipSize.EighteenSquare,
    dropsPerMl: 20,
    eyepieceFieldSize: 18
  })

  describe('Length Organism', () => {
    describe('constructor', () => {
      test('should init dilution', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.dilution).toEqual(sample.mainDilution)
      })

      test('should throw if no dilution', () => {
        expect(() => { 
          new MultiReadLengthOrganism(sample) 
        }).toThrow()
      })

      test('should throw if no sample', () => {
        expect(() => {
          new MultiReadLengthOrganism(null, {
            dilution: sample.mainDilution
          })
        }).toThrow()
      })

      test('should init default readings', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.readings.length).toEqual(5)
      })

      test('should init existing readings', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
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
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.readings.every(x => x.constructor === LengthReading)).toEqual(true)
      })

      test('should have correct data type', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.dataType).toEqual(DataType.Length)
      })
      
      test('should have correct name', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.organismName).toEqual('Actinobacteria')
      })
    })

    describe('isValid', () => {
      test('should be true if all readings are valid', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
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
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
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
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        test.readings = sampleData()

        expect(test.meanResult).toEqual(1.06)
      })

      test('should ignore invalid field data', () => {

        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        test.readings = sampleData()
        test.readings[0].totalLength = null
        test.readings[1].totalLength = null

        expect(test.meanResult).toEqual(1.16)
      })

      test('should return null for no data', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        expect(test.meanResult).toEqual(null)
      })
    })

    describe('stDevResult', () => {
      test('happy', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        test.readings = sampleData()

        expect(test.stDevResult).toEqual(0.75)
      })

      test('should ignore invalid field data', () => {
        let test = new MultiReadLengthOrganism(sample, {
          dilution: sample.mainDilution,
        })

        test.readings = sampleData()
        test.readings[0].totalLength = null
        test.readings[1].totalLength = null

        expect(test.stDevResult).toEqual(1.03)
      })
    })
  })
})
