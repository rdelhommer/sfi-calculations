import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { ISampleInfoModel } from "../sample.model";
import { ILengthReading, LengthReading } from "../reading/length-reading.model";
import { round } from '../../util/misc';

// NOTE
// This currently is only used by Actinobacteria
export class MultiReadLengthOrganism implements IOrganism<ILengthReading> {
  readings: ILengthReading[];
  dilution: number;

  constructor(
    private sample: ISampleInfoModel,
    init: RecursivePartial<IOrganism<ILengthReading>> = { }) {
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
    if (this.sample == null) throw 'You must provide a sample for the organism model'
  }

  protected get _normalizedLengths(): number[] {
    return this.readings
      .map(x => x.totalLength / x.fields.length)
      .filterNumbers()
  }

  protected get _lengthMeanMm(): number {
    return this._normalizedLengths.mean();
  }

  protected get _lengthMeanCm(): number {
    return this._lengthMeanMm * this.sample.fovDiameterMm / 10;
  }

  protected get _lengthStDevMm(): number {
    return this._normalizedLengths.stDev();
  }

  protected get _lengthStDevCm(): number {
    return this._lengthStDevMm * this.sample.fovDiameterMm / 10;
  }

  protected get _lengthMeanCmPerG(): number {
    return this._lengthMeanCm * this.dilution * (this.sample.dropsPerMl / this.sample.dropsPerSample) * this.sample.coverslipNumFields
  }

  protected get _lengthStDevCmPerG(): number {
    return this._lengthStDevCm * this.dilution * (this.sample.dropsPerMl / this.sample.dropsPerSample) * this.sample.coverslipNumFields
  }

  get meanResult(): number {
    return Number(round(this._lengthMeanCmPerG * Math.PI * 0.00005 * 0.00005 * 230000, 0.01).toFixed(2))
  }

  get stDevResult(): number {
    return Number(round(this._lengthStDevCmPerG * Math.PI * 0.00005 * 0.00005 * 230000, 0.01).toFixed(2))
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