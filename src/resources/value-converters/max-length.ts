export class MaxLengthValueConverter {
  toView(value, format) {
    if (!value) return ''
    if (!format || value.length <= format) return value

    return value.substring(0, format).trim() + '...'
  }
}
