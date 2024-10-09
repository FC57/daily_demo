/** 迷宫图测试数据 */
const mazeView = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1]
  ],
  [
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1]
  ],
  [
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1]
  ],
  [
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1]
  ],
  [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1]
  ],
  [
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1]
  ],
  [
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1]
  ],
  [
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1]
  ],
  [
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1]
  ],
  [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1]
  ],
  [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
  ]
];

/** 路过背景色 */
const passedBgcolor = 'rgb(255, 245, 102)';

/**
 * 简易迷宫页面
 * @param {[number[],number[]][]} mazeData 迷宫数据
 */
export function mazeRender(mazeData = mazeView) {
  let trs = '';
  const sides = ['border-top', 'border-right'];
  // 遍历行
  for (let row = 0; row < mazeData.length; row++) {
    trs += `<tr>`;
    // 遍历列
    for (let col = 0; col < mazeData[row][0].length; col++) {
      let cellStyle = 'width:40px;height:40px;font-size:12px;text-align:center;';
      // 添加边框
      for (let cell = 0; cell < 2; cell++) {
        if (mazeData[row][cell][col] === 1) {
          cellStyle += `${sides[cell]}: 2px black solid; `;
        }
      }
      // 非第一行的所以第一列，加左边框
      if (col === 0 && row !== 0) {
        cellStyle += 'border-left: 2px black solid;';
      }
      // 最后一行，加下边框
      if (row === mazeData.length - 1) {
        cellStyle += 'border-bottom: 2px black solid;';
      }

      // 根据位置添加 class 和背景色
      if (row === 0 && col === 0) {
        trs += `<td style="${cellStyle}color:#ff7875;background-color:${passedBgcolor}" class="start">start</td>`;
      } else if (row === mazeData.length - 1 && col === mazeData[row][0].length - 1) {
        trs += `<td style="${cellStyle}color:#73d13d" class="end">end</td>`;
      } else {
        trs += `<td style="${cellStyle}"> </td>`;
      }
    }
    trs += `</tr>`;
  }

  return `<p align="center">请使用键盘上的→←↑↓键进行游戏</p>
  <table id="board" align="center" cellspacing="0" cellpadding="0">
    <tbody>
      ${trs}
    </tbody>
  </table>
  <p class="message" align="center" style="font-weight:600;font-size:1.5rem;color:#fa541c"></p>
  `;
}

/** 迷宫操作 */
export function mazeHandler() {
  const $ = document.querySelector.bind(document);
  // 需要操作的 DOM
  const doms = {
    maze: $('#board'),
    message: $('p.message')
  };
  // 是否通关
  let isSuccess = false;
  // 当前行、列
  const start = { rows: 0, cols: 0 };

  // 判断是否后退，如果是后退，需要清除当前单元格的样式
  function testNext(nxt) {
    // 移动的目标单元格如果有背景色说明是后退
    if (
      doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor === passedBgcolor &&
      nxt.style.backgroundColor === passedBgcolor
    ) {
      doms.message.innerText = '⏳ 噢，你改变主意了！';
      // 去掉当前单元格的样式
      doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor = '';
      return false;
    }
    return true;
  }

  // 迷宫移动
  function moveIt(e) {
    e.preventDefault();
    if (isSuccess) return;

    switch (e.key) {
      case 'ArrowLeft': // 向左移动
        // 已经到最左边界，则不能移动
        if (mazeView[start.rows][1][start.cols - 1] === 0) {
          if (testNext(doms.maze.rows[start.rows].cells[start.cols - 1]))
            doms.message.innerText = '🚀 往西走';
          start.cols--;
          doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor = passedBgcolor;
        } else doms.message.innerText = '🙅🏻‍♂️ 不能再往西走了';
        break;

      case 'ArrowUp': // 向上
        if (mazeView[start.rows][0][start.cols] === 0) {
          if (testNext(doms.maze.rows[start.rows - 1].cells[start.cols]))
            doms.message.innerText = '🚀 往北走';
          start.rows--;
          doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor = passedBgcolor;
        } else doms.message.innerText = '🙅🏻‍♂️ 不能再往北走了';
        break;
      case 'ArrowRight': // 向右
        if (mazeView[start.rows][1][start.cols] === 0) {
          if (testNext(doms.maze.rows[start.rows].cells[start.cols + 1]))
            doms.message.innerText = '🚀 往东走';
          start.cols++;
          doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor = passedBgcolor;
        } else doms.message.innerText = '🙅🏻‍♂️ 不能再往东走了';
        break;
      case 'ArrowDown': //向下
        if (mazeView[start.rows + 1] === void 0) return;
        if (mazeView[start.rows + 1][0][start.cols] === 0) {
          if (testNext(doms.maze.rows[start.rows + 1].cells[start.cols]))
            doms.message.innerText = '🚀 往南走';
          start.rows++;
          doms.maze.rows[start.rows].cells[start.cols].style.backgroundColor = passedBgcolor;
        } else doms.message.innerText = '🙅🏻‍♂️ 不能再往南走了';
        break;
    }
    if (doms.maze.rows[start.rows].cells[start.cols].innerText === 'end') {
      doms.message.innerText = '🎉🎉🎉 恭喜你，胜利了!';
      isSuccess = true;
    }
  }

  document.onkeydown = moveIt;
}
