import { toLower, toString } from 'rambda'

const objectOrPrimitive = (
  val: string | number | Date | Object
): string | Date | Object => {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    return toLower(val)
  } else if (typeof val === 'number') {
    return toLower(toString(val))
  } else {
    return val
  }
}

const isUndefinedOrTrue = (val: boolean | undefined): boolean =>
  typeof val === 'undefined' || val

export { objectOrPrimitive, isUndefinedOrTrue }
