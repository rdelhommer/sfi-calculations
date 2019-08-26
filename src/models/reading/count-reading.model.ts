import { IModel } from "../base.model";
import { READING_NUM_MIN_FIELDS } from '../../util/reading-model'
import { ICountField, CountField } from "../field/count-field.model";

export interface ICountReading extends IModel {
  fields: ICountField[]
}

export class CountReading implements ICountReading {
  fields: ICountField[];  

  constructor(init: Partial<ICountReading> = { }) {
    Object.assign(this, init)

    if (!this.fields) {
      this.fields = []
    }
  
    let initTo = this.fields.length > READING_NUM_MIN_FIELDS 
      ? this.fields.length 
      : READING_NUM_MIN_FIELDS
    for (let i = 0; i < initTo; i++) {
      if (i < this.fields.length) {
        this.fields[i] = new CountField(this.fields[i])
      } else {
        this.fields.push(new CountField())
      }
    }
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}