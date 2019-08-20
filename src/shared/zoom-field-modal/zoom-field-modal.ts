import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";

export interface IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number
}

@inject(DialogController)
export class ZoomFieldModal implements IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number

  constructor(
    private dialogController: DialogController
  ) { }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber
  }
}