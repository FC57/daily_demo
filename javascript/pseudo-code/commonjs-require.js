/**
 * commonjs require 模拟
 * @param {string} modulePath 导入模块的路径
 */
function require(modulePath) {
  // 1、根据传递的模块路径，得到模块的完整绝对路径
  const moduleId = getModuleId(modulePath);
  // 2、判断缓存，因为模块导入只执行1次
  if (cache[moduleId]) {
    return cache[moduleId];
  }

  /**
   * 真正运行模块代码的辅助函数
   * @param {*} exports
   * @param {function} require
   * @param {*} module
   * @param {string} __filename 模块文件绝对路径
   * @param {string} __dirname 模块文件相对路径
   */
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码在这里，所以commonjs执行是在函数环境中
    // this === exports，exports===module.exports
  }

  // 3、准备并允许辅助函数
  const module = { exports: {} };
  const exports = module.exports;
  // 得到模块文件的绝对路径
  const __filename = moduleId;
  // 得到模块文件的相对路径
  const __dirname = getDirname(__filename);
  // 因此在commonjs中打印this，指向exports，即module.exports
  _require.call(exports, exports, require, module, __filename, __dirname);

  // 4、缓存module.exports
  cache[moduleId] = module.exports;
  // 5、返回module.exports
  return module.exports;
}
