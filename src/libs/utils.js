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
export function mergeData (target, origin, stand = 'left') {
    if (!target || !origin) {
      return
    }
    if (dataType(target) !== dataType(origin)) {
      console.error('目标对象与源对象的数据类型不同，无法实现合并')
      return
    }
  
    let flag = stand === 'left'
    for (let prop in target) {
      if (dataType(target[prop]) === 'object') {
        // target[prop] = (target[prop].constructor === Array) ? [] : {}// 三元运算，将s[prop]初始化为数组或者对象
        mergeData(target[prop], origin[prop])
      } else if (dataType(target[prop]) === 'array') {
        // 兼容处理
        if (!origin[prop]) {
          origin[prop] = []
        }
        if (origin[prop].length > 0) {
          // 该条件是为了剔除重复的数据
          target[prop].length = 0
        }
        target[prop].push(...origin[prop])
      } else {
        let defaultVal
        switch (dataType(target[prop])) {
          case 'object':
            defaultVal = flag ? (target[prop] || {}) : (origin[prop] || {})
            break
          case 'array':
            // defaultVal = target[prop] || []
            defaultVal = flag ? (target[prop] || []) : (origin[prop] || [])
            break
          case 'string':
            // defaultVal = target[prop] || ''
            defaultVal = flag ? (target[prop] || '') : (origin[prop] || '')
            break
          case 'number':
            // defaultVal = target[prop] || 0
            defaultVal = flag ? (target[prop] || 0) : (origin[prop] || 0)
            break
          case 'boolean':
            // defaultVal = target[prop] || false
            defaultVal = flag ? (target[prop] || false) : (origin[prop] || false)
            break
        }
        target[prop] = (origin[prop] || defaultVal)
      }
    }
  }