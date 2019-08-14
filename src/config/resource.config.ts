import { PLATFORM } from "aurelia-pal";

export const globalResources = [
  PLATFORM.moduleName('resources/elements/tabs/tab/tab'),
  PLATFORM.moduleName('resources/elements/tabs/tabs'),
  PLATFORM.moduleName('resources/elements/reading/reading'),
  PLATFORM.moduleName('resources/elements/tooltip/tooltip'),
  PLATFORM.moduleName('resources/elements/editable/editable'),
  PLATFORM.moduleName('resources/elements/simple-data/simple-data'),
  PLATFORM.moduleName('resources/elements/form-group/form-group'),
  PLATFORM.moduleName('resources/elements/form-group/form-group-select/form-group-select'),
  PLATFORM.moduleName('resources/elements/form-group/form-group-textarea/form-group-textarea'),
  PLATFORM.moduleName('resources/elements/form-section/form-section'),
  PLATFORM.moduleName('resources/elements/form-wrap/form-wrap'),

  PLATFORM.moduleName('app/usage/usage'),
  PLATFORM.moduleName('app/data-tab/data-tab'),
  PLATFORM.moduleName('app/reading-tab/reading-tab'),
  PLATFORM.moduleName('app/results-tab/results-tab'),
  PLATFORM.moduleName('app/print-tab/print-tab'),
  PLATFORM.moduleName('app/settings-tab/settings-tab'),
  PLATFORM.moduleName('app/succession/succession'),

  PLATFORM.moduleName('resources/value-converters/to-fixed'),
];
