import './data-tab.scss'
import { ISession } from '../../services/session/session.service';
import { inject, observable } from 'aurelia-framework';
import { Succession, AerobicBacteria, PathogenicBacteria, AnaerobicBacteria, FieldPercentage, YesNo, FungalColor, OomyceteColor } from '../../util/enums';
import { IProfileModel } from '../../models/profile.model';
import { ISampleInfoModel, Sample } from '../../models/sample.model';
import { IOrganismReading } from '../../models/reading.model';
import { IStateManager } from '../../services/state/state-manager.service';
import { mean, stDev } from '../../util/misc';

interface ISingleReadingCalc {
  header: string
  mean?: number
  stdev?: number
}

interface IMultiReadingCalc {
  header: string
  isField: boolean
  hasExpanded: boolean
  lengthMean?: number
  lengthStDev?: number
  diameterMean?: number
  diameterStDev?: number
}

interface IBacteriaObs {
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
}

@inject(ISession, IStateManager)
export class DataTab {
  
  observer: IProfileModel
  sample: ISampleInfoModel
  readings: IOrganismReading[][]
  canViewData: boolean

  Succession = Succession
  FieldPercentage = FieldPercentage
  YesNo = YesNo
  AerobicBacteria = AerobicBacteria
  AnaerobicBacteria = AnaerobicBacteria
  PathogenicBacteria = PathogenicBacteria
  FungalColor = FungalColor
  OomyceteColor = OomyceteColor

  nematodeCalcs: ISingleReadingCalc[]
  organismReadings: { [key: string]: IOrganismReading[] } 
  organismCalcs: IMultiReadingCalc[]
  bacteriaObs: IBacteriaObs

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  bind() {
    let model = this.session.loadSample();

    this.observer = model.observer
    this.sample = model.sample
    this.readings = this.session.loadAllReadings();

    this.canViewData = this.observer.isValid && this.sample.isValid

    this.nematodeCalcs = [{
      header: 'Bacterial-feeding'
    }, {
      header: 'Fungal-feeding'
    }, {
      header: 'Predatory'
    }, {
      header: 'Root-feeding'
    }]

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
      .map(x => ({
        header: x,
        hasExpanded: x === 'Actinobacteria' || x === 'Oomycetes' || x === 'Fungi',
        isField: this.organismReadings[x][0].isField
      }))

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
  }

  saveTab() {
    this.session.saveSample(new Sample({
      observer: this.observer,
      sample: this.sample
    }))

    this.canViewData = this.observer.isValid && this.sample.isValid
    this.stateManager.sampleInfoUpdated()
  }

  updateReadingCalc(calc: IMultiReadingCalc & ISingleReadingCalc) {
    let readings = this.organismReadings[calc.header]
    let normalizedLengths = readings.map(x => {
      let length = x.totalLength == null ? 0 : x.totalLength
      return length / this.sample.fieldsPerReading
    })

    calc.lengthMean = mean(normalizedLengths)
    calc.lengthStDev = stDev(normalizedLengths)
  }

  updateBacteriaObsCalc() {
    console.log(this.bacteriaObs.fieldPercentage);
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
  }
}