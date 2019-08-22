import './dropdown-button.scss'
import { bindable, TaskQueue, inject } from 'aurelia-framework';

@inject(TaskQueue)
export class DropdownButton {
  @bindable greeting: string
  isContainerHidden: boolean

  hideContainer() {
    this.isContainerHidden = true

    setTimeout(() => {
      this.isContainerHidden = false
    }, 100);
  }
}