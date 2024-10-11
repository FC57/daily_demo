/**
 * 后端响应头中 attachment 中通过正则截取文件后缀名
 * @param {string} attachment 响应头字段值
 */
export function getFileNameAndExt(attachment) {
  const filename = attachment.replace(/.*filename=(?=\;?.*)/, '').replace(/\;.+/, '');
  return {
    name: decodeURIComponent(filename),
    ext: filename.replace(/.+\.(?!\%)|.+/, '')
  };
}

// test
const attachment = 'attachment;filename=%E6%89%A7%E8%A1%8C%E8%B4%B9%E7%94%A8%E6%98%8E%E7%BB%86.zip';
getFileNameAndExt(attachment);

// output
// { name: '执行费用明细.zip', ext: 'zip' };
