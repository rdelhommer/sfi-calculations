import '../util/misc'

import { ISampleInfoModel } from "./sample.model";
import { IOrganismReading } from "./reading.model";

function initData(ret: IOrganismData, init: Partial<IOrganismData>): IOrganismData {
  Object.keys(init).forEach(k => {
    if (Array.isArray(init[k])) {
      init[k].forEach((x, i) => {
        ret[k][i] = init[k][i]
      })
      ret[k]
    } else {
      ret[k] = init[k]
    }
  })

  return ret;
}

export interface IOrganismData {
  organismName: string
  lengths: number[]
  diameters?: number[]
  lengthMeanMm: number
  lengthMeanCm: number
  lengthStDevMm: number
  lengthStDevCm: number
  lengthMeanCmPerG: number
  meanResult: number
  lengthStDevCmPerG: number
  stDevResult: number
  averageDiameterCm?: number
  averageDiameterUm?: number
  dilution: number
  hasExpanded: boolean
  isField:  boolean
  isCounting: boolean

  update(): void 
}

export class NematodeData implements IOrganismData {
  lengthMeanMm: number;
  lengthMeanCm: number;
  lengthStDevCm: number;
  meanResult: number;
  lengths: number[] = new Array(1)
  diameters?: number[] = new Array(1)
  
  lengthStDevMm: number = 0;
  lengthMeanCmPerG: number;
  lengthStDevCmPerG: number ;
  stDevResult: number = 0;
  averageDiameterCm: number = 0;
  averageDiameterUm: number = 0;
  dilution: number ;
  hasExpanded: boolean = false;
  isField: boolean = false;
  isCounting: boolean = false;

  static fromPartial(init: Partial<IOrganismData>, sample: ISampleInfoModel): IOrganismData {
    let sampleClone = { ...sample }
    if (init.dilution != null) {
      sampleClone.mainDilution = init.dilution
    }

    let ret = new NematodeData(init.organismName, sampleClone);
    return initData(ret, init);
  }

  constructor(public organismName: string, sample: ISampleInfoModel) {
    this.dilution = sample.mainDilution
  }

  update() {
    this.lengthMeanMm = this._lengthMeanMm;
    this.lengthMeanCm = this._lengthMeanCm;
    this.meanResult = this._meanResult
  }

  get _lengthMeanMm(): number {
    return this.lengths[0];
  }

  get _lengthMeanCm(): number {
    return this._lengthMeanMm / 10;
  }

  get _meanResult(): number {
    return this._lengthMeanMm * this.dilution// * DROPS_PER_ML
  }
}

export abstract class MultiReadingData implements IOrganismData {
  lengthMeanMm: number;
  lengthMeanCm: number;
  lengthStDevMm: number;
  lengthStDevCm: number;
  lengths: number[] = new Array(5);  
  diameters?: number[] = new Array(5);
  dilution: number = this.sample.mainDilution;

  abstract lengthMeanCmPerG: number;
  abstract meanResult: number;
  abstract lengthStDevCmPerG: number;
  abstract stDevResult: number;
  abstract averageDiameterCm: number;
  abstract averageDiameterUm: number;
  abstract hasExpanded: boolean;
  abstract isField: boolean;
  abstract isCounting: boolean;
  
  constructor(
    public organismName: string,
    protected sample: ISampleInfoModel
  ) { }

  protected normalize(array: number[]) {
    return array.map(x => {
      let length = x == null ? 0 : x
      return length / 5
    })
  }

  update(): void {
    this.lengthMeanMm = this._lengthMeanMm;
    this.lengthMeanCm = this._lengthMeanCm;
    this.lengthStDevMm = this._lengthStDevMm
    this.lengthStDevCm = this._lengthStDevCm
  }

  get _lengthMeanMm(): number {
    return this.normalize(this.lengths).mean();
  }

  get _lengthMeanCm(): number {
    return 0
    // return this._lengthMeanMm * FOV_DIAMETER_MM / 10;
  }

  get _lengthStDevMm(): number {
    return this.normalize(this.lengths).stDev()
  }

  get _lengthStDevCm(): number {
    return 0
    // return this._lengthStDevMm * FOV_DIAMETER_MM / 10;
  }
}

export class ActinobacteriaData extends MultiReadingData {
  lengthMeanCmPerG: number;
  meanResult: number;
  lengthStDevCmPerG: number;
  stDevResult: number;
  averageDiameterCm: number = 0;
  averageDiameterUm: number = 0;
  hasExpanded: boolean = true;
  isField: boolean = true;
  isCounting: boolean = false;

  constructor(
    sample: ISampleInfoModel
  ) { 
    super('Actinobacteria', sample);
  }

  static fromReadings(readings: IOrganismReading[], sample: ISampleInfoModel): IOrganismData {
    let ret = this.fromPartial({}, sample);

    readings.forEach((x, i) => {
      ret.lengths[i] = x.totalLength
      ret.diameters[i] = x.averageDiameter
    })

    ret.organismName = readings[0].organism

    return ret;
  }

