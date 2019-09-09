import './zoom-field-modal.scss'
import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";
import { ILengthField, LengthField } from '../../models/field/length-field.model';
import { IFungalField, FungalField } from '../../models/field/fungal-field.model';
import { ICountField, CountField } from '../../models/field/count-field.model';
import { DataType } from '../../models/organism/organism.model';
import { ValidationControllerFactory, ValidationController, ValidationRules } from 'aurelia-validation';
import { CustomRule } from '../../util/validation';
import { LengthData } from '../../resources/elements/length-data/length-data';
import { FungalData } from '../../resources/elements/fungal-data/fungal-data';

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

@inject(DialogController, ValidationControllerFactory)
export class ZoomFieldModal implements IZoomFieldModalModel{
  private validationController: ValidationController

  readingNumber: number
  fieldNumber: number
  organismName: string
  field: ILengthField | IFungalField | ICountField
  dataType: DataType
  result: IZoomFieldModalResult
  isErrored: boolean

  DataType = DataType

  constructor(
    public dialogController: DialogController,  // Used in View
    validationControllerFactory: ValidationControllerFactory
  ) {
    this.validationController = validationControllerFactory.createForCurrentScope()
  }
  
  activate(model: IZoomFieldModalModel) {
    this.fieldNumber = model.fieldNumber
    this.readingNumber = model.readingNumber
    this.organismName = model.organismName
    this.field = model.field
    this.dataType = model.dataType
  }

  async save() {
    this.validationController.addObject(this.field)
    let validationResult = await this.validationController.validate()

    this.isErrored = !validationResult.valid
    if (!validationResult.valid) return
    
    this.dialogController.ok(<IZoomFieldModalResult>{ ...this.result })
  }
}

ValidationRules
  .ensure((x: ILengthField) => x.lengthRawData).satisfiesRule(CustomRule.IsNumberArray)
  .on(LengthField)

ValidationRules
  .ensure((x: IFungalField) => x.lengthRawData).satisfiesRule(CustomRule.IsNumberArray)
  .ensure((x: IFungalField) => x.diameterRawData).satisfiesRule(CustomRule.IsNumberArray)
  .on(FungalField)

ValidationRules
  .ensure((x: ICountField) => x.count).satisfiesRule(CustomRule.IsNumber)
  .on(CountField)
