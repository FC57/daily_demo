<p align='center'>
  <img src='./assets/svg/daily_demo.svg' width='360'/>
</p>

Part of the problems encountered in daily work, including HTML/CSS, JS, TypeScript, Vue2/Vue3, and React solution case collection.

<p align="center">
   <img src='https://img.shields.io/badge/node-v18.14.2-brightgreen?logo=nodedotjs'/>
   <img src='https://img.shields.io/badge/pnpm-v9.4.0-brightgreen?logo=pnpm'/>
   <img src='https://img.shields.io/badge/typescript-v5.5.4-blue?logo=typescript'/>
   <img src='https://img.shields.io/badge/vue-v2.7.8_|_v3_+-blue?logo=vuedotjs'/>
   <img src='https://img.shields.io/badge/react-v18_+-eee?logo=react'/>
   <img src='https://img.shields.io/badge/html-fff?logo=html5'/>
   <img src='https://img.shields.io/badge/css-fff?logo=css3&logoColor=blue'/>
   <img src='https://img.shields.io/badge/javascript-fff?logo=javascript&logoColor=blue'/>
</p>

<br/>

<p align='center'>
  <a href='./README.md'>简体中文</a> | English
</p>

<br/>

## Intro

Intended to record some of the problems and solutions encountered in daily work, or to share interesting code encountered during continuous learning, mainly involving front-end languages, frameworks, building aids, third-party code libraries, and tool functions written by oneself.

## Resource List

