import { IModel } from "../base.model";
import { DataType } from "../organism/organism.model";

export interface IField extends IModel {
  dataType?: DataType
}