import { getLengthOfCodePoint, getUTF8ByteByCodePoint } from '../../utils/string.js';

/** 通过码元获取字符真实长度并计算所占字节数页面 */
export function strBytesRender() {
  const classNames = ['length', 'codePointAt_length', 'codePontByte', 'TextEncoder', 'blob'];
  const wrapStyle = 'font-size:15px;padding:0 2rem;white-space:nowrap;width:fit-content;';

  return `<h4>Count Bytes - 字符串所占字节数( UTF-8 )</h4>
  <hr />
  <p class="desc">🙅🏻‍♂️&emsp;直接通过字符串 length 读取字符长度, 是不准确的</p>
  <div style="${wrapStyle}">
    ${classNames
      .map(
        className => `${className === 'codePontByte' ? '<br/>' : ''}<p class="${className}"></p>`
      )
      .join('')}
  </div>`;
}

/**
 * TextEncoder实例方法encode获取字符串字节数
 * @param {String} str 字符串
 */
function getStringByteByTextEncoder(str) {
  return new TextEncoder().encode(str).length;
}

/**
 * Blob统计字符串所占字节数
 * @param {String} str 字符串
 */
function getStringByteSize(str) {
  return new Blob([str]).size;
}

/** 字符操作 */
export function strBytesHandler() {
  const testStr = '🎅';

  const $ = document.querySelector.bind(document);
  // 需要操作的 DOM
  const doms = {
    length: $('p.length'),
    codePointAt_length: $('p.codePointAt_length'),
    codePontByte: $('p.codePontByte'),
    TextEncoder: $('p.TextEncoder'),
    blob: $('p.blob')
  };

  // 创建标注节点
  function _createNode(text) {
    return `<span style="color:#434343">${text}</span>`;
  }

  // 读取length获取长度
  doms.length.innerHTML = `读取 ${_createNode('length')}, 🎅 的长度为 ${testStr.length}`;

  // 通过字符码点判断长度
  doms.codePointAt_length.innerHTML = `通过 ${_createNode(
    '字符码点'
  )} 判断, 🎅 的长度为 ${getLengthOfCodePoint(testStr)}`;

  // 利用codePointAt的范围统计字节数
  doms.codePontByte.innerHTML = `利用 ${_createNode(
    'codePointAt范围'
  )} 统计, 🎅 所占字节数为 ${getUTF8ByteByCodePoint(testStr)}`;

  // TextEncoder实例方法encode获取字符串字节数
  doms.TextEncoder.innerHTML = `利用 ${_createNode(
    'TextEncoder 实例方法 encode 转换为 Unit8Array 并读取 length'
  )}, 🎅 所占字节数为 ${getStringByteByTextEncoder(testStr)} `;

  // 转二进制流，读取size
  doms.blob.innerHTML = `利用 ${_createNode(
    'Blob 的 size 属性'
  )}, 🎅 所占字节数为 ${getStringByteSize(testStr)}`;
}
