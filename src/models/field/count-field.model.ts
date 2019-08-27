import { IField } from "./field.model";
import { DataType } from "../organism/organism.model";

export interface ICountField extends IField {
  count: number
}

export class CountField implements ICountField{
  count: number;  

  constructor(init: Partial<ICountField> = { }) {
    Object.assign(this, init)
  }

  get dataType(): DataType {
    return DataType.Counting;
  }

  get isValid(): boolean {
    return this.count != null
  }
}