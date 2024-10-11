/** 计时页面 */
export function timingRender() {
  const style = {
    action: 'font-size:14px;padding:2rem;display:flex;gap:2rem;',
    timer:
      'flex:1;box-shadow:0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);border-radius:4px;padding:0.8rem;',
    header: 'display:flex;align-items:center;',
    title: 'font-size:13px;transform:translateX(20px);color:#555;',
    display:
      'padding:1rem;text-align:center;background-color:#fafafa;border-radius:6px;margin:2em 1em 1em;'
  };

  return `<h4>解决页面失活导致计时不准问题</h4>
  <hr />
  <div class="action" style="${style.action}">
    <div style="${style.timer}">
      <div style="${style.header}">
        <button class="issue"></button>
        <span style="${style.title}">不做额外处理</span>
      </div>
      <p class="displayTimer1" style="${style.display}">...</p>
    </div>
    <div style="${style.timer}">
      <div style="${style.header}">
        <button class="solute"></button>
        <span style="${style.title}">监听 visibilitychange</span>
      </div>
      <p class="displayTimer2" style="${style.display}">...</p>
    </div>
  </div>`;
}

/**
 * 显示计时时间
 * @param {number} elapsedTimer 已计时秒数
 * @returns string
 */
function computedDisplayTime(elapsedTimer) {
  const hours = Math.floor(elapsedTimer / 3600);
  const minutes = Math.floor((elapsedTimer % 3600) / 60);
  const seconds = elapsedTimer % 60;
  return hours > 0
    ? `${hours.toString().padStart(2, '0')}时 ${minutes.toString().padStart(2, '0')}分 ${seconds
        .toString()
        .padStart(2, '0')}秒`
    : minutes > 0
    ? `${minutes.toString().padStart(2, '0')}分 ${seconds.toString().padStart(2, '0')}秒`
    : seconds > 0
    ? `${seconds.toString().padStart(2, '0')}秒`
    : '';
}

/** 计时处理 */
export function timingHandler() {
  const $ = document.querySelector.bind(document);
  // 需要操作的DOM
  const doms = {
    issue: $('.issue'),
    solute: $('.solute'),
    displayTimer1: $('.displayTimer1'),
    displayTimer2: $('.displayTimer2')
  };
  // 计时状态、计时id、经过时间秒数
  const timer = {
    issueId: null,
    soluteId: null,
    // 默认开始计时
    issueTiming: false,
    soluteTiming: false,
    // 计时秒数
    IssueElapsedTimer: 0,
    soluteElapsedTimer: 0,
    // 上次页面失活时间戳
    lastStartTimer: 0
  };
  // -------------- 不作处理 start
  doms.issue.onclick = () => {
    if (timer.issueTiming) {
      // 停止计时逻辑
      doms.issue.innerText = '开始计时';
      doms.issue.style.color = '#3992ff';
      clearInterval(timer.issueId);
      timer.issueId = null;
      timer.IssueElapsedTimer = 0;
    } else {
      // 开始计时
      doms.issue.innerText = '停止计时';
      doms.issue.style.color = '#fa541c';
      doms.displayTimer1.innerText = '...';
      timer.issueId = setInterval(() => {
        timer.IssueElapsedTimer++;
        doms.displayTimer1.innerText = computedDisplayTime(timer.IssueElapsedTimer);
      }, 1000);
    }
    timer.issueTiming = !timer.issueTiming;
    doms.issue.blur();
  };
  // -------------- 不作处理 end

  // -------------- 监听 visibilitychange start
  function visibilitychangeHandler() {
    if (document.visibilityState === 'hidden') {
      // 执行计时过程中再清除定时器
      timer.soluteId && clearInterval(timer.soluteId);
      timer.soluteId = null;
      // lastStartTimer >0 说明在计时
      timer.lastStartTimer = timer.lastStartTimer && Date.now();
    } else {
      if (timer.lastStartTimer > 0) {
        let curElapsedTimer = timer.soluteElapsedTimer;
        // 重新开启计时
        timer.soluteId = setInterval(() => {
          timer.soluteElapsedTimer =
            curElapsedTimer + Math.floor((Date.now() - timer.lastStartTimer) / 1000);
          doms.displayTimer2.innerText = computedDisplayTime(timer.soluteElapsedTimer);
        }, 1000);
      }
    }
  }
  document.addEventListener('visibilitychange', visibilitychangeHandler);
  doms.solute.onclick = () => {
    if (timer.soluteTiming) {
      // 停止计时逻辑
      doms.solute.innerText = '开始计时';
      doms.solute.style.color = '#3992ff';
      clearInterval(timer.soluteId);
      timer.soluteId = null;
      timer.lastStartTimer = 0;
      timer.soluteElapsedTimer = 0;
    } else {
      // 开始计时
      doms.solute.innerText = '停止计时';
      doms.solute.style.color = '#fa541c';
      doms.displayTimer2.innerText = '...';
      timer.lastStartTimer = Date.now();
      timer.soluteId = setInterval(() => {
        timer.soluteElapsedTimer = Math.floor((Date.now() - timer.lastStartTimer) / 1000);
        doms.displayTimer2.innerText = computedDisplayTime(timer.soluteElapsedTimer);
      }, 1000);
    }
    timer.soluteTiming = !timer.soluteTiming;
    doms.solute.blur();
  };
  // -------------- 监听 visibilitychange end

  // 触发开始计时
  doms.issue.click();
  doms.solute.click();

  // 离开该页面后执行的副作用
  return () => {
    console.log('离开或刷新计时页面');
    clearInterval(timer.issueId);
    clearInterval(timer.soluteId);
    document.removeEventListener('visibilitychange', visibilitychangeHandler);
  };
}
