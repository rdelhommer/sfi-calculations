import '../../util/misc'

import { initFieldRawData } from '../../util/field-model'
import { IField } from './field.model';
import { DataType } from '../organism/organism.model';

export interface ILengthField extends IField {
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

  get dataType(): DataType {
    return DataType.Length;
  }

  get isValid(): boolean {
    let validRawData = this.lengthRawData
      .filterNumbers()

    return validRawData.length > 0
  }
}
