import { IProfileModel, Profile } from "./profile.model";
import { SampleInfo, ISampleInfoModel } from "./sample.model";
import { IOrganismData, NematodeData, ActinobacteriaData, DiameterReadingData, CountingData } from "./organism.model";
import { IBacteriaObs } from "../app/data-tab/data-tab";

export interface IDataModel {
  observer: IProfileModel
  sample: ISampleInfoModel
  nematodeCalcs: IOrganismData[]
  organismCalcs: IOrganismData[]
  bacteriaObs: IBacteriaObs
}

export class DataModel implements IDataModel {
  observer: IProfileModel;
  sample: ISampleInfoModel;
  nematodeCalcs: IOrganismData[];
  organismCalcs: IOrganismData[];
  bacteriaObs: IBacteriaObs;

  constructor(
    init: Partial<IDataModel>
  ) { 
    this.observer = new Profile(init.observer) || new Profile({});
    this.sample = new SampleInfo(init.sample) || new SampleInfo({})

    this.nematodeCalcs = []
    init.nematodeCalcs.forEach(x => {
      this.nematodeCalcs.push(NematodeData.fromPartial(x, this.sample))
    })

    this.organismCalcs = []
    init.organismCalcs.forEach(x => {
      switch(x.organismName) {
        case 'Actinobacteria':
          this.organismCalcs.push(ActinobacteriaData.fromPartial(x, this.sample))
        case 'Fungi':
        case 'Oomycetes':
          this.organismCalcs.push(DiameterReadingData.fromPartial(x, this.sample))
        default:
          this.organismCalcs.push(CountingData.fromPartial(x, this.sample))
      }
    })

    this.bacteriaObs = init.bacteriaObs
  }
}