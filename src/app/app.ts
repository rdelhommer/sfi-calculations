import './app.scss';
import { ITabConfig } from '../resources/elements/tabs/tab/tab';
import { ISession } from '../services/session/session.service';
import { inject } from 'aurelia-framework';
import { IStateManager } from '../services/state/state-manager.service';

@inject(ISession, IStateManager)
export class App { 
  dataTab: ITabConfig = {
    name: 'data',
    title: 'Microscope Data Spreadsheet'
  }

  readingsTab: ITabConfig = {
    name: 'readings',
    title: 'Readings Expanded'
  }

  resultsTab: ITabConfig = {
    name: 'results',
    title: 'Results Fill Sheet'
  }

  reportTab: ITabConfig = {
    name: 'report',
    title: 'Report'
  }

  printTab: ITabConfig = {
    name: 'print',
    title: 'Print Sheet'
  }

  successionTab: ITabConfig = {
    name: 'succession',
    title: 'Succession Ranges',
  }

  usageTab: ITabConfig = {
    name: 'usage',
    title: 'Spreadsheet Usage'
  }

  settingsTab: ITabConfig = {
    name: 'settings',
    title: 'Settings'
  }

  isProfileValid: boolean
  isSampleValid: boolean

  constructor(
    private session: ISession,
    private stateManager: IStateManager
  ) { }

  activate() {
    this.checkProfileValidity()
    this.checkSampleValidity()
    
    this.stateManager.onProfileUpdated(() => this.checkProfileValidity())
    this.stateManager.onSampleInfoUpdated(() => this.checkSampleValidity())
  }

  checkProfileValidity() {
    this.isProfileValid = this.session.loadProfile().isValid
  }

  checkSampleValidity() {
    this.isSampleValid = this.session.loadSample().isValid
  }

  startNewSession() {
    this.session.clear();
    window.location.reload();
  }
}