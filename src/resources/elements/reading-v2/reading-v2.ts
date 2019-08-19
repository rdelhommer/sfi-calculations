import './reading-v2.scss'
import { inject, bindable, customElement } from 'aurelia-framework';
import { ISession } from '../../../services/session/session.service';
import { IOrganismReading } from '../../../models/reading.model';
import { IStateManager } from '../../../services/state/state-manager.service';
import { FungalColor, OomyceteColor } from '../../../util/enums';

export interface IField {
  length: number
}

export interface IFungiField extends IField {
  diameter: number
  color: FungalColor | OomyceteColor
}

interface IReading {
  fields: IField[]
}

@customElement('reading-v2')
export class ReadingVTwo {

  @bindable reading: IReading
  @bindable readingNumber: number
  @bindable fungiColorEnum: any
  @bindable organismName: string

  readings: IOrganismReading[]

  isExpanded: boolean


  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }
}
