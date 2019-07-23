import { bindable, autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class AlertBubble {
  @bindable size: string
  @bindable isCentered: boolean
  @bindable type: string
  @bindable icon: string
  @bindable iconType: string
  @bindable actionableId: string
  @bindable action: Function
  @bindable actionableHref: string

  constructor(private router: Router) {

  }
  
  doAction(event: Event) {
    // Either:
    //  * invoke bound action
    //  * scroll to the element
    // Href is handled by markup
    if (this.action) {
      this.action()
    } else if (this.actionableId) {
      document.getElementById(this.actionableId).scrollIntoView();
    } 

    // stop propagation to prevent a double click since we have a little hack for accessbility
    event.stopPropagation()
  }

  bind() {
    this.size = this.size || 'fill'
    this.type = this.type || 'info'
    this.icon = this.icon || 'fa-lightbulb-o'
    this.iconType = this.iconType || 'warning'
  }
}
