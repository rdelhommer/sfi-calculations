import { round } from "../../util/misc";

export class CalculatedValueConverter {
  toView(value, precision) {
    let asNumber = Number(value)
    if (Number.isNaN(asNumber)) return '--'

    return round(asNumber, precision)
  }
}
