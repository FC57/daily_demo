import highlightJs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/+esm';

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
 * @param { HTMLDivElement } wrap 渲染容器
 * @param {string | ()=>string} render 页面渲染
 * @param {undefined|()=>void} handler 额外操作
 */
async function loadContent(wrap, render, handler) {
  try {
    if (typeof render === 'function') {
      // 渲染 DOM
      wrap.innerHTML = render();
      typeof handler === 'function' && handler();
    } else {
      // 渲染 JS 源码
      const url = `/javascript/src/${render}.js`;
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error(`Failed to load JS file from ${url}`);
      }
      // 获取响应的文本内容（JavaScript源码）
      const jsSource = await result.text();
      wrap.innerHTML = `<pre><code>${jsSource}</code></pre>`;
      // 代码高亮显示
      highlightJs.highlightAll();
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * 创建侧边栏选项
 * @param {{ name:string;handler?:()=>void;render:string | ()=>string }[]} filterOptions 过滤后的侧边栏
 * @param { { ul:HTMLUListElement;detail:HTMLDivElement;search:HTMLInputElement;mask:HTMLDivElement } } doms Dom 集合
 * @param { boolean|undefined } isInit 是否初始化
 */
function createNav(filterOptions, doms, isInit = false) {
  // 先清空再处理
  doms.ul.innerHTML = '';
  // 记录上次渲染索引
  let lastIndex = 0;
  filterOptions.forEach(({ name, render, handler }, index) => {
    const li = document.createElement('li');
    li.textContent = li.title = `${index + 1}. ${name}`;
    li.onclick = () => {
      doms.detail.style.opacity = 0;
      doms.mask.style.display = 'block';
      doms.ul.children[lastIndex].style.color = '#333636';
      doms.ul.children[lastIndex].style.border = 'none';
      li.style.color = '#4b9e5f';
      li.style.border = '1px solid #4b9e5f';
      lastIndex = index;
      loadContent(doms.detail, render, handler)
        .catch(error => {
          console.log(error);
          doms.detail.innerHTML = `<p align="center" style="color: #f5222d; font-size: 1.5rem; transform: translateY(3rem)">
          <i>加载失败</i>
          <span>❌ 🤣</span>
          <br />
          <img align="center" src="/assets/imgs/loading.gif" alt="error" />
        </p>`;
        })
        .finally(() => {
          // 使用 requestAnimationFrame 确保渲染完成后再隐藏蒙层
          // requestAnimationFrame(() => {
          //   doms.mask.style.display = 'none';
          //   doms.detail.removeAttribute('style');
          // });
          setTimeout(() => {
            // 为看到效果模拟加载异步耗时
            doms.mask.style.display = 'none';
            doms.detail.removeAttribute('style');
          }, 300);
        });
    };
    doms.ul.appendChild(li);
    if (isInit && index === 0) {
      li.onclick();
    }
  });
}

/** 是否正在组合，用于中文输入过程触发input事件 */
let isComposing = false;

/**
 * 创建侧边栏
 * @param { { name:string;handler?:()=>void;render:string | ()=>string }[] } options 侧边栏选项
 * @param { { ul:HTMLUListElement;detail:HTMLDivElement;search:HTMLInputElement;mask:HTMLDivElement } } doms Dom 集合
 */
export function createSideBar(options, doms) {
  // 监听组合事件
  if (!doms.search.hasAttribute('iscompListener')) {
    doms.search.setAttribute('iscompListener', true);
    doms.search.addEventListener('compositionstart', () => (isComposing = true));
    doms.search.addEventListener('compositionend', () => {
      isComposing = false;
      // 避免赋值前已执行 input 事件
      createNav(
        doms.search.value === ''
          ? options
          : options.filter(it => it.name.includes(doms.search.value)),
        doms.ul
      );
    });
  }
  // 创建搜索逻辑
  if (doms.search.oninput === null) {
    doms.search.oninput = e => {
      if (isComposing) {
        return;
      }
      createNav(
        e.target.value === '' ? options : options.filter(it => it.name.includes(e.target.value)),
        doms
      );
    };
  }
  createNav(options, doms, true);
}
