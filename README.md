# Daily_Demo

### preview

Download the Live Server plugin for VSCode

> 下载 _Vscode_ 插件 _Live Server_，点击右下角 _Go Live_ 开启实时预览服务器，地址默认 _localhost:5500_

![vscode-plugin-live Server](./assets/imgs/vscode-live-server-extension.png)

### Open source library CDN

> 特别感谢开源库 CND _BootCDN_：https://www.bootcdn.cn/
>
> 日常 demo 不用搭建整个工程， npm 对应包运行

![BootCDN](./assets/imgs/bootcdn.png)

### file tree

```text
daily_demo
├─ assets                                 # 资源文件
│  ├─ imgs
│  └─ video
├─ dependent_libraries                    # 第三方库demo
│  ├─ bignumber.html                      # bignumber.js-解决js运算精度丢失问题
│  ├─ dayjs.html                          # dayjs-日期相关计算
│  ├─ index.less                          # less-样式css工程化，webpack中less-loader转换为css
│  └─ ngprogress.html                     # ngprogress-模拟组件加载时，顶部展示加载进度条
├─ javascript                             # demo for js
│  ├─ game-maze
│  │  └─ index.html                       # 迷宫，数据相关（三维数组）
│  ├─ pseudo-code                         # 伪代码-模拟流程
│  │  └─ commonjs-require.js              # CommonJS规范导入函数require的流程
│  └─ small-case
│     ├─ adaptation.html                  # 移动端简易适配方案（缩放viewPort或rem方案）
│     ├─ canvas.html                      # canvas 画布demo-api
│     ├─ countdown.html                   # 倒计时
│     ├─ dragbleApi.html                  # 拖拽 demo-api
│     ├─ file-suffix.html                 # 后端响应头中 attachment 中通过正则截取文件后缀名
│     ├─ inaccurate-timing.html           # 解决页面失活导致计时不准问题
│     ├─ indexedDB.html                   # 浏览器存储-indexedDB，存储大量结构化数据
│     ├─ layout-grid.html                 # grid 布局
│     ├─ lorem.html                       # Vscode 插件-Chinese Lorem，生成指定长度随机汉字
│     ├─ mimeticStyle.html                # 拟态风格页签（tab-按压）
│     ├─ scrollingNotice.html             # 滚动公告（附加:not()伪类测试）
│     ├─ strBytes.html                    # 通过码元获取字符真实长度并计算所占字节数
│     ├─ text-stroke.html                 # 解决文字阴影锯齿问题
│     └─ upload-progress.html             # 模拟上传进度展示（进度条、速率、剩余传输预估时间）
├─ react                                  # demo for react
│  └─ data
│     └─ ag-grid-react-data.html          # 请求后端的数据，转换适配组件ag-grid-react表格所需
├─ README.md                              # 记录文档
├─ typescript                             # demo for ts
├─ utils                                  # 自定义公用方法相关
│  ├─ index.js                            # 其它类别方法
│  └─ string.js                           # String 类型数据方法
└─ vue                                    # demo for vue

```
