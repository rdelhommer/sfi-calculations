import { bindable, bindingMode } from "aurelia-framework";

interface ISelectOption {
  name: string
  value: string | number
}

export class FormGroupSelect {
  @bindable fromEnum: any
  @bindable placeholder: string
  @bindable({ defaultBindingMode: bindingMode.twoWay }) model: any
  @bindable orientation: 'horizontal' | 'vertical'
  @bindable isDisabled: boolean
  @bindable selectOptions: ISelectOption[]
  @bindable onChanged: () => void

  bind() {
    this.orientation = this.orientation || 'vertical';
    this.onChanged = this.onChanged || (() => undefined)

    this.selectOptions = this.selectOptions || 
      Object.keys(this.fromEnum)
        .map(x => ({
          name: this.fromEnum[x],
          value: x
        }))
  }
}