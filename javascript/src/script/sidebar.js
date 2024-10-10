import { mazeRender, mazeHandler } from '../game-maze.js';
import { canvasRender, canvasDemo } from '../canvas.js';
import { countdownRender, countdownHandler } from '../countdown.js';

/** 侧边栏数据 */
export default [
  { name: '简易迷宫-数据相关 ( 三维数组 )', render: mazeRender, handler: mazeHandler },
  { name: '伪代码-CommonJS-require', render: 'commonjs-require' },
  { name: '移动端简易适配方案 ( 缩放viewPort或rem方案 )', render: 'adaptation' },
  { name: 'canvas画布 demo-api', render: canvasRender, handler: canvasDemo },
  { name: '模拟加载失败', render: 'error' },
  { name: '倒计时', render: countdownRender, handler: countdownHandler }
];
