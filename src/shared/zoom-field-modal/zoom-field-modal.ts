import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { ILengthField, IFungalField } from '../../models/field.model';

export interface IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number
  organismName: string
  field: ILengthField | IFungalField
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
  field: ILengthField | IFungalField
  isDiameter: boolean

  result: IZoomFieldModalResult

  constructor(
    public dialogController: DialogController  // Used in View
  ) { }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber
    this.organismName = model.organismName
    this.field = model.field
    this.isDiameter = model.isDiameter
  }

  save() {
    this.dialogController.ok(<IZoomFieldModalResult>{ ...this.result })
  }
}