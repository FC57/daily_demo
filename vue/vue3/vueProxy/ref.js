import { trackOpTypes, triggerOpTypes } from './types/operationType.js';
import { track, trigger } from './core/effect.js';
import { reactive } from './core/reactive.js';
import { hasChanged } from './utils/index.js';

/**
 * 标记为ref响应数据
 * @param {*} val 响应数据的值
 */
export function ref(val) {
  let oldVal = val;
  let resVal = reactive(val);
  return {
    get value() {
      track(this, trackOpTypes.GET, 'value');
      return resVal;
    },
    set value(newVal) {
      if (hasChanged(oldVal, newVal)) {
        oldVal = newVal;
        resVal = reactive(newVal);
        trigger(this, triggerOpTypes.SET, 'value');
      }
    }
  };
}
