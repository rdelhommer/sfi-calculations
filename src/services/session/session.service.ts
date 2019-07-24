import { IOrganismReading } from "../../resources/elements/reading/reading";

export abstract class ISession {
  abstract saveReadingTab(readings: IOrganismReading[]): void
}