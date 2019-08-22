import './fungal-data.scss'
import { bindable, computedFrom } from 'aurelia-framework';
import { IFungalField } from '../../../models/field.model';

export class FungalData {
  @bindable field: IFungalField
  updateFlag: boolean

  @computedFrom('updateFlag')
  get totalLength(): number {
    return this.field.totalLength
  }

  @computedFrom('updateFlag')
  get averageDiameter(): number {
    return this.field.averageDiameter
  }
}