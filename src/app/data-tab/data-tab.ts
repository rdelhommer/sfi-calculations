import './data-tab.scss'
import { ISession } from '../../services/session/session.service';
import { inject, observable } from 'aurelia-framework';
import { Succession, AerobicBacteria, PathogenicBacteria, AnaerobicBacteria, FieldPercentage, YesNo, FungalColor, OomyceteColor, DataEntry, CoverslipSize } from '../../util/enums';
import { IProfileModel } from '../../models/profile.model';
import { ISampleInfoModel, Sample } from '../../models/sample.model';
import { IOrganismReading } from '../../models/reading.model';
import { IStateManager } from '../../services/state/state-manager.service';
import { mean, stDev } from '../../util/misc';
import { FOV_DIAMETER_MM, DROPS_PER_ML, defaultReadingFactory } from '../../util/constants';
import { IOrganismData, NematodeData, ActinobacteriaData, MultiReadingData, DiameterReadingData, CountingData } from '../../models/organism.model';

export interface IBacteriaObs {
  fieldPercentage: FieldPercentage
  readings: number[]
  results: number[]
  aerobicBacteria: AerobicBacteria[]
  anaerobicBacteria: AnaerobicBacteria[]
  pathogenicBacteria: PathogenicBacteria[]
  aerobicBacteriaObserved: YesNo
  anaerobicBacteriaObserved: YesNo
  pathogenicBacteriaObserved: YesNo
  mean?: number
  stDev?: number
  meanNumBacteriaPerG?: number
  stDevNumBacteriaPerG?: number
  meanResult?: number
  stDevResult?: number
}

@inject(ISession, IStateManager)
export class DataTab {
  headerLeft: number
  
  observer: IProfileModel
  sample: ISampleInfoModel
  readings: IOrganismReading[][]
  canViewData: boolean
  canEditData: boolean

  Succession = Succession
  FieldPercentage = FieldPercentage
  YesNo = YesNo
  AerobicBacteria = AerobicBacteria
  AnaerobicBacteria = AnaerobicBacteria
  PathogenicBacteria = PathogenicBacteria
  FungalColor = FungalColor
  OomyceteColor = OomyceteColor
  CoverslipSize = CoverslipSize
  FOV_DIAMETER_MM = FOV_DIAMETER_MM
  DROPS_PER_ML = DROPS_PER_ML

  nematodeCalcs: IOrganismData[]
  organismReadings: { [key: string]: IOrganismReading[] } 
  organismCalcs: IOrganismData[]
  bacteriaObs: IBacteriaObs
  fbRatio: number

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  bind() {
    let sample = this.session.loadSample()
    this.observer = sample.observer
    this.sample = sample.sample

    let savedData = this.session.loadData(this.sample);
    if (savedData) {
      this.nematodeCalcs = savedData.nematodeCalcs
      this.organismCalcs = savedData.organismCalcs
      this.bacteriaObs = savedData.bacteriaObs
    } else {
      this.initData()
    }

    this.canEditData = this.observer.dataEntry === DataEntry.DataTab
    this.canViewData = this.observer.isValid && this.sample.isValid

    this.stateManager.onProfileUpdated(() => {
      this.observer = this.session.loadProfile();

      this.canEditData = this.observer.dataEntry === DataEntry.DataTab
      this.canViewData = this.observer.isValid && this.sample.isValid
    })

    this.stateManager.onReadingsUpdated(() => {
      if (this.observer.dataEntry === DataEntry.DataTab) return;

      this.readings = this.session.loadAllReadings();
      this.updateReadingCalcs()

      this.session.saveData({
        bacteriaObs: this.bacteriaObs,
        nematodeCalcs: this.nematodeCalcs,
        organismCalcs: this.organismCalcs,
      })
    })
  }

