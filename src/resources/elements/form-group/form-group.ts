import { bindable, observable, bindingMode } from "aurelia-framework";
import { newGuid } from "../../../util/misc";
import './form-group.scss';

export class FormGroup {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) model: any
  @bindable placeholder: string
  @bindable type: string
  @bindable autofocus: boolean
  @bindable orientation: 'horizontal' | 'vertical'
  @bindable isDisabled: boolean
  @bindable onChanged: () => void

  id: string = newGuid()

  bind() {
    this.type = this.type || 'text';
    this.orientation = this.orientation || 'vertical';
    this.placeholder = this.placeholder || '';
    this.onChanged = this.onChanged || (() => undefined)
  }
}
