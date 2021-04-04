import { toLower, Ord } from 'rambda'

const objectOrPrimitive = (val: string | number | Date | undefined): Ord => {
  if (val instanceof Date) {
    return val
  } else if (typeof val === 'string') {
    return toLower(val)
  } else if (typeof val === 'number') {
    return val
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

const lowerCase = (val: string): string => val.toLowerCase()
export { objectOrPrimitive, isUndefinedOrTrue, toStringOrNumber, lowerCase }
