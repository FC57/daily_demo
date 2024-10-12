/** 滚动公告页面 */
export function scrollingNoticeRender() {
  const noticeList = [
    'Lorem ipsum dolor sit.',
    'Soluta molestiae adipisci quos?',
    'Inventore aut recusandae reprehenderit.',
    'Debitis illo voluptate blanditiis!'
  ];

  const style = {
    container:
      'width:80%;margin:20px auto;display:flex;align-items:center;background-color:skyblue;padding:0 20px;border-radius: 4px;',
    tip: 'font-size:14px;font-weight:600;border-right:1px solid #eee;padding-right:30px;user-select:none;',
    list: 'list-style:none;margin:0 0 0 30px;font-size:12px;height:30px;padding:0 10px;overflow:hidden;',
    notice: 'height:30px;line-height:30px;user-select:none;'
  };

  return `<div style="${style.container}">
  <div style="${style.tip}">最新公告</div>
    <ul class="list" style="${style.list}">
      ${noticeList.map((text, i) => `<li style="${style.notice}">${i + 1}.${text}</li>`).join('')}
    </ul>
  </div>`;
}

/** 滚动逻辑 */
export function scrollingHandler() {
  const $ = document.querySelector.bind(document);
  const listDom = $('.list');
  // 克隆第一个子节点
  function cloneFirstNode(node) {
    const cNode = node.cloneNode(true);
    listDom.appendChild(cNode);
  }
  cloneFirstNode(listDom.children[0]);
  const itemHeight = 30;
  const duration = 2000;
  const stepDuration = 10;
  const totalDuration = 300;
  const step = itemHeight / (totalDuration / stepDuration);
  // 移动滚动条
  let curIndex = 0;
  function moveTo() {
    let from = itemHeight * curIndex;
    curIndex++;
    let to = itemHeight * curIndex;
    if (curIndex === listDom.children.length - 1) {
      curIndex = 0;
    }
    const timerId = setInterval(() => {
      from += step;
      if (from >= to) {
        clearInterval(timerId);
      }
      listDom.scrollTop = from;
    }, stepDuration);
  }
  const timer = setInterval(moveTo, duration);
  window.addEventListener('beforeunload', () => {
    // 页面退出，清除定时器
    clearInterval(timer);
  });

  // 离开或刷新滚动公告页执行的副作用
  return () => {
    console.log('离开或刷新滚动公告页');
    clearInterval(timer);
  };
}
