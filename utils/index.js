/**
 * 获取from至to之和
 * @param {number} from 起始数
 * @param {number} to 截至数
 */
export function sumFromTo(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return 0;
  }
  if (from === to) {
    return from;
  } else if (from > to) {
    return sumFromTo(to, from);
  } else {
    return from + sumFromTo(from + 1, to);
  }
}

/**
 * 将数组元素乱序排序
 * @param {Array} arr
 */
export function sortRandom(arr) {
  return arr.sort((_a, _b) => Math.random() - 0.5);
}

/**
 * 获取指定范围随机数
 * @param {number} from 起始数
 * @param {number} to 截至数
 * @param {boolean} isInteger 是否整数
 */
export function getRandomNumberFromTo(from, to, isInteger = true) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return 0;
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  if (isInteger) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return Math.random() * (to - from) + from;
}
