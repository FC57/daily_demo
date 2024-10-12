/** 拟态风格tab页面 */
export function mimeticStyleRender() {
  // 页签
  const tabList = new Array(4)
    .fill(0)
    .map(
      (_, i) =>
        `<span class="tab${i === 0 ? ' active' : ''}">${
          i === 0 ? 'active tab' : `tab${i + 1}`
        }</span>`
    );

  // 测试通过伪类 :not() 样式
  const notList = [
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    'Iusto laboriosam architecto aliquam iste ipsa dolores delectus.',
    'Veniam quidem vel repellat magni quod harum quo!'
  ];

  return `<div class="nave">
    ${tabList.join('')}
  </div>
  <div class="test-not">
    <div class="desc">🙅🏻‍♂️&emsp;利用:not()伪类排除最后一个子元素</div>
    ${notList.map((text, i) => `<div class="content">${i + 1}.${text}</div>`).join('')}
  </div>
  `;
}

/** 设置tab样式，因涉及伪元素样式，只能通过创建 style 标签设置 */
export function setTabStyle() {
  const styleinnerHTML = `
    .detail .nave {
      height: 36px;
      display: flex;
      align-items: center;
      background-color: #efeeee;
      gap: 2px;
    }
    .detail .nave .tab{
      font-size: 14px;
      position: relative;
      color: #999;
      background-color: #fff;
      min-width: 125px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 5px;
      box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2), -2px -2px 20px rgba(255, 255, 255, 1);
      transition: all 0.2s ease-out;
    }
    .detail .nave .tab:hover {
      cursor: pointer;
      color: #333;
      height: 34px;
      line-height: 34px;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
        inset 10px 10px 10px rgba(0, 0, 0, 0.1), inset -10px -10px 10px rgba(255, 255, 255, 1);
    }
    .detail .nave .tab.active {
      color: #f5222d;
      height: 34px;
      line-height: 34px;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
        inset 10px 10px 10px rgba(0, 0, 0, 0.1), inset -10px -10px 10px rgba(255, 255, 255, 1);
    }
    .detail .test-not{
      padding:4rem 2rem;
    }
    .detail .test-not .content{
      height:30px;
      line-height:30px;
    }
    .detail .test-not .content + .content{
      margin-top:12px;
    }
    .detail .test-not .content:not(:last-child) {
      background-color: #d9f7be;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = styleinnerHTML;
  document.head.appendChild(style);

  // 离开拟态风格页签页面执行的副作用
  return () => {
    console.log('刷新或离开拟态风格页签页');
    document.head.removeChild(style);
  };
}
