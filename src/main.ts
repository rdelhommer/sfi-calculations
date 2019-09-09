import { Aurelia, PLATFORM } from 'aurelia-framework'
import { globalResources } from './config/resource.config';
import { configureRootContainer } from './config/container.config';
// import './util/validation';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources(globalResources)
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))

  configureRootContainer(aurelia.container);

  aurelia.start()
    .then(() => {
      aurelia.setRoot(PLATFORM.moduleName('proto/proto'))
    });
}