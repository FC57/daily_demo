import { effect, track, trigger } from './core/effect.js';
import { trackOpTypes, triggerOpTypes } from './types/operationType.js';

/**
 * 参数归一化
 * @param {Funtion|object} getterOrOptions
 */
function normalizeParameter(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions;
    setter = () => {
      console.error('Computed property was assigned to, but it has no setter.');
    };
  } else {
    const { get, set } = getterOrOptions;
    getter = get;
    setter = set;
  }
  return { getter, setter };
}

/**
 * cmputed 计算属性
 * @param {Function|object} getterOrOptions
 */
export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParameter(getterOrOptions);
  // 对比缓存结果的值
  let cacheRes,
    effectFn,
    dirty = true;
  const obj = {
    get value() {
      // 其他effect的回调函数中用到了 computed创建的数据，为了建立关联收集依赖
      track(this, trackOpTypes.GET, 'value');
      if (dirty) {
        dirty = false;
        // 因此,computed 定义的收集，需要访问value属性才会收集依赖并执行 getter
        cacheRes = effectFn();
      }
      return cacheRes;
    },
    set value(newVal) {
      setter(newVal);
    }
  };
  // 执行中收集依赖
  effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      console.log('scheduler');
      dirty = true;
      trigger(obj, triggerOpTypes.SET, 'value');
    }
  });
  return obj;
}
