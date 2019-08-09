import { IStateManager } from "./state-manager.service";
import { Disposable } from "aurelia-binding";
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from "aurelia-framework";

enum Events {
  ProfileUpdated = 'profile-updated',
  ReadingsUpdated = 'readings-updated',
  SampleInfoUpdated = 'sample-info-updated',
  DataTabUpdated = 'data-tab-updated'
}

@inject(EventAggregator)
export class TabStateManager implements IStateManager {
  
  constructor(
    private eventAggregator: EventAggregator
  ) { }

  profileUpdated(): void {
    this.eventAggregator.publish(Events.ProfileUpdated);
  }  
  
  onProfileUpdated(callback: () => void): Disposable {
    return this.eventAggregator.subscribe(Events.ProfileUpdated, callback);
  }
  
  readingsUpdated(): void {
    this.eventAggregator.publish(Events.ReadingsUpdated);
  }
  
  onReadingsUpdated(callback: () => void): Disposable {
    return this.eventAggregator.subscribe(Events.ReadingsUpdated, callback);
  }

  sampleInfoUpdated(): void {
    this.eventAggregator.publish(Events.SampleInfoUpdated);
  }

  onSampleInfoUpdated(callback: () => void): Disposable {
    return this.eventAggregator.subscribe(Events.SampleInfoUpdated, callback);
  }

  dataTabUpdated(): void {
    this.eventAggregator.publish(Events.DataTabUpdated);
  }

  onDataTabUpdated(callback: () => void): Disposable {
    return this.eventAggregator.subscribe(Events.DataTabUpdated, callback);
  }
}