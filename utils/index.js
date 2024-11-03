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

/**
 * 将任务放入微队列执行
 * @param {Function} callback 回调函数
 */
export function runMicroTask(callback) {
  try {
    // node 环境
    process.nextTick(callback);
    return;
  } catch (_error) {
    // 浏览器支持 MutationObserver API
    if (MutationObserver) {
      const ob = new MutationObserver(callback);
      const textNode = document.createTextNode('1');
      ob.observe(textNode, {
        characterData: true // 观察字符变化
      });
      textNode.data = '2';
      return;
    }
    // 浏览器支持 Promise
    if (typeof Promise === 'function') {
      Promise.resolve().then(callback);
      return;
    }
  }
  setTimeout(callback, 0);
}

/**
 * 柯里化函数
 * * 在函数编程中，作用是把多参函数变为单参函数
 * @param {Function} fun 函数
 * @param {*} ctx 函数this
 * @param {*} args 剩余参数（或固定参数）数组
 */
export function curry(fun, ctx, ...args) {
  return function () {
    // 参数总量 = 当前参数 + 固定参数
    const params = [...args, ...arguments];
    if (params.length >= fun.length) {
      // 参数够了就调用
      return fun.apply(ctx, params);
    } else {
      // 继续固定参数
      params.unshift(fun, ctx);
      return curry.apply(null, params);
    }
  };
}
