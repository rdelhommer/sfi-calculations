import './fila-proto.scss'
import { DialogService } from 'aurelia-dialog'
import { inject } from 'aurelia-framework';
import { ZoomFieldModal } from '../../shared/zoom-field-modal/zoom-field-modal';
import { FungalColor, OomyceteColor } from '../../util/enums';

@inject(DialogService)
export class FilaProto {
  actinobacteriaReadings: any = [{}, {}, {}, {}, {}]
  fungiReadings: any = [{}, {}, {}, {}, {}]
  oomyceteReadings: any = [{}, {}, {}, {}, {}]

  FungalColor = FungalColor
  OomyceteColor = OomyceteColor

  constructor(
    private dialogService: DialogService
  ) { }

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

  collectData() {
    this.dialogService.open({
      viewModel: ZoomFieldModal,
      model: {

      }, 
      lock: false
    }).whenClosed(result => {
      if (result.wasCancelled) return

      // TODO: Save returned data
    })
  }
}