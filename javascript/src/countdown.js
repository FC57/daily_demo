/** 倒计时页面 */
export function countdownRender() {
  const style = {
    wrap: 'height:100%;background-color:#000;overflow:auto;padding:20px',
    container: 'width:600px;height:400px;margin:150px auto 0;',
    con: 'width:490px;height:160px;margin:100px auto 100px;',
    'time-item': 'color:#fff;width:65px;height:120px;float:left;overflow:hidden;',
    ul: 'position:relative;font-size:0;top:0px;padding:0;',
    time: 'width:30px;text-align:center;line-height:120px;font-weight:bold;float:left;color:#fff;',
    text: 'color:#fff;margin-top:-30px;font-weight:bold;font-size:22px;'
  };

  const hours = [
    [2, 1, 0],
    [3, 2, 1, 0, 9, 8, 7, 6, 5, 4]
  ];
  const minuteOrSeconds = [
    [5, 4, 3, 2, 1, 0],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];

  return `<div style="${style.wrap}">
    <div class="container" style="${style.container}">
      <p style="${style.text}">距离活动结束时间：</p>
      <div class="con" style="${style.con}">
        <div class="time-item"  style="${style['time-item']}">
          <ul style="${style.ul}">
            ${hours[0].map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`).join('')}
          </ul>
        </div>
        <div class="time-item" style="${style['time-item']}">
          <ul style="${style.ul}">
            ${hours[1].map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`).join('')}
          </ul>
        </div>
        <div class="time" style="${style.time}">时</div>
        <div class="time-item" style="${style['time-item']}">
          <ul style="${style.ul}">
            ${minuteOrSeconds[0]
              .map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`)
              .join('')}
          </ul>
        </div>
        <div class="time-item" style="${style['time-item']}">
          <ul style="${style.ul}">
            ${minuteOrSeconds[1]
              .map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`)
              .join('')}
          </ul>
        </div>
        <div class="time" style="${style.time}">分</div>
        <div class="time-item" style="${style['time-item']}">
          <ul style="${style.ul}">
            ${minuteOrSeconds[0]
              .map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`)
              .join('')}
          </ul>
        </div>
        <div class="time-item" style="${style['time-item']}">
          <ul style="${style.ul}">
            ${minuteOrSeconds[1]
              .map(it => `<li><img src="/assets/imgs/${it}.png" /></li>`)
              .join('')}
          </ul>
        </div>
        <div class="time" style="${style.time}">秒</div>
      </div>
    </div>
  </div>`;
}

/** 页面操作 */
export function countdownHandler() {
  let hourNode = null;
  const timerIds = [];
  let seconds = 0;
  function changeTimeNumber(node, timer, isSeconds = false) {
    let firstChild = null;
    /* 定义动画执行完成时间 */
    node.addEventListener('transitionend', () => {
      /* 改变动画的执行transition属性 为空 */
      node.style.transition = 'none';
      /* 恢复变形 */
      node.style.transform = 'none';
      /* 追加第一个元素准备进行第二次动画 */
      node.appendChild(firstChild);
    });
    const timerId = setInterval(() => {
      /* 获取第一个子节点，准备进行添加操作 */
      /* 规定执行动画时间, */
      /* 调整显示位置 */
      firstChild = node.children[0];
      node.style.transition = 'all .5s linear';
      node.style.transform = 'translateY(-120px)';
      if (isSeconds) {
        seconds++;
        if (seconds === 1000 * 60 * 60 * 4) {
          clearInterval(timerIds.pop());
          timerIds.push(changeTimeNumber(hourNode, 360000000));
        }
        if (seconds === 1000 * 60 * 60 * 24 - 1) {
          timerIds.forEach(id => {
            clearInterval(id);
          });
        }
      }
    }, timer);
    return { node, timerId };
  }

  const doms = document.getElementsByClassName('time-item');
  const timerArr = [108000000, 36000000, 600000, 60000, 10000, 1000];
  for (let i = doms.length - 1; i >= 0; i--) {
    const { timerId, node } = changeTimeNumber(
      doms[i].getElementsByTagName('ul')[0],
      timerArr[i],
      i === doms.length - 1
    );
    timerIds.push(timerId);
    if (i === 0) {
      hourNode = node;
    }
  }

  // 刷新或离开倒计时页面的副作用
  return () => {
    // 清空计时器
    console.log('离开或刷新倒计时页面');
    timerIds.forEach(id => {
      clearInterval(id);
    });
  };
}
