import './biomass.scss'
import { bindable } from 'aurelia-framework';
import { IOrganism } from '../../../models/organism/organism.model';

export class Biomass {
  @bindable() organism: IOrganism<any>
}