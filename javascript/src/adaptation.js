/** 法一）缩放 viewPort */
export function scaleViewPort() {
  // 获取设备宽度
  const curWidth = document.documentElement.clientWidth;
  // 计算缩放尺寸
  const targetWidth = 375;
  const scale = curWidth / targetWidth;
  const view = document.querySelector("meta[name='viewport']");
  view.content = `initial-scale=${scale},minimum-scale=${scale},maximum-scale=${scale},user-scalable=no`;
}

/**
 * 法二）适配 rem
 * @param {number} designWidth 设计稿尺寸
 */
export function setRem(designWidth = 750) {
  const html = document.documentElement;
  function refreshRem() {
    // 设备宽度
    const clientWidth = html.clientWidth;
    if (clientWidth >= designWidth) {
      // 如果设备宽度都大于设计稿了，那么测量出来是多少就是多少
      html.style.fontSize = '100px';
    } else {
      // 计算出比例
      // 拿 iPhone6 为例，375/750=0.5
      // 相当于每一列的宽度为 0.5px，分成了 750 列
      // 但是浏览器是不允许这么小的字体大小的，因此乘上一个 100
      // 变成每一列的宽度为 50px
      // 之后在将设计稿尺寸转换为列数时，也不需要繁杂的计算
      // 假设设计稿量出来为 375px => 187.5(CSS像素) => 187.5/50(每一列宽度) = 3.75(所占列数)
      html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
    }
  }
  doc.addEventListener('DOMContentLoaded', refreshRem);
}
