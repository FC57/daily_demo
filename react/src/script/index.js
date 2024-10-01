import { componentPaths, dataPaths, demoPaths, renderPaths } from './compPath.js';
import { setNProgressConfig, importComp } from './utils.js';

(function (win) {
  // 设置Nprogress 模拟组件加载进度
  setNProgressConfig(win);

  // react 根路径
  const rootPath = '/react/src';
  // 路径集合
  const pathList = [
    ['component', componentPaths],
    ['views', dataPaths],
    ['views', demoPaths],
    ['', renderPaths]
  ];
  // 引入组件并渲染
  pathList.forEach(([category, paths]) => {
    Object.values(paths).forEach(path =>
      importComp(`${rootPath}/${category}/${path}`.replace(/\/\//, '/'))
    );
  });
})(window);
