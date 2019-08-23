import { IModel } from "./base.model";
import { ILengthField, IFungalField, LengthField, FungalField } from "./field.model";

export const NUM_MIN_FIELDS = 5

export interface ILengthReading extends IModel {
  fields: ILengthField[]
}

export interface IFungalReading extends IModel {
  fields: IFungalField[]
}

export class LengthReading implements ILengthReading {
  fields: ILengthField[];  

  constructor(init: Partial<ILengthReading> = { }) {
    Object.assign(this, init)

    if (!this.fields) {
      this.fields = []
    }
  
    let initTo = this.fields.length > NUM_MIN_FIELDS 
      ? this.fields.length 
      : NUM_MIN_FIELDS
    for (let i = 0; i < initTo; i++) {
      if (i < this.fields.length) {
        this.fields[i] = new LengthField(this.fields[i])
      } else {
        this.fields.push(new LengthField())
      }
    }
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}

export class FungalReading implements IFungalReading {
  fields: IFungalField[];
  
  constructor(init: Partial<IFungalReading> = { }) {
    Object.assign(this, init)
    
    if (!this.fields) {
      this.fields = []
    }
  
    let initTo = this.fields.length > NUM_MIN_FIELDS 
      ? this.fields.length 
      : NUM_MIN_FIELDS
    for (let i = 0; i < initTo; i++) {
      if (i < this.fields.length) {
        this.fields[i] = new FungalField(this.fields[i])
      } else {
        this.fields.push(new FungalField())
      }
    }
  }
  
  get isValid(): boolean {
    return this.fields.every(x => x.isValid)
  }
}

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
    let totalLength = this.validLengthMeasurements
      .reduce((a, b) => a + b)

    this.totalLength = Number(totalLength.toFixed(2))
    
    if (this.isField) return
    
    this.updateCalculatedVolumeValues()
  }

  updateCalculatedDiameterValues() {
    const total = this.validDiameterMeasurements
      .reduce((a, b) => a + b)

    this.averageDiameter = Number((total / this.totalLength).toFixed(2))
    
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
    let totalVolume = this.validCalculatedVolumes
      .reduce((a, b) => a + b)

    this.totalVolume = Number(totalVolume.toFixed(2))
  }
}