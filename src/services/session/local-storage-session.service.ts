import { autoinject, inject } from "aurelia-framework";
import { IOrganismReading } from "../../resources/elements/reading/reading";
import { ICache } from "../cache/cache.service";
import { ISession } from "./session.service";

@inject(ICache)
export class LocalStorageSession implements ISession {
  
  constructor(
    private cache: ICache
  ) { }

  saveReadingTab(readings: IOrganismReading[]): void {
    this.cache.set(ICache.Mode.Global, 'readingTab', readings);
  }
}