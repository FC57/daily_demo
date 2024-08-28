import { isObject } from './utils/index.js';
import { cleanup, effect } from './core/effect.js';

/**
 * 遍历数据读取属性以收集依赖
 * @param {*} target 数据
 * @param {Set} iterated 存储已遍历数据
 */
function iterateData(target, iterated = new Set()) {
  if (!isObject(target) || iterated.has(target)) {
    return target;
  }
  iterated.add(target);
  for (const key in target) {
    iterateData(target[key], iterated);
  }
  return target;
}

/**
 * watch 侦听方法
 * @param {Function|Object} stateOrGetter 侦听数据或getter函数
 * @param {Function} callback 执行回调函数
 * @param {Object} options 配置项
 */
export function watch(stateOrGetter, callback, options = {}) {
  // 参数归一化处理
  const getter =
    typeof stateOrGetter === 'function' ? stateOrGetter : () => iterateData(stateOrGetter);
  // 定义存储新旧值
  let oldValue, newValue;
  // 值变更时的操作
  const scheduler = () => {
    newValue = effectFn();
    typeof callback === 'function' && callback(newValue, oldValue);
    oldValue = newValue;
  };
  const effectFn = effect(getter, {
    delay: true,
    scheduler: () => {
      if (options.flush === 'post') {
        Promise.resolve().then(scheduler);
      } else {
        scheduler();
      }
    }
  });
  if (options.immediate) {
    scheduler();
  } else {
    // 调用 effectFn 间接调用 getter ，对 getter 中读取到的数据属性进行依赖收集
    oldValue = effectFn();
  }
  if (options.once) {
    cleanup(effectFn);
  }
  return () => cleanup(effectFn);
}
