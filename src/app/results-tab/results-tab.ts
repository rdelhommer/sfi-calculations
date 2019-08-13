import './results-tab.scss'
import { ISession } from '../../services/session/session.service';
import { IStateManager } from '../../services/state/state-manager.service';
import { IDataModel } from '../../models/data.model';
import { IOrganismData, ActinobacteriaData, NematodeData } from '../../models/organism.model';
import { BacteriaResult, ActinobacteriaResult, FungiResult, FbResult, GoodProtozoaResult, NematodeResult, RootNematodeResult, OomyceteResult, CiliateResult } from '../../util/enums';
import { bacteriaResultDisplay, actinobacteriaResultDisplay, fungiResultDisplay, fbResultDisplay, goodProtozoaResultDisplay, bacteriaNematodeResultDisplay, fungalNematodeResultDisplay, predatoryNematodeResultDisplay, oomyceteResultDisplay, ciliateResultDisplay, rootNematodeResultDisplay } from '../../util/result-displays';
import { inject } from 'aurelia-framework';
import { ISampleInfoModel } from '../../models/sample.model';

export interface IResultsModel {
  bacteriaResult: BacteriaResult
  actinobacteriaResult: ActinobacteriaResult
  fungiResult: FungiResult
  fbResult: FbResult
  goodProtozoaResult: GoodProtozoaResult
  bacteriaNematodeResult: NematodeResult
  fungalNematodeResult: NematodeResult
  predatoryNematodeResult: NematodeResult
  oomyceteResult: OomyceteResult
  ciliateResult: CiliateResult
  rootNematodeResult: RootNematodeResult
}

@inject(ISession, IStateManager)
export class ResultsTab {
  sample: ISampleInfoModel

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

  BacteriaResult = BacteriaResult
  ActinobacteriaResult = ActinobacteriaResult
  FungiResult = FungiResult
  FbResult = FbResult
  GoodProtozoaResult = GoodProtozoaResult
  NematodeResult = NematodeResult
  RootNematodeResult = RootNematodeResult
  OomyceteResult = OomyceteResult
  CiliateResult = CiliateResult

  model: IResultsModel

  bacteriaResultDisplay = bacteriaResultDisplay
  actinobacteriaResultDisplay = actinobacteriaResultDisplay
  fungiResultDisplay = fungiResultDisplay
  fbResultDisplay = fbResultDisplay
  goodProtozoaResultDisplay = goodProtozoaResultDisplay
  bacteriaNematodeResultDisplay = bacteriaNematodeResultDisplay
  fungalNematodeResultDisplay = fungalNematodeResultDisplay
  predatoryNematodeResultDisplay = predatoryNematodeResultDisplay
  oomyceteResultDisplay = oomyceteResultDisplay
  ciliateResultDisplay = ciliateResultDisplay
  rootNematodeResultDisplay = rootNematodeResultDisplay

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

  private initResults(): IResultsModel {
    // TODO: Get the result ranges from Jennifer

    return <any>{}
  }

  saveResults() {
    this.session.saveResults(this.model);
  }

  bind() {
    this.sample = this.session.loadSample().sample
    this.data = this.session.loadData(this.sample);

    if (this.data) {
      this.setOrgModels();
    }

    let savedResults = this.session.loadResults()
    this.model = savedResults || this.initResults();

    this.stateManager.onSampleInfoUpdated(() => {
      this.sample = this.session.loadSample().sample
      this.data = this.session.loadData(this.sample)
      
      this.initResults()
      this.saveResults()
    })
    this.stateManager.onDataTabUpdated(() => {
      this.data = this.session.loadData(this.sample)
      
      this.initResults()
      this.saveResults()
    })
  }
}