<!--detail-start-->
<p>
<details><summary>📝 Plain text list (click to expand) </summary><br/><h3>html/css js（17）</h3><ul><li><a href="./javascript/game-maze/index.html">1. Simple Maze -- Data Related (3 depth Array)</a></li><li><a href="./javascript/pseudo-code/commonjs-require.js">2. Pseudo code - CommonJS standard import function require</a></li><li> <a href="./javascript/small-case/adaptation.html">3. Simple adaptation solution for mobile devices (zoom viewPort or rem solution)</a></li><li><a href="./javascript/small-case/canvas.html">4. Canvas demo API</a></li><li><a href="./javascript/small-case/countdown.html">5. Countdown</a></li><li><a href="./javascript/small-case/dragbleApi.html">6. Drag and drop native API</a></li><li><a href="./javascript/small-case/file-suffix.html">7. Use regular expressions to extract file suffixes from the attachment of the backend response header</a></li><li><a href="./javascript/small-case/inaccurate-timing.html">8. Resolve the issue of inaccurate timing caused by page deactivation</a></li><li><a href="./javascript/small-case/indexedDB.html">9. Browser storage - indexedDB, storing large amounts of structured data</a></li><li><a href="./javascript/small-case/largeFile-chunks.html">10. Use multithreading to shard large files</a></li><li><a href="./javascript/small-case/layout-grid.html">11. Grid layout</a></li><li><a href="./javascript/small-case/lorem.html">12. Vscode plugin - Chinese Lorem, generates random Chinese characters of specified length</a></li><li><a href="./javascript/small-case/mimeticStyle.html">13. Mimicry style tab (tab press)</a></li><li><a href="./javascript/small-case/scrollingNotice.html">14. Rolling Announcement (Additional: not() pseudo class test)</a></li><li><a href="./javascript/small-case/strBytes.html">15. Obtain the true length of characters through code units and calculate the number of bytes occupied</a></li><li><a href="./javascript/small-case/text-stroke.html">16. Solve the problem of jagged text shadows</a></li><li><a href="./javascript/small-case/upload-progress.html">17. Simulated upload progress display (progress bar, speed, estimated remaining transmission time)</a></li></ul><h3>Dependency Library (4)</h3><ul><li><a href="./dependent_libraries/bignumber.html">1. bignumber. js - Solve the problem of lost calculation accuracy in JS</a></li><li><a href="./dependent_libraries/dayjs.html">2. dayjs - date related calculations</a></li><li><a href="./dependent_libraries/index.less">3. less, less loader, CSS engineering preprocessor less</a></li><li><a href="./dependent_libraries/nprogress.html">4. ngprogress - When simulating component loading, a loading progress bar is displayed at the top</a></li></ul><h3>Custom Tool Functions (5)</h3><ul><li><a href="./utils/fileHandler.js">1. File processing related</a></li><li><a href="./utils/fileWorker.js">2. File sharding thread communication file</a></li><li><a href="./utils/string.js">3. Processing methods for string type data</a></li><li><a href="./utils/index.js">4. Other tool functions</a></li><li><a href="./utils/myPromise.js">5. Implement Promise class</a></li></ul><h3>Typescript（5）</h3><ul><li><a href="./typescript/types/fileHandler.d.ts">1. Declaration of file processing related method types</a></li><li><a href="./typescript/types/fileWorker.d.ts">2. Declaration of file shard thread communication type</a></li><li><a href="./typescript/types/string.d.ts">3. String type data processing method type declaration</a></li><li><a href="./typescript/types/index.d.ts">4. Declaration of other tool function types</a></li><li><a href="./typescript/type_tool/index.d.ts">5.Implement ts type of Record、Exclude、Extract、Pick、Omit、Partial、Required</a></li></ul><h3>vue2（2）</h3><ul><li><a href="./vue/vue2/DynamicForm/index.html">1. The page form type is controlled by the backend (dynamic form)</a></li><li><a href="./vue/vue2/TabWithLoading/index.html">2. Tab switching with ripple loading</a></li></ul><h3>vue3（8）</h3><ul><li><a href="./vue/vue3/vueProxy/test.html">1.Implement reactivity functions of vue3 (test)</a></li><li><a href="./vue/vue3/vueProxy/core/effect.js">2.Implement watchEffect core</a></li><li><a href="./vue/vue3/vueProxy/core/handler.js">3. Reactivity data processing agent operations get set、deleteProperty、has、ownKeys</a></li><li><a href="./vue/vue3/vueProxy/core/reactive.js">4.Implement reactive</a></li><li><a href="./vue/vue3/vueProxy/types/operationType.js">5. Reactivity data operation types</a></li><li><a href="./vue/vue3/vueProxy/computed.js">6.Implement computed</a></li><li><a href="./vue/vue3/vueProxy/ref.js">7.Implement ref</a></li><li><a href="./vue/vue3/vueProxy/watch.js">8.Implement watch</a></li></ul><h3>react（1）</h3><ul><li><a href="./react/data/ag-grid-react-data.html">1.convert data to fit table component AgGridReact of ag-grid-react</a></li></ul><h3>Build and submit tool configuration (3)</h3><ul><li><a href="./typescript/scripts/ts-node.ts">1. process.argv.slice(2) Get script parameters, ts-node execute ts file</a></li><li><a href="./typescript/tsconfig.json">2. ts Configuration File-tsconfig.json</a></li><li><a href="./commitlint.config.cjs">3. commitlint,cz-git configuration files (standardize and verify submission information)</a></li></ul></details><br/><br/><img src="https://img.shields.io/badge/html%2Fcss%20js-17-1890ff " alt="17"/><br><a href="./javascript/game-maze/index.html" target="_blank"><img src="https://img.shields.io/badge/1.%20Simple%20Maze%20--%20Data%20Related%20(3%20depth%20Array)-1890ff " alt="1. Simple Maze -- Data Related (3 depth Array)"/></a> <a href="./javascript/pseudo-code/commonjs-require.js" target="_blank"><img src="https://img.shields.io/badge/2.%20Pseudo%20code%20--%20CommonJS%20standard%20import%20function%20require-1890ff " alt="2. Pseudo code - CommonJS standard import function require"/></a> <a href="./javascript/small-case/adaptation.html" target="_blank"><img src="https://img.shields.io/badge/3.%20Simple%20adaptation%20solution%20for%20mobile%20devices%20(zoom%20viewPort%20or%20rem%20solution)-1890ff " alt="3. Simple adaptation solution for mobile devices (zoom viewPort or rem solution)"/></a> <a href="./javascript/small-case/canvas.html" target="_blank"><img src="https://img.shields.io/badge/4.%20Canvas%20demo%20API-1890ff " alt="4. Canvas demo API"/></a> <a href="./javascript/small-case/countdown.html" target="_blank"><img src="https://img.shields.io/badge/5.%20Countdown-1890ff " alt="5. Countdown"/></a> <a href="./javascript/small-case/dragbleApi.html" target="_blank"><img src="https://img.shields.io/badge/6.%20Drag%20and%20drop%20native%20API-1890ff " alt="6. Drag and drop native API"/></a> <a href="./javascript/small-case/file-suffix.html" target="_blank"><img src="https://img.shields.io/badge/7.%20Use%20regular%20expressions%20to%20extract%20file%20suffixes%20from%20the%20attachment%20of%20the%20backend%20response%20header-1890ff " alt="7. Use regular expressions to extract file suffixes from the attachment of the backend response header"/></a> <a href="./javascript/small-case/inaccurate-timing.html" target="_blank"><img src="https://img.shields.io/badge/8.%20Resolve%20the%20issue%20of%20inaccurate%20timing%20caused%20by%20page%20deactivation-1890ff " alt="8. Resolve the issue of inaccurate timing caused by page deactivation"/></a> <a href="./javascript/small-case/indexedDB.html" target="_blank"><img src="https://img.shields.io/badge/9.%20Browser%20storage%20--%20indexedDB%2C%20storing%20large%20amounts%20of%20structured%20data-1890ff " alt="9. Browser storage - indexedDB, storing large amounts of structured data"/></a> <a href="./javascript/small-case/largeFile-chunks.html" target="_blank"><img src="https://img.shields.io/badge/10.%20Use%20multithreading%20to%20shard%20large%20files-1890ff " alt="10. Use multithreading to shard large files"/></a> <a href="./javascript/small-case/layout-grid.html" target="_blank"><img src="https://img.shields.io/badge/11.%20Grid%20layout-1890ff " alt="11. Grid layout"/></a> <a href="./javascript/small-case/lorem.html" target="_blank"><img src="https://img.shields.io/badge/12.%20Vscode%20plugin%20--%20Chinese%20Lorem%2C%20generates%20random%20Chinese%20characters%20of%20specified%20length-1890ff " alt="12. Vscode plugin - Chinese Lorem, generates random Chinese characters of specified length"/></a> <a href="./javascript/small-case/mimeticStyle.html" target="_blank"><img src="https://img.shields.io/badge/13.%20Mimicry%20style%20tab%20(tab%20press)-1890ff " alt="13. Mimicry style tab (tab press)"/></a> <a href="./javascript/small-case/scrollingNotice.html" target="_blank"><img src="https://img.shields.io/badge/14.%20Rolling%20Announcement%20(Additional%3A%20not()%20pseudo%20class%20test)-1890ff " alt="14. Rolling Announcement (Additional: not() pseudo class test)"/></a> <a href="./javascript/small-case/strBytes.html" target="_blank"><img src="https://img.shields.io/badge/15.%20Obtain%20the%20true%20length%20of%20characters%20through%20code%20units%20and%20calculate%20the%20number%20of%20bytes%20occupied-1890ff " alt="15. Obtain the true length of characters through code units and calculate the number of bytes occupied"/></a> <a href="./javascript/small-case/text-stroke.html" target="_blank"><img src="https://img.shields.io/badge/16.%20Solve%20the%20problem%20of%20jagged%20text%20shadows-1890ff " alt="16. Solve the problem of jagged text shadows"/></a> <a href="./javascript/small-case/upload-progress.html" target="_blank"><img src="https://img.shields.io/badge/17.%20Simulated%20upload%20progress%20display%20(progress%20bar%2C%20speed%2C%20estimated%20remaining%20transmission%20time)-1890ff " alt="17. Simulated upload progress display (progress bar, speed, estimated remaining transmission time)"/></a> <br/><br/><img src="https://img.shields.io/badge/Dependency%20Library-4-08979c " alt="4"/><br><a href="./dependent_libraries/bignumber.html" target="_blank"><img src="https://img.shields.io/badge/1.%20bignumber.%20js%20--%20Solve%20the%20problem%20of%20lost%20calculation%20accuracy%20in%20JS-08979c " alt="1. bignumber. js - Solve the problem of lost calculation accuracy in JS"/></a> <a href="./dependent_libraries/dayjs.html" target="_blank"><img src="https://img.shields.io/badge/2.%20dayjs%20--%20date%20related%20calculations-08979c " alt="2. dayjs - date related calculations"/></a> <a href="./dependent_libraries/index.less" target="_blank"><img src="https://img.shields.io/badge/3.%20less%2C%20less%20loader%2C%20CSS%20engineering%20preprocessor%20less-08979c " alt="3. less, less loader, CSS engineering preprocessor less"/></a> <a href="./dependent_libraries/nprogress.html" target="_blank"><img src="https://img.shields.io/badge/4.%20ngprogress%20--%20When%20simulating%20component%20loading%2C%20a%20loading%20progress%20bar%20is%20displayed%20at%20the%20top-08979c " alt="4. ngprogress - When simulating component loading, a loading progress bar is displayed at the top"/></a> <br/><br/><img src="https://img.shields.io/badge/Custom%20Tool%20Functions-5-d9901a " alt="5"/><br><a href="./utils/fileHandler.js" target="_blank"><img src="https://img.shields.io/badge/1.%20File%20processing%20related-d9901a " alt="1. File processing related"/></a> <a href="./utils/fileWorker.js" target="_blank"><img src="https://img.shields.io/badge/2.%20File%20sharding%20thread%20communication%20file-d9901a " alt="2. File sharding thread communication file"/></a> <a href="./utils/string.js" target="_blank"><img src="https://img.shields.io/badge/3.%20Processing%20methods%20for%20string%20type%20data-d9901a " alt="3.string类型数据处理方法"/></a> <a href="./utils/index.js" target="_blank"><img src="https://img.shields.io/badge/4.%20Other%20tool%20functions-d9901a " alt="4. Other tool functions"/></a> <a href="./utils/myPromise.js" target="_blank"><img src="https://img.shields.io/badge/5.%20Implement%20Promise%20class-d9901a " alt="5. Implement Promise class"/></a> <br/><br/><img src="https://img.shields.io/badge/Typescript-5-blue " alt="5"/><br><a href="./typescript/types/fileHandler.d.ts" target="_blank"><img src="https://img.shields.io/badge/1.%20Declaration%20of%20file%20processing%20related%20method%20types-blue " alt="1. Declaration of file processing related method types"/></a> <a href="./typescript/types/fileWorker.d.ts" target="_blank"><img src=https://img.shields.io/badge/2.%20Declaration%20of%20file%20shard%20thread%20communication%20type-blue " alt="2. Declaration of file shard thread communication type"/></a> <a href="./typescript/types/string.d.ts" target="_blank"><img src=https://img.shields.io/badge/3.%20String%20type%20data%20processing%20method%20type%20declaration-blue " alt="3. String type data processing method type declaration"/></a> <a href="./typescript/types/index.d.ts" target="_blank"><img src=https://img.shields.io/badge/4.%20Declaration%20of%20other%20tool%20function%20types-blue " alt="4. Declaration of other tool function types"/></a> <a href="./typescript/type_tool/index.d.ts" target="_blank"><img src=https://img.shields.io/badge/5.Implement%20ts%20type%20of%20Record%E3%80%81Exclude%E3%80%81Extract%E3%80%81Pick%E3%80%81Omit%E3%80%81Partial%E3%80%81Required-blue " alt="5.Implement ts type of Record、Exclude、Extract、Pick、Omit、Partial、Required"/></a> <br/><br/><img src="https://img.shields.io/badge/vue2-2-389e0d " alt="2"/><br><a href="./vue/vue2/DynamicForm/index.html" target="_blank"><img src=https://img.shields.io/badge/1.%20The%20page%20form%20type%20is%20controlled%20by%20the%20backend%20(dynamic%20form)-389e0d " alt="1. The page form type is controlled by the backend (dynamic form)"/></a> <a href="./vue/vue2/TabWithLoading/index.html" target="_blank"><img src="https://img.shields.io/badge/2.%20Tab%20switching%20with%20ripple%20loading-389e0d " alt="2. Tab switching with ripple loading"/></a> <br/><br/><img src="https://img.shields.io/badge/vue3-8-389e0d " alt="8"/><br><a href="./vue/vue3/vueProxy/test.html" target="_blank"><img src="https://img.shields.io/badge/1.Implement%20reactivity%20functions%20of%20vue3%20(test)-389e0d " alt="1.Implement reactivity functions of vue3 (test)"/></a> <a href="./vue/vue3/vueProxy/core/effect.js" target="_blank"><img src=https://img.shields.io/badge/2.Implement%20watchEffect%20core-389e0d " alt="2.Implement watchEffect core"/></a> <a href="./vue/vue3/vueProxy/core/handler.js" target="_blank"><img src="https://img.shields.io/badge/3.%20Reactivity%20data%20processing%20agent%20operations%20get%20set%E3%80%81deleteProperty%E3%80%81has%E3%80%81ownKeys-389e0d " alt="3. Reactivity data processing agent operations get set、deleteProperty、has、ownKeys"/></a> <a href="./vue/vue3/vueProxy/core/reactive.js" target="_blank"><img src="https://img.shields.io/badge/4.Implement%20reactive-389e0d " alt="4.Implement reactive"/></a> <a href="./vue/vue3/vueProxy/types/operationType.js" target="_blank"><img src="https://img.shields.io/badge/5.%20Reactivity%20data%20operation%20types-389e0d " alt="5. Reactivity data operation types"/></a> <a href="./vue/vue3/vueProxy/computed.js" target="_blank"><img src="https://img.shields.io/badge/6.Implement%20computed-389e0d " alt="6.Implement computed"/></a> <a href="./vue/vue3/vueProxy/ref.js" target="_blank"><img src="https://img.shields.io/badge/6.Implement%20ref-389e0d " alt="7.Implement ref"/></a> <a href="./vue/vue3/vueProxy/watch.js" target="_blank"><img src="https://img.shields.io/badge/6.Implement%20watch-389e0d " alt="8.Implement watch"/></a> <br/><br/><img src="https://img.shields.io/badge/react-1-722ede " alt="1"/><br><a href="./react/data/ag-grid-react-data.html" target="_blank"><img src="https://img.shields.io/badge/1.convert%20data%20to%20fit%20table%20component%20AgGridReact%20of%20ag--grid--react-722ede " alt="1.convert data to fit table component AgGridReact of ag-grid-react"/></a> <br/><br/><img src="https://img.shields.io/badge/Build%20and%20submit%20tool%20configuration-3-eb2f96 " alt="3"/><br><a href="./typescript/scripts/ts-node.ts" target="_blank"><img src="https://img.shields.io/badge/1.%20process.argv.slice(2)%20Get%20script%20parameters%2C%20ts--node%20execute%20ts%20file-eb2f96 " alt="1. process.argv.slice(2) Get script parameters, ts-node execute ts file"/></a> <a href="./typescript/tsconfig.json" target="_blank"><img src="https://img.shields.io/badge/2.%20ts%20Configuration%20File--tsconfig.json-eb2f96 " alt="2. ts Configuration File-tsconfig.json"/></a> <a href="./commitlint.config.cjs" target="_blank"><img src="https://img.shields.io/badge/3.%20commitlint%2Ccz--git%20configuration%20files%20(standardize%20and%20verify%20submission%20information)-eb2f96 " alt="3. commitlint,cz-git configuration files (standardize and verify submission information)"/></a>
</p>
<!--detail-end-->

