import './reading.scss'
import { inject, bindable } from 'aurelia-framework';
import { ISession } from '../../../services/session/session.service';
import { IOrganismReading } from '../../../models/reading.model';

@inject(ISession)
export class Reading {

  @bindable readingNumber: number

  readings: IOrganismReading[]

  constructor(
    private session: ISession
  ) { }

  bind() {
    this.readings = this.session.loadReadings(this.readingNumber)
  }

  onLengthChanged(reading: IOrganismReading) {
    reading.updateCalculatedLengthValues();
    
    this.session.saveReadings(this.readingNumber, this.readings);
  }

  onDiameterChanged(reading: IOrganismReading) {
    reading.updateCalculatedDiameterValues();

    this.session.saveReadings(this.readingNumber, this.readings);
  }
}
