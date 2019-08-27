// import { MultiReadCountOrganism } from "../../../src/models/organism/multi-read-count-organism.model";
// import { DataType, NUM_READINGS } from "../../../src/models/organism/organism.model";
// import { CountReading } from "../../../src/models/reading/count-reading.model";

// describe('Models', () => {
//   describe('Count Organism', () => {
//     describe('constructor', () => {
//       test('should init organismName', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.organismName).toEqual('test')
//       })

//       test('should throw if no organismName', () => {
//         expect(() => {
//           new MultiReadCountOrganism({
//             dilution: 25,
//           })
//         }).toThrow()
//       })

//       test('should init dilution', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.dilution).toEqual(25)
//       })

//       test('should throw if no dilution', () => {
//         expect(() => { 
//           new MultiReadCountOrganism({
//             organismName: 'test'
//           }) 
//         }).toThrow()
//       })

//       test('should init coverslipNumFields', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.coverslipNumFields).toEqual(35)
//       })

//       test('should throw if no coverslipNumFields', () => {
//         expect(() => {
//           new MultiReadCountOrganism({
//             dilution: 25,
//             organismName: 'test'
//           })
//         }).toThrow()
//       })

//       test('should init default readings', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.readings.length).toEqual(5)
//       })

//       test('should init existing readings', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           readings: [{
//             fields: [{
//               count: 1
//             }, {
//               count: 2
//             }]
//           }, {
//             fields: [{
//               count: 3
//             }, {
//               count: 4
//             }]
//           }],
//           organismName: 'test'
//         })

//         expect(test.readings.length).toEqual(NUM_READINGS)
//         expect(test.readings[0].fields[0].count).toEqual(1)
//         expect(test.readings[0].fields[1].count).toEqual(2)
//         expect(test.readings[1].fields[0].count).toEqual(3)
//         expect(test.readings[1].fields[1].count).toEqual(4)
//       })

//       test('should init readings with correct class type', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.readings.every(x => x.constructor === CountReading)).toEqual(true)
//       })

//       test('should have correct data type', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         expect(test.dataType).toEqual(DataType.Counting)
//       })
//     })

//     describe('isValid', () => {
//       test('should be true if all readings are valid', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         test.readings = [{
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }]

//         expect(test.isValid).toBe(true)
//       })

//       test('should be false if a reading is not valid', () => {
//         let test = new MultiReadCountOrganism({
//           dilution: 25,
//           organismName: 'test'
//         })

//         test.readings = [{
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: true,
//           fields: []
//         }, {
//           isValid: false,
//           fields: []
//         }]

//         expect(test.isValid).toBe(false)
//       })
//     })

//     describe('meanResult', () => {
//       test('happy', () => {

//       })

//       test('should ignore invalid field data', () => {
        
//       })
//     })

//     describe('stDevResult', () => {
//       test('happy', () => {

//       })

//       test('should ignore invalid field data', () => {
        
//       })
//     })
//   })
// })
