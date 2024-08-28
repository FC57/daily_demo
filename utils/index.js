/**
 * 获取from至to之和
 * @param {number} from 起始数
 * @param {number} to 截至数
 */
export function sumFromTo(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return 0;
  }
  if (from === to) {
    return from;
  } else if (from > to) {
    return sumFromTo(to, from);
  } else {
    return from + sumFromTo(from + 1, to);
  }
}

/**
 * 将数组元素乱序排序
 * @param {Array} arr
 */
export function sortRandom(arr) {
  return arr.sort((_a, _b) => Math.random() - 0.5);
}

/**
 * 获取指定范围随机数
 * @param {number} from 起始数
 * @param {number} to 截至数
 * @param {boolean} isInteger 是否整数
 */
export function getRandomNumberFromTo(from, to, isInteger = true) {
  if (typeof from !== 'number' || typeof to !== 'number') {
    return 0;
  }
  if (from === to) {
    return from;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  if (isInteger) {
    from = Math.ceil(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from + 1) + from);
  }
  return Math.random() * (to - from) + from;
}

/**
 * 获取大文件文件分片
 * @param {File} file 大文件
 * @param {number} chunkSize 每片分片大小（M）
 */
export function getLargeFileSharding(file, chunkSize) {
  return new Promise(resolve => {
    const chunkByteSize = chunkSize * 1024 * 1024;

    // 分片数量
    const chunkLength = Math.ceil(file.size / chunkByteSize);
    // 开启线程数，默认4个
    const maxWorker = navigator.hardwareConcurrency || 4;
    // 每个线程处理分片数
    const handleCount = Math.ceil(chunkLength / maxWorker);
    // 当前成功处理数量
    let finished = 0;
    // 切片数据集合
    const result = [];
    for (let i = 0; i < maxWorker; i++) {
      // 处理切片开始索引
      const startIndex = handleCount * i;
      // 若开始索引超范围，不用开启线程，直接跳过
      if (startIndex > chunkLength - 1) {
        finished += maxWorker - i;
        break;
      }
      // 处理切片结束索引
      let endIndex = startIndex + handleCount;
      if (endIndex > chunkLength) {
        endIndex = chunkLength;
      }
      const worker = new Worker('/utils/fileWorker.js', { type: 'module' });
      worker.onerror = error => {
        console.log(i, error);
        worker.terminate();
        resolve([file]);
      };
      worker.onmessage = e => {
        finished++;
        // 终止线程
        worker.terminate();
        e.data.forEach(item => {
          // 因Promise完成速度不一样，因此切片下标为顺序
          result[item.index] = item;
        });
        if (finished === maxWorker) {
          resolve(result);
        }
      };
      worker.postMessage({ file, chunkSize, workerIndex: i, startIndex, endIndex });
    }
  });
}
