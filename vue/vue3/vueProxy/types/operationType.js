/** 依赖收集类型 */
export const trackOpTypes = {
  /** 读取属性值 */
  GET: 'get',
  /** 判断属性是否存在 */
  HAS: 'has',
  /** 迭代数据中的属性 */
  ITERATE: 'iterate'
};

/** 派发更新类型 */
export const triggerOpTypes = {
  /** 设置属性 */
  SET: 'set',
  /** 添加属性 */
  ADD: 'add',
  /** 删除属性 */
  DELETE: 'delete'
};
