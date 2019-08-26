import '../../util/misc'

import { IModel } from "../base.model";
import { ILengthField, LengthField } from "../field/length-field.model";
import { READING_NUM_MIN_FIELDS } from '../../util/reading-model'

export interface ILengthReading extends IModel {
  fields: ILengthField[]
  totalLength?: number
}

export class LengthReading implements ILengthReading {
  fields: ILengthField[];  

  constructor(init: Partial<ILengthReading> = { }) {
    Object.assign(this, init)

    if (!this.fields) {
      this.fields = []
    }
  
    let initTo = this.fields.length > READING_NUM_MIN_FIELDS 
      ? this.fields.length 
      : READING_NUM_MIN_FIELDS
    for (let i = 0; i < initTo; i++) {
      if (i < this.fields.length) {
        this.fields[i] = new LengthField(this.fields[i])
      } else {
        this.fields.push(new LengthField())
      }
    }
  }

  get totalLength(): number {
    return this.fields
      .filterNumbers()
      .reduce((a, b) => a + b)
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}