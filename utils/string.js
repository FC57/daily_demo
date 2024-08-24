/**
 * 获取字符串码点的真实长度
 * @param {String} str 字符串
 */
export function getLengthOfCodePoint(str) {
  const _str = `${str}`;
  let len = 0;
  for (let i = 0; i < _str.length; i++) {
    len++;
    // 码点>4095
    if (_str.codePointAt(i) > 0xfff) {
      // 占2个码元
      i++;
    }
  }
  return len;
}

/**
 * 获取指定索引字符
 * @param {String} str 字符串
 * @param {Number} idx 指定索引
 */
export function getStrAt(str, idx) {
  const _str = `${str}`;
  let curIndex = 0;
  for (let i = 0; i < _str.length; i++) {
    const point = _str.codePointAt(i);
    if (curIndex === idx) {
      return String.fromCodePoint(point);
    }
    curIndex++;
    if (point > 0xfff) {
      // 占2个码元
      i++;
    }
  }
}

/**
 * 字符截取
 * @param {String} str 字符串
 * @param {Number} start 开始索引
 * @param {Number} end 结束索引
 */
export function pointSlice(str, start = 0, end) {
  const _str = `${str}`;
  const len = getLengthOfCodePoint(_str);
  const _end = end || len;
  let res = '';
  for (let i = start; i < len && i < _end; i++) {
    res += getStrAt(_str, i);
  }
  return res;
}

/**
 * charCodeAt统计字符串所占字节数
 * @param str {string} 字符串
 * @param isCodePointLen {boolean} 是否通过码点计算的长度，默认为true
 */
export function getStringBytes(str, isCodePointLen = true) {
  let count = 0;
  const len = isCodePointLen ? getLengthOfCodePoint(str) : str.length;
  for (let i = 0; i < len; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x007f) {
      count += 1; // ASCII 字符，占用一个字节
    } else if (charCode <= 0x07ff) {
      count += 2; // Latin-1 补充字符，占用两个字节
    } else if (charCode <= 0xffff) {
      count += 3; // BMP 中的其他字符，占用三个字节
    } else {
      count += 4; // 其他 Unicode 字符，占用四个字节
    }
  }
  return count;
}
