import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { ISampleInfoModel } from "../sample.model";
import { ILengthReading, LengthReading } from "../reading/length-reading.model";
import { FOV_DIAMETER_MM, DROPS_PER_ML } from '../../util/constants';
import { ILengthField } from '../field/length-field.model';
import { IModel } from '../base.model';

// NOTE
// This currently is only used by Actinobacteria
export class MultiReadLengthOrganism implements IOrganism<ILengthReading>, IModel {
  readings: ILengthReading[];
  dilution: number;
  coverslipNumFields: number;

  constructor(init: Partial<IOrganism<ILengthReading>> = { }) {
    Object.assign(this, init)

    if (!this.readings) {
      this.readings = []
    }
  
    for (let i = 0; i < NUM_READINGS; i++) {
      if (i < this.readings.length) {
        this.readings[i] = new LengthReading(this.readings[i])
      } else {
        this.readings.push(new LengthReading())
      }
    }

    if (this.dilution == null) throw 'You must provide a dilution for the organism model'
    if (this.coverslipNumFields == null) throw 'You must provide a coverslipNumFields for the organism model'
  }

  protected normalize(array: number[]) {
    let fieldsPerReading = this.readings[0].fields.length

    return array.map(x => {
      let value = x == null ? 0 : x
      return value / fieldsPerReading
    })
  }

  protected get _totalLengths(): number[] {
    let fields: ILengthField[] = []
    this.readings.forEach(x => fields = fields.concat(x.fields))

    return fields.map(x => x.totalLength)
      .filterNumbers()
  }

  protected get _countMeanMm(): number {
    return this.normalize(this._totalLengths)
      .mean();
  }

  protected get _countMeanCm(): number {
    return this._countMeanMm * FOV_DIAMETER_MM / 10;
  }

  protected get _countStDevMm(): number {
    return this.normalize(this._totalLengths)
      .stDev();
  }

  protected get _countStDevCm(): number {
    return this._countStDevMm * FOV_DIAMETER_MM / 10;
  }

  protected get _countMeanCmPerG(): number {
    return this._countMeanCm * this.dilution * DROPS_PER_ML * this.coverslipNumFields
  }

  protected get _countStDevCmPerG(): number {
    return this._countStDevCm * this.dilution * DROPS_PER_ML * this.coverslipNumFields
  }

  get meanResult(): number {
    return this._countMeanCmPerG * Math.PI * 0.00005 * 0.00005 * 230000
  }

  get stDevResult(): number {
    return this._countStDevCmPerG * Math.PI * 0.00005 * 0.00005 * 230000
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Length;
  } 

  get organismName(): string { 
    return 'Actinobacteria' 
  }
}