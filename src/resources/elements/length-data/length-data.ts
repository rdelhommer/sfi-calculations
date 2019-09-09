import './length-data.scss'

import { bindable, computedFrom, inject } from 'aurelia-framework';
import { ILengthField } from '../../../models/field/length-field.model';

export class LengthData {
  @bindable field: ILengthField

  updateFlag: boolean

  @computedFrom('updateFlag')
  get totalLength(): number {
    return this.field.totalLength
  }
}

