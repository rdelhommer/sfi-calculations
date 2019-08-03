import { IModel } from "./base.model";

export interface IOrganismReading extends IModel {
  type: string
  numMeasurements: number
  organism: string
  lengthMeasurements: { [key: number]: number }
  diameterMeasurements: { [key: number]: number }
  calculatedVolume: { [key: number]: number }
  totalLength: number
  averageDiameter: number
  totalVolume: number
  isField: boolean

  updateCalculatedLengthValues(): void
  updateCalculatedDiameterValues(): void
  updateCalculatedVolumeValues(): void
}

export class OrganismReading implements IOrganismReading {
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

  get validLengthMeasurements(): number[] {
    return Object.keys(this.lengthMeasurements)
      .map(x => Number(this.lengthMeasurements[x]))
      .filter(x => !Number.isNaN(x))
  }

  get validDiameterMeasurements(): number[] {
    return Object.keys(this.diameterMeasurements)
      .map(x => Number(this.diameterMeasurements[x]))
      .filter(x => !Number.isNaN(x))
  }

  get validCalculatedVolumes(): number[] {
    return Object.keys(this.calculatedVolume)
      .map(x => Number(this.calculatedVolume[x]))
      .filter(x => !Number.isNaN(x))
  }

  get isValid(): boolean {
    if (this.isField) {
      return this.validLengthMeasurements.length > 0
    } else {
      return this.validLengthMeasurements.length > 0
        && this.validDiameterMeasurements.length > 0
        && this.validCalculatedVolumes.length > 0
    }
  }

  updateCalculatedLengthValues() {
    this.totalLength = this.validLengthMeasurements
      .reduce((a, b) => a + b)
    
    if (this.isField) return
    
    this.updateCalculatedVolumeValues()
  }

  updateCalculatedDiameterValues() {
    const total = this.validDiameterMeasurements
      .reduce((a, b) => a + b)

    this.averageDiameter = total / this.totalLength
    
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
    this.totalVolume = this.validCalculatedVolumes
      .reduce((a, b) => a + b)
  }
}