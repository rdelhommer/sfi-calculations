import './nematodes.scss';

import { SingleReadCountOrganism } from '../../models/organism/single-read-count-organism.model';
import { IOrganism } from '../../models/organism/organism.model';
import { ISampleInfoModel, SampleInfo } from '../../models/sample.model';
import { CoverslipSize } from '../../util/enums';

export class Nematodes {
  updateFlag: boolean = false

  stubSample: ISampleInfoModel = new SampleInfo({
    bacteriaDilution: 300,
    mainDilution: 5,
    dropsPerSample: 1,
    coverslipSize: CoverslipSize.EighteenSquare,
    dropsPerMl: 20,
    eyepieceFieldSize: 18
  })
  
  organisms: IOrganism[] = [
    new SingleReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Bacterial-feeding'
    }),
    new SingleReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Fungal-feeding'
    }),
    new SingleReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Predatory'
    }),
    new SingleReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Root-feeding'
    }),
  ]
}