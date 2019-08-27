import './field-observation.scss'
import { bindable, computedFrom } from "aurelia-framework";
import { ILengthField } from '../../../models/field/length-field.model';
import { IFungalField } from '../../../models/field/fungal-field.model';
import { ICountField } from '../../../models/field/count-field.model';
import { DataType } from '../../../models/organism/organism.model';

export class FieldObservation {
  @bindable field: ILengthField & IFungalField & ICountField
  @bindable fungiColorEnum: any
  @bindable fieldNumber: number
  @bindable organismName: string
  @bindable isLastField: boolean

  @bindable onEdit: ({ fieldNumber: number }) => Promise<void>
  private updateFlag: boolean

  DataType = DataType

  _onEdit() {
    this.onEdit({ fieldNumber: this.fieldNumber })
      .then(() => this.updateFlag = !this.updateFlag)
  }

  @computedFrom('updateFlag')
  get totalLength(): number {
    return this.field.totalLength
  }

  @computedFrom('updateFlag')
  get averageDiameter(): number {
    return this.field.averageDiameter
  }

  @computedFrom('updateFlag')
  get count(): number {
    return this.field.count
  }
}