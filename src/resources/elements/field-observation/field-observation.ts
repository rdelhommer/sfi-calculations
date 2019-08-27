import './field-observation.scss'
import { bindable } from "aurelia-framework";
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

  @bindable onEdit: ({ fieldNumber: number }) => void

  DataType = DataType

  _onEdit() {
    this.onEdit({ fieldNumber: this.fieldNumber })
  }

  // TODO: add computed from to only get this on initial read and after the modal is updated
  get totalLength(): number {
    return this.field.totalLength
  }

  get averageDiameter(): number {
    return this.field.averageDiameter
  }
}