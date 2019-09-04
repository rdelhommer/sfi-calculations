import './biomass.scss'
import { bindable, computedFrom } from 'aurelia-framework';
import { IOrganism } from '../../../models/organism/organism.model';

export class Biomass {
  @bindable() organism: IOrganism<any>
  @bindable() updateFlag: boolean

  @computedFrom('updateFlag')
  get meanResult(): number {
    return this.organism.meanResult
  }

  @computedFrom('updateFlag')
  get stDevResult(): number {
    return this.organism.stDevResult
  }
}