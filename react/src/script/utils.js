/** 设置Nprogress 模拟组件加载进度 */
export function setNProgressConfig(win) {
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
 * 注入组件
 * @param {string} modulePath 组件绝对路径
 */
export function importComp(modulePath) {
  const script = document.createElement('script');
  script.type = 'text/babel';
  script.src = modulePath;
  script.defer = true;
  document.body.appendChild(script);
}
