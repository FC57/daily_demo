import { setNProgressConfig, createSideBar } from './utils.js';
import sidebarOptions from './sidebar.js';

(function () {
  // 模拟页面加载进度
  setNProgressConfig();

  const $ = document.querySelector.bind(document);
  // 需要操作的DOM
  const doms = {
    search: $('.search-form .search'),
    ul: $('.optionList'),
    detail: $('.detail'),
    mask: $('.mask')
  };
  // 创建侧边栏及页面切换逻辑
  createSideBar(sidebarOptions, doms);
})();
