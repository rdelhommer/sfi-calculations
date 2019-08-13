import './reading.scss'
import { inject, bindable } from 'aurelia-framework';
import { ISession } from '../../../services/session/session.service';
import { IOrganismReading } from '../../../models/reading.model';
import { IStateManager } from '../../../services/state/state-manager.service';

@inject(ISession, IStateManager)
export class Reading {

  @bindable readingNumber: number

  readings: IOrganismReading[]

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  bind() {
    this.readings = this.session.loadReadings(this.readingNumber)
  }

  onLengthChanged(reading: IOrganismReading) {
    reading.updateCalculatedLengthValues();
    
    this.session.saveReadings(this.readingNumber, this.readings);
    this.stateManager.readingsUpdated()
  }

  onDiameterChanged(reading: IOrganismReading) {
    reading.updateCalculatedDiameterValues();

    this.session.saveReadings(this.readingNumber, this.readings);
    this.stateManager.readingsUpdated()
  }
}