  private updateReadingCalcs() {
    this.organismReadings = { }
    this.readings.forEach((r) => {
      r.forEach(o => {
        
        if (!this.organismReadings[o.organism]) {
          this.organismReadings[o.organism] = []
        }

        this.organismReadings[o.organism].push(o)
      })
    })

    this.organismCalcs = Object.keys(this.organismReadings)
      .map(x => {
        switch(x) {
          case 'Actinobacteria':
            return ActinobacteriaData.fromReadings(this.organismReadings[x], this.sample)
          case 'Fungi':
          case 'Oomycetes':
            return DiameterReadingData.fromReadings(this.organismReadings[x], this.sample)
          default:
            return CountingData.fromReadings(this.organismReadings[x], this.sample)
        }
      })
  }

  initData() {
    this.readings = this.session.loadAllReadings()

    this.nematodeCalcs = [
      new NematodeData('Bacterial-feeding', this.sample),
      new NematodeData('Fungal-feeding', this.sample),
      new NematodeData('Predatory', this.sample),
      new NematodeData('Root-feeding', this.sample)
    ]

    this.bacteriaObs = {
      readings: new Array(5),
      results: new Array(5),
      aerobicBacteria: new Array(3),
      anaerobicBacteria: new Array(2),
      pathogenicBacteria: new Array(3),
      fieldPercentage: this.FieldPercentage.Whole,
      aerobicBacteriaObserved: null,
      anaerobicBacteriaObserved: null,
      pathogenicBacteriaObserved: null,
    }

    this.updateReadingCalcs()
  }

  saveTab() {
    this.session.saveSample(new Sample({
      observer: this.observer,
      sample: this.sample
    }))

    this.canViewData = this.observer.isValid && this.sample.isValid
    this.stateManager.sampleInfoUpdated()
  }

  updateBacteriaObsCalc() {
    this.bacteriaObs.results = this.bacteriaObs.readings
      .map(x => {
        if (!this.bacteriaObs.fieldPercentage || !x) return 0

        switch(this.bacteriaObs.fieldPercentage) {
          case this.FieldPercentage.Whole:
            return Number(x);
          case this.FieldPercentage.Half:
            return Number(x) * 2;
          case this.FieldPercentage.Quarter:
            return Number(x) * 4;
          default:
            return 0;
        }
      })

    this.bacteriaObs.mean = mean(this.bacteriaObs.results)
    this.bacteriaObs.stDev = stDev(this.bacteriaObs.results)
    this.bacteriaObs.meanNumBacteriaPerG = this.bacteriaObs.mean * this.sample.bacteriaDilution * DROPS_PER_ML * this.sample.coverslipNumFields
    this.bacteriaObs.meanResult = this.bacteriaObs.meanNumBacteriaPerG * 0.000002
    this.bacteriaObs.stDevNumBacteriaPerG = this.bacteriaObs.stDev * this.sample.bacteriaDilution * DROPS_PER_ML * this.sample.coverslipNumFields
    this.bacteriaObs.stDevResult = this.bacteriaObs.stDevNumBacteriaPerG * 0.000002

    this.session.saveData({
      bacteriaObs: this.bacteriaObs,
      nematodeCalcs: this.nematodeCalcs,
      organismCalcs: this.organismCalcs,
    })

    this.stateManager.dataTabUpdated()
  }

  updateCalc(data: IOrganismData) {
    data.update();

    let actinobacteriaData = this.organismCalcs.find(x => x.organismName === 'Actinobacteria')
    let fungiData = this.organismCalcs.find(x => x.organismName === 'Fungi')

    this.fbRatio = fungiData.meanResult / (actinobacteriaData.meanResult + this.bacteriaObs.meanResult)

    this.session.saveData({
      bacteriaObs: this.bacteriaObs,
      nematodeCalcs: this.nematodeCalcs,
      organismCalcs: this.organismCalcs,
    })

    this.stateManager.dataTabUpdated()
  }

  handleScroll($event) {
    this.headerLeft = $event.srcElement.scrollLeft
  }
}