import { bindable, inject } from "aurelia-framework";
import { Router, RouterEvent, NavigationInstruction, NavigationResult } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";
import { ENETDOWN } from "constants";

@inject(EventAggregator)
export class NavItem {
  @bindable() href: string
  @bindable() isHome: string
  
  isActive: boolean

  constructor(private eventAggregator: EventAggregator) {

  }

  bind() {
    this.eventAggregator.subscribe(RouterEvent.Complete, (event: { instruction: NavigationInstruction, result: NavigationResult }) => {
      this.isActive = 
        this.href.substring(1) === event.instruction.config.route
        || this.isHome && event.instruction.config.route === ''
    })
  }
}