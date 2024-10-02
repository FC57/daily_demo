/**
 * 实现 Record<K,T>
 * * 一个对象类型，其中所有属性的键类型为 K，值类型为 T（keyof any = string | number | symbol）
 */
type MyRecord<K extends keyof any, T> = { [P in K]: T };

const recordTest: MyRecord<string, number | string> = {
  name: 'test',
  id: 1,
  desc: 'my description'
};

/**
 * 实现 Partial<T>
 * * T 的所有属性都可选
 */
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

const sourceObj = { name: 'source', id: 2, desc: 'data of source' };
const partialTest: MyPartial<typeof sourceObj> = { id: 2 };

/**
 * 实现 Require<T>
 * * T 的所有属性都必选（-? 表示类型必选）
 */
type MyRequire<T> = {
  [P in keyof T]-?: T[P];
};

const requireTest: MyRequire<typeof partialTest> = { name: 'require', id: 3, desc: 'require test' };

/**
 * 实现 Exclude<T,U>
 * * 从类型 T 中排除 U 类型
 */
type MyExclude<T, U> = T extends U ? never : T;

const excludeTest: MyExclude<keyof typeof requireTest, 'desc'> = 'name';

/**
 * 实现 Extract<T,U>
 * * 从类型 T 中提取 U 类型
 */
type MyExtract<T, U> = T extends U ? T : never;

const extractTest: MyExtract<keyof typeof requireTest, 'id' | 'desc'> = 'desc';

/**
 * 实现 Pick<T,K>
 * * 从类型 T 中选择一部分属性 K
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

const pickTest: MyPick<typeof requireTest, 'name' | 'id'> = { name: 'pick', id: 4 };

/**
 * 实现 Omit<T,K>
 * * 从类型 T 中排除属性 K
 */
type MyOmit<T, K extends keyof any> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

const omitTest: MyOmit<typeof requireTest, 'id'> = { name: 'omit', desc: 'MyOmit test' };
