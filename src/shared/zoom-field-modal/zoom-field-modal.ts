import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { IFilamentousRawData } from '../../resources/elements/filamentous-data/filamentous-data';

export interface IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number
}

export interface IZoomFieldModalResult {
  actinobacteriaLength: number
  fungiLength: number
  fungiDiameter: number
  oomyceteLength: number
  oomyceteDiameter: number
  flagellateLength: number
  amoebaeLength: number
  ciliateLength: number 
}

@inject(DialogController)
export class ZoomFieldModal implements IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number

  result: IZoomFieldModalResult

  // TODO: These should be stored in the model injected into this
  // For the demo just setting them here
  fungiRawData: IFilamentousRawData[] = []
  oomyceteRawData: IFilamentousRawData[] = []

  constructor(
    public dialogController: DialogController  // Used in View
  ) { }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber

    for (let i = 0; i < 10; i++) {
      this.fungiRawData.push({ length: null, diameter: null})
      this.oomyceteRawData.push({ length: null, diameter: null})
    }
  }

  save() {
    this.dialogController.ok(<IZoomFieldModalResult>{ ...this.result })
  }
}