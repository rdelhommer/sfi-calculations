import { IOrganismReading } from "../../resources/elements/reading/reading";
import { IProfileModel } from "../../app/settings-tab/settings-tab";
import { IDataModel } from "../../app/data-tab/data-tab";

export abstract class ISession {
  abstract clear(): void
  
  abstract saveReadingTab(readings: IOrganismReading[]): void

  abstract saveDataTab(data: IDataModel): void
  abstract getDataTab(): IDataModel

  abstract saveProfile(profile: IProfileModel): void
  abstract getProfile(): IProfileModel
}