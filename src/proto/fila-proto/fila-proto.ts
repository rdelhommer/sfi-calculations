import './fila-proto.scss'
import { DialogService } from 'aurelia-dialog'
import { inject } from 'aurelia-framework';
import { ZoomFieldModal } from '../../shared/zoom-field-modal/zoom-field-modal';

@inject(DialogService)
export class FilaProto {
  actinobacteriaReadings: any = [{}, {}, {}, {}, {}]

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
  }

  addField() {
    this.actinobacteriaReadings.forEach(x => x.fields.push({ length : null }))
  }

  removeField() {
    if (this.actinobacteriaReadings[0].fields.length <= 5) return

    this.actinobacteriaReadings.forEach(x => x.fields.pop())
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