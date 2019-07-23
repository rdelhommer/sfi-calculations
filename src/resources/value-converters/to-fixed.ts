export class ToFixedValueConverter {
  toView(value, format) {
    let asNumber = Number(value)
    if (Number.isNaN(asNumber)) return '--'

    if (!format) format = 0
    return asNumber.toFixed(format)
  }
}
