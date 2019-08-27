import { round } from "../../util/misc";

export class CalculatedValueConverter {
  toView(value, precision) {
    if (value == null) return '--'
    
    let asNumber = Number(value)
    if (Number.isNaN(asNumber)) return '--'

    return round(asNumber, precision)
  }
}
