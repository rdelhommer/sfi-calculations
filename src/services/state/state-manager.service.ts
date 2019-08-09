import { Disposable } from "aurelia-binding";

export abstract class IStateManager {
  abstract profileUpdated(): void;
  abstract onProfileUpdated(callback: () => void): Disposable; 

  abstract readingsUpdated(): void;
  abstract onReadingsUpdated(callback: () => void): Disposable;
  
  abstract sampleInfoUpdated(): void;
  abstract onSampleInfoUpdated(callback: () => void): Disposable;

  abstract dataTabUpdated(): void;
  abstract onDataTabUpdated(callback: () => void): Disposable;
}