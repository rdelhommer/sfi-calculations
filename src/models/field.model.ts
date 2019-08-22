import { FungalColor, OomyceteColor } from "../util/enums";
import { IModel } from "./base.model";

export interface ILengthField extends IModel {
  totalLength: number
  lengthRawData: number[]
}

export interface IDiameterField extends IModel {
  averageDiameter: number
  diameterRawData: number[]
}

export interface IFungalField extends ILengthField, IDiameterField, IModel {
  color: FungalColor | OomyceteColor
}

export class LengthField implements ILengthField {
  lengthRawData: number[] = [];

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

export class FungalField implements IFungalField {
  lengthRawData: number[] = [];
  diameterRawData: number[]
  color: FungalColor | OomyceteColor

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

    return validRawLength.length > 0 && validRawDiameter.length > 0
  }
}
