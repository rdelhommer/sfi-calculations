import './field-observation.scss'
import { bindable, computedFrom } from "aurelia-framework";
import { IFungalField, ILengthField } from '../../../models/field.model';

export class FieldObservation {
  @bindable field: ILengthField & IFungalField
  @bindable fungiColorEnum: any
  @bindable fieldNumber: number
  @bindable organismName: string
  @bindable isLastField: boolean

  @bindable onEdit: ({ fieldNumber: number }) => void

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