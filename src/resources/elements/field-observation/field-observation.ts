import './field-observation.scss'
import { bindable } from "aurelia-framework";
import { IField, IFungiField } from "../reading-v2/reading-v2";

export class FieldObservation {
  @bindable field: IField | IFungiField
  @bindable fungiColorEnum: any
  @bindable fieldNumber: number
  @bindable organismName: string
  @bindable onEdit: ({ fieldNumber: number }) => void

  _onEdit() {
    this.onEdit({ fieldNumber: this.fieldNumber })
  }
}