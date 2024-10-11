/** 获取外层容器grid样式 */
function getGridStyle() {
  const grid = {
    /* 指定为网格布局容器 */
    display: 'grid',
    width: 'fit-content',
    margin: '3rem auto',
    border: '1px dashed #ddd',
    /* 下面指定了 3行 4列 的网格 */

    /* 指定每列列宽 */
    /* grid-template-columns: 100px 150px 120px 140px; */

    /* 指定每行行高 */
    /* grid-template-rows: 100px 120px 150px; */

    /* 间距 */
    gap: '10px',

    /* 给网格区域命名，以便更快布局 . 表示空着 */
    /* grid-template-areas:
      'area1 area1 . .'
      'area1 area1 area2 area2'
      '. . area2 area2'; */

    /* 整体可以简写成 grid-template 行/列 的方式 （但是连写 repeat 不起作用）*/
    'grid-template': `
      'area1 area1 a3 a3' 100px
      'area1 area1 area2 area2' 120px
      '. . area2 area2' 130px
      / 100px 150px 120px 140px`,

    /* 设置超出网格部分（隐式网格列宽、行高） */
    'grid-auto-columns': '100px',
    'grid-auto-rows': '200px',

    /* 没有指定位置的网格放置顺序，默认 row 水平（行）上自然排列 相当于 grid-auto-flow:row dense */
    /* colum 列上自然排列 */
    /* dense 自然列启用“密集”打包算法，尽可能紧凑排列 */
    'grid-auto-flow': 'column'

    /*
     * 【对齐方式】
     * 1、单元格内水平排列方式 justify-items: center;
     * 2、单元格内垂直方向排列方式 align-items:center;
     * place-items:水平 垂直 （是justify-items 和 align-items 的复合属性）
     *
     * 3、整个网格在容器中的排列方式（有剩余空间）
     *   1)、justify-content 水平方向
     *   2)、align-content 垂直方向
     * place-content:水平 垂直 （是 justify-content 和 align-content 的复合属性）
     */

    /*
     * 【行列都适用】
     * 1、除了常规单位 还可以设置 数值fr 表示等分，类比 flex 布局中的 flex-grow
     * grid-template-columns: 1fr 1fr 1fr 1fr;
     * 2、min-content 和 max-content 子元素内容最小尺寸和最大尺寸
     * 3、函数
     *   1)、repeat(次数,尺寸)
     *    repeat(2,100px 150px) 等价于 100px 150px 100px 150px
     *    repeat(auto-fill或auto-fit,50px)
     *    auto-fill 自动填充网格线，尽可能创建多的网格线，填充元素;
     *    auto-fit 与auto-fill类似，但是未被内容占用的轨道会被收缩且不会占据空间
     *   2)、minmax(min,max) 设置一个范围
     *   3)、fit-content(limit) = max(min-content,min(limit,max-content))，最小尺寸到最大之间
     */
  };
  return Object.entries(grid)
    .map(([attr, value]) => `${attr}:${value};`)
    .join('');
}

/**
 * 获取item样式
 * @param {keyof typeof items} className 类名
 */
function getItemStyle(className) {
  const items = {
    item1: {
      'background-color': '#fca',
      /* 指定起止列线 */
      /* grid-column: 1/3; */
      /* 指定起止行线 */
      /* grid-row: 1/3; */
      /* 指定区域 */
      'grid-area': 'area1'
    },
    item2: {
      'background-color': '#acf',
      /* grid-column: 3/5;
      grid-row: 2/4; */
      'grid-area': 'area2'
    },
    item3: {
      'background-color': '#ab0',
      'grid-area': 'a3'
    },
    item4: {
      'background-color': '#0ab',
      /* 指定起始排序顺序 */
      'grid-column-start': 2
    },
    item5: {
      'background-color': 'antiquewhite'
    },
    item6: {
      'background-color': '#eaea'
    }
  };
  return Object.entries(items[className])
    .map(([attr, value]) => `${attr}:${value};`)
    .join('');
}

/** grid 布局页面 */
export default function layoutGridRender() {
  const textList = [
    'Lorem, ipsum dolor.',
    'Laudantium, consequatur facere!',
    'Et, cumque quae!',
    'Deserunt, sequi sed!',
    'Tempora, accusamus est.',
    'Repellendus, fugiat totam.'
  ];

  return `<div class="grid" style="${getGridStyle()}">
    ${textList
      .map(
        (text, i) =>
          `<div class="item${i + 1}" style="${getItemStyle(`item${i + 1}`)}">${i + 1}.${text}</div>`
      )
      .join('')}
  </div>`;
}
