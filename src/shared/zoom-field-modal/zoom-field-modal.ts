import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { ILengthRawData } from '../../resources/elements/length-data/length-data';
import { IDiameterRawData } from '../../resources/elements/diameter-data/diameter-data';
import { isDeepStrictEqual } from 'util';

export interface IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number
  organismName: string
  rawData: (ILengthRawData | IDiameterRawData)[]
  isDiameter: boolean
}

export interface IZoomFieldModalResult {
  totalLength: number
  averageDiameter: number
}

@inject(DialogController)
export class ZoomFieldModal implements IZoomFieldModalModel{
  readingNumber: number
  fieldNumber: number
  organismName: string
  rawData: (ILengthRawData | IDiameterRawData)[]
  isDiameter: boolean

  result: IZoomFieldModalResult

  constructor(
    public dialogController: DialogController  // Used in View
  ) { }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber
    this.organismName = model.organismName
    this.rawData = model.rawData
    this.isDiameter = model.isDiameter

    for (let i = 0; i < 10; i++) {
      this.rawData.push({ length: null, diameter: null})
    }
    console.log(this.rawData);
  }

  save() {
    this.dialogController.ok(<IZoomFieldModalResult>{ ...this.result })
  }
}