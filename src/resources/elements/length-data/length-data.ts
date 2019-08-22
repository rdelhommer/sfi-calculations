import './length-data.scss'
import { bindable } from 'aurelia-framework';

export interface ILengthRawData {
  length: number
}

export class LengthData {
  @bindable rawData: ILengthRawData[]
  @bindable totalLength: number

  updateCalcs() {
    this.totalLength = this.rawData
      .map(x => x.length)
      .filterNumbers()
      .reduce((a, b) => a + b)
  }
}