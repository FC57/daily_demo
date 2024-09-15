/**
 * 获取字符串码点的真实长度
 * @param {String} str 字符串
 */
export declare function getLengthOfCodePoint(str: string): number;

/**
 * 获取指定索引字符
 * @param {String} str 字符串
 * @param {Number} idx 指定索引
 */
export declare function getStrAt(str: string, idx: number): string | undefined;

/**
 * 字符截取
 * @param {String} str 字符串
 * @param {Number} start 开始索引
 * @param {Number} end 结束索引
 */
export declare function pointSlice(str: string, start: number, end: number): string;

/**
 * codePointAt统计字符串所占字节数（UTF-8）
 * @param str {string} 字符串
 */
export declare function getUTF8ByteByCodePoint(str: string): number;
