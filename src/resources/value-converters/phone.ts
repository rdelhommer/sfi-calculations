export class PhoneValueConverter {
  toView(value: string) {
    if (value.length !== 10) return '--'

    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`
  }
}
