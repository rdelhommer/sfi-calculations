import { IModel } from "./base.model";
import { DataEntry } from "../util/enums";
import { ISuccessionRequirement, SuccessionRequirement } from "./succession/succession-requirement.model";

export interface IAddress extends IModel {
  lineOne: string
  lineTwo?: string
}

export class Address implements IAddress {
  lineOne: string;  
  lineTwo?: string;

  constructor(init: Partial<IAddress>) {
    Object.assign(this, init)
  }

  get isValid(): boolean {
    return !!this.lineOne && this.lineOne != null
  }
}

export interface IProfileModel extends IModel {
  name?: string
  organization?: string
  address: IAddress
  email?: string
  phone?: string
  dataEntry: DataEntry
  successionRequirement: ISuccessionRequirement
}

export class Profile implements IProfileModel {
  static fromPartial(init: RecursivePartial<IProfileModel> = { }): IProfileModel { 
    let ret = new Profile()

    ret.name = init.name
    ret.organization= init.organization
    ret.email = init.email
    ret.phone = init.phone
    ret.address = new Address(init.address) || new Address({})
    ret.dataEntry = init.dataEntry || DataEntry.ReadingsTab
    ret.successionRequirement = SuccessionRequirement.fromPartial(init.successionRequirement)

    return ret
  }

  name?: string;  
  organization?: string;
  address: IAddress;
  email?: string;
  phone?: string;
  dataEntry: DataEntry
  successionRequirement: ISuccessionRequirement

  get isValid() {
    return !!this.name && this.name != null
      && !!this.organization && this.organization != null
      && !!this.email && this.email != null
      && !!this.phone && this.phone != null
      && this.address.isValid
      && !!this.dataEntry
      && this.successionRequirement.isValid
  }
}