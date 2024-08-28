/**
 * 判断数据是否是对象
 * @param {*} value 数据
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * 判断数据是否变化
 * @param {*} oldValue 旧值
 * @param {*} newValue 新值
 */
export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue);
}

/**
 * vue2中判断数据是否变化
 * @param {*} x 旧值
 * @param {*} y 新值
 */
function _hasChanged(x, y) {
  if (x === y) {
    // 这里是判断 +0 === -0 true，其实需要的 false ，即不相等，为变化了
    return x === 0 && 1 / x !== 1 / y;
  } else {
    // 这个判断是否等于自身，即判断 NaN === NaN false，需要的是 true
    return x === x || y === y;
  }
}
