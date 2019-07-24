import './data-tab.scss'
import { ISession } from '../../services/session/session.service';
import { inject } from 'aurelia-framework';
import { IProfileModel } from '../settings-tab/settings-tab';
import { Succession } from '../../util/enums';

export interface ISampleModel {
  name: string
  type: string
  plant: string
  succession: Succession
  dateCollected: string // TODO: use a datepicker and Date type
  dateObserved: string // TODO: use a datepicker and Date type
  observedBy: string
  notes: string
}

export interface IDataModel {
  profile: IProfileModel 
  sample: ISampleModel
}

@inject(ISession)
export class DataTab {
  
  profile: IProfileModel
  sample: ISampleModel
  Succession = Succession

  constructor(
    private session: ISession
  ) { }

  bind() {
    let model = this.session.getDataTab();
    this.profile = { ...model.profile }
    this.sample = { ...model.sample }
  }

  saveTab() {
    this.session.saveDataTab({
      profile: this.profile,
      sample: this.sample
    })
  }
}