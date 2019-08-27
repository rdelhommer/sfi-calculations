import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { ILengthField } from '../../models/field/length-field.model';
import { IFungalField } from '../../models/field/fungal-field.model';
import { ICountField } from '../../models/field/count-field.model';
import { DataType } from '../../models/organism/organism.model';

export interface IZoomFieldModalModel {
  readingNumber: number
  fieldNumber: number
  organismName: string
  field: ILengthField | IFungalField | ICountField
  dataType: DataType
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
  field: ILengthField | IFungalField | ICountField
  dataType: DataType
  result: IZoomFieldModalResult

  DataType = DataType

  constructor(
    public dialogController: DialogController  // Used in View
  ) { }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber
    this.organismName = model.organismName
    this.field = model.field
    this.dataType = model.dataType
  }

  save() {
    this.dialogController.ok(<IZoomFieldModalResult>{ ...this.result })
  }
}