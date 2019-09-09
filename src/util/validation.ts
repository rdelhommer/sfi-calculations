import { ValidationRules } from 'aurelia-validation'

export enum CustomRule {
  IsNumber = 'isNumber',
  IsNumberArray = 'isNumberArray'
}

export function isNumber(value: number | string) {
  if (value === '') return false
  if (value == null) return true

  let num = Number(value);
  return !Number.isNaN(num)
}

export function isNumberArray(value: number[]) {
  if (value.length === 0) return true
  if (value.every(x => x == null || <any>x === '')) return false

  return value.every(x => isNumber(x))
}

export function initCustomRules() {
  ValidationRules.customRule(
    CustomRule.IsNumberArray,
    isNumberArray,
    'Values can only be numbers.'
  );  

  ValidationRules.customRule(
    CustomRule.IsNumber,
    isNumber,
    '${$displayName} must be a number.'
  );  
}

initCustomRules()
