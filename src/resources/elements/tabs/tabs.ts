import './tabs.scss'
import { autoinject, children } from 'aurelia-framework';
import { ITabConfig, Tab } from './tab/tab';

export interface ITabsConfig {
  tabs: ITabConfig[]
}

@autoinject
export class Tabs {

  @children('tab') tabs: Tab[]

  activeTab: Tab

  constructor() {

  }

  bind() {
  }

  attached() {
    this.changePage(this.tabs[0])
  }

  changePage(newTab: Tab) {
    if (this.activeTab) {
      this.activeTab.isActive = false
    }

    this.activeTab = newTab
    newTab.isActive = true
  }
}
