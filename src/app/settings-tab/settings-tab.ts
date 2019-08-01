import './settings-tab.scss'
import { inject, TaskQueue } from 'aurelia-framework';
import { ISession } from '../../services/session/session.service';
import { IProfileModel, Profile } from '../../models/profile.model';
import { IStateManager } from '../../services/state/state-manager.service';

@inject(ISession, IStateManager)
export class SettingsTab {

  showSaveSuccessful: boolean
  profile: IProfileModel

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