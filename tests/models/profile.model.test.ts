import { Address, IProfileModel, Profile } from '../../src/models/profile.model'
import { DataEntry } from '../../src/util/enums';

describe('Models', () => {
  describe('Address', () => {
    describe('constructor', () => {
      test('should init lineOne', () => {
        let test = new Address({
          lineOne: 'test'
        })

        expect(test.lineOne).toBe('test')
      })

      test('should init lineTwo', () => {
        let test = new Address({
          lineTwo: 'test'
        })

        expect(test.lineTwo).toBe('test')
      })
    })

    describe('isValid', () => {
      test('happy', () => {
        let test = new Address({
          lineOne: 'test'
        })

        expect(test.isValid).toBe(true)
      })

      test('no lineOne', () => {
        let test = new Address({
          lineOne: 'test'
        })

        expect(test.isValid).toBe(true)

        test.lineOne = null
        expect(test.isValid).toBe(false)

        test.lineOne = 'test'
        expect(test.isValid).toBe(true)

        test.lineOne = ''
        expect(test.isValid).toBe(false)
      })
    })
  })

  describe('Profile', () => {
    describe('constructor', () => {
      test('should init simple properties', () => {
        let init: RecursivePartial<IProfileModel> = {
          name: 'testName',
          organization: 'testOrg',
          email: 'testemail',
          phone: 'testphone',
          dataEntry: DataEntry.DataTab
        }

        let test = new Profile(init)

        Object.keys(init).forEach(x => {
          if (x === 'address') return
          expect(init[x]).toBe(test[x])
        })
      })

      test('should init address', () => {
        let address = {
          lineOne: 'test line one',
          lineTwo: 'test line two'
        }

        let test = new Profile({
          address
        })

        Object.keys(address).forEach(x => {
          if (x === 'address') return
          expect(address[x]).toEqual(test.address[x])
        })

        expect(test.address.constructor).toBe(Address)
      })

      test('should init default address', () => {
        let test = new Profile()

        Object.keys(test.address).forEach(x => {
          expect(test.address[x]).toBe(undefined)
        })

        expect(test.address.constructor).toBe(Address)
      })
    })

    describe('isValid', () => {
      let happyProfile: IProfileModel = {
        name: 'test name',
        organization: 'test organization',
        email: 'test email',
        phone: 'test phone',
        address: {
          lineOne: 'test address'
        },
        dataEntry: DataEntry.DataTab
      }

      test('happy', () => {
        let test = new Profile(happyProfile)
        expect(test.isValid).toBe(true)
      })

      test('no name', () => {
        let test = new Profile(happyProfile)

        test.name = ''
        expect(test.isValid).toBe(false)

        test.name = 'test'
        expect(test.isValid).toBe(true)

        test.name = null
        expect(test.isValid).toBe(false)
      })

      test('no organization', () => {
        let test = new Profile(happyProfile)

        test.organization = ''
        expect(test.isValid).toBe(false)

        test.organization = 'test'
        expect(test.isValid).toBe(true)

        test.organization = null
        expect(test.isValid).toBe(false)
      })

      test('no email', () => {
        let test = new Profile(happyProfile)

        test.email = ''
        expect(test.isValid).toBe(false)

        test.email = 'test'
        expect(test.isValid).toBe(true)

        test.email = null
        expect(test.isValid).toBe(false)
      })

      test('no phone', () => {
        let test = new Profile(happyProfile)

        test.phone = ''
        expect(test.isValid).toBe(false)

        test.phone = 'test'
        expect(test.isValid).toBe(true)

        test.phone = null
        expect(test.isValid).toBe(false)
      })

      test('invalid address', () => {
        let test = new Profile(happyProfile)

        test.address = {
          isValid: false,
          lineOne: 'blah'
        }
        expect(test.isValid).toBe(false)

        test.address = {
          isValid: true,
          lineOne: 'blah'
        }
        expect(test.isValid).toBe(true)
      })

      test('no dataEntry', () => {
        let test = new Profile(happyProfile)

        test.dataEntry = null
        expect(test.isValid).toBe(false)

        test.dataEntry = DataEntry.DataTab
        expect(test.isValid).toBe(true)
      })
    })
  })
})