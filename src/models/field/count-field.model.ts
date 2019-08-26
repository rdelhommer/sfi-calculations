import { IModel } from "../base.model";

export interface ICountField extends IModel {
  count: number
}

export class CountField implements ICountField{
  count: number;  

  constructor(init: Partial<ICountField> = { }) {
    Object.assign(this, init)
  }

  get isValid(): boolean {
    return this.count != null
  }
}