## Preview & Commit

Download the Vscode plugin _Live Server_, click _Go Live_ in the bottom right corner to enable real-time preview,[Jump Link (http://localhost:5500)](http://localhost:5500)

<br/>

![vscode](./assets/imgs/vscode-live-server-extension.png)

<br/>

- Open source library CDN

> Special thanks to the open-source library CDN [BootCDN](https://www.bootcdn.cn/)
>
> ✨ Daily demos do not require building the entire project, npm the package,just create HTML files directly and import the open source library CDN, and use them directly in script scripts.
>
> 🚀 If there is page parsing and loading, while importing CDN, use the resource prompt defer - to avoid loading JS and causing the rendering main thread to be idle

```html
<!-- Importing CDN and use defer resource prompt -->
<script src="CDN path" defer></script>
```

<br/>

![BootCDN](./assets/imgs/bootcdn.png)

<br/>

- Execute typescript files and specifications of submitting

> 🌐 The browser does not support typescript files and will only treat them as files to trigger download behavior. The typescript package needs to be installed and compiled into a JS file using its built-in tsc command-line tool.
>
> 💡 Due to VSCode's support and highlighting of typescript syntax, files can be viewed directly in VSCode.
>
> 💻 Execute the ts file using the ts-node and typescript libraries, configure the tsconfig. json file, and execute it as the `npx ts-node <file path>`. If ts-node is installed globally, npx can be omitted.

🚀 Install the dependency libraries listed in the packaging.json file.

```bash
pnpm install
```

🧩 In this case, the following terminal command can be run to execute the ts file.

```bash
# 'typescript/index.ts' can be replaced with the executable file path

# pnpm
pnpm ts typescript/index.ts

# npm
npm run ts typescript/index.ts
```

📋 Standardize Git commit message using husky, commitlint, commmitizen,and cz-git

```bash
# pnpm
pnpm commit

# npm
npm run commit

```

<br/>

![commit](./assets/imgs/types-commit.gif)

<br/>

## Overview of File Tree

```text
daily_demo
├─ .husky                                 # Define additional script execution in the specified hook of Git commit
│  ├─ commit-msg                          # Hooks triggered during git commit
│  └─ _
│     └─ husky.sh
├─ assets                                 # resource file
├─ dependent_libraries                    # demo of dependence libaries
├─ javascript                             # demo for js
├─ main.ts                                # pnpm ts main.ts -run ts file
├─ react                                  # demo for react
├─ README.md                              # doc（简体中文）
├─ README.en.md                           # doc（English）
├─ typescript                             # demo for ts
├─ utils                                  # Custom common method related
└─ vue                                    # demo for vue

```

## 参与贡献

If you are interested, you can share the problems and solutions you encounter in your daily work, or simply provide demos that interest you. Thank you 💖

- Share interesting libraries, GitHub addresses, demos, etc

- Share the problems you encounter in real projects (whether you solve them or not) - everyone will help you find solutions together

- Help with others by discussion in issues

- Sharing can be done through PR, issue comments, links, etc

## 使用的协议

MIT
