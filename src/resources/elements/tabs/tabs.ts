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
  onScrollDelegates: { [key: string]: (($event) => void)[]} = {}

  constructor() {

  }

  handleScroll($event) {
    this.onScrollDelegates[this.activeTab.config.name]
      .forEach(x => x($event))
  }

  onScroll(tab: string, callback: ($event) => void) {
    this.onScrollDelegates[tab].push(callback);
  }

  bind() {
  }

  attached() {
    this.tabs.forEach(x => this.onScrollDelegates[x.config.name] = [])
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
