import '../../util/misc'

import { ILengthField, LengthField } from "../field/length-field.model";
import { READING_NUM_MIN_FIELDS } from '../../util/reading-model'
import { IReading } from './reading.model';
import { DataType } from '../organism/organism.model';

export interface ILengthReading extends IReading {
  fields: ILengthField[]
  totalLength?: number
}

export class LengthReading implements ILengthReading {
  fields: ILengthField[];  

  constructor(init: RecursivePartial<ILengthReading> = { }) {
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

  addField() {
    this.fields.push(new LengthField())
  }

  tryRemoveField() {
    if (this.fields.length <= READING_NUM_MIN_FIELDS) return

    this.fields.pop()
  }

  get totalLength(): number {
    return this.fields
      .map(x => x.totalLength)
      .sum()
  }

  get dataType(): DataType {
    return DataType.Length
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}