import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { ISampleInfoModel } from "../sample.model";
import { FOV_DIAMETER_MM, DROPS_PER_ML } from '../../util/constants';
import { IModel } from '../base.model';
import { ICountField } from '../field/count-field.model';
import { ICountReading, CountReading } from '../reading/count-reading.model';

export class MultiReadCountOrganism implements IOrganism<ICountReading>, IModel {
  organismName: string
  readings: ICountReading[];
  dilution: number;
  coverslipNumFields: number;
  
  constructor(init: Partial<IOrganism<ICountReading>> = { }) {
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
    if (this.coverslipNumFields == null) throw 'You must provide a coverslipNumFields for the organism model'
    if (this.organismName == null) throw 'You must provide an organismName for the organism model'
  }

  protected normalize(array: number[]) {
    let fieldsPerReading = this.readings[0].fields.length
    
    return array.map(x => {
      let count = x == null ? 0 : x
      return count / fieldsPerReading
    })
  }

  protected get _totalCounts(): number[] {
    let fields: ICountField[] = []
    this.readings.forEach(x => fields = fields.concat(x.fields))

    return fields.map(x => x.count)
      .filterNumbers()
  }

  protected get _countMeanMm(): number {
    return this.normalize(this._totalCounts)
      .mean();
  }

  protected get _countMeanCm(): number {
    return this._countMeanMm * FOV_DIAMETER_MM / 10;
  }

  protected get _countStDevMm(): number {
    return this.normalize(this._totalCounts)
      .stDev();
  }

  protected get _countStDevCm(): number {
    return this._countStDevMm * FOV_DIAMETER_MM / 10;
  }

  get meanResult(): number {
    return this._countMeanMm * this.dilution * DROPS_PER_ML * this.coverslipNumFields
  }

  get stDevResult(): number {
    return this._countStDevCm * this.dilution * DROPS_PER_ML * this.coverslipNumFields
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Counting
  }
}