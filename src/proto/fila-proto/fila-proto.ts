import './fila-proto.scss'

import { DialogService } from 'aurelia-dialog'
import { inject } from 'aurelia-framework';
import { FungalColor, OomyceteColor, CoverslipSize } from '../../util/enums';
import { IZoomFieldModalModel, ZoomFieldModal } from '../../shared/zoom-field-modal/zoom-field-modal';
import { DataType, IOrganism } from '../../models/organism/organism.model';
import { MultiReadLengthOrganism } from '../../models/organism/multi-read-length-organism.model';
import { ISampleInfoModel, SampleInfo } from '../../models/sample.model';
import { MultiReadFungalOrganism } from '../../models/organism/multi-read-fungal-organism.model';
import { MultiReadCountOrganism } from '../../models/organism/multi-read-count-organism.model';

@inject(DialogService)
export class FilaProto {
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
    new MultiReadLengthOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution
    }),
    new MultiReadFungalOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Fungi'
    }),
    new MultiReadFungalOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Oomycete'
    }),
    new MultiReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Flagellate'
    }),
    new MultiReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Amoebae'
    }),
    new MultiReadCountOrganism(this.stubSample, {
      dilution: this.stubSample.mainDilution,
      organismName: 'Ciliate'
    })
  ]
  
  FungalColor = FungalColor
  OomyceteColor = OomyceteColor
  DataType = DataType

  isReadingExpanded = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  }

  constructor(private dialogService: DialogService) { 
  }

  addField() {
    this.organisms.forEach(o => o.readings.forEach(r => r.addField()))
  }

  removeField() {
    this.organisms.forEach(o => o.readings.forEach(r => r.tryRemoveField()))
  }

  collapse(readingNumber?: number) {
    if (readingNumber != null) {
      this.isReadingExpanded[readingNumber - 1] = false
    } else {
      Object.keys(this.isReadingExpanded)
        .forEach(x => this.isReadingExpanded[x] = false)
    }
  }

  expand(readingNumber?: number) {
    if (readingNumber != null) {
      this.isReadingExpanded[readingNumber - 1] = true
    } else {
      Object.keys(this.isReadingExpanded)
        .forEach(x => this.isReadingExpanded[x] = true)
    }
  }

  collectData(readingNumber: number, fieldNumber: number, organism: IOrganism) {
    return this.dialogService.open({
      viewModel: ZoomFieldModal,
      model: <IZoomFieldModalModel>{
        readingNumber,
        fieldNumber,
        organismName: organism.organismName,
        dataType: organism.dataType,
        field: organism.readings[readingNumber - 1].fields[fieldNumber - 1]
      }, 
      lock: true
    }).whenClosed(result => {
      if (result.wasCancelled) throw 'cancelled'

      this.updateFlag = !this.updateFlag
      // TODO: Save returned data
    })
  }
}