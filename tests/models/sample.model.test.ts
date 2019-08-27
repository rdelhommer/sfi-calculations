import { SampleInfo, Sample, ISampleInfoModel } from '../../src/models/sample.model'
import { round } from '../../src/util/misc'
import { CoverslipSize } from '../../src/util/enums';
import { Profile } from '../../src/models/profile.model';

describe('Models', () => {
  describe('Sample', () => {
    describe('constructor', () => {
      test('should initialize a default observer property', () => {
        let test = new Sample({ });

        expect(test.observer.constructor).toEqual(Profile)
      })

      test('should initialize observer', () => {
        let observer = new Profile({
          email: 'blah@blah.com',
          name: 'asdf test',
          organization: 'test org'
        })
        let test = new Sample({ 
          observer
        })

        expect(Object.keys(test.observer).every(k => test.observer[k] === observer[k])).toBe(true)
      })

      test('should initialize a default sample info property', () => {
        let test = new Sample({ });

        expect(test.sample.constructor).toEqual(SampleInfo)
      })

      test('should initialize sample info', () => {
        let sample: ISampleInfoModel = new SampleInfo({
          bacteriaDilution: 300,
          mainDilution: 5,
          dropsPerSample: 1,
          coverslipSize: CoverslipSize.EighteenSquare,
          dropsPerMl: 20,
          eyepieceFieldSize: 25
        })
        
        let test = new Sample({ 
          sample
        })

        expect(Object.keys(test.sample).every(k => test.sample[k] === sample[k])).toBe(true)
      })
    })

    describe('isValid', () => {
      test('valid if both observer and sample are valid', () => {
        let test = new Sample()
        test.observer.isValid = true
        test.sample.isValid = true

        expect(test.isValid).toBe(true)
      })

      test('invalid if observer is not valid', () => {
        let test = new Sample()
        test.observer.isValid = false
        test.sample.isValid = true

        expect(test.isValid).toBe(false)
      })

      test('invalid if sample is not valid', () => {
        let test = new Sample()
        test.observer.isValid = true
        test.sample.isValid = false

        expect(test.isValid).toBe(false)
      })
    })
  })

  describe('Sample Info', () => {
    describe('constructor', () => {
      test('correct main dilution default', () => {
        let test = new SampleInfo()

        expect(test.mainDilution).toEqual(5)
      })

      test('init existing main dilution', () => {
        let test = new SampleInfo({
          mainDilution: 0
        })

        expect(test.mainDilution).toEqual(0)
      })

      test('correct bacteria dilution default', () => {
        let test = new SampleInfo()

        expect(test.bacteriaDilution).toEqual(500)
      })

      test('init existing bacteria dilution', () => {
        let test = new SampleInfo({
          bacteriaDilution: 0
        })

        expect(test.bacteriaDilution).toEqual(0)
      })

      test('correct drops per sample default', () => {
        let test = new SampleInfo()

        expect(test.dropsPerSample).toEqual(1)
      })

      test('init existing drops per sample', () => {
        let test = new SampleInfo({
          dropsPerSample: 0
        })

        expect(test.dropsPerSample).toEqual(0)
      })

      test('correct drops per ml default', () => {
        let test = new SampleInfo()

        expect(test.dropsPerMl).toEqual(20)
      })

      test('init existing drops per ml', () => {
        let test = new SampleInfo({
          dropsPerMl: 0
        })

        expect(test.dropsPerMl).toEqual(0)
      })

      test('correct coverslip size default', () => {
        let test = new SampleInfo()

        expect(test.coverslipSize).toEqual(CoverslipSize.EighteenSquare)
      })

      test('init existing coverslip size', () => {
        let test = new SampleInfo({
          coverslipSize: CoverslipSize.TwentySquare
        })

        expect(test.coverslipSize).toEqual(CoverslipSize.TwentySquare)
      })

      test('correct eyepiece field size default', () => {
        let test = new SampleInfo()

        expect(test.eyepieceFieldSize).toEqual(18)
      })

      test('init existing eyepiece field size', () => {
        let test = new SampleInfo({
          eyepieceFieldSize: 0
        })

        expect(test.eyepieceFieldSize).toEqual(0)
      })
    })

    describe('coverslipNumFields', () => {
      test('calculation', () => {
        let test = new SampleInfo()

        expect(Number(round(test.coverslipNumFields, 1).toFixed(0))).toEqual(2037)
      })
    })

    describe('isValid', () => {
      // TODO: fuck this
    })
  })
})