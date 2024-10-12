import BigNumber from 'https://cdn.jsdelivr.net/npm/bignumber.js@9.1.2/+esm';
import { getRandomNumberFromTo } from '../../utils/index.js';

/** 模拟上传进度展示 ( 进度条、速率、剩余传输预估时间 ) 页面 */
export function uploadProgressRender() {
  const fileList = [
    'Lorem ipsum dolor sit amet.xlsx',
    'Repudiandae deleniti corrupti nemo expedita.zip',
    'Esse cupiditate ipsa officiis inventore.docx'
  ];

  return `<h4>上传文件根据流传输，计算：</h4>
  <h5>⏳&emsp;进度展示、传输速率、剩余预估时间</h5>
  <hr />
  ${fileList
    .map((name, i) => {
      const order = i + 1;
      const fileName = `${order}.${name}`;

      return `
    <div class="containner">
      <div class="content">
        <span title="${fileName}">${fileName}</span>
      </div>
      <div class="progress progress${order}" style="--progress: 0"></div>
      <span class="protext protext${order}">0%</span>
      <span class="speed speed${order}"></span>
      <span class="remain remain${order}"></span>
    </div>`;
    })
    .join('')}
  `;
}

/** 获取样式 innerHTML */
function getStyle() {
  return `
  .containner {
    display: flex;
    font-size: 14px;
    color: #4d4d4d;
    margin-top: 2rem;
    padding:0 1rem;
  }
  .containner + .containner{
    margin-top:1.3rem;
  }
  .content {
    width: calc(100% - 420px);
    min-width: calc(100% - 420px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .progress {
    --w: 150px;
    width: var(--w);
    min-width: var(--w);
    height: 8px;
    position: relative;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.06);
    overflow: hidden;
    margin: auto 10px auto 40px;
  }
  .progress::before {
    display: block;
    content: '';
    height: 100%;
    transform: translateX(calc((var(--progress) - 100) / 100 * var(--w)));
    background-color: #73d13d;
  }
  .progress.error::before {
    background-color: #ff7875;
  }
  .speed {
    margin: 0 20px;
  }
  .remain {
    margin: auto 0;
  }
  .protext.error {
    color: #ff7875;
  }
  `;
}

/**
 * 毫秒数转换时间，格式 hh:mm:ss
 * @param {number} milliseconds 时间戳毫秒数
 */
