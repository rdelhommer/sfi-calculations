import { DROPS_PER_ML, FOV_AREA_MM_SQUARED, FOV_DIAMETER_MM } from "../util/constants";
import { ISampleModel, ISampleInfoModel } from "./sample.model";
import { mean, stDev } from "../util/misc";
import { computedFrom } from "aurelia-binding";

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
  lengths: number[]
  diameters?: number[]
  
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

  constructor(public organismName: string, sample: ISampleInfoModel) {
    this.dilution = sample.mainDilution
  }

  update() {
    this.lengthMeanMm = this._lengthMeanMm;
    this.lengthMeanCm = this._lengthMeanCm;
    this.meanResult = this._meanResult
  }

  get _lengthMeanMm(): number {
    return (<any>this.lengths).blah;
  }

  get _lengthMeanCm(): number {
    return this._lengthMeanMm / 10;
  }

  get _meanResult(): number {
    return this._lengthMeanMm * this.dilution * DROPS_PER_ML
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
      return length / this.sample.fieldsPerReading
    })
  }

  update(): void {
    this.lengthMeanMm = this._lengthMeanMm;
    this.lengthMeanCm = this._lengthMeanCm;
    this.lengthStDevMm = this._lengthStDevMm
    this.lengthStDevCm = this._lengthStDevCm
  }

  get _lengthMeanMm(): number {
    return mean(this.normalize(this.lengths));
  }

  get _lengthMeanCm(): number {
    return this._lengthMeanMm * FOV_DIAMETER_MM / 10;
  }

  get _lengthStDevMm(): number {
    return stDev(this.normalize(this.lengths));
  }

  get _lengthStDevCm(): number {
    return this._lengthStDevMm * FOV_DIAMETER_MM / 10;
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

  update() {
    super.update()

    this.lengthMeanCmPerG = this._lengthMeanCmPerG;
    this.meanResult = this._meanResult;
    this.lengthStDevCmPerG = this._lengthStDevCmPerG
    this.stDevResult = this._stDevResult
  }

  get _lengthMeanCmPerG(): number {
    return this.lengthMeanCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _meanResult(): number {
    return this.lengthMeanCmPerG * Math.PI * 0.00005 * 0.00005 * 230000
  }

  get _lengthStDevCmPerG(): number {
    return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
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
      .reduce((a, b) => a + b);
    let sumLengths = this.normalize(this.lengths)
      .reduce((a, b) => a + b);

    return sumVolumes / sumLengths;
  }

  get _lengthMeanCmPerG(): number {
    return this.lengthMeanCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _meanResult(): number {
    return this.lengthMeanCmPerG * Math.PI * (0.5 * this.averageDiameterCm)^2 * 3300000;
  }

  get _lengthStDevCmPerG(): number {
    return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
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

  update() {
    super.update()

    this.meanResult = this._meanResult;
    this.stDevResult = this._stDevResult
  }

  get _meanResult(): number {
    return this.lengthMeanMm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }

  get _stDevResult(): number {
    return this.lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
  }
}

