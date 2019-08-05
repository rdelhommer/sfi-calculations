import { OrganismReading } from "../models/reading.model";

export const FOV_DIAMETER_MM = .45
export const FOV_AREA_MM_SQUARED = 3.14159 * (FOV_DIAMETER_MM/2)^2
export const DROPS_PER_ML = 20

export function defaultReadingFactory() {
  return [
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
}