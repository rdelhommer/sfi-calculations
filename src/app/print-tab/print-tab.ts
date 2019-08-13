import { IOrganismData } from "../../models/organism.model";
import { IDataModel } from "../../models/data.model";
import { ISession } from "../../services/session/session.service";
import { IStateManager } from "../../services/state/state-manager.service";
import { inject } from "aurelia-framework";
import { ISampleInfoModel } from "../../models/sample.model";
import { IProfileModel } from "../../models/profile.model";

@inject(ISession, IStateManager)
export class PrintTab {
  sample: ISampleInfoModel
  observer: IProfileModel

  data: IDataModel
  actinobacteriaData: IOrganismData
  fungiData: IOrganismData
  oomycetesData: IOrganismData
  flagellateData: IOrganismData
  amoebaeData: IOrganismData
  ciliatesData: IOrganismData
  bacteriaNematodeData: IOrganismData
  fungalNematodeData: IOrganismData
  predatoryNematodeData: IOrganismData
  rootNematodeData: IOrganismData

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  private setOrgModels() {
    this.actinobacteriaData = this.data.organismCalcs.find(x => x.organismName === 'Actinobacteria')
    this.fungiData = this.data.organismCalcs.find(x => x.organismName === 'Fungi')
    this.oomycetesData = this.data.organismCalcs.find(x => x.organismName === 'Oomycetes')
    this.flagellateData = this.data.organismCalcs.find(x => x.organismName === 'Flagellates')
    this.amoebaeData = this.data.organismCalcs.find(x => x.organismName === 'Amoebae')
    this.ciliatesData = this.data.organismCalcs.find(x => x.organismName === 'Ciliates')
    this.bacteriaNematodeData = this.data.nematodeCalcs.find(x => x.organismName === 'Bacterial-feeding')
    this.fungalNematodeData = this.data.nematodeCalcs.find(x => x.organismName === 'Fungal-feeding')
    this.predatoryNematodeData = this.data.nematodeCalcs.find(x => x.organismName === 'Predatory')
    this.rootNematodeData = this.data.nematodeCalcs.find(x => x.organismName === 'Root-feeding')
  }

  bind() {
    let sample = this.session.loadSample();
    this.sample = sample.sample
    this.observer = sample.observer

    this.data = this.session.loadData(this.sample);

    if (this.data) {
      this.setOrgModels();
    }

    this.stateManager.onSampleInfoUpdated(() => {
      let sample = this.session.loadSample();
      this.sample = sample.sample
      this.observer = sample.observer
      
      this.data = this.session.loadData(this.sample);
      this.setOrgModels();
    })

    this.stateManager.onDataTabUpdated(() => {
      this.data = this.session.loadData(this.sample);
      this.setOrgModels();
    })

    this.stateManager.onDataTabUpdated(() => {
      this.data = this.session.loadData(this.sample);
      this.setOrgModels();
    })
  }
}