function formatTime(milliseconds) {
  const _pad = num => {
    return `${num < 10 ? '0' : ''}${num}`;
  };
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${_pad(hours)}:${_pad(minutes)}:${_pad(seconds)}`;
}

/**
 * 获取进度和速率
 * @param {number} loaded 累计已加载字节
 * @param {number} curLoaded 当前加载字节
 * @param {number} total 总字节数
 * @param {number} refreshInterval 计时刷新间隔
 */
function getProgress(loaded, curLoaded, total, refreshInterval = 300) {
  // 进度百分比
  const progresStr = new BigNumber(loaded).div(total).times(100).toString();
  const percent = !/^((0|[1-9]\d*)(\.\d+)?)$/.test(progresStr)
    ? 0
    : Number(progresStr.replace(/(?<=\.\d{2}).+/, '')) || 0;

  // 上传速度，单位为 B/s
  const bSpeed = new BigNumber(curLoaded).div(refreshInterval).times(1000);
  // 根据速度换算数据量单位
  const units = ['B', 'K', 'M', 'G', 'T'];
  let formatSpeed = bSpeed.times(1);
  let unitIndex = 0;
  while (formatSpeed.toNumber() > 1024 && unitIndex < units.length - 1) {
    formatSpeed = formatSpeed.div(1024);
    unitIndex++;
  }
  const speedStr = `${formatSpeed.toFixed(2)}${units[unitIndex]}/s`;

  // 剩余时间
  const remainingTime = formatTime(
    new BigNumber(total).minus(loaded).div(bSpeed).times(1000).toNumber()
  );

  // console.log({ percent: `${percent}%`, speedStr, remainingTime });
  return { percent, speedStr, remainingTime };
}

/** 设置样式（涉及伪类样式）及 进度逻辑 */
export function progressHandler() {
  // 设置样式
  const style = document.createElement('style');
  style.innerHTML = getStyle();
  document.head.appendChild(style);

  // 进度逻辑
  const $ = document.querySelector.bind(document);
  // 刷新间隔（毫秒）
  const INTERVAL_TIME = 300;
  // 收集计时id
  const intervalIds = [];

  for (let i = 1; i < 4; i++) {
    // 操作的 DOM
    const doms = {
      progress: $(`.progress${i}`),
      protext: $(`.protext${i}`),
      speed: $(`.speed${i}`),
      remain: $(`.remain${i}`)
    };
    // 假定文件上传成功与否
    const isSuccess = Math.random() > 0.5 ? true : false;
    console.log(i, isSuccess);
    // 总的传输量（模拟文件大小10M~30M，即字节10240*1024 ~ 30*1024*1024)
    const total = getRandomNumberFromTo(10240 * 1024, 30 * 1024 * 1024);
    // 当前已传送量
    let loaded = 0;
    const intervalId = setInterval(() => {
      // 这次传输量（模拟一次传输50KB~1M ）
      let curLoad = getRandomNumberFromTo(50 * 1024, 1024 * 1024, false);
      let _loaded = new BigNumber(loaded).plus(curLoad).toNumber();
      // 累加超范围
      if (_loaded > total) {
        curLoad = new BigNumber(total).minus(loaded).toNumber();
        loaded = total;
      } else {
        loaded = _loaded;
      }
      const { percent, speedStr, remainingTime } = getProgress(
        loaded,
        curLoad,
        total,
        INTERVAL_TIME
      );
      doms.progress.style.setProperty('--progress', percent);
      doms.protext.innerHTML = `${percent}%`;
      doms.speed.innerHTML = speedStr;
      doms.remain.innerHTML = remainingTime;
      if (!isSuccess && percent > Math.random() * 100) {
        clearInterval(intervalId);
        doms.progress.classList.add('error');
        doms.protext.classList.add('error');
        doms.speed.innerHTML = '';
        doms.remain.innerHTML = '';
      }
      if (percent >= 100) {
        clearInterval(intervalId);
        doms.speed.innerHTML = '';
        doms.remain.innerHTML = '';
      }
    }, INTERVAL_TIME);
    // 收集计时 id
    intervalIds.push(intervalId);
  }

  // 离开或刷新上次进度页执行副作用
  return () => {
    console.log('离开或刷新上次进度页');
    document.head.removeChild(style);

    // 还在计时，清空计时
    intervalIds.forEach(id => {
      clearInterval(id);
    });
  };
}

// --------- 实践中

/**
 * 上传文件
 * @param {File} file 文件File对象
 * @param {number} idx 文件索引
 */
function uploadFile(file, idx) {
  // 开始时间
  const start = Date.now();
  // 上一次上传的数据量
  let previousLoaded = 0;
  const params = new FormData();
  params.append('fileLifeType', file.name.replace(/.+\.(?!\%)|.+/, '.'));
  params.append('multipartFile', file);
  axios.post('/upload', params, {
    onUploadProgress({ event }) {
      const { loaded, total } = event;
      // 进度百分比
      const progresStr = new BigNumber(loaded).div(total).times(100).toString();
      const percent = !/^(0|[1-9]\d*(\.\d+)?)$/.test(progresStr)
        ? 0
        : Number(progresStr.replace(/(?<=\.\d{2}).+/, '')) || 0;
      doms[`fileAttachment${idx}`].style.setProperty('--progress', percent);

      // 上传速度，单位为 B/s
      const bSpeed = new BigNumber(loaded)
        .minus(previousLoaded)
        .div(Date.now() - start)
        .times(1000);
      // 根据速度换算数据量单位
      const units = ['B', 'K', 'M', 'G', 'T'];
      let formatSpeed = bSpeed.times(1);
      let unitIndex = 0;
      while (formatSpeed.toNumber() > 1024 && unitIndex < units.length - 1) {
        formatSpeed = formatSpeed.div(1024);
        unitIndex++;
      }
      const speedStr = `${formatSpeed.toFixed(2)}${units[unitIndex]}/s`;

      // 剩余时间
      const remainingTime = formatTime(
        new BigNumber(total).minus(loaded).div(bSpeed).times(1000).toNumber()
      );

      // 更新上一次上传的数据量
      previousLoaded = loaded;
    }
  });
}
