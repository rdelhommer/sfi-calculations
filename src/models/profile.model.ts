import { IModel } from "./base.model";

export interface IAddress extends IModel {
  lineOne?: string
  lineTwo?: string
}

export class Address implements IAddress {
  lineOne?: string;  
  lineTwo?: string;

  constructor(init: Partial<IAddress>) {
    Object.assign(this, init)
  }

  get isValid(): boolean {
    return !!this.lineOne
  }
}

export interface IProfileModel extends IModel {
  name?: string
  organization?: string
  address: IAddress
  email?: string
  phone?: string
}

export class Profile implements IProfileModel {
  name?: string;  
  organization?: string;
  address: IAddress;
  email?: string;
  phone?: string;

  constructor(init: Partial<IProfileModel>) {
    this.name = init.name
    this.organization= init.organization
    this.email = init.email
    this.phone = init.phone
    this.address = new Address(init.address) || new Address({})
  }

  get isValid() {
    return !!this.name
      && !!this.organization
      && !!this.email
      && !!this.phone
      && this.address.isValid
  }
}