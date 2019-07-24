import './settings-tab.scss'
import { inject, TaskQueue } from 'aurelia-framework';
import { ISession } from '../../services/session/session.service';

export interface IAddress {
  street?: string
  additional?: string
  city?: string
  state?: string
  zip?: string
}

export interface IProfileModel {
  name?: string
  organization?: string
  address: IAddress
  email?: string
  phone?: string
}

@inject(ISession, TaskQueue)
export class SettingsTab {

  showSaveSuccessful: boolean
  profile: IProfileModel = {
    address: { }
  }

  constructor(
    private session: ISession
  ) { }

  bind() {
    this.profile = this.session.getProfile();
  }

  saveProfile() {
    this.session.saveProfile(this.profile);
    this.showSaveSuccessful = true

    setTimeout(() => {
      this.showSaveSuccessful = false
    }, 3000);
  }

  cancelChanges() {
    this.profile = this.session.getProfile();
  }
}