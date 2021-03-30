import { toLower, toString } from 'rambda'

const objectOrPrimitive = (
  val: string | number | Date | undefined
): string | Date => {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    return toLower(val)
  } else if (typeof val === 'number') {
    return toLower(toString(val))
  } else {
    return ''
  }
}

const toStringOrNumber = <
  T extends string | number,
  K extends 'string' | 'number'
>(
  val: T,
  type: K
): K extends 'string' ? string : number => {
  if (type === 'string') {
    return val.toString() as any
  } else {
    return Number(val) as any
  }
}

const isUndefinedOrTrue = (val: boolean | undefined): boolean =>
  typeof val === 'undefined' || val

export { objectOrPrimitive, isUndefinedOrTrue, toStringOrNumber }
