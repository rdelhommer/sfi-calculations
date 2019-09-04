import './reading-v2.scss'
import { bindable, customElement, computedFrom } from 'aurelia-framework';
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
  @bindable onEditField: (params: any) => Promise<void>
  @bindable isExpanded: boolean
  
  updateFlag: boolean

  DataType = DataType

  editField(fieldNumber: number) {
    return this.onEditField({
      fieldNumber,
      readingNumber: this.readingNumber
    }).then(() => this.updateFlag = !this.updateFlag)
  }

  @computedFrom('updateFlag')
  get totalCount(): number {
    return (<ICountReading>this.reading).totalCount
  }

  @computedFrom('updateFlag')
  get totalLength(): number {
    return (<ILengthReading>this.reading).totalLength
  }

  @computedFrom('updateFlag')
  get averageDiameter(): number {
    return (<IFungalReading>this.reading).averageDiameter
  }
}
