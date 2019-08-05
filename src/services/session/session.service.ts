import { ISampleModel } from "../../models/sample.model";
import { IProfileModel } from "../../models/profile.model";
import { IOrganismReading } from "../../models/reading.model";
import { IDataModel } from "../../models/data.model";

export abstract class ISession {
  abstract clear(): void
  
  abstract saveData(data: IDataModel): void
  abstract loadData(): IDataModel

  abstract saveReadings(readingNumber: number, readings: IOrganismReading[]): void
  abstract loadReadings(readingNumber: number): IOrganismReading[]
  abstract loadAllReadings(): IOrganismReading[][]

  abstract saveSample(sample: ISampleModel): void
  abstract loadSample(): ISampleModel

  abstract saveProfile(profile: IProfileModel): void
  abstract loadProfile(): IProfileModel
}