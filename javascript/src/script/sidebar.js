import { mazeRender, mazeHandler } from '../game-maze.js';
import { canvasRender, canvasDemo } from '../canvas.js';
import { countdownRender, countdownHandler } from '../countdown.js';
import { dragbleRender, dragbleHandler } from '../dragbleApi.js';
import { timingRender, timingHandler } from '../inaccurate-timing.js';
import { indexedDBRender, indexedDBHandler as iHandler } from '../indexedDB.js';
import { largeFileChunksRender, splitChunkHandler } from '../largeFile-chunks.js';
import layoutGridRender from '../layout-grid.js';
import loremRender from '../lorem.js';
import { mimeticStyleRender, setTabStyle } from '../mimeticStyle.js';
import { scrollingNoticeRender, scrollingHandler } from '../scrollingNotice.js';

/** 侧边栏数据 */
export default [
  { name: '简易迷宫-数据相关 ( 三维数组 )', render: mazeRender, handler: mazeHandler },
  { name: '伪代码-CommonJS-require', render: 'commonjs-require' },
  { name: '移动端简易适配方案 ( 缩放viewPort或rem方案 )', render: 'adaptation' },
  { name: 'canvas画布 demo-api', render: canvasRender, handler: canvasDemo },
  { name: '模拟加载失败', render: 'error' },
  { name: '倒计时', render: countdownRender, handler: countdownHandler },
  { name: '原生拖拽API', render: dragbleRender, handler: dragbleHandler },
  { name: '正则替换截取文件名及后缀', render: 'file-suffix' },
  { name: '解决页面失活导致计时不准问题', render: timingRender, handler: timingHandler },
  { name: '浏览器存储-indexedDB, 存储大量结构化数据', render: indexedDBRender, handler: iHandler },
  { name: '大文件，开启多线程分片', render: largeFileChunksRender, handler: splitChunkHandler },
  { name: 'grid 布局', render: layoutGridRender },
  { name: '乱数假文 lorem 和 jw', render: loremRender },
  { name: '拟态风格页签 ( tab-按压 )', render: mimeticStyleRender, handler: setTabStyle },
  { name: '滚动公告', render: scrollingNoticeRender, handler: scrollingHandler }
];
