import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { IModel } from '../base.model';
import { ICountField } from '../field/count-field.model';
import { ICountReading, CountReading } from '../reading/count-reading.model';
import { ISampleInfoModel } from '../sample.model';

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
    return this._countMeanMm * this.sample.fovDiameterMm / 10;
  }

  protected get _countStDevMm(): number {
    return this.normalize(this._totalCounts)
      .stDev();
  }

  protected get _countStDevCm(): number {
    return this._countStDevMm * this.sample.fovDiameterMm / 10;
  }

  get meanResult(): number {
    return this._countMeanMm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields
  }

  get stDevResult(): number {
    return this._countStDevCm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Counting
  }
}