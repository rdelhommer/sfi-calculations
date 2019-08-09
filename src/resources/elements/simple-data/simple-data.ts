import { IOrganismData } from "../../../models/organism.model";
import { bindable } from "aurelia-templating";
import { IProfileModel } from "../../../models/profile.model";
import { ISampleInfoModel } from "../../../models/sample.model";

export class SimpleData {
  @bindable data: IOrganismData
  @bindable profile: IProfileModel
  @bindable sample: ISampleInfoModel
}