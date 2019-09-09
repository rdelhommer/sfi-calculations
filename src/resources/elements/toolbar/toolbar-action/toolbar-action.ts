import { bindable } from "aurelia-framework";

export class ToolbarAction {
  @bindable() action: () => void
  @bindable() text: string
}