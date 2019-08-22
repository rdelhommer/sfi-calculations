import './field-observation.scss'
import { bindable } from "aurelia-framework";
import { ILengthField, IDiameterField } from "../reading-v2/reading-v2";

export class FieldObservation {
  @bindable field: ILengthField | IDiameterField
  @bindable fungiColorEnum: any
  @bindable fieldNumber: number
  @bindable organismName: string
  @bindable isLastField: boolean

  @bindable onEdit: ({ fieldNumber: number }) => void

  _onEdit() {
    this.onEdit({ fieldNumber: this.fieldNumber })
  }
}