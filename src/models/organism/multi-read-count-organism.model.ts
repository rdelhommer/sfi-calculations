// import '../../util/misc'

// import { IOrganism, DataType } from "./organism.model";
// import { ISampleInfoModel } from "../sample.model";
// import { FOV_DIAMETER_MM, DROPS_PER_ML } from '../../util/constants';
// import { IModel } from '../base.model';
// import { ICountField } from '../field/count-field.model';
// import { ICountReading } from '../reading/count-reading.model';

// export class MultiReadCountOrganism implements IOrganism<ICountReading>, IModel {
//   readings: ICountReading[];
//   dilution: number = this.sample.mainDilution;
//   dataType: DataType = DataType.Counting;
  
//   constructor(
//     public organismName: string,
//     protected sample: ISampleInfoModel
//   ) { }

//   protected normalize(array: number[]) {
//     return array.map(x => {
//       let length = x == null ? 0 : x
//       return length / this.sample.fieldsPerReading
//     })
//   }

//   protected get _totalCounts(): number[] {
//     let fields: ICountField[] = []
//     this.readings.forEach(x => fields = fields.concat(x.fields))

//     return fields.map(x => x.count)
//       .filterNumbers()
//   }

//   protected get _lengthMeanMm(): number {
//     return this.normalize(this._totalLengths)
//       .mean();
//   }

//   protected get _lengthMeanCm(): number {
//     return this._lengthMeanMm * FOV_DIAMETER_MM / 10;
//   }

//   protected get _lengthStDevMm(): number {
//     return this.normalize(this._totalLengths)
//       .stDev();
//   }

//   protected get _lengthStDevCm(): number {
//     return this._lengthStDevMm * FOV_DIAMETER_MM / 10;
//   }

//   get meanResult(): number {
//     return this._lengthMeanMm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
//   }

//   get stDevResult(): number {
//     return this._lengthStDevCm * this.dilution * DROPS_PER_ML * this.sample.coverslipNumFields
//   }

//   get isValid(): boolean {
//     return this.readings.every(x => x.isValid)
//   }
// }