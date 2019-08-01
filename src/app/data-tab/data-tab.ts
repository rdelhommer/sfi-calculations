import './data-tab.scss'
import { ISession } from '../../services/session/session.service';
import { inject, observable } from 'aurelia-framework';
import { Succession } from '../../util/enums';
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

@inject(ISession, IStateManager)
export class DataTab {
  
  observer: IProfileModel
  sample: ISampleInfoModel
  readings: IOrganismReading[][]
  canViewData: boolean

  Succession = Succession

  nematodeCalcs: ISingleReadingCalc[]
  organismReadings: { [key: string]: IOrganismReading[] } 
  organismCalcs: IMultiReadingCalc[]

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
}