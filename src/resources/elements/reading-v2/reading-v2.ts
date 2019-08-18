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
@inject(ISession, IStateManager)
export class ReadingVTwo {

  reading: IReading
  @bindable readingNumber: number
  @bindable fungiColorEnum: any
  @bindable organismName: string

  readings: IOrganismReading[]

  isExpanded: boolean

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  bind() {
    this.reading = <any>{ }
    this.reading.fields = new Array(5).map(x => {
      return !!this.fungiColorEnum
        ? {
            length: null,
            diameter: null,
            color: null
          }
        : {
            length: null
          }
    });
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded
  }

  // onLengthChanged(reading: IOrganismReading) {
  //   reading.updateCalculatedLengthValues();
    
  //   this.session.saveReadings(this.readingNumber, this.readings);
  //   this.stateManager.readingsUpdated()
  // }

  // onDiameterChanged(reading: IOrganismReading) {
  //   reading.updateCalculatedDiameterValues();

  //   this.session.saveReadings(this.readingNumber, this.readings);
  //   this.stateManager.readingsUpdated()
  // }
}
