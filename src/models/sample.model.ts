import { Succession } from "../util/enums";
import { IProfileModel, Profile } from "./profile.model";
import { IModel } from "./base.model";

export interface ISampleInfoModel extends IModel {
  name: string
  type: string
  plant: string
  succession: Succession
  dateCollected: string // TODO: use a datepicker and Date type
  dateObserved: string // TODO: use a datepicker and Date type
  observedBy: string
  notes: string
  mainDilution: number
  bacteriaDilution: number
  fieldsPerReading: number
  dropsPerSample: number
  dropsPerMl: number
  coverslipSize: string
  eyepieceFieldSize: number
}

export class SampleInfo implements ISampleInfoModel {
  name: string;
  type: string;
  plant: string;
  succession: Succession;
  dateCollected: string;
  dateObserved: string;
  observedBy: string;
  notes: string;
  mainDilution: number;
  bacteriaDilution: number;
  fieldsPerReading: number;
  dropsPerSample: number;
  dropsPerMl: number;
  coverslipSize: string;
  eyepieceFieldSize: number;

  constructor(init: Partial<ISampleInfoModel>) {
    Object.assign(this, init)

    this.mainDilution = this.mainDilution == null ? 5 : this.mainDilution
    this.bacteriaDilution = this.bacteriaDilution == null ? 500 : this.bacteriaDilution
    this.fieldsPerReading = this.fieldsPerReading == null ? 5 : this.fieldsPerReading
    this.dropsPerSample = this.dropsPerSample == null ? 1 : this.dropsPerSample
    this.dropsPerMl = this.dropsPerMl == null ? 20 : this.dropsPerMl
    this.coverslipSize = this.coverslipSize || '18x18'
    this.eyepieceFieldSize = this.eyepieceFieldSize == null ? 18 : this.eyepieceFieldSize
  }

  get isValid(): boolean {
    return !!this.name
      && !!this.type
      && !!this.plant
      && !!this.succession
      && !!this.dateCollected
      && !!this.dateObserved
      && !!this.observedBy
      && !!this.mainDilution
      && !!this.bacteriaDilution
      && !!this.fieldsPerReading
      && !!this.dropsPerSample
      && !!this.dropsPerMl
      && !!this.coverslipSize
      && !!this.eyepieceFieldSize
  }
}

export interface ISampleModel extends IModel {
  observer: IProfileModel
  sample: ISampleInfoModel
}

export class Sample implements ISampleModel {
  observer: IProfileModel;  
  sample: ISampleInfoModel;

  constructor(init: Partial<ISampleModel>) {
    this.observer = new Profile(init.observer) || new Profile({});
    this.sample = new SampleInfo(init.sample) || new SampleInfo({})
  }
  
  get isValid(): boolean {
    return this.observer.isValid && this.sample.isValid
  }


}
