import { bindable, bindingMode } from "aurelia-framework";

export class Editable {
  @bindable enum;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) model: any
  @bindable displayMap: any
  @bindable onSave: () => void

  isEditing: boolean = false;

  toggleEdit() {
    if (this.isEditing) this.onSave()

    this.isEditing = !this.isEditing
  }
}