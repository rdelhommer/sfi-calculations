import './succession.scss'

export interface IPlantSuccession {
  plant: string
  bacteria: string
  fungi: string
  fB: string
  actinobacteria: string
  oomycetes: string
  flagellatesAndAmoebae: string
  ciliates: string
  nematode: string
}

export class Succession {
  rows:IPlantSuccession[] = [{
    plant: 'Weeds',
    bacteria: '300 - 1,000',
    fungi: '5 - 50',
    fB: '100% B - 0.3:1',
    actinobacteria: '20 - 100',
    oomycetes: '0',
    flagellatesAndAmoebae: '1,000 - 10,000',
    ciliates: '0',
    nematode: '10 Bf<br/>0 Ff<br/>0 Pred'
  }, {
    plant: 'Early Grasses/Brassica',
    bacteria: '300 - 2,000',
    fungi: '100 - 200',
    fB: '0.3:1 - 0.5:1',
    actinobacteria: '12',
    oomycetes: '0',
    flagellatesAndAmoebae: '10,000 - 50,000',
    ciliates: '0',
    nematode: '100 Bf<br/>0 Ff<br/>0 Pred'
  }, {
    plant: 'Mid-Grasses/Vegetables',
    bacteria: '300 - 1,000',
    fungi: '150 - 500',
    fB: '0.5:1 - 0.8:1',
    actinobacteria: '1 - 6',
    oomycetes: '0',
    flagellatesAndAmoebae: '>50,000',
    ciliates: '0',
    nematode: '100 Bf<br/>10 Ff<br/>1 Pred'
  }, {
    plant: 'Perennial grasses, row crops',
    bacteria: '300 - 3,000',
    fungi: '300 - 3,000',
    fB: '0.8:1 - 1:1',
    actinobacteria: '1 - 4',
    oomycetes: '0',
    flagellatesAndAmoebae: '>50,000',
    ciliates: '0',
    nematode: '200 Bf<br/>20 Ff<br/>2 Pred'
  }, {
    plant: 'Shrubs, vines',
    bacteria: '300 - 3,000',
    fungi: '600 - 6,000',
    fB: '2:1 - 5:1',
    actinobacteria: '0 -1',
    oomycetes: '0',
    flagellatesAndAmoebae: '>50,000',
    ciliates: '0',
    nematode: '200 Bf<br/>20 Ff<br/>4 Pred'
  }, {
    plant: 'Deciduous Trees',
    bacteria: '300 - 2,000',
    fungi: '1,200 - 20,000',
    fB: '5:1 - 100:1',
    actinobacteria: '0 - 1',
    oomycetes: '0',
    flagellatesAndAmoebae: '10,000 - 50,000',
    ciliates: '0',
    nematode: '200 Bf<br/>20 Ff<br/>4 Pred'
  }, {
    plant: 'Evergreen Trees',
    bacteria: '300 - 1,000',
    fungi: '3,000 - 100,000',
    fB: '100:1 - 1,000:1',
    actinobacteria: '0 - 1',
    oomycetes: '0',
    flagellatesAndAmoebae: '10-000, 50-000',
    ciliates: '0',
    nematode: '200 Bf<br/>20 Ff<br/>4 Pred'
  }]
}