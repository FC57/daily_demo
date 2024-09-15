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
 * 获取字符字节数（UTF-8）
 * @param {String} str 字符串
 */
export function getUTF8ByteByCodePoint(str) {
  let size = 0;
  for (let i = 0; i < str.length; i++) {
    // charCodeAt 是按照 UTF-16 返回码值（0 - 0xFFFF），对于基本多语言平面（BMP）字符，这个值与 Unicode 码点相同
    // 对于代理对字符，它只能返回高位单元或低位单元的值，因此用 codePointAt 返回完整的 Unicode 码值
    const codePoint = str.codePointAt(i);
    if (codePoint <= 0x7f) {
      size += 1;
    } else if (codePoint <= 0x7ff) {
      size += 2;
    } else if (codePoint <= 0xffff) {
      size += 3;
    } else if (codePoint <= 0x10ffff) {
      size += 4;
    }
    // 如果当前代码单元是高代理项，则跳过下一个代码单元
    if (codePoint > 0xffff) {
      i++;
    }
  }
  return size;
}
