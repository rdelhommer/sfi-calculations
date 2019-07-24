import { inject } from "aurelia-framework";
import { IOrganismReading } from "../../resources/elements/reading/reading";
import { ICache } from "../cache/cache.service";
import { ISession } from "./session.service";
import { IProfileModel } from "../../app/settings-tab/settings-tab";
import { IDataModel } from "../../app/data-tab/data-tab";

@inject(ICache)
export class LocalStorageSession implements ISession {
  
  constructor(
    private cache: ICache
  ) { }

  clear() {
    this.cache.clear();
  }

  saveReadingTab(readings: IOrganismReading[]): void {
    this.cache.set(ICache.Mode.Global, 'readingTab', readings)
  }

  saveDataTab(data: IDataModel): void {
    this.cache.set(ICache.Mode.Global, 'dataTab', data)
  }

  getDataTab(): IDataModel {
    let profile = this.cache.get(ICache.Mode.Permanent, 'profile');
    return this.cache.get(ICache.Mode.Global, 'dataTab') ||
      {
        profile,
        sample: { }
      }
  }

  saveProfile(profile: IProfileModel): void {
    this.cache.set(ICache.Mode.Permanent, 'profile', profile)
  }

  getProfile(): IProfileModel {
    return this.cache.get(ICache.Mode.Permanent, 'profile') || { address: { } }
  }
}