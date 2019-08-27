import { IModel } from "./base.model";
import { DataEntry } from "../util/enums";

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
}

export class Profile implements IProfileModel {
  name?: string;  
  organization?: string;
  address: IAddress;
  email?: string;
  phone?: string;
  dataEntry: DataEntry

  constructor(init: Partial<IProfileModel> = { }) {
    this.name = init.name
    this.organization= init.organization
    this.email = init.email
    this.phone = init.phone
    this.address = new Address(init.address) || new Address({})
    this.dataEntry = init.dataEntry || DataEntry.ReadingsTab
  }

  get isValid() {
    return !!this.name && this.name != null
      && !!this.organization && this.organization != null
      && !!this.email && this.email != null
      && !!this.phone && this.phone != null
      && this.address.isValid
      && !!this.dataEntry
  }
}