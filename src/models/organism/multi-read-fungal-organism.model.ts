import '../../util/misc'

import { IOrganism, DataType, NUM_READINGS } from "./organism.model";
import { IModel } from '../base.model';
import { IFungalReading, FungalReading } from '../reading/fungal-reading.model';
import { IFungalField } from '../field/fungal-field.model';
import { ISampleInfoModel } from '../sample.model';

export class MultiReadFungalOrganism implements IOrganism<IFungalReading>, IModel {
  organismName: string;
  readings: IFungalReading[];
  dilution: number;
  
  constructor(
    private sample: ISampleInfoModel,
    init: Partial<IOrganism<IFungalReading>> = { }
  ) {
    Object.assign(this, init)

    if (!this.readings) {
      this.readings = []
    }
  
    for (let i = 0; i < NUM_READINGS; i++) {
      if (i < this.readings.length) {
        this.readings[i] = new FungalReading(this.readings[i])
      } else {
        this.readings.push(new FungalReading())
      }
    }

    if (this.dilution == null) throw 'You must provide a dilution for the organism model'
    if (this.organismName == null) throw 'You must provide an organismName for the organism model'
  }

  protected normalize(array: number[]) {
    let fieldsPerReading = this.readings[0].fields.length

    return array.map(x => {
      let value = x == null ? 0 : x
      return value / fieldsPerReading
    })
  }

  protected get _totalLengths(): number[] {
    let fields: IFungalField[] = []
    this.readings.forEach(x => fields = fields.concat(x.fields))

    return fields.map(x => x.totalLength)
      .filterNumbers()
  }

  protected get _averageDiameters(): number[] {
    let fields: IFungalField[] = []
    this.readings.forEach(x => fields = fields.concat(x.fields))

    return fields.map(x => x.averageDiameter)
      .filterNumbers()
  }

  protected get _totalVolumes(): number[] {
    let fields: IFungalField[] = []
    this.readings.forEach(x => fields = fields.concat(x.fields))

    return fields.map(x => x.totalVolume)
      .filterNumbers()
  }

  protected get _lengthMeanMm(): number {
    return this.normalize(this._totalLengths)
      .mean();
  }

  protected get _lengthMeanCm(): number {
    return this._lengthMeanMm * this.sample.fovDiameterMm / 10;
  }

  protected get _lengthStDevMm(): number {
    return this.normalize(this._totalLengths)
      .stDev();
  }

  protected get _lengthStDevCm(): number {
    return this._lengthStDevMm * this.sample.fovDiameterMm / 10;
  }

  protected get _averageDiameterCm(): number {
    return this._averageDiameterUm / 10000;
  }
  
  protected get _averageDiameterUm(): number {
    let sumVolumes = this.normalize(this._totalVolumes)
      .reduce((a, b) => a + b);
    let sumLengths = this.normalize(this._totalLengths)
      .reduce((a, b) => a + b);

    return sumVolumes / sumLengths;
  }

  protected get _lengthMeanCmPerG(): number {
    return this._lengthMeanCm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields
  }
  protected get _lengthStDevCmPerG(): number {
    return this._lengthStDevCm * this.dilution * this.sample.dropsPerMl * this.sample.coverslipNumFields
  }

  get meanResult(): number {
    return this._lengthMeanCmPerG * Math.PI * (0.5 * this._averageDiameterCm)^2 * 3300000;
  }

  get stDevResult(): number {
    return this._lengthStDevCmPerG * Math.PI * (0.5 * this._averageDiameterCm)^2 * 3300000;
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Diameter;
  } 
}