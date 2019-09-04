import { IModel } from "../base.model";
import { IFungalField, FungalField } from "../field/fungal-field.model";
import { READING_NUM_MIN_FIELDS } from "../../util/reading-model";
import { DataType } from "../organism/organism.model";
import { IReading } from "./reading.model";

export interface IFungalReading extends IReading {
  fields: IFungalField[]
  totalLength?: number
  averageDiameter?: number
  totalVolume?: number
}

export class FungalReading implements IFungalReading {
  fields: IFungalField[];
  
  constructor(init: RecursivePartial<IFungalReading> = { }) {
    Object.assign(this, init)
    
    if (!this.fields) {
      this.fields = []
    }
  
    let initTo = this.fields.length > READING_NUM_MIN_FIELDS 
      ? this.fields.length 
      : READING_NUM_MIN_FIELDS
    for (let i = 0; i < initTo; i++) {
      if (i < this.fields.length) {
        this.fields[i] = new FungalField(this.fields[i])
      } else {
        this.fields.push(new FungalField())
      }
    }
  }

  addField() {
    this.fields.push(new FungalField())
  }

  tryRemoveField() {
    if (this.fields.length <= READING_NUM_MIN_FIELDS) return

    this.fields.pop()
  }

  get totalVolume(): number {
    return this.fields
      .map(x => x.totalVolume)
      .sum()
  }

  get totalLength(): number {
    return this.fields
      .map(x => x.totalLength)
      .sum()
  }

  get averageDiameter(): number {
    return this.totalVolume / this.totalLength
  }

  get dataType(): DataType {
    return DataType.Diameter
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}