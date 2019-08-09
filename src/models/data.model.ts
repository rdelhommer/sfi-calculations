import { IOrganismData, NematodeData, ActinobacteriaData, DiameterReadingData, CountingData } from "./organism.model";
import { IBacteriaObs } from "../app/data-tab/data-tab";
import { ISampleModel, ISampleInfoModel } from "./sample.model";

export interface IDataModel {
  nematodeCalcs: IOrganismData[]
  organismCalcs: IOrganismData[]
  bacteriaObs: IBacteriaObs
}

export class DataModel implements IDataModel {
  nematodeCalcs: IOrganismData[];
  organismCalcs: IOrganismData[];
  bacteriaObs: IBacteriaObs;

  constructor(
    init: Partial<IDataModel>,
    sample: ISampleInfoModel
  ) { 
    this.nematodeCalcs = []
    init.nematodeCalcs.forEach(x => {
      this.nematodeCalcs.push(NematodeData.fromPartial(x, sample))
    })

    this.organismCalcs = []
    init.organismCalcs.forEach(x => {
      switch(x.organismName) {
        case 'Actinobacteria':
          this.organismCalcs.push(ActinobacteriaData.fromPartial(x, sample))
        case 'Fungi':
        case 'Oomycetes':
          this.organismCalcs.push(DiameterReadingData.fromPartial(x, sample))
        default:
          this.organismCalcs.push(CountingData.fromPartial(x, sample))
      }
    })

    this.bacteriaObs = init.bacteriaObs
  }
}