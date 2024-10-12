/** 文字阴影页面 */
export function textStrokeRender() {
  return `<div class="container">
    <div class="stroke">文字阴影</div>
  </div>`;
}

/** 文字阴影样式，因涉及伪类样式，创建 style 标签设置 */
export function strokeHandler() {
  // 设置自定义属性 data-text 为文本内容
  const stroke = document.getElementsByClassName('stroke');
  for (const dom of stroke) {
    dom.dataset.text = dom.textContent;
  }

  // 创建样式
  const style = document.createElement('style');
  style.innerHTML = `
    .container{
      height:100%;
      background-image: linear-gradient(to right, #fca, skyblue, #0c0);
      display: flex;
      align-items: center;
      white-space: nowrap;
      padding: 0 2rem;
      overflow: auto;
    }
    .stroke {
      width: fit-content;
      font-size: 100px;
      margin: 0 auto;
      letter-spacing: 50px;
      color: transparent;
      position: relative;
      font-weight: 600;
      /* 文字描边 */
      -webkit-text-stroke: 2px #fff;
    }
    /* 解决描边后自宽变细的问题（因这里用的文字透明，所以没效果，换成其他颜色就不一样了） */
    /* .stroke::after {
      position: absolute;
      top: 0;
      left: 0;
      content: attr(data-text);
      -webkit-text-stroke: 0;
    } */
  `;
  document.head.appendChild(style);

  // 离开或刷新文字阴影页面执行的副作用
  return () => {
    console.log('离开或刷新文字阴影页面');
    document.head.removeChild(style);
  };
}
