import { getLargeFileSharding } from '../../utils/fileHandler.js';

/** 大文件分片页面 */
export function largeFileChunksRender() {
  const style = {
    largeFile: 'padding:2rem;font-size:14px;',
    typeFile: 'display:none;'
  };

  return `<h4>大文件，开启多线程分片</h4>
  <h5>🚀 利用Worker开启多线程</h5>
  <h5>🚀 利用算法库 spark-md5 计算chunk hash</h5>
  <div class="desc">⏳ 分片结果请按 <strong>F12</strong>，在控制台查看</div>
  <hr />

  <div class="large-file" style="${style.largeFile}">
    <button class="select-file">选择文件</button>
    <input type="file" style="${style.typeFile}"/>
  </div>`;
}

/** 选择文件分片操作 */
export function splitChunkHandler() {
  const $ = document.querySelector.bind(document);
  // 需要操作的 DOM
  const doms = {
    fileInput: $('.large-file input[type="file"]'),
    select: $('.select-file')
  };
  doms.fileInput.onchange = async e => {
    // 每个分片 5 M
    const result = await getLargeFileSharding(e.target.files[0], 5);
    console.log(result);
    e.target.value = '';
  };
  doms.select.onclick = () => {
    doms.fileInput.click();
  };
}
