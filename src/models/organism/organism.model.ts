import { IModel } from "../base.model";

export const NUM_READINGS = 5

export enum DataType {
  Counting,
  Length,
  Diameter
}

export interface IOrganism<TReading> extends IModel {
  organismName: string
  readings: TReading[]
  meanResult: number
  stDevResult: number
  dilution: number
  dataType: DataType
}
