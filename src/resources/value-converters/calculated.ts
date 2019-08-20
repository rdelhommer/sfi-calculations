export class CalculatedValueConverter {
  _round(value: number, precision: number = 1) {
    var y = +value + (precision/2);
    return y - (y % (+precision));
  }
  

  toView(value, precision) {
    let asNumber = Number(value)
    if (Number.isNaN(asNumber)) return '--'

    return this._round(asNumber, precision)
  }
}
