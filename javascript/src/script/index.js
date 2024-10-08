import highlightJs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/+esm';
import { setNProgressConfig, createSideBar } from './utils.js';
import sidebarOptions from './sidebar.js';

(function () {
  // 模拟页面加载进度
  setNProgressConfig();
  // 代码高亮显示
  highlightJs.highlightAll();

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
