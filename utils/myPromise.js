import { runMicroTask } from './index.js';

/**
 * 判断数据是否是Promise
 * * Promise A+ 规范，只要对象中有then方法就是Promise
 * @param {Object} obj 数据
 * @example
 * isPromise(new Promise()) // true
 */
export function isPromiseLike(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return typeof obj.then === 'function';
}

/** Promise 状态-挂起 */
const PENDING = 'pending';
/** Promise 状态-成功 */
const FULFILLED = 'fulfilled';
/** Promise 状态-失败 */
const REJECTED = 'rejected';

/** 手写Promise */
export class MyPromise {
  constructor(executor) {
    this._state = PENDING; // 任务状态
    this._value = void 0; // 数据
    this._handlers = []; // 后续处理函数
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  /**
   * 改变Promise状态并确认数据
   * @param {String} status Promise状态
   * @param {*} data 数据
   */
  _changeStatus(status, data) {
    // 状态已决，不能再改变
    if (this._state !== PENDING) {
      return;
    }
    this._state = status;
    this._value = data;
    // 状态改变执行队列
    this._runHandlers();
  }

  /**
   * 标记当前任务完成
   * @param {*} data 成功的数据
   */
  _resolve(data) {
    this._changeStatus(FULFILLED, data);
  }

  /**
   * 标记当前任务失败
   * @param {*} data 成功的数据
   */
  _reject(reason) {
    this._changeStatus(REJECTED, reason);
  }

  /**
   * 向处理函数队列加入后续处理函数
   * @param {Function} executor 处理函数
   * @param {String} state 该函数什么状态下执行
   * @param {Function} resolve 让then函数返回的Promise成功
   * @param {Function} reject 让then函数返回的Promise失败
   */
  _pushHandlers(executor, state, resolve, reject) {
    this._handlers.push({ executor, state, resolve, reject });
  }

  /** 执行队列函数 */
  _runHandlers() {
    // 最外层Promsie挂起，不执行
    if (this._state === PENDING) {
      return;
    }
    while (this._handlers[0]) {
      this._runOneHandler(this._handlers.shift());
    }
  }

  /**
   * 执行单个函数
   * @param {object} handler
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    // 放入微队列执行
    runMicroTask(() => {
      // 状态不一致不处理
      if (this._state !== state) {
        return;
      }
      // 后续处理非函数
      if (typeof executor !== 'function') {
        // then函数返回的Promise和之前的Promise保持一致
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }
      try {
        // then 函数回调中从参数是之前Promise的返回值，而then函数返回的Promise的数据是回调的返回值
        const res = executor(this._value);
        // 若返回的数据为 Promise ，then 返回的Promise 状态和数据与该Promise保持一致
        if (isPromiseLike(res)) {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Promise A+ 规范的 then 函数
   * @param {Function} onFulfilled 成功的后续处理
   * @param {Function} onRejected 失败的后续处理
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandlers(onRejected, REJECTED, resolve, reject);
      this._runHandlers();
    });
  }

  /**
   * 失败的后续处理
   * @param {Function} onRejected 失败的后续处理
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 最后处理
   * @param {Function} onSettled 最后处理函数
   */
  finally(onSettled) {
    return this.then(
      res => {
        onSettled();
        return res;
      },
      reason => {
        onSettled();
        throw reason;
      }
    );
  }

  /**
   * 静态方法 resolve 返回一个成功的Promise
   * @param {*} data 数据
   */
  static resolve(data) {
    // 如果data是ES6的Promise
    if (data instanceof MyPromise) {
      return data;
    }
    return new MyPromise((resolve, reject) => {
      // 符合Promise A+ 规范
      if (isPromiseLike(data)) {
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    });
  }

  /**
   * 静态方法 resolve 返回一个拒绝的Promise
   * @param {*} reason 数据
   */
  static reject(reason) {
    return new MyPromise((_resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * 迭代器中所有Promise完成才成功，任一失败则失败
   * @param {Iterator} proms 迭代器
   */
  static all(proms) {
    return new MyPromise((resolve, reject) => {
      try {
        const results = [];
        // 迭代器数量
        let count = 0;
        // 已完成Promise数量
        let fulfilledCount = 0;
        // 迭代器不一定有length，用for of 循环，不用for循环
        for (const p of proms) {
          const i = count;
          count++;
          MyPromise.resolve(p).then(data => {
            fulfilledCount++;
            results[i] = data;
            if (count === fulfilledCount) {
              // 最后一个Promise完成
              resolve(results);
            }
          }, reject);
        }
        if (count === 0) {
          resolve(results);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 所有Promise已决则成功，不会失败，要么成功，要么挂起
   * @param {Iterator} proms 迭代器
   */
  static allSettled(proms) {
    const ps = [];
    for (const p of proms) {
      ps.push(
        MyPromise.resolve(p).then(
          value => ({ value, status: FULFILLED }),
          reason => ({ reason, status: REJECTED })
        )
      );
    }
    return MyPromise.all(ps);
  }

  /**
   * 第一个完成或拒绝的Promise
   * @param {Iterator} proms 迭代器
   */
  static race(proms) {
    return new MyPromise((resolve, reject) => {
      for (const p of proms) {
        MyPromise.resolve(p).then(resolve, reject);
      }
    });
  }
}
