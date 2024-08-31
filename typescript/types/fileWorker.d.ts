import type { FileChunkType } from './fileHandler.d.ts';

/**
 * 获取当前分片数据
 * @param {File} file 文件
 * @param {number} size 每个分片大小
 * @param {number} index 分片索引
 */
export declare function getChunk(file: File, size: number, index: number): Promise<FileChunkType>;
