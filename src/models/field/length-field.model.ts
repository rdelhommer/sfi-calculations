import '../../util/misc'
import { initFieldRawData } from '../../util/field-model'
import { IModel } from '../base.model';

export interface ILengthField extends IModel {
  totalLength?: number
  lengthRawData: number[]
}

export class LengthField implements ILengthField {
  lengthRawData: number[]

  constructor(init: Partial<ILengthField> = { }) {
    Object.assign(this, init)

    this.lengthRawData = initFieldRawData(this.lengthRawData)    
  }

  get totalLength(): number {
    return this.lengthRawData
     .filterNumbers()
     .reduce((a, b) => a + b)
  }

  get isValid(): boolean {
    let validRawData = this.lengthRawData
      .filterNumbers()

    return validRawData.length > 0
  }
}
