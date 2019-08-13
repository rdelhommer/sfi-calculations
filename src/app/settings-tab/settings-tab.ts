import './settings-tab.scss'
import { inject, TaskQueue } from 'aurelia-framework';
import { ISession } from '../../services/session/session.service';
import { IProfileModel, Profile } from '../../models/profile.model';
import { IStateManager } from '../../services/state/state-manager.service';
import { DataEntry } from '../../util/enums';

@inject(ISession, IStateManager)
export class SettingsTab {

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
    let oldProfile = this.session.loadProfile()
    if (oldProfile.dataEntry !== this.profile.dataEntry && this.profile.dataEntry === DataEntry.DataTab) {
      if(!confirm('Changing the data entry type will delete existing data and start a new session.  Click OK to continue.')) return
    }

    this.session.saveProfile(this.profile);
    if (oldProfile.dataEntry !== this.profile.dataEntry) {
      this.session.clear()
      window.location.reload();
    }

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