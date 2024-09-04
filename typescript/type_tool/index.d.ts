/** 获取数组元素类型构成的联合类型 */
export type ArrayType<T> = T extends (infer I)[] ? I : T;
/** 递归获取数组元素类型构成的联合类型 */
export type DeepArrayType<T> = T extends (infer I)[] ? DeepArrayType<I> : T;

/**
 * 实现 Record<K,T>
 * * 一个对象类型，其中所有属性的键类型为 K，值类型为 T（keyof any = string | number | symbol）
 */
export type MyRecord<K extends keyof any, T> = { [P in K]: T };

/**
 * 实现 Partial<T>
 * * T 的所有属性都可选
 */
export type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * 实现 Require<T>
 * * T 的所有属性都必选（-? 表示类型必选）
 */
export type MyRequire<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * 实现 Exclude<T,U>
 * * 从类型 T 中排除 U 类型
 */
export type MyExclude<T, U> = T extends U ? never : T;

/**
 * 实现 Extract<T,U>
 * * 从类型 T 中提取 U 类型
 */
export type MyExtract<T, U> = T extends U ? T : never;

/**
 * 实现 Pick<T,K>
 * * 从类型 T 中选择一部分属性 K
 */
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * 实现 Omit<T,K>
 * * 从类型 T 中排除属性 K
 */
export type MyOmit<T, K extends keyof any> = {
  [P in MyExclude<keyof T, K>]: T[P];
};
