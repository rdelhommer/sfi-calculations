import { IOrganism, DataType } from "./organism.model";
import { ICountReading, CountReading } from "../reading/count-reading.model";
import { IModel } from "../base.model";
import { ISampleInfoModel } from "../sample.model";

export class SingleReadCountOrganism implements IOrganism<ICountReading>, IModel {
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
  
    for (let i = 0; i < 1; i++) {
      if (i < this.readings.length) {
        this.readings[i] = new CountReading(this.readings[i])
      } else {
        this.readings.push(new CountReading())
      }

      while(this.readings[i].fields.length > 1) {
        this.readings[i].fields.pop()
      }
    }

    while(this.readings[0].fields.length > 1) {
      this.readings[0].fields.pop()
    }

    if (this.dilution == null) throw 'You must provide a dilution for the organism model'
    if (this.organismName == null) throw 'You must provide an organismName for the organism model'
  }

  get meanResult(): number {
    if (this.readings[0].totalCount == null || <any>this.readings[0].totalCount === '') return null

    return this.readings[0].totalCount * this.dilution * this.sample.dropsPerMl
  }

  get stDevResult(): number {
    return null
  }

  get isValid(): boolean {
    return this.readings.every(x => x.isValid)
  }

  get dataType(): DataType {
    return DataType.Counting
  }
}