import { OrganismReading } from "../models/reading.model";

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