  static fromPartial(init: Partial<IOrganismData>, sample: ISampleInfoModel): IOrganismData {
    let sampleClone = { ...sample }
    if (init.dilution != null) {
      sampleClone.mainDilution = init.dilution
    }

    let ret = new ActinobacteriaData(sampleClone);
    return initData(ret, init);
  }

  update() {
    super.update()

    this.lengthMeanCmPerG = this._lengthMeanCmPerG;
    this.meanResult = this._meanResult;
    this.lengthStDevCmPerG = this._lengthStDevCmPerG
    this.stDevResult = this._stDevResult
  }

  get _lengthMeanCmPerG(): number {
    return 0
    // return this.lengthMeanCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _meanResult(): number {
    return this.lengthMeanCmPerG * Math.PI * 0.00005 * 0.00005 * 230000
  }

  get _lengthStDevCmPerG(): number {
    return 0
    // return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }
  
  get _stDevResult(): number {
    return this.lengthStDevCmPerG * Math.PI * 0.00005 * 0.00005 * 230000
  }
}

// Fungi, Oomycete
export class DiameterReadingData extends MultiReadingData {
  lengthMeanCmPerG: number;
  meanResult: number;
  lengthStDevCmPerG: number;
  stDevResult: number;
  averageDiameterCm: number;
  averageDiameterUm: number;
  hasExpanded: boolean = true;
  isField: boolean = false;
  isCounting: boolean = false;

  constructor(
    organismName: string,
    sample: ISampleInfoModel
  ) { 
    super(organismName, sample);
  }

  static fromReadings(readings: IOrganismReading[], sample: ISampleInfoModel): IOrganismData {
    let ret = this.fromPartial({}, sample);

    readings.forEach((x, i) => {
      ret.lengths[i] = x.totalLength
      ret.diameters[i] = x.averageDiameter
    })

    ret.organismName = readings[0].organism

    return ret;
  }

  static fromPartial(init: Partial<IOrganismData>, sample: ISampleInfoModel): IOrganismData {
    let sampleClone = { ...sample }
    if (init.dilution != null) {
      sampleClone.mainDilution = init.dilution
    }

    let ret = new DiameterReadingData(init.organismName, sampleClone);
    return initData(ret, init);
  }

  // TODO: Not sure what this is
  private get volumes(): number[] {
    let ret = []
    for (let i = 0; i < this.lengths.length; i++) {
      const length = this.lengths[i];
      const diameter = this.diameters[i]

      ret.push(length * diameter)
    }

    return ret;
  }

  update() {
    super.update()

    this.averageDiameterCm = this._averageDiameterCm
    this.averageDiameterUm = this._averageDiameterUm
    this.lengthMeanCmPerG = this._lengthMeanCmPerG;
    this.meanResult = this._meanResult;
    this.lengthStDevCmPerG = this._lengthStDevCmPerG
    this.stDevResult = this._stDevResult
  }

  get _averageDiameterCm(): number {
    return this.averageDiameterUm / 10000;
  }
  
  get _averageDiameterUm(): number {
    let sumVolumes = this.normalize(this.volumes)
      .reduce((a, b) => a + b, 0);
    let sumLengths = this.normalize(this.lengths)
      .reduce((a, b) => a + b, 0);

    return sumVolumes / sumLengths;
  }

  get _lengthMeanCmPerG(): number {
    return 0
    // return this.lengthMeanCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _meanResult(): number {
    return this.lengthMeanCmPerG * Math.PI * (0.5 * this.averageDiameterCm)^2 * 3300000;
  }

  get _lengthStDevCmPerG(): number {
    return 0
    // return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }
  
  get _stDevResult(): number {
    return this.lengthStDevCmPerG * Math.PI * (0.5 * this.averageDiameterCm)^2 * 3300000;
  }
}

// Flagellate, Amoebae, Ciliate
export class CountingData extends MultiReadingData {
  meanResult: number;
  stDevResult: number;
  averageDiameterCm: number = 0;
  averageDiameterUm: number = 0;
  lengthMeanCmPerG: number = 0;
  lengthStDevCmPerG: number = 0
  hasExpanded: boolean = false;
  isField: boolean = true;
  isCounting: boolean = true;

  constructor(
    organismName: string,
    sample: ISampleInfoModel
  ) { 
    super(organismName, sample);
  }

  static fromReadings(readings: IOrganismReading[], sample: ISampleInfoModel): IOrganismData {
    let ret = this.fromPartial({}, sample);

    readings.forEach((x, i) => {
      ret.lengths[i] = x.totalLength
      ret.diameters[i] = x.averageDiameter
    })

    ret.organismName = readings[0].organism

    return ret;
  }

  static fromPartial(init: Partial<IOrganismData>, sample: ISampleInfoModel): IOrganismData {
    let sampleClone = { ...sample }
    if (init.dilution != null) {
      sampleClone.mainDilution = init.dilution
    }

    let ret = new CountingData(init.organismName, sampleClone);
    return initData(ret, init);
  }

  update() {
    super.update()

    this.meanResult = this._meanResult;
    this.stDevResult = this._stDevResult
  }

  get _meanResult(): number {
    return 0
    // return this.lengthMeanMm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _stDevResult(): number {
    return 0
    // return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }
}

