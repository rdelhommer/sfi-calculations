import { FungalColor, OomyceteColor } from "../util/enums";
import { IModel } from "./base.model";
import '../util/misc'

export const NUM_RAW_DATA = 10;

function initRawData(rawData: number[]) {
  if (!rawData) {
    rawData = []
  }

  for (let i = rawData.length; i < NUM_RAW_DATA; i++) {
    rawData.push(null)
  }

  return rawData
}

export interface ILengthField extends IModel {
  totalLength?: number
  lengthRawData: number[]
}

export interface IDiameterField extends IModel {
  averageDiameter?: number
  diameterRawData: number[]
}

export interface IFungalField extends ILengthField, IDiameterField, IModel {
  color: FungalColor | OomyceteColor
}

export class LengthField implements ILengthField {
  lengthRawData: number[]

  constructor(init: Partial<ILengthField> = { }) {
    Object.assign(this, init)

    this.lengthRawData = initRawData(this.lengthRawData)    
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

export class FungalField implements IFungalField {
  lengthRawData: number[]
  diameterRawData: number[]
  color: FungalColor | OomyceteColor

  constructor(init: Partial<IFungalField> = { }) {
    Object.assign(this, init)

    this.lengthRawData = initRawData(this.lengthRawData)    
    this.diameterRawData = initRawData(this.diameterRawData)    
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
