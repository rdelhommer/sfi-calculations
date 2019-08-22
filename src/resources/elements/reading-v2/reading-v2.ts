import './reading-v2.scss'
import { bindable, customElement } from 'aurelia-framework';
import { IOrganismReading } from '../../../models/reading.model';
import { FungalColor, OomyceteColor } from '../../../util/enums';

export interface ILengthField {
  length: number
}

export interface IDiameterField extends ILengthField {
  diameter: number
}

export interface IFungiField extends IDiameterField {
  color: FungalColor | OomyceteColor
}

interface IReading {
  fields: (ILengthField | IFungiField)[]
}

@customElement('reading-v2')
export class ReadingVTwo {

  @bindable reading: IReading
  @bindable readingNumber: number
  @bindable fungiColorEnum: any
  @bindable organismName: string
  @bindable onEditField: (params: any) => void
  @bindable isExpanded: boolean

  readings: IOrganismReading[]

  editField(fieldNumber: number) {
    this.onEditField({
      fieldNumber,
      readingNumber: this.readingNumber
    })
  }
}
