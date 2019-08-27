import './fila-proto.scss'
import { DialogService } from 'aurelia-dialog'
import { inject } from 'aurelia-framework';
import { FungalColor, OomyceteColor } from '../../util/enums';
import { IZoomFieldModalModel, ZoomFieldModal } from '../../shared/zoom-field-modal/zoom-field-modal';
import { FungalField } from '../../models/field/fungal-field.model';
import { LengthField } from '../../models/field/length-field.model';
import { DataType } from '../../models/organism/organism.model';
import { CountField } from '../../models/field/count-field.model';

@inject(DialogService)
export class FilaProto {
  actinobacteriaReadings: any = [{}, {}, {}, {}, {}]
  fungiReadings: any = [{}, {}, {}, {}, {}]
  oomyceteReadings: any = [{}, {}, {}, {}, {}]

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
    this.actinobacteriaReadings.forEach(x => {
      x.fields = new Array(5).map(f => {
        return {
          length: null
        }
      });
    })

    this.fungiReadings.forEach(x => {
      x.fields = new Array(5).map(f => {
        return {
          length: null,
          diameter: null,
          color: null
        }
      });
    })

    this.oomyceteReadings.forEach(x => {
      x.fields = new Array(5).map(f => {
        return {
          length: null,
          diameter: null,
          color: null
        }
      });
    })
  }

  addField() {
    this.actinobacteriaReadings.forEach(x => x.fields.push({ length : null }))
    this.fungiReadings.forEach(x => x.fields.push({
      length: null,
      diameter: null,
      color: null
    }))
    this.oomyceteReadings.forEach(x => x.fields.push({
      length: null,
      diameter: null,
      color: null
    }))
  }

  removeField() {
    if (this.actinobacteriaReadings[0].fields.length <= 5) return

    this.actinobacteriaReadings.forEach(x => x.fields.pop())
    this.fungiReadings.forEach(x => x.fields.pop())
    this.oomyceteReadings.forEach(x => x.fields.pop())
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
    this.dialogService.open({
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
      if (result.wasCancelled) return

      // TODO: Save returned data
    })
  }
}