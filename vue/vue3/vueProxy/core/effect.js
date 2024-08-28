import { trackOpTypes, triggerOpTypes } from '../types/operationType.js';

/** 派发更新数据结构 */
const targetMap = new WeakMap();
/** 迭代的属性 */
const ITERATE_KEY = Symbol('iterate');
/** 当前收集的执行函数 */
let activeEffect = void 0;
/** 执行函数的执行栈，避免嵌套使用出错 */
const effectStack = [];
/** 是否依赖收集 */
let shouldTrack = true;

/** 暂停依赖收集 */
export function pauseTracking() {
  shouldTrack = false;
}
/** 恢复依赖收集 */
export function resumeTracking() {
  shouldTrack = true;
}

/**
 * 清空指定依赖收集的函数
 * @param {Function} effectFn 依赖收集的执行函数
 */
export function cleanup(effectFn) {
  const { deps } = effectFn;
  if (!deps.length) {
    return;
  }
  for (const dep of deps) {
    dep.delete(effectFn);
  }
  deps.length = 0;
}

/**
 * 收集派发更新后执行函数的环境（包含执行函数）
 * @param {Function} fn 用到数据的函数
 * @param {object} options 配置项
 */
export function effect(fn, options = {}) {
  const { lazy = false } = options;
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      // 往执行栈中添加执行函数
      effectStack.push(effectFn);
      // 函数执行前应清空之前的依赖收集函数（即函数执行会重新收集依赖）
      cleanup(activeEffect);
      // 函数fn 执行过程中会收集依赖
      return fn();
    } finally {
      // 执行完后出栈
      effectStack.pop();
      // 当前执行函数赋值为执行栈顶部
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  // 标记方法所在集合，方便重新收集依赖时，删除之前的依赖
  effectFn.deps = [];
  // 保存配置
  effectFn.options = options;
  if (!lazy) {
    effectFn();
  }
  return effectFn;
}

/**
 * 依赖收集函数
 * @param {object} target 数据
 * @param {string} type 处理类型
 * @param {string} key 数据属性
 */
export function track(target, type, key) {
  if (!shouldTrack || !activeEffect) {
    return;
  }
  // 构建收集依赖的数据关系 targetWeakMap -> propMap -> typeMap -> depSet
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  let _key = key;
  if (type === trackOpTypes.ITERATE) {
    _key = ITERATE_KEY;
  }
  console.log(`%c依赖收集：【${type}】`, 'color:#f00', _key);

  let typeMap = propMap.get(_key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(_key, typeMap);
  }
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    // 记录方法所在集合
    activeEffect.deps.push(depSet);
  }
  console.log(targetMap);
}

/**
 * 获取执行函数
 * @param {object} target 数据
 * @param {string} type 处理类型
 * @param {string} key 数据属性
 */
function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if (!propMap) {
    return;
  }
  const { ADD, SET, DELETE } = triggerOpTypes;
  // 属性集合
  const keys = [key];
  if (type === ADD || type === DELETE) {
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set();
  const { GET, HAS, ITERATE } = trackOpTypes;
  // 派发类型与依赖收集类型的映射
  const triggerTypeMap = {
    [SET]: [GET],
    [ADD]: [GET, HAS, ITERATE],
    [DELETE]: [GET, HAS, ITERATE]
  };
  for (const _key of keys) {
    const typeMap = propMap.get(_key);
    if (!typeMap) {
      continue;
    }
    const trackTypes = triggerTypeMap[type];
    for (const track of trackTypes) {
      const dep = typeMap.get(track);
      if (!dep) {
        continue;
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}

/**
 * 派发更新函数
 * @param {object} target 数据
 * @param {string} type 处理类型
 * @param {string} key 数据属性
 */
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key);
  if (!effectFns) {
    return;
  }
  for (const effectFn of effectFns) {
    // 触发函数不能又收集又触发，不然会溢出
    if (effectFn === activeEffect) {
      continue;
    }
    // 配置中的调度器
    const { scheduler } = effectFn.options;
    if (typeof scheduler === 'function') {
      scheduler(effectFn);
    } else {
      effectFn();
    }
  }
  console.log(`%c派发更新：【${type}】`, 'color:#00f', key);
}
