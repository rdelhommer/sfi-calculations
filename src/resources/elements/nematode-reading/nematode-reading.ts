import './nematode-reading.scss'
import { bindable } from 'aurelia-framework'
import { IOrganism } from '../../../models/organism/organism.model'

export class NematodeReading {
  @bindable() organism: IOrganism
}
