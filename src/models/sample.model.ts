import { Succession, CoverslipSize } from "../util/enums";
import { IProfileModel, Profile } from "./profile.model";
import { IModel } from "./base.model";
import { FOV_AREA_MM_SQUARED } from "../util/constants";

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
  coverslipSize: CoverslipSize
  coverslipArea: number
  coverslipNumFields: number
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
  coverslipSize: CoverslipSize;
  eyepieceFieldSize: number;

  constructor(init: Partial<ISampleInfoModel>) {
    Object.assign(this, init)

    this.mainDilution = this.mainDilution == null ? 5 : this.mainDilution
    this.bacteriaDilution = this.bacteriaDilution == null ? 500 : this.bacteriaDilution
    this.fieldsPerReading = this.fieldsPerReading == null ? 5 : this.fieldsPerReading
    this.dropsPerSample = this.dropsPerSample == null ? 1 : this.dropsPerSample
    this.dropsPerMl = this.dropsPerMl == null ? 20 : this.dropsPerMl
    this.coverslipSize = this.coverslipSize || CoverslipSize.EighteenSquare
    this.eyepieceFieldSize = this.eyepieceFieldSize == null ? 18 : this.eyepieceFieldSize
  }

  get coverslipArea() {
    if (!this.coverslipSize) return null

    let dimensions =this.coverslipSize.toLowerCase()
      .split('x')
      .map(x => Number(x));

    if (dimensions.length === 0 || dimensions.some(x => Number.isNaN(x))) return null

    return dimensions[0] * dimensions[1]
  }

  get coverslipNumFields() {
    return this.coverslipArea / FOV_AREA_MM_SQUARED
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
    this.observer = init.observer ? new Profile(init.observer) : new Profile({});
    this.sample = init.sample ? new SampleInfo(init.sample) : new SampleInfo({})
  }
  
  get isValid(): boolean {
    return this.observer.isValid && this.sample.isValid
  }


}

