import { IModel } from "../base.model";
import { ILengthReading } from "../reading/length-reading.model";
import { IFungalReading } from "../reading/fungal-reading.model";
import { ICountReading } from "../reading/count-reading.model";

export const NUM_READINGS = 5

export enum DataType {
  Counting,
  Length,
  Diameter
}

export interface IOrganism<TReading extends ILengthReading | IFungalReading | ICountReading = ILengthReading | IFungalReading | ICountReading> extends IModel {
  organismName: string
  readings: TReading[]
  meanResult: number
  stDevResult: number
  dilution: number
  dataType: DataType
}
