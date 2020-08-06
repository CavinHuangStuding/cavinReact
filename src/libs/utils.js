/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString

/**
 * 
 * @param {any} value 
 */
export function dataType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * 数据合并方法
 * @param {Object} target 目标对象
 * @param {Object} origin 源对象
 * @param {String} stand 合并标准，默认为左树标准
 * @returns {void} 无返回值
 */
export function mergeData (oldState, newState) {
    if (!oldState || !newState) {
      return
    }
    if (dataType(oldState) !== dataType(newState)) {
      console.error('目标对象与源对象的数据类型不同，无法实现合并')
      return
    }
    for (let p in newState) {
      if (dataType(newState[p]) === 'object' && newState[p] !== null) {
        if (dataType(oldState[p] !== 'object')) {
          if (newState instanceof Array) {
            oldState[p] = []
          } else {
            oldState[p] = {}
          }
        }
        mergeData(oldState[p], newState[p])
      } else {
        oldState[p] = newState[p]
      }
    }
  }