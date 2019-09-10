import { IModel } from "../base.model";
import { ISuccessionRange, SuccessionRange } from "./succession-range.model";

export interface ISuccessionRequirement extends IModel {
  name: string
  bacteria: ISuccessionRange
  fungi: ISuccessionRange
  fb: ISuccessionRange
  actinobacteria: ISuccessionRange
  oomycetes: ISuccessionRange
  flagellateAmoebae: ISuccessionRange
  ciliates: ISuccessionRange
  bacteriaNematodes: ISuccessionRange
  fungalNematodes: ISuccessionRange
  predatoryNematodes: ISuccessionRange
}

export class SuccessionRequirement implements ISuccessionRequirement {
  static fromPartial(init: RecursivePartial<ISuccessionRequirement> = { }): ISuccessionRequirement {
    let ret = new SuccessionRequirement()

    ret.bacteria = SuccessionRange.fromPartial(init.bacteria)
    ret.fungi = SuccessionRange.fromPartial(init.fungi)
    ret.fb = SuccessionRange.fromPartial(init.fb)
    ret.actinobacteria = SuccessionRange.fromPartial(init.actinobacteria)
    ret.oomycetes = SuccessionRange.fromPartial(init.oomycetes)
    ret.flagellateAmoebae = SuccessionRange.fromPartial(init.flagellateAmoebae)
    ret.ciliates = SuccessionRange.fromPartial(init.ciliates)
    ret.bacteriaNematodes = SuccessionRange.fromPartial(init.bacteriaNematodes)
    ret.fungalNematodes = SuccessionRange.fromPartial(init.fungalNematodes)
    ret.predatoryNematodes = SuccessionRange.fromPartial(init.predatoryNematodes)

    return ret
  }

  static createDefaults(): ISuccessionRequirement[] {
    let ret = []

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Weeds',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 1000 }),
      fungi: SuccessionRange.fromPartial({ min: 5, max: 50 }),
      fb: SuccessionRange.fromPartial({ min: 0, max: 30 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 20, max: 100 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 1000, max: 10000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 0, max: 10 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 0, max: 0 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 0, max: 0 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Early Grasses/Brassica',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 2000 }),
      fungi: SuccessionRange.fromPartial({ min: 100, max: 200 }),
      fb: SuccessionRange.fromPartial({ min: 30, max: 50 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 12, max: 12 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 10000, max: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 0, max: 100 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 0, max: 10 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 0, max: 1 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Mid Grasses/Vegetables',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 1000 }),
      fungi: SuccessionRange.fromPartial({ min: 150, max: 500 }),
      fb: SuccessionRange.fromPartial({ min: 50, max: 80 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 1, max: 6 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 0, max: 100 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 10, max: 20 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 1, max: 2 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Perennial Grasses, row crops',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 3000 }),
      fungi: SuccessionRange.fromPartial({ min: 300, max: 3000 }),
      fb: SuccessionRange.fromPartial({ min: 80, max: 100 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 1, max: 4 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 200 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 20 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 2, max: 4 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Shrubs, vines',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 3000 }),
      fungi: SuccessionRange.fromPartial({ min: 600, max: 6000 }),
      fb: SuccessionRange.fromPartial({ min: 200, max: 500 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 0, max: 1 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 200 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 20 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 4 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Deciduous Trees',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 2000 }),
      fungi: SuccessionRange.fromPartial({ min: 1200, max: 20000 }),
      fb: SuccessionRange.fromPartial({ min: 500, max: 10000 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 0, max: 1 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 10000, max: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 200 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 20 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 4 }),
    }))

    ret.push(SuccessionRequirement.fromPartial({
      name: 'Evergreen Trees',
      bacteria: SuccessionRange.fromPartial({ min: 300, max: 1000 }),
      fungi: SuccessionRange.fromPartial({ min: 3000, max: 100000 }),
      fb: SuccessionRange.fromPartial({ min: 10000, max: 100000 }),
      actinobacteria: SuccessionRange.fromPartial({ min: 0, max: 1 }),
      oomycetes: SuccessionRange.fromPartial({ max: 0 }),
      flagellateAmoebae: SuccessionRange.fromPartial({ min: 10000, max: 50000 }),
      ciliates: SuccessionRange.fromPartial({ max: 0 }),
      bacteriaNematodes: SuccessionRange.fromPartial({ min: 200 }),
      fungalNematodes: SuccessionRange.fromPartial({ min: 20 }),
      predatoryNematodes: SuccessionRange.fromPartial({ min: 4 }),
    }))
    
    return ret
  }

  name: string
  bacteria: ISuccessionRange;  
  fungi: ISuccessionRange;
  fb: ISuccessionRange;
  actinobacteria: ISuccessionRange;
  oomycetes: ISuccessionRange;
  flagellateAmoebae: ISuccessionRange;
  ciliates: ISuccessionRange;
  bacteriaNematodes: ISuccessionRange;
  fungalNematodes: ISuccessionRange;
  predatoryNematodes: ISuccessionRange;

  get isValid() {
    return this.bacteria.isValid
      && this.fungi.isValid
      && this.fb.isValid
      && this.actinobacteria.isValid
      && this.oomycetes.isValid
      && this.flagellateAmoebae.isValid
      && this.ciliates.isValid
      && this.bacteriaNematodes.isValid
      && this.fungalNematodes.isValid
      && this.predatoryNematodes.isValid
  }
}