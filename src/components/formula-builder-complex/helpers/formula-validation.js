import { parse, evaluate } from 'mathjs'
import { operators } from '../constants'
import { objectAttributeLabelById } from '../helpers/object-attributes'

export function getFormulaString(formula, formulaPreviewType, objectAttributes = []) {
  let randomValue = 1
  return formula.reduce((acc, item) => {
    if (item.valueType === 'operator') {
      const operator = operators.find(op => op.value === item.value)
      acc += `${operator.symbol ? operator.symbol : operator.label}`
    }
    else if (item.valueType === 'constant' || (item.valueType === 'object_attribute' && formulaPreviewType === 'Field Names')) {
      if (item.valueType === 'object_attribute') {
        acc += objectAttributeLabelById(item.value, objectAttributes)
      }
      else {
        acc += item.value
      }
    }
    else {
      acc += item.valueType === 'object_attribute' ? item.previewValue ?? randomValue : randomValue
      randomValue++
    }
    return acc
  }, '')
}
export function getFormulaExample(formulaString, formulaPreviewType) {
  if (formulaString) {
    if (formulaPreviewType === 'Numbers') {
      try {
        // console.log('getFormulaExample: ', [formulaString, parse(formulaString), parse(formulaString).toString()])
        return `${parse(formulaString.toString())} = ${evaluate(formulaString)}`
      }
      catch (e) {
        return formulaString + 'invalid formula'
      }
    }
    else {
      return formulaString
    }
  }

  return ''
}