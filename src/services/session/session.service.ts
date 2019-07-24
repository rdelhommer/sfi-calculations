import { IOrganismReading } from "../../resources/elements/reading/reading";
import { IProfileModel } from "../../app/settings-tab/settings-tab";

export abstract class ISession {
  abstract saveReadingTab(readings: IOrganismReading[]): void
  abstract saveProfile(profile: IProfileModel): void
  abstract getProfile(): IProfileModel
}