/** 文件切片信息 */
export interface FileChunkType {
  /** 文件切片开始字节 */
  start: number;
  /** 文件切片结束字节 */
  end: number;
  /** 切片hash */
  hash: number;
  /** 切片索引 */
  index: number;
  chunkFile: Blob;
}

/**
 * 获取大文件文件分片
 * @param {File} file 大文件
 * @param {number} chunkSize 每片分片大小（M）
 */
export declare function getLargeFileSharding(
  file: File,
  chunkSize: number
): Promise<File[] | FileChunkType[]>;
