import { bindable } from "aurelia-framework";
import './form-wrap.scss'

export class FormWrap {
  @bindable novalidate: boolean;
  @bindable noSubmit: boolean;

  bind() {
    if (this.novalidate == null) {
      this.novalidate = true;
    }
  }
}
