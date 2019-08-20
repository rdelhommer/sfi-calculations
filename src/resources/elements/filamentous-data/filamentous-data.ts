import './filamentous-data.scss'
import { bindable } from 'aurelia-framework';

export interface IFilamentousRawData {
  length: number
  diameter: number
}

export class FilamentousData {
  @bindable rawData: IFilamentousRawData[]
  @bindable totalLength: number
  @bindable averageDiameter: number

  updateCalcs() {
    this.totalLength = this.rawData
      .map(x => x.length)
      .filterNumbers()
      .reduce((a, b) => a + b)

    let diameterSum = this.rawData
      .map(x => x.diameter)
      .filterNumbers()
      .reduce((a, b) => a + b)
    
    this.averageDiameter = diameterSum / this.totalLength
  }
}