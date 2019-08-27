import './reading-v2.scss'
import { bindable, customElement } from 'aurelia-framework';
import { ILengthReading } from '../../../models/reading/length-reading.model';
import { IFungalReading } from '../../../models/reading/fungal-reading.model';
import { ICountReading } from '../../../models/reading/count-reading.model';
import { DataType } from '../../../models/organism/organism.model';

@customElement('reading-v2')
export class ReadingVTwo {

  @bindable reading: ILengthReading | IFungalReading | ICountReading
  @bindable readingNumber: number
  @bindable fungiColorEnum: any
  @bindable organismName: string
  @bindable onEditField: (params: any) => void
  @bindable isExpanded: boolean

  DataType = DataType

  editField(fieldNumber: number) {
    this.onEditField({
      fieldNumber,
      readingNumber: this.readingNumber
    })
  }
}
