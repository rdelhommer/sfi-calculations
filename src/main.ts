import 'font-awesome/css/font-awesome.css';

import { Aurelia, PLATFORM } from 'aurelia-framework'

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/slider'))
    .plugin(PLATFORM.moduleName('au-fa-check'), {
    })

  aurelia.start()
    .then(() => {
      aurelia.setRoot(PLATFORM.moduleName('app'))
    });
}