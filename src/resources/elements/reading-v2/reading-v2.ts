import './reading-v2.scss'
import { bindable, customElement } from 'aurelia-framework';
import { IOrganismReading, ILengthReading, IFungalReading } from '../../../models/reading.model';

@customElement('reading-v2')
export class ReadingVTwo {

  @bindable reading: ILengthReading | IFungalReading
  @bindable readingNumber: number
  @bindable fungiColorEnum: any
  @bindable organismName: string
  @bindable onEditField: (params: any) => void
  @bindable isExpanded: boolean

  editField(fieldNumber: number) {
    this.onEditField({
      fieldNumber,
      readingNumber: this.readingNumber
    })
  }
}
