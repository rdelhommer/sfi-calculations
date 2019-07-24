import './reading.scss'
import { autoinject, inject } from 'aurelia-framework';
import { ISession } from '../../../services/session/session.service';
import { LocalStorageSession } from '../../../services/session/local-storage-session.service';

export interface IOrganismReading {
  type: string
  numMeasurements: number
  organism: string
  lengthMeasurements: { [key: number]: number }
  diameterMeasurements: { [key: number]: number }
  calculatedVolume: { [key: number]: number }
  totalLength: number
  averageDiameter: number
  totalVolume: number
}

class OrganismReading implements IOrganismReading {
  calculatedVolume: { [key: number]: number; };
  totalLength: number;
  averageDiameter: number;
  totalVolume: number;
  lengthMeasurements: { [key: number]: number };
  diameterMeasurements: { [key: number]: number };
  type: string;  
  numMeasurements: number;
  organism: string;

  constructor(init: Partial<IOrganismReading>) {
    Object.assign(this, init);
    this.lengthMeasurements = this.lengthMeasurements || {};
    this.diameterMeasurements = this.diameterMeasurements || {};
    this.calculatedVolume = this.calculatedVolume || {};
  }

  get isField(): boolean {
    return this.type === 'field'
  }

  updateCalculatedLengthValues() {
    this.totalLength = Object.keys(this.lengthMeasurements)
      .map(x => Number(this.lengthMeasurements[x]))
      .filter(x => !Number.isNaN(x))
      .reduce((a, b) => a + b)
    
    if (this.isField) return
    
    this.updateCalculatedVolumeValues()
  }

  updateCalculatedDiameterValues() {
    // valid keys are non-zero numbers
    const validKeys = Object.keys(this.diameterMeasurements)
      .map(x => Number(this.diameterMeasurements[x]))
      .filter(x => x && !Number.isNaN(x))

    const total = validKeys
      .reduce((a, b) => a + b)

    this.averageDiameter = total / validKeys.length

    this.updateCalculatedVolumeValues()
  }

  updateCalculatedVolumeValues() {
    // Update calculated volumes
    for (let i = 0; i < this.numMeasurements; i++) {
      const length = Number(this.lengthMeasurements[i]);
      const diameter = Number(this.diameterMeasurements[i]);
      
      if (!Number.isNaN(length) && !Number.isNaN(diameter)) {
        this.calculatedVolume[i] = length * diameter;
      }
    }

    // Update total volume
    this.totalVolume = Object.keys(this.calculatedVolume)
      .map(x => Number(this.calculatedVolume[x]))
      .filter(x => !Number.isNaN(x))
      .reduce((a, b) => a + b)
  }
}

@inject(ISession)
export class Reading {

  readings: OrganismReading[] = [
    new OrganismReading({
      numMeasurements: 10,
      organism: 'Actinobacteria',
      type: 'field'
    }), 
    new OrganismReading({
      numMeasurements: 17,
      organism: 'Fungi',
      type: 'volume'
    }), 
    new OrganismReading({
      numMeasurements: 17,
      organism: 'Oomycetes',
      type: 'volume'
    }), 
    new OrganismReading({
      numMeasurements: 10,
      organism: 'Flagellates',
      type: 'field'
    }), 
    new OrganismReading({
      numMeasurements: 10,
      organism: 'Amoebae',
      type: 'field'
    }),
    new OrganismReading({
      numMeasurements: 10,
      organism: 'Ciliates',
      type: 'field'
    })
  ]

  constructor(
    private session: ISession
  ) { }

  onLengthChanged(reading: OrganismReading) {
    reading.updateCalculatedLengthValues();
    
    this.session.saveReadingTab(this.readings);
  }

  onDiameterChanged(reading: OrganismReading) {
    reading.updateCalculatedDiameterValues();

    this.session.saveReadingTab(this.readings);
  }
}
