import { SampleInfo, Sample, ISampleInfoModel } from '../../src/models/sample.model'
import { round } from '../../src/util/misc'
import { CoverslipSize, Succession } from '../../src/util/enums';
import { Profile } from '../../src/models/profile.model';

describe('Models', () => {
  describe('Sample', () => {
    describe('constructor', () => {
      test('should initialize a default observer property', () => {
        let test = new Sample({ });

        expect(test.observer.constructor).toEqual(Profile)
      })

      test('should initialize observer', () => {
        let observer = Profile.fromPartial({
          email: 'blah@blah.com',
          name: 'asdf test',
          organization: 'test org'
        })
        let test = new Sample({ 
          observer
        })

        Object.keys(test.observer).forEach(k => {
          expect(test.observer[k]).toEqual(observer[k])
        })
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
        test.observer = <any>{ }
        test.observer.isValid = true
        test.sample = <any>{ }
        test.sample.isValid = true

        expect(test.isValid).toBe(true)
      })

      test('invalid if observer is not valid', () => {
        let test = new Sample()
        test.observer = <any>{ }
        test.observer.isValid = false
        test.sample = <any>{ }
        test.sample.isValid = true

        expect(test.isValid).toBe(false)
      })

      test('invalid if sample is not valid', () => {
        let test = new Sample()
        test.observer = <any>{ }
        test.observer.isValid = true
        test.sample = <any>{ }
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

        expect(test.coverslipNumFields).toEqual(2037)
      })

      test('should round to integer', () => {
        let test = new SampleInfo()

        jest.spyOn(test, '_fovArea', 'get').mockReturnValue(100)
        jest.spyOn(test, 'coverslipArea', 'get').mockReturnValue(1088)

        expect(test.coverslipNumFields).toEqual(11)
      })
    })

    describe('isValid', () => {
      let happySample: ISampleInfoModel = new SampleInfo({
        name: 'test',
        type: 'test',
        plant: 'test',
        succession: Succession.Deciduous,
        dateCollected: 'test',
        dateObserved: 'test',
        observedBy: 'test',
      })

      test('happy', () => {
        let test = new SampleInfo(happySample)

        expect(test.isValid).toBe(true)
      })

      test('no name', () => {
        let test = new SampleInfo(happySample)

        test.name = ''
        expect(test.isValid).toBe(false)

        test.name = 'test'
        expect(test.isValid).toBe(true)

        test.name = null
        expect(test.isValid).toBe(false)
      })

      test('no type', () => {
        let test = new SampleInfo(happySample)

        test.type = ''
        expect(test.isValid).toBe(false)

        test.type = 'test'
        expect(test.isValid).toBe(true)

        test.type = null
        expect(test.isValid).toBe(false)
      })

      test('no plant', () => {
        let test = new SampleInfo(happySample)

        test.plant = ''
        expect(test.isValid).toBe(false)

        test.plant = 'test'
        expect(test.isValid).toBe(true)

        test.plant = null
        expect(test.isValid).toBe(false)
      })

      test('no succession', () => {
        let test = new SampleInfo(happySample)

        test.succession = null
        expect(test.isValid).toBe(false)

        test.succession = Succession.Deciduous
        expect(test.isValid).toBe(true)
      })

      test('no dateCollected', () => {
        let test = new SampleInfo(happySample)

        test.dateCollected = ''
        expect(test.isValid).toBe(false)

        test.dateCollected = 'test'
        expect(test.isValid).toBe(true)

        test.dateCollected = null
        expect(test.isValid).toBe(false)
      })

      test('no dateObserved', () => {
        let test = new SampleInfo(happySample)

        test.dateObserved = ''
        expect(test.isValid).toBe(false)

        test.dateObserved = 'test'
        expect(test.isValid).toBe(true)

        test.dateObserved = null
        expect(test.isValid).toBe(false)
      })

      test('no observedBy', () => {
        let test = new SampleInfo(happySample)

        test.observedBy = ''
        expect(test.isValid).toBe(false)

        test.observedBy = 'test'
        expect(test.isValid).toBe(true)

        test.observedBy = null
        expect(test.isValid).toBe(false)
      })

      test('no mainDilution', () => {
        let test = new SampleInfo(happySample)

        test.mainDilution = null
        expect(test.isValid).toBe(false)

        test.mainDilution = 0
        expect(test.isValid).toBe(true)
      })

      test('no bacteriaDilution', () => {
        let test = new SampleInfo(happySample)

        test.bacteriaDilution = null
        expect(test.isValid).toBe(false)

        test.bacteriaDilution = 0
        expect(test.isValid).toBe(true)
      })

      test('no dropsPerSample', () => {
        let test = new SampleInfo(happySample)

        test.dropsPerSample = null
        expect(test.isValid).toBe(false)

        test.dropsPerSample = 0
        expect(test.isValid).toBe(true)
      })

      test('no dropsPerMl', () => {
        let test = new SampleInfo(happySample)

        test.dropsPerMl = null
        expect(test.isValid).toBe(false)

        test.dropsPerMl = 0
        expect(test.isValid).toBe(true)
      })

      test('no coverslipSize', () => {
        let test = new SampleInfo(happySample)

        test.coverslipSize = null
        expect(test.isValid).toBe(false)

        test.coverslipSize = CoverslipSize.EighteenRect
        expect(test.isValid).toBe(true)
      })

      test('no eyepieceFieldSize', () => {
        let test = new SampleInfo(happySample)

        test.eyepieceFieldSize = null
        expect(test.isValid).toBe(false)

        test.eyepieceFieldSize = 0
        expect(test.isValid).toBe(true)
      })
    })
  })
})