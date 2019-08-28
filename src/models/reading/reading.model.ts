import { IModel } from '../base.model'
import { DataType } from '../organism/organism.model'

export interface IReading extends IModel {
  dataType?: DataType

  addField()
  tryRemoveField()
}