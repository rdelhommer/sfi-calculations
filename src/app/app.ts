import './app.scss';
import { ITabConfig } from '../resources/elements/tabs/tab/tab';
import { ISession } from '../services/session/session.service';
import { inject, TaskQueue } from 'aurelia-framework';
import { IStateManager } from '../services/state/state-manager.service';
import { DataTab } from './data-tab/data-tab';
import { Tabs } from '../resources/elements/tabs/tabs';
import { DataEntry } from '../util/enums';

@inject(ISession, IStateManager, TaskQueue)
export class App { 
  dataTabRef: DataTab
  tabsRef: Tabs

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
  isScrollHooked: boolean
  useReadingTab: boolean

  constructor(
    private session: ISession,
    private stateManager: IStateManager,
    private taskQueue: TaskQueue
  ) { }

  activate() {
    this.checkProfileValidity()
    this.checkSampleValidity()
    this.useReadingTab = this.session.loadProfile().dataEntry === DataEntry.ReadingsTab

    this.stateManager.onProfileUpdated(() => {
      this.checkProfileValidity()

      this.useReadingTab = this.session.loadProfile().dataEntry === DataEntry.ReadingsTab

      this.hookScroll()
    })
    
    this.stateManager.onSampleInfoUpdated(() => {
      this.checkSampleValidity()

      this.hookScroll()
    })
  }

  attached() {
    this.hookScroll()
  }

  hookScroll() {
    if (!this.isProfileValid || !this.isSampleValid || this.isScrollHooked) return;
    this.taskQueue.queueMicroTask(() => {
      this.tabsRef.onScroll(this.dataTab.name, this.dataTabRef.handleScroll.bind(this.dataTabRef))
      this.isScrollHooked = true;
    })
  }

  checkProfileValidity() {
    this.isProfileValid = this.session.loadProfile().isValid
  }

  checkSampleValidity() {
    this.isSampleValid = this.session.loadSample().isValid
  }

  startNewSession() {
    if(!confirm('Starting a new session will delete all existing data.  Click OK to continue.')) return
    
    this.session.clear();
    window.location.reload();
  }
}