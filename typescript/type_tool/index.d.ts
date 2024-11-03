/** 获取数组元素类型构成的联合类型 */
type ArrayType<T> = T extends (infer I)[] ? I : T;

/** 递归获取数组元素类型构成的联合类型 */
type DeepArrayType<T> = T extends (infer I)[] ? DeepArrayType<I> : T;

/** 获取对象属性值的联合类型 */
type GetValueType<T, K extends keyof T = keyof T> = T[K] extends infer I ? I : never;

/** 将对象指定键变为可选 */
type Optional<T, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 获取一个对象中的所有可选字段 */
type GetOptional<T extends Record<keyof any, any>> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};

/** 联合类型转交叉类型 */
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
