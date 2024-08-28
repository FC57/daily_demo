import { isObject } from '../utils/index.js';
import { handlers } from './handler.js';

/** 全局数据代理的映射结构 */
const targetMap = new WeakMap();

/**
 * 标记函数即生成响应式数据
 * @param {*} target 监听的数据
 */
export function reactive(target) {
  // 监听的必须是对象类型的数据
  if (!isObject(target)) {
    return target;
  }
  // 之前已经监听过，直接返回
  if (targetMap.has(target)) {
    return targetMap.get(target);
  }
  // 数据代理
  const proxy = new Proxy(target, handlers);
  targetMap.set(target, proxy);
  return proxy;
}
