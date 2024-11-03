/**
 * 获取from至to之和
 * @param {number} from 起始数
 * @param {number} to 截至数
 */
export declare function sumFromTo(from: number, to: number): number;

/**
 * 将数组元素乱序排序
 * @param {any[]} arr
 */
export declare function sortRandom(arr: any[]): Array<any>;

/**
 * 获取指定范围随机数
 * @param {number} from 起始数
 * @param {number} to 截至数
 * @param {boolean} isInteger 是否整数
 */
export declare function getRandomNumberFromTo(from: number, to: number, isInteger: boolean): number;

/**
 * 将任务放入微队列执行
 * @param callback 回调函数
 */
export declare function runMicroTask(callback: () => void): void;

/** 柯里化类型 */
type Curried<A extends any[], R> = A extends []
  ? () => R
  : A extends [infer P]
    ? (x: P) => R
    : A extends [infer P, ...infer Rest]
      ? (x: P) => Curried<Rest, R>
      : never;

/**
 * 柯里化函数
 * * 在函数编程中，作用是把多参函数变为单参函数
 * @param fun 函数
 * @param {*} ctx 函数this
 * @param args 剩余参数（或固定参数）数组
 */
export declare function curry<A extends any[], R>(fun: (...args: A) => R, ctx: any, ...args: A): Curried<A, R>;
