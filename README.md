# Daily_Demo

<br/>

![daily_demo](https://img.shields.io/badge/%F0%9F%8E%89_welcome_to-daily__demo-blue)

![nodejs](https://img.shields.io/badge/node-v18.14.2-brightgreen?logo=nodedotjs) ![pnpm](https://img.shields.io/badge/pnpm-v9.4.0-brightgreen?logo=pnpm) ![ts](https://img.shields.io/badge/typescript-v4.9.5-blue?logo=typescript) ![vue](https://img.shields.io/badge/vue-v2.7.8_|_v3_+-blue?logo=vuedotjs) ![react](https://img.shields.io/badge/react-v18_+-eee?logo=react) ![html](https://img.shields.io/badge/html-fff?logo=html5) ![css](https://img.shields.io/badge/css-fff?logo=css3&logoColor=blue) ![js](https://img.shields.io/badge/javascript-fff?logo=javascript&logoColor=blue)

<br/>

### preview

Download the Live Server plugin for VSCode

> 下载 _Vscode_ 插件 _Live Server_，点击右下角 _Go Live_ 开启实时预览服务器，地址默认 _localhost:5500_

![vscode-plugin-live Server](./assets/imgs/vscode-live-server-extension.png)

### Open source library CDN

Special thanks to the open-source library CDN BootCDN

> 特别感谢开源库 CDN _BootCDN_：https://www.bootcdn.cn/
>
> ✨ 日常 demo 不用搭建整个工程， npm 对应包运行，直接创建 _html_ 文件引入 开源库 CDN，_script_ 脚本中直接使用即可
>
> 🚀 若有页面解析加载，引入 CDN 的同时，使用资源提示符 _defer_ - <span style="color:#ff4d4f">\<script src='CDN 地址' defer>\</script></span> 避免加载 JS 导致渲染主线程处于空闲状态

![BootCDN](./assets/imgs/bootcdn.png)

### for typescript

The browser does not recognize ts files but can view them in VSCode

> 🌐 浏览器不支持 _typescript_ 文件，只会将其视为文件触发下载行为，需要下载 _typecript_ 包，用其自带的 _tsc_ 命名行工具编译成 _js_ 文件才行
>
> 🍍 因 VSCode 本身对 typescript 语法的支持及高亮显示，因此可直接在 VSCode 中查看文件

### file tree

```text
daily_demo
├─ .husky                                 # 定义在git提交的指定钩子中额外执行脚本
│  ├─ commit-msg                          # 提交信息 git commit 时触发的钩子
│  └─ _
│     └─ husky.sh
├─ assets                                 # 资源文件
│  ├─ imgs
│  └─ video
├─ dependent_libraries                    # 第三方库demo
│  ├─ node_modules
│  │  └─ spark-md5.js                     # spark-md5（公共方法里需要导入，不能用CDN，因此罗列）
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
│     ├─ largeFile-chunks.html            # 大文件，开启多线程分片
│     ├─ layout-grid.html                 # grid 布局
│     ├─ lorem.html                       # Vscode 插件-Chinese Lorem，生成指定长度随机汉字
│     ├─ mimeticStyle.html                # 拟态风格页签（tab-按压）
│     ├─ scrollingNotice.html             # 滚动公告（附加:not()伪类测试）
│     ├─ strBytes.html                    # 通过码元获取字符真实长度并计算所占字节数
│     ├─ text-stroke.html                 # 解决文字阴影锯齿问题
│     └─ upload-progress.html             # 模拟上传进度展示（进度条、速率、剩余传输预估时间）
├─ LICENSE                                # 开源协议 MIT
├─ package.json                           # 包管理文件
├─ pnpm-lock.yaml                         # pnpm 下载包的版本锁定文件
├─ react                                  # demo for react
│  ├─ data
│  │  └─ ag-grid-react-data.html          # 请求后端的数据，转换适配组件ag-grid-react表格所需
│  └─ favicon.ico                         # 浏览器页签图标-react
├─ README.md                              # 记录文档
├─ typescript                             # demo for ts
│  ├─ tsconfig.app.json                   # 浏览器环境 ts 配置
│  ├─ tsconfig.json                       # 项目 ts 配置
│  ├─ tsconfig.node.json                  # node 环境 ts 配置
│  └─ types                               # 类型文件
├─ utils                                  # 自定义公用方法相关
│  ├─ fileHandler.js                      # 文件处理相关
│  ├─ fileWorker.js                       # 文件分片线程通信
│  ├─ index.js                            # 其它类别方法
│  ├─ myPromise.js                        # 手写实现Promise构造函数
│  └─ string.js                           # String 类型数据方法
└─ vue                                    # demo for vue
   ├─ favicon.ico                         # 浏览器页签图标-vue
   ├─ vue2
   │  ├─ DynamicForm                      # 页面表单类型由后端控制（动态表单）
   │  └─ TabWithLoading                   # 选项卡切换附带水波纹loading
   └─ vue3
      └─ vueProxy                         # 手写实现 vue3 响应式核心
         ├─ core
         │  ├─ effect.js                  # watchEffect 核心，收集响应式数据和用到它们的函数的关联
         │  ├─ handler.js                 # 响应式数据处理代理操作 get、set、deleteProperty、has、ownKeys
         │  └─ reactive.js                # 利用 Proxy 递归代理，将数据变为响应式
         ├─ types
         │  └─ operationType.js           # 响应式数据操作类型
         ├─ utils
         │  └─ index.js                   # 判断是否为对象和值是否变更
         ├─ computed.js                   # 实现 computed
         ├─ ref.js                        # 实现 ref
         ├─ test.html
         └─ watch.js                      # 实现 watch

```

```
daily_demo
├─ .husky
│  ├─ commit-msg
│  └─ _
│     └─ husky.sh
├─ assets
│  ├─ imgs
│  │  ├─ 0.png
│  │  ├─ 1.png
│  │  ├─ 2.png
│  │  ├─ 3.png
│  │  ├─ 4.png
│  │  ├─ 5.png
│  │  ├─ 6.png
│  │  ├─ 7.png
│  │  ├─ 8.png
│  │  ├─ 9.png
│  │  ├─ ag-grid-react.png
│  │  ├─ ag-grid-react.tsx.png
│  │  ├─ bootcdn.png
│  │  ├─ t1.png
│  │  └─ vscode-live-server-extension.png
│  └─ video
│     └─ winter.mp4
├─ commitlint.config.js
├─ dependent_libraries
│  ├─ bignumber.html
│  ├─ dayjs.html
│  ├─ index.less
│  └─ nprogress.html
├─ javascript
│  ├─ game-maze
│  │  └─ index.html
│  ├─ pseudo-code
│  │  └─ commonjs-require.js
│  └─ small-case
│     ├─ adaptation.html
│     ├─ canvas.html
│     ├─ countdown.html
│     ├─ dragbleApi.html
│     ├─ file-suffix.html
│     ├─ inaccurate-timing.html
│     ├─ indexedDB.html
│     ├─ largeFile-chunks.html
│     ├─ layout-grid.html
│     ├─ lorem.html
│     ├─ mimeticStyle.html
│     ├─ scrollingNotice.html
│     ├─ strBytes.html
│     ├─ text-stroke.html
│     └─ upload-progress.html
├─ LICENSE
├─ package.json
├─ pnpm-lock.yaml
├─ react
│  ├─ data
│  │  └─ ag-grid-react-data.html
│  └─ favicon.ico
├─ README.md
├─ typescript
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ types
├─ utils
│  ├─ fileHandler.js
│  ├─ fileWorker.js
│  ├─ index.js
│  ├─ myPromise.js
│  └─ string.js
└─ vue
   ├─ favicon.ico
   ├─ vue2
   │  ├─ DynamicForm
   │  │  ├─ deferTest.js
   │  │  ├─ index.html
   │  │  └─ index.js
   │  └─ TabWithLoading
   │     ├─ index.html
   │     └─ index.js
   └─ vue3
      └─ vueProxy
         ├─ computed.js
         ├─ core
         │  ├─ effect.js
         │  ├─ handler.js
         │  └─ reactive.js
         ├─ ref.js
         ├─ test.html
         ├─ types
         │  └─ operationType.js
         ├─ utils
         │  └─ index.js
         └─ watch.js

```
