import { isObject, hasChanged } from '../utils/index.js';
import { reactive } from './reactive.js';
import { track, trigger, pauseTracking, resumeTracking } from './effect.js';
import { trackOpTypes, triggerOpTypes } from '../types/operationType.js';

/** 返回原始对象的键 */
const RAW = Symbol('raw');
/** 数组特殊属性方法名（因为this指向问题导致）集合 */
const arraySp_this_FnNames = ['includes', 'indexOf', 'lastIndexOf'];
/** 数组特殊属性方法名（因为间接改变length问题导致）集合 */
const arraySp_length_FnNames = ['push', 'pop', 'shift', 'unshift', 'splice'];
/** 数组特殊属性方法映射 */
const arraySpFnMap = {};

// 数组特殊属性方法的替换
arraySp_this_FnNames.forEach(fn => {
  arraySpFnMap[fn] = function (...args) {
    // 将来使用时，this 指向为数据的代理对象

    // 方案一）将传入的原始对象转换为代理对象
    const [target, resetArgs = []] = args;
    const params = [reactive(target), ...resetArgs];
    const result = Array.prototype[fn].apply(this, params);

    // 方案二）缺陷：会收集多余的依赖
    // 1.正常找
    // const result = Array.prototype[fn].apply(this, args);
    // 2.找不到在原始对象上找
    // if (result < 0 || result === false) {
    //   return Array.prototype[fn].apply(this[RAW], args);
    // }
    return result;
  };
});
arraySp_length_FnNames.forEach(fn => {
  arraySpFnMap[fn] = function (...args) {
    // 暂停依赖收集
    pauseTracking();
    const result = Array.prototype[fn].apply(this, args);
    // 恢复依赖收集
    resumeTracking();
    return result;
  };
});

/**
 * 数据属性读取并收集依赖
 * @param {object} target 监听数据
 * @param {string} key 监听数据属性
 * @param {object} receiver 接收器 用于指定 this 指向
 */
function get(target, key, receiver) {
  // 读取返回原始对象
  if (key === RAW) {
    return target;
  }
  // 依赖收集
  track(target, trackOpTypes.GET, key);
  // 数组特殊属性读取的特殊处理
  if (arraySpFnMap.hasOwnProperty(key) && Array.isArray(target)) {
    return arraySpFnMap[key];
  }
  // 这里需要将 this 指定为代理对象
  // target[key] 相当于内部方法 [[Get]] 的语法糖，this指向默认为 target ，无法指定this，所以用 Reflect
  const result = Reflect.get(target, key, receiver);
  // 若读取数据为对象，递归的方式，完成深度代理
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}

/**
 * 数据属性值处理并派发更新
 * @param {object} target 监听数据
 * @param {string} key 监听数据属性
 * @param {*} value 设置的值
 * @param {object} receiver 接收器 用于指定 this 指向
 */
function set(target, key, value, receiver) {
  const oldValue = target[key];
  const isArray = Array.isArray(target);
  const oldLength = isArray ? target.length : void 0;
  const { ADD, SET, DELETE } = triggerOpTypes;
  const type = target.hasOwnProperty(key) ? SET : ADD;
  // 内部方法，操作数据返回 boolean
  const result = Reflect.set(target, key, value, receiver);
  if (!result) {
    return result;
  }
  const newLength = isArray ? target.length : void 0;
  // 属性有变化或添加属性，才派发更新
  if (hasChanged(oldValue, value) || type === ADD) {
    trigger(target, type, key);
    if (isArray && oldLength !== newLength) {
      // 间接改变了length
      if (key !== 'length') {
        trigger(target, SET, 'length');
      } else {
        // 手动控制length变小
        if (newLength < oldLength) {
          let i = newLength;
          while (i < oldLength) {
            trigger(target, DELETE, `${i}`);
            i++;
          }
        }
      }
    }
  }
  return result;
}

/**
 * 删除数据属性，并派发更新
 * @param {object} target 监听数据
 * @param {string} key 监听数据属性
 */
function deleteProperty(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);
  // 属性存在并且删除成功，才派发更新
  if (hadKey && result) {
    trigger(target, triggerOpTypes.DELETE, key);
  }
  return result;
}

/**
 * 判断属性是否存在并收集依赖
 * * 'a' in obj ，in 关键字调用的是内部方法 [[HasProperty]]，对应 Reflect 的方法 has
 * @param {object} target 监听的数据
 * @param {string} key 监听数据的属性
 */
function has(target, key) {
  // 这里的读，读取信息，也要进行依赖收集
  track(target, trackOpTypes.HAS, key);
  return Reflect.has(target, key);
}

/**
 * 迭代对象数据属性时
 * @param {*} target 监听数据
 */
function ownKeys(target) {
  // 收集依赖
  track(target, trackOpTypes.ITERATE);
  return Reflect.ownKeys(target);
}

/** 代理的自定义行为对象 */
export const handlers = { get, set, has, ownKeys, deleteProperty };
