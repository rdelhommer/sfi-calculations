import { Succession, CoverslipSize } from "../util/enums";
import { IProfileModel, Profile } from "./profile.model";
import { IModel } from "./base.model";
import { thisTypeAnnotation } from "@babel/types";
import { round } from "../util/misc";

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
  dropsPerSample: number
  dropsPerMl: number
  coverslipSize: CoverslipSize
  coverslipArea: number
  coverslipNumFields: number
  eyepieceFieldSize: number
  fovDiameterMm: number
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
  dropsPerSample: number;
  dropsPerMl: number;
  coverslipSize: CoverslipSize;
  eyepieceFieldSize: number;

  constructor(init: RecursivePartial<ISampleInfoModel> = { }) {
    Object.assign(this, init)

    this.mainDilution = this.mainDilution == null ? 5 : this.mainDilution
    this.bacteriaDilution = this.bacteriaDilution == null ? 500 : this.bacteriaDilution
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

  get fovDiameterMm(): number {
    return this.eyepieceFieldSize / 40
  }

  get _fovArea(): number {
    return 3.14159 * (this.fovDiameterMm / 2) * (this.fovDiameterMm / 2)
  }

  get coverslipNumFields() {
    return Number(round(this.coverslipArea / this._fovArea, 1).toFixed(0))
  }

  get isValid(): boolean {
    return !!this.name && this.name !== ''
      && !!this.type && this.type !== ''
      && !!this.plant && this.plant !== ''
      && !!this.succession
      && !!this.dateCollected && this.dateCollected !== ''
      && !!this.dateObserved && this.dateObserved !== ''
      && !!this.observedBy && this.observedBy !== ''
      && this.mainDilution != null
      && this.bacteriaDilution != null
      && this.dropsPerSample != null
      && this.dropsPerMl != null
      && !!this.coverslipSize
      && this.eyepieceFieldSize != null
  }
}

export interface ISampleModel extends IModel {
  observer: IProfileModel
  sample: ISampleInfoModel
}

export class Sample implements ISampleModel {
  observer: IProfileModel;  
  sample: ISampleInfoModel;

  constructor(init: RecursivePartial<ISampleModel> = { }) {
    this.observer = init.observer ? Profile.fromPartial(init.observer) : Profile.fromPartial({});
    this.sample = init.sample ? new SampleInfo(init.sample) : new SampleInfo({})
  }
  
  get isValid(): boolean {
    return this.observer.isValid && this.sample.isValid
  }


}

