export const NUM_READINGS = 5

export enum DataType {
  Counting,
  Length,
  Diameter
}

export interface IOrganism<TReading> {
  organismName: string
  readings: TReading[]
  meanResult: number
  stDevResult: number
  dilution: number
  coverslipNumFields: number
  dataType: DataType
}
