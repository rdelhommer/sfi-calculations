import { PLATFORM } from "aurelia-pal";

export const globalResources = [
  PLATFORM.moduleName('resources/elements/tabs/tab/tab'),
  PLATFORM.moduleName('resources/elements/tabs/tabs'),
  PLATFORM.moduleName('resources/elements/reading/reading'),
  PLATFORM.moduleName('resources/elements/form-group/form-group'),
  PLATFORM.moduleName('resources/elements/form-header/form-header'),
  PLATFORM.moduleName('resources/elements/form-wrap/form-wrap'),

  PLATFORM.moduleName('app/usage/usage'),
  PLATFORM.moduleName('app/reading-tab/reading-tab'),
  PLATFORM.moduleName('app/settings-tab/settings-tab'),
  PLATFORM.moduleName('app/succession/succession'),

  PLATFORM.moduleName('resources/value-converters/to-fixed'),
];
