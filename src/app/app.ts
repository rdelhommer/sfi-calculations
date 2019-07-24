import './app.scss';
import { ITabConfig } from '../resources/elements/tabs/tab/tab';

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
}