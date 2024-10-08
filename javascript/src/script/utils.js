/** 设置Nprogress 模拟页面加载进度 */
export function setNProgressConfig(win = window) {
  const { start, done, configure } = NProgress;
  // 配置
  configure({
    trickleSpeed: 20, // 速度
    showSpinner: false // 不展示加载转圈
  });

  // 开始加载
  start();
  win.onload = function () {
    done();
  };
}

/**
 * 渲染内容
 * @param {number} idx 侧边栏索引
 */
export function loadContent(idx) {
  return new Promise((resolve, reject) => {
    //
  });
}

/**
 * 创建侧边栏
 * @param { { name:string;handler?:()=>void;render:string | ()=>string }[] } options 侧边栏选项
 * @param { { ul:HTMLUListElement;detail:HTMLDivElement;search:HTMLInputElement;mask:HTMLDivElement } } doms Dom 集合
 */
export function createSideBar(options, doms) {
  options.forEach(({ name, render }, index) => {
    const li = document.createElement('li');
    li.textContent = li.title = name;
    li.onclick = () => loadContent(index);
    doms.ul.appendChild(li);
  });
}
