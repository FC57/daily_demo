/** 获取课程DOM结构 */
function getSubjectsDOMs() {
  const subjects = [
    { name: '语文', color: '#ffa39e' },
    { name: '数学', color: '#ffe7ba' },
    { name: '英语', color: '#fff1b8' },
    { name: '物理', color: '#eaff8f' },
    { name: '化学', color: '#d9f7be' },
    { name: '生物', color: '#36cfc9' },
    { name: '政治', color: '#bae0ff' },
    { name: '历史', color: '#ffc53d' },
    { name: '地理', color: '#69b1ff' },
    { name: '音乐', color: '#ffffb8' },
    { name: '体育', color: '#ffc069' },
    { name: '计算机', color: '#bae637' }
  ];

  const commonSyle =
    'height:39px;width:100px;line-height:39px;margin-left:auto;margin-right:auto;border-radius:5px;text-align:center;cursor:move;';

  return subjects
    .map(
      ({ name, color }, index) =>
        ` <div data-effect="copy" draggable="true" style=${commonSyle}background-color:${color};>
          ${name}
        </div> `
    )
    .join('');
}

/** 获取课程列表DOM结构 */
function getTableDOM() {
  const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  const style = {
    table: 'width:100%;border-width:0;table-layout:fixed;',
    th: 'height:40px;line-height:40px;background-color:rgba(198,196,198,0.7);',
    td: 'height:50px;line-height:50px;'
  };

  let tableHTML = `
    <table border="1" style=${style.table}>
      <colgroup>
        <col class="col1" />
        ${daysOfWeek.map(() => '<col />').join('')}
      </colgroup>
      <tr>
        <th style="border:none;width:60px"></th>
        ${daysOfWeek.map(day => `<th style=${style.th}>${day}</th>`).join('')}
      </tr>
  `;

  const timeSlots = ['上午', '下午'];

  timeSlots.forEach((slot, index) => {
    tableHTML += `
      <tr>
        <th rowspan="4" class="span" style="background-color:rgb(198,196,198,0.7)">${slot}</th>
        ${`<td data-drop="copy" style=${style.td}></td>`.repeat(7)}
      </tr>
    `;
    for (let i = 0; i < 3; i++) {
      tableHTML += `
        <tr>
          ${`<td data-drop="copy" style=${style.td}></td>`.repeat(7)}
        </tr>
      `;
    }
    tableHTML += index === 0 ? `<tr style="height:80px"></tr> ` : `</table>`;
  });
  return tableHTML;
}

/** 原生拖拽页面 */
export function dragbleRender() {
  const style = {
    container: 'display:flex;font-size:14px;min-width:1050px',
    left: 'width:140px;margin-right:20px;background-color:rgb(236,237,236);border-radius:10px;text-align:center;padding-top:10px;padding-bottom:10px;display:flex;flex-direction:column;gap:10px;',
    right: 'flex:1;background-color:rgb(236,237,236);border-radius:10px;padding:10px;'
  };

  return `<h2 style="text-align:center;">课程表</h2>
  <div class="container" style=${style.container}>
    <div class="left" data-drop="move" style=${style.left}>
      ${getSubjectsDOMs()}
    </div>
    <div class="right" style=${style.right}>
      ${getTableDOM()}
    </div>
  </div>
  `;
}

/** 拖拽逻辑 */
export function dragbleHandler() {
  const container = document.querySelector('.container');

  // 清除背景色
  const clearBgColor = () => {
    const bgColorItems = document.querySelectorAll('.over');
    bgColorItems.forEach(item => {
      item.classList.remove('over');
      item.style.backgroundColor = '';
    });
  };

  // 获取指定节点
  const getDropNode = node => {
    while (node) {
      if (node.dataset && node.dataset.drop) {
        return node;
      }
      node = node.parentNode;
    }
  };

  // 拖拽节点
  let sourceNode;

  // 开始拖拽
  container.ondragstart = e => {
    // console.log('start', e.target);
    // 修改鼠标样式，默认拖拽为加号
    e.dataTransfer.effectAllowed = e.target.dataset.effect;
    sourceNode = e.target;
  };

  // 覆盖，频繁触发
  container.ondragover = e => {
    e.preventDefault();
  };

  // 覆盖，仅触发一次
  container.ondragenter = e => {
    // console.log('enter', e.target);
    clearBgColor();
    const node = getDropNode(e.target);
    if (!node) {
      return;
    }
    if (e.dataTransfer.effectAllowed === node.dataset.drop) {
      node.classList.add('over');
      node.style.backgroundColor = '#fafafa';
    }
  };

  // 放手，需在over中阻止事件默认行为才可触发，因为默认不准其他元素移动至其上
  container.ondrop = e => {
    console.log(e);
    // console.log('drop', e.target);
    clearBgColor();
    const node = getDropNode(e.target);
    if (!node) {
      return;
    }
    if (e.dataTransfer.effectAllowed !== node.dataset.drop) {
      return;
    }
    if (node.dataset.drop === 'copy') {
      node.innerHTML = '';
      // 深克隆
      const cloneNode = sourceNode.cloneNode(true);
      // 修改状态
      cloneNode.dataset.effect = 'move';
      node.appendChild(cloneNode);
    }
    if (node.dataset.drop === 'move') {
      // 移除节点
      sourceNode.remove();
    }
  };
}
