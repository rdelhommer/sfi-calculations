import { MultiReadFungalOrganism } from "../../../src/models/organism/multi-read-fungal-organism.model";
import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
import { FungalReading, IFungalReading } from "../../../src/models/reading/fungal-reading.model";
import { FungalColor, CoverslipSize } from "../../../src/util/enums";
import { ISampleInfoModel, SampleInfo } from "../../../src/models/sample.model";

describe('Models', () => {

  let placeholderField = {
    lengthRawData: [], 
    color: null, 
    diameterRawData: []
  }

  let placeholders = {
    dataType: null,
    isValid: null,
    addField: null,
    tryRemoveField: null,
    fields: [Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField), Object.assign({}, placeholderField)]
  }

  let sampleData: () => IFungalReading[] = () => {
    return [{
      totalLength: 0.5,
      averageDiameter: 3,
      totalVolume: 0.5 * 3,
      ...placeholders
    }, {
      totalLength: 0.3,
      averageDiameter: 2,
      totalVolume: 0.3 * 2,
      ...placeholders
    }, {
      totalLength: 0.05,
      averageDiameter: 3.5,
      totalVolume: 0.05 * 3.5,
      ...placeholders
    }, {
      totalLength: 0.1,
      averageDiameter: 3,
      totalVolume: 0.1 * 3,
      ...placeholders
    }, {
      totalLength: 0.7,
      averageDiameter: 2.5,
      totalVolume: 0.7 * 2.5,
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

  let validReading: IFungalReading = {
    isValid: true,
    fields: [],
    addField: null,
    tryRemoveField: null
  }

  let invalidReading: IFungalReading = {
    isValid: false,
    fields: [],
    addField: null,
    tryRemoveField: null
  }

  describe('Fungal Organism', () => {
    describe('constructor', () => {
      test('should init organismName', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.organismName).toEqual('test')
      })

      test('should throw if no organismName', () => {
        expect(() => {
          new MultiReadFungalOrganism(sample, {
            dilution: 25,
          })
        }).toThrow()
      })

      test('should init dilution', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dilution).toEqual(25)
      })

      test('should throw if no dilution', () => {
        expect(() => {
          new MultiReadFungalOrganism(sample, {
            organismName: 'test'
          })
        }).toThrow()
      })

      test('should init default readings', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(5)
      })

      test('should init existing readings', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          readings: [{
            fields: [{
              lengthRawData: [1, 2, 3],
              diameterRawData: [1, 2, 3],
              color: FungalColor.C
            }, {
              lengthRawData: [4, 5, 6],
              diameterRawData: [4, 5, 6],
              color: FungalColor.C
            }]
          }, {
            fields: [{
              lengthRawData: [7, 8, 9],
              diameterRawData: [7, 8, 9],
              color: FungalColor.C
            }, {
              lengthRawData: [10, 11, 12],
              diameterRawData: [10, 11, 12],
              color: FungalColor.C
            }]
          }],
          organismName: 'test'
        })

        expect(test.readings.length).toEqual(NUM_READINGS)
        expect(test.readings[0].fields[0].diameterRawData.slice(0, 3)).toEqual([1,2,3])
        expect(test.readings[0].fields[1].diameterRawData.slice(0, 3)).toEqual([4,5,6])
        expect(test.readings[1].fields[0].diameterRawData.slice(0, 3)).toEqual([7,8,9])
        expect(test.readings[1].fields[1].diameterRawData.slice(0, 3)).toEqual([10,11,12])
      })

      test('should init readings with correct class type', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.readings.every(x => x.constructor === FungalReading)).toEqual(true)
      })

      test('should have correct data type', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 25,
          organismName: 'test'
        })

        expect(test.dataType).toEqual(DataType.Diameter)
      })
    })

    describe('isValid', () => {
      test('should be true if all readings are valid', () => {
        let test = new MultiReadFungalOrganism(sample, {
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
        let test = new MultiReadFungalOrganism(sample, {
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
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });
        test.readings = sampleData()

        expect(test.meanResult).toBe(108)
      })

      test('should ignore invalid field data', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });
        test.readings = sampleData()
        test.readings[0].totalLength = null
        test.readings[0].averageDiameter = null
        test.readings[0].totalVolume = null
        test.readings[1].totalLength = null
        test.readings[1].averageDiameter = null
        test.readings[1].totalVolume = null

        expect(test.meanResult).toBe(92)
      })

      test('should return null for no data', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });

        expect(test.meanResult).toBe(null)
      })
    })

    describe('stDevResult', () => {
      test('happy', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });
        test.readings = sampleData()

        expect(test.stDevResult).toBe(89)
      })

      test('should ignore invalid field data', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });
        test.readings = sampleData()
        test.readings[0].totalLength = null
        test.readings[0].averageDiameter = null
        test.readings[0].totalVolume = null
        test.readings[1].totalLength = null
        test.readings[1].averageDiameter = null
        test.readings[1].totalVolume = null

        expect(test.stDevResult).toBe(118)
      })

      test('should return null for no data', () => {
        let test = new MultiReadFungalOrganism(sample, {
          dilution: 5,
          organismName: 'test'
        });

        expect(test.stDevResult).toBe(null)
      })
    })
  })
})

