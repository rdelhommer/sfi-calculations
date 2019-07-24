import { bindable, bindingMode } from "aurelia-framework";

export class FormGroupTextarea {
  @bindable placeholder: string
  @bindable({ defaultBindingMode: bindingMode.twoWay }) model: any
  @bindable orientation: 'horizontal' | 'vertical'
  @bindable isDisabled: boolean
  @bindable fillHeight: boolean
  @bindable rows: number
  @bindable onChanged: () => void
  
  bind() {
    this.orientation = this.orientation || 'vertical';
    this.placeholder = this.placeholder || '';
    this.onChanged = this.onChanged || (() => undefined)
  }
}