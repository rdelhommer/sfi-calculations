import { inject } from "aurelia-framework";
import { ICache } from "../cache/cache.service";
import { ISession } from "./session.service";
import { ISampleModel, Sample } from "../../models/sample.model";
import { IProfileModel, Profile } from "../../models/profile.model";
import { IOrganismReading, OrganismReading } from "../../models/reading.model";
import { DEFAULT_READINGS } from "../../util/constants";

@inject(ICache)
export class LocalStorageSession implements ISession {
  
  constructor(
    private cache: ICache
  ) { }

  clear() {
    this.cache.clear();
  }

  saveReadings(readingNumber: number, readings: IOrganismReading[]): void {
    this.cache.set(ICache.Mode.Global, `readingTab-${readingNumber}`, readings)
  }

  loadReadings(readingNumber: number): IOrganismReading[] {
    let raw = this.cache.get(ICache.Mode.Global, `readingTab-${readingNumber}`)
    return raw == null ? DEFAULT_READINGS : raw.map(x => new OrganismReading(x));
  }

  loadAllReadings(): IOrganismReading[][] {
    let ret = []
    for (let i = 1; i < 6; i++) {
      ret.push(this.loadReadings(i))
    }

    return ret
  }

  saveSample(sample: ISampleModel): void {
    this.cache.set(ICache.Mode.Global, 'sample', sample)
  }

  loadSample(): ISampleModel {
    let observer = this.cache.get(ICache.Mode.Permanent, 'profile');
    let rawSample = this.cache.get(ICache.Mode.Global, 'sample') || { observer }

    return new Sample(rawSample)
  }

  saveProfile(profile: IProfileModel): void {
    this.cache.set(ICache.Mode.Permanent, 'profile', profile)
  }

  loadProfile(): IProfileModel {
    let raw = this.cache.get(ICache.Mode.Permanent, 'profile') || { }
    return new Profile(raw);
  }
}