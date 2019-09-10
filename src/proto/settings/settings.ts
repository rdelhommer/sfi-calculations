import './settings.scss'

import { IProfileModel } from '../../models/profile.model';
import { DataEntry } from '../../util/enums';
import { ISession } from '../../services/session/session.service';
import { IStateManager } from '../../services/state/state-manager.service';
import { inject } from 'aurelia-framework';

@inject(ISession, IStateManager)
export class Settings {
  showSaveSuccessful: boolean
  profile: IProfileModel

  DataEntry = DataEntry

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  bind() {
    this.profile = this.session.loadProfile();
  }

  saveProfile() {
    this.session.saveProfile(this.profile);
    this.showSaveSuccessful = true

    setTimeout(() => {
      this.showSaveSuccessful = false
    }, 3000);

    this.stateManager.profileUpdated();
  }

  cancelChanges() {
    this.profile = this.session.loadProfile();
  }
}