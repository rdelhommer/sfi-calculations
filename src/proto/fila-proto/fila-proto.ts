import './fila-proto.scss'
import { DialogService } from 'aurelia-dialog'
import { inject } from 'aurelia-framework';
import { FungalColor, OomyceteColor, CoverslipSize } from '../../util/enums';
import { IZoomFieldModalModel, ZoomFieldModal } from '../../shared/zoom-field-modal/zoom-field-modal';
import { FungalField } from '../../models/field/fungal-field.model';
import { LengthField } from '../../models/field/length-field.model';
import { DataType, IOrganism } from '../../models/organism/organism.model';
import { CountField } from '../../models/field/count-field.model';
import { ILengthReading } from '../../models/reading/length-reading.model';
import { MultiReadLengthOrganism } from '../../models/organism/multi-read-length-organism.model';
import { ISampleInfoModel, SampleInfo } from '../../models/sample.model';
import { IFungalReading } from '../../models/reading/fungal-reading.model';
import { MultiReadFungalOrganism } from '../../models/organism/multi-read-fungal-organism.model';
import { ICountReading } from '../../models/reading/count-reading.model';
import { MultiReadCountOrganism } from '../../models/organism/multi-read-count-organism.model';
import { READING_NUM_MIN_FIELDS } from '../../util/reading-model';

@inject(DialogService)
export class FilaProto {
  stubSample: ISampleInfoModel = new SampleInfo({
    bacteriaDilution: 300,
    mainDilution: 5,
    dropsPerSample: 1,
    coverslipSize: CoverslipSize.EighteenSquare,
    dropsPerMl: 20,
    eyepieceFieldSize: 18
  })
  
  actinobacteria: IOrganism<ILengthReading> = new MultiReadLengthOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution
  })
  fungi: IOrganism<IFungalReading> = new MultiReadFungalOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution,
    organismName: 'Fungi'
  })
  oomycete: IOrganism<IFungalReading> = new MultiReadFungalOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution,
    organismName: 'Oomycete'
  })
  flagellate: IOrganism<ICountReading> = new MultiReadCountOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution,
    organismName: 'Flagellate'
  })
  amoebae: IOrganism<ICountReading> = new MultiReadCountOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution,
    organismName: 'Amoebae'
  })
  ciliate: IOrganism<ICountReading> = new MultiReadCountOrganism(this.stubSample, {
    dilution: this.stubSample.mainDilution,
    organismName: 'Ciliate'
  })

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

  constructor(private dialogService: DialogService) { }

  activate() {
    
  }

  addField() {
    this.actinobacteria.readings.forEach(x => x.fields.push(new LengthField()))
    this.fungi.readings.forEach(x => x.fields.push(new FungalField()))
    this.oomycete.readings.forEach(x => x.fields.push(new FungalField()))
    this.flagellate.readings.forEach(x => x.fields.push(new CountField()))
    this.amoebae.readings.forEach(x => x.fields.push(new CountField()))
    this.ciliate.readings.forEach(x => x.fields.push(new CountField()))
  }

  removeField() {
    let tryRemoveField = (reading) => {
      if (reading.fields.length <= READING_NUM_MIN_FIELDS) return

      reading.fields.pop()
    }

    this.actinobacteria.readings.forEach(tryRemoveField)
    this.fungi.readings.forEach(tryRemoveField)
    this.oomycete.readings.forEach(tryRemoveField)
    this.flagellate.readings.forEach(tryRemoveField)
    this.amoebae.readings.forEach(tryRemoveField)
    this.ciliate.readings.forEach(tryRemoveField)
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

  collectData(readingNumber: number, fieldNumber: number, organismName: string, dataType: DataType) {
    return this.dialogService.open({
      viewModel: ZoomFieldModal,
      model: <IZoomFieldModalModel>{
        readingNumber,
        fieldNumber,
        organismName,
        dataType,
        field: dataType === DataType.Counting 
          ? new CountField()
          : dataType === DataType.Diameter
            ? new FungalField() 
            : new LengthField()
      }, 
      lock: true
    }).whenClosed(result => {
      if (result.wasCancelled) throw 'cancelled'

      // TODO: Save returned data
    })
  }
}