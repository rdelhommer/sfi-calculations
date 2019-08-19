import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";

export interface IZoomFieldModalModel {

}

@inject(DialogController)
export class ZoomFieldModal {
  constructor(
    private dialogController: DialogController
  ) { }
  
  activate(model: IZoomFieldModalModel) {

  }
}