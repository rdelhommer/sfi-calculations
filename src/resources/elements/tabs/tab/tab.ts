import './tab.scss'
import { autoinject, bindable } from 'aurelia-framework';

export interface ITabConfig {
  title: string
  name: string
}

@autoinject
export class Tab {

  @bindable config: ITabConfig

  isActive: boolean
  
  constructor() {

  }

  bind() {
  }
}
