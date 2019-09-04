import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { IModel } from '../base.model';
import { ICountField } from '../field/count-field.model';
import { ICountReading, CountReading } from '../reading/count-reading.model';
import { ISampleInfoModel } from '../sample.model';
import { round } from '../../util/misc';

export class MultiReadCountOrganism implements IOrganism<ICountReading>, IModel {
  organismName: string
  readings: ICountReading[];
  dilution: number;
  
  constructor(
    private sample: ISampleInfoModel,
    init: RecursivePartial<IOrganism<ICountReading>> = { }
  ) {
    Object.assign(this, init)

    if (!this.readings) {
      this.readings = []
    }
  
    for (let i = 0; i < NUM_READINGS; i++) {
      if (i < this.readings.length) {
        this.readings[i] = new CountReading(this.readings[i])
      } else {
        this.readings.push(new CountReading())
      }
    }

    if (this.dilution == null) throw 'You must provide a dilution for the organism model'
    if (this.organismName == null) throw 'You must provide an organismName for the organism model'
  }

  protected get _normalizedCounts(): number[] {
    return this.readings
      .mapFilterNumber(x => x.totalCount)
      .map(x => x.totalCount / x.fields.length)
  }

  protected get _countMeanMm(): number {
    return this._normalizedCounts.mean();
  }

  protected get _countStDevMm(): number {
    return this._normalizedCounts.stDev();
  }

  get meanResult(): number {
    if (this._countMeanMm == null) return null

    return Number(round(this._countMeanMm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields, 1).toFixed(0))
  }

  get stDevResult(): number {
    if (this._countStDevMm == null) return null

    return Number(round(this._countStDevMm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields, 1).toFixed(0))
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Counting
  }
}