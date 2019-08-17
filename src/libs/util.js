export const EPSILON = Number.EPSILON

export const isZero = num => Math.abs(num) < EPSILON

export const isEqual = (a, b) => Math.abs(a - b) < EPSILON

export function isNum(v) {
  return typeof v === 'number'
}

/**
 * 深度克隆
 * @param {Array | Object} source
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
