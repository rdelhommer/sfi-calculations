import { IOrganismData } from "../../../models/organism.model";
import { bindable, containerless } from "aurelia-templating";
import { IProfileModel } from "../../../models/profile.model";
import { ISampleInfoModel } from "../../../models/sample.model";
import './simple-data.scss'

@containerless
export class SimpleData {
  @bindable data: IOrganismData
  @bindable profile: IProfileModel
  @bindable sample: ISampleInfoModel
}