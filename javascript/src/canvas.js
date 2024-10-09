/** canvas画布容器 */
export const canvasRender = function () {
  const style = {
    content: 'display:flex;gap:20px;flex-wrap:wrap;justify-content:space-around;align-items:center',
    winWrap: 'width:400px;height:400px;position:relative',
    winning:
      'width:400px;height:280px;position:absolute;background-color:#eee;font-size:50px;text-align:center;line-height:280px;letter-spacing:20px;user-select:none;'
  };

  return `<h4>canvas 练习</h4>
  <h5 style="color: #f0f">canvas 是个画布，可视为图片，可以“图片另存为”</h5>
  <hr />

  <div class="content" style=${style.content}>
    <video
      src="/assets/video/winter.mp4"
      class="source"
      width="400"
      height="400"
      controls
      muted
      autoplay
    ></video>
    <div class="winWrap" style=${style.winWrap}>
      <div class="winning" style=${style.winning}>特等奖</div>
    </div>
  </div>`;
};

/**
 * 创建新的canvas
 * @param {HTMLDivElement} wrap canvas父容器
 * @param {string|undefined} className 类名，默认view
 */
function createCanvas(wrap, className) {
  const view = document.createElement('canvas');
  view.style.border = '1px solid #ccc';
  view.classList.add('view');
  if (typeof className === 'string') {
    view.classList.add(className);
  }
  view.width = 400;
  view.height = 400;
  wrap.append(view);
  // 获取绘制上下文
  return {
    view,
    ctx: view.getContext('2d')
  };
}

/**
 * 设置文本
 * @param {CanvasRenderingContext2D} ctx canvas绘制上下文
 * @param {string} text 文本内容
 * @param {number} x x坐标
 * @param {string} color 文本颜色
 * @param {boolean} isVertical 是否竖着排列
 */
function setText(ctx, text, x = 240, color = '#555', isVertical = false) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.font = 'bold 14px sans-serif';

  if (isVertical) {
    // 旋转画布
    ctx.save(); // 保存当前状态
    ctx.translate(100, 100); // 平移画布以便旋转后位置居中
    ctx.rotate(-Math.PI / 2); // 旋转 -90 度
  }
  ctx.fillText(text, x, isVertical ? -76 : 380, 300);
  isVertical && ctx.restore(); // 恢复之前的状态
}

/**
 * 画矩形 x-x轴坐标 y-y轴坐标 w-高度 h-宽度
 * @param {HTMLDivElement} wrap canvas父容器
 *
 * * fillRect(x,y,w,h)   填充矩形（实心）
 * * strokeRect(x,y,w,h) 描边矩形（空心）
 * * rect(x,y,w,h) 指定矩形坐标系和宽高，需要配合 ctx.fill() - 填充; ctx.stroke() - 描边 一起使用
 *
 * * 圆角矩形 roundRect(x,y,w,h,r) r为圆角半径
 *
 * * fillStyle-设置填充颜色 strokeStyle-设置描边颜色 lineWidth-设置描边粗细
 * * 注意：必须在绘制前设置
 */
function roundReactDemo(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '（圆角）矩形、折线');

  ctx.rect(50, 50, 150, 100); // 矩形
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ace';
  // 绘制;
  ctx.stroke();

  // 设置分组
  ctx.beginPath();
  ctx.strokeStyle = '#f00';
  ctx.roundRect(48, 200, 150, 150, 20); // 圆角矩形
  // 单独绘制
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(200, 120); // 折线
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00f';
  ctx.lineDashOffset = 150;

  function stroke() {
    // 清空指定区域画布（有点像橡皮擦）
    ctx.clearRect(200, 120, 130, 130);
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(230, 250);
    ctx.setLineDash([150]);
    ctx.lineDashOffset--;
    ctx.stroke();
    if (ctx.lineDashOffset > 0) {
      requestAnimationFrame(stroke);
      return;
    }
    cancelAnimationFrame(rId);
  }
  const rId = requestAnimationFrame(stroke);
}

/**
 * 使用路径闭合替代 ctx.lineTo
 * @param {HTMLDivElement} wrap canvas父容器
 */
function closePath(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '使用路径闭合替代 ctx.lineTo', 160);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(50, 50);
  ctx.lineTo(50, 200);
  ctx.lineTo(300, 200);
  // 使用路径闭合替代 ctx.lineTo(50, 50)
  ctx.closePath();
  ctx.stroke();
}

/**
 * 二次贝塞尔曲线
 * @param {HTMLDivElement} wrap canvas父容器
 */
function quadraticCurveTo(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '二次贝塞尔曲线-1个控制点', 180);

  // 3个点（起点、控制点c1、终点）
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.arc(50, 200, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, 100, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(250, 200, 4, 0, Math.PI * 2);
  ctx.fill();
  // 二次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.quadraticCurveTo(100, 100, 250, 200);
  ctx.stroke();
}

/**
 * 三次贝塞尔曲线
 * @param {HTMLDivElement} wrap canvas父容器
 */
function bezierCurveTo(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '三次贝塞尔曲线-2个控制点', 180);

  // 4个点（起点、控制点c1、控制点c2、终点）
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.arc(50, 200, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, 100, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(180, 250, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(250, 200, 4, 0, Math.PI * 2);
  ctx.fill();
  // 三次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.bezierCurveTo(100, 100, 180, 250, 250, 200);
  ctx.stroke();
}

/**
 * 绘制图片
 * @param {HTMLDivElement} wrap canvas父容器
 */
function drawImage(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '绘制图片', 150);

  const img = new Image();
  img.src = '/assets/imgs/t1.png';
  img.onload = () => {
    ctx.drawImage(img, 50, 20);
  };
}

