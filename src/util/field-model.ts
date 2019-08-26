export const FIELD_NUM_RAW_DATA = 10;

export function initFieldRawData(rawData: number[]) {
  if (!rawData) {
    rawData = []
  }

  for (let i = rawData.length; i < FIELD_NUM_RAW_DATA; i++) {
    rawData.push(null)
  }

  return rawData
}
