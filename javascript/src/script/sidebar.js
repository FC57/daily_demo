import { canvasRender, canvasDemo } from '../canvas.js';

/** 侧边栏数据 */
export default [
  { name: '1. 简易迷宫-数据相关 ( 三维数组 )', render: 'commonjs-require' },
  { name: '2. 伪代码-CommonJS-require', render: 'commonjs-require' },
  { name: '3. 移动端简易适配方案 ( 缩放viewPort或rem方案 )', render: 'adaptation' },
  { name: '4. canvas画布 demo-api', render: canvasRender, handler: canvasDemo }
];
