import '../../util/misc'

import { IReading } from "./reading.model";
import { READING_NUM_MIN_FIELDS } from '../../util/reading-model'
import { ICountField, CountField } from "../field/count-field.model";
import { DataType } from "../organism/organism.model";

export interface ICountReading extends IReading {
  fields: ICountField[]
  totalCount?: number
}

export class CountReading implements ICountReading {
  fields: ICountField[];  

  constructor(init: RecursivePartial<ICountReading> = { }) {
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

  addField() {
    this.fields.push(new CountField())
  }

  tryRemoveField() {
    if (this.fields.length <= READING_NUM_MIN_FIELDS) return

    this.fields.pop()
  }

  get totalCount(): number {
    return this.fields
      .map(x => x.count)
      .sum()
  }

  get dataType(): DataType {
    return DataType.Counting
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}