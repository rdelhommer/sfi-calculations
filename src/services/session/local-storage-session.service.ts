import { inject } from "aurelia-framework";
import { IOrganismReading } from "../../resources/elements/reading/reading";
import { ICache } from "../cache/cache.service";
import { ISession } from "./session.service";
import { IProfileModel } from "../../app/settings-tab/settings-tab";

@inject(ICache)
export class LocalStorageSession implements ISession {
  
  constructor(
    private cache: ICache
  ) { }

  saveReadingTab(readings: IOrganismReading[]): void {
    this.cache.set(ICache.Mode.Global, 'readingTab', readings)
  }

  saveProfile(profile: IProfileModel): void {
    this.cache.set(ICache.Mode.Permanent, 'profile', profile)
  }

  getProfile(): IProfileModel {
    return this.cache.get(ICache.Mode.Permanent, 'profile') || { address: { } }
  }
}