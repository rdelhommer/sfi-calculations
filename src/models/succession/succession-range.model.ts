import { IModel } from "../base.model";

export interface ISuccessionRange extends IModel {
  min: number
  max: number
}

export class SuccessionRange implements ISuccessionRange {
  min: number
  max: number

  static fromPartial(init: RecursivePartial<ISuccessionRange> = { }): ISuccessionRange {
    let ret = new SuccessionRange()
    Object.assign(ret, init)

    return ret
  }

  get isValid() {
    return true
  }
}