/**
 * 裁剪图片
 * @param {HTMLDivElement} wrap canvas父容器
 */
function cropImage(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '裁剪图片', 150);

  const img = new Image();
  img.src = '/assets/imgs/t1.png';
  img.onload = () => {
    ctx.drawImage(img, 100, 50, 100, 100, 100, 100, 200, 200);
  };
}

/**
 * 图像像素处理
 * @param {HTMLDivElement} wrap canvas父容器
 */
function pixelHandler(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '图像像素处理', -120, '#555', true);
  const img = new Image();
  img.src = '/assets/imgs/t1.png';
  img.onload = () => {
    ctx.drawImage(img, 60, 0, img.width, img.height);
    // 获取像素信息
    const imageData = ctx.getImageData(60, 0, img.width, img.height);
    const pixelInfo = imageData.data;
    // 修改像素信息
    for (let i = 0; i < pixelInfo.length; i += 4) {
      const r = pixelInfo[i];
      const g = pixelInfo[i + 1];
      const b = pixelInfo[i + 2];
      const a = pixelInfo[i + 3];
      if (r - g > 50) {
        pixelInfo[i] = g;
        pixelInfo[i + 1] = r;
      }
    }
    // 重新设置像素信息
    ctx.putImageData(imageData, 60, 200);
  };
}

/**
 * 绘制视频
 * @param {HTMLDivElement} wrap canvas父容器
 * @param {*} $ 获取dom方法
 */
function drawVideo(wrap, $) {
  const { ctx, view } = createCanvas(wrap);
  setText(ctx, '绘制视频', 280);

  ctx.beginPath();
  ctx.ellipse(200, 200, 100, 180, 0, 0, Math.PI * 2);
  ctx.clip();
  const video = $('.source');
  // 调整位置
  wrap.insertBefore(view, $('.winWrap'));
  function draw() {
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.drawImage(video, 100, 0, 230, 400);
    requestAnimationFrame(draw);
  }
  video.onplay = () => {
    draw();
  };
  ctx.beginPath();
  // 创建线性渐变对象
  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  // 添加渐变过程
  gradient.addColorStop(0, '#fea');
  gradient.addColorStop(1, 'skyblue');
  // 设置渐变
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);
}

/**
 * 合成设置
 * @param {HTMLDivElement} wrap canvas父容器
 * @param {*} $ 获取dom方法
 */
function globalCompositeOperation(wrap, $) {
  const { ctx, view } = createCanvas(wrap, 'winCanvas');
  view.style.position = 'absolute';
  setText(ctx, '合成设置-刮刮卡');

  // 调整位置
  $('.winWrap').appendChild(view);

  // 遮罩
  ctx.beginPath();
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, 400, 320);

  // 合成设置
  ctx.globalCompositeOperation = 'destination-out';

  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  view.onmousedown = de => {
    ctx.moveTo(de.offsetX, de.offsetY);
    view.onmousemove = me => {
      ctx.lineTo(me.offsetX, me.offsetY);
      ctx.stroke();
    };
    view.onmouseup = () => {
      view.onmousemove = null;
      view.onmouseup = null;
    };
    view.onmouseout = () => {
      view.onmousemove = null;
      view.onmouseout = null;
    };
  };
}

/**
 * 线性渐变
 * @param {HTMLDivElement} wrap canvas父容器
 */
function createLinearGradient(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '线性渐变', 160);

  // 创建线性渐变对象
  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  // 添加渐变过程
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(0.5, '#fea');
  gradient.addColorStop(1, '#eaf');
  // 设置渐变
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 20, 400, 200);
}

/**
 * 径向渐变
 * @param {HTMLDivElement} wrap canvas父容器
 */
function createRadialGradient(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '径向渐变', 160);

  // 径向渐变
  const gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 100);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(0.5, '#fea');
  gradient.addColorStop(1, '#eaf');
  ctx.fillStyle = gradient;
  ctx.arc(200, 200, 100, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
}

/**
 * 锥形渐变
 * @param {HTMLDivElement} wrap canvas父容器
 */
function createConicGradient(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '锥形渐变', 160);

  // 锥形渐变
  const gradient = ctx.createConicGradient(Math.PI / 2, 200, 200);
  gradient.addColorStop(0, '#f00');
  gradient.addColorStop(0.5, '#fea');
  gradient.addColorStop(1, '#eaf');
  ctx.fillStyle = gradient;
  ctx.arc(200, 200, 100, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(200, 200, 60, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 平行线
 * @param {HTMLDivElement} wrap canvas父容器
 */
function parallelLine(wrap) {
  const { ctx } = createCanvas(wrap);
  setText(ctx, '平行线', 180);

  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = '#00f';
  ctx.moveTo(150, 50);
  ctx.lineTo(150, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(200, 200);
  ctx.stroke();
}

/** canvas画布 demo-api */
export const canvasDemo = function () {
  const $ = document.querySelector.bind(document);
  // 父容器
  const wrap = $('.content');
  // 圆角、矩形、折线
  roundReactDemo(wrap);
  // 使用路径闭合替代 ctx.lineTo
  closePath(wrap);
  // 二次贝塞尔曲线
  quadraticCurveTo(wrap);
  // 三次贝塞尔曲线
  bezierCurveTo(wrap);
  // 绘制图片
  drawImage(wrap);
  // 裁剪图片
  cropImage(wrap);
  // 图像像素处理
  pixelHandler(wrap);
  // 绘制视频
  drawVideo(wrap, $);
  // 合成设置-刮刮乐
  globalCompositeOperation(wrap, $);
  // 线性渐变
  createLinearGradient(wrap);
  // 径向渐变
  createRadialGradient(wrap);
  // 锥形渐变
  createConicGradient(wrap);
  // 平行线
  parallelLine(wrap);
};
