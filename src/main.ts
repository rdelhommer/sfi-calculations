import { Aurelia, PLATFORM } from 'aurelia-framework'
import { globalResources } from './config/resource.config';
import { configureRootContainer } from './config/container.config';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources(globalResources)
    .plugin(PLATFORM.moduleName('aurelia-validation'))

  configureRootContainer(aurelia.container);

  aurelia.start()
    .then(() => {
      aurelia.setRoot(PLATFORM.moduleName('app/app'))
    });
}