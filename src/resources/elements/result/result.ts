import { bindable, bindingMode } from "aurelia-framework";

export class Editable {
  @bindable name: string;
  @bindable min: string;
  @bindable max: string;
  @bindable enum: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) model: any
  @bindable displayMap: any

  isEditing: boolean = false;

  toggleEdit() {
    this.isEditing = !this.isEditing
  }
}