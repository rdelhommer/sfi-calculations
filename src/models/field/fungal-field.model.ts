import '../../util/misc'
import { IModel } from "../base.model";
import { ILengthField } from "./length-field.model";
import { FungalColor, OomyceteColor } from "../../util/enums";
import { initFieldRawData } from "../../util/field-model";

export interface IDiameterField extends IModel {
  averageDiameter?: number
  diameterRawData: number[]
}

export interface IFungalField extends ILengthField, IDiameterField, IModel {
  color: FungalColor | OomyceteColor
}

export class FungalField implements IFungalField {
  lengthRawData: number[]
  diameterRawData: number[]
  color: FungalColor | OomyceteColor

  constructor(init: Partial<IFungalField> = { }) {
    Object.assign(this, init)

    this.lengthRawData = initFieldRawData(this.lengthRawData)    
    this.diameterRawData = initFieldRawData(this.diameterRawData)    
  }

  get totalLength(): number {
    return this.lengthRawData
     .filterNumbers()
     .reduce((a, b) => a + b)
  }

  get averageDiameter(): number {
    let totalDiameter = this.diameterRawData
     .filterNumbers()
     .reduce((a, b) => a + b)

    return totalDiameter / this.totalLength
  }

  get isValid(): boolean {
    let validRawLength = this.lengthRawData
      .filterNumbers()

    let validRawDiameter = this.diameterRawData
      .filterNumbers()

    return validRawLength.length > 0 
      && validRawDiameter.length > 0 
      && !!this.color
  }
}
