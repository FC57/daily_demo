// 大文件分片线程处理

import '/dependent_libraries/node_modules/spark-md5.js';

/**
 * 获取当前分片数据
 * @param {File} file 文件
 * @param {number} size 每个分片大小
 * @param {number} index 分片索引
 */
function getChunk(file, size, index) {
  return new Promise(resolve => {
    const start = size * index;
    const end = start + size;
    const chunkFile = file.slice(start, end);
    const fr = new FileReader();
    fr.onload = function (e) {
      const arrbuffer = e.target.result;
      const hash = SparkMD5.ArrayBuffer.hash(arrbuffer);
      resolve({ start, end, hash, index, chunkFile });
    };
    fr.readAsArrayBuffer(chunkFile);
  });
}

/**
 * chunkSize 每个分片大小（字节）
 * file 大文件
 * workerIndex 当前线程索引
 * startIndex 线程处理分片开始索引
 * endIndex 线程处理分片结束索引
 */
self.onmessage = async ({ data: { chunkSize, file, workerIndex, startIndex, endIndex } }) => {
  console.log(`线程${workerIndex + 1}开始工作`);
  // 分片结果
  const result = [];
  for (let i = startIndex; i < endIndex; i++) {
    const chunk = await getChunk(file, chunkSize, i);
    result.push(chunk);
  }
  self.postMessage(result);
};
