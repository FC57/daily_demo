// 该脚本只是测试 process.argv.slice(2) 获取脚本参数

import { execSync } from 'child_process';

// 获取package.json的scripts中命令行参数
const args = process.argv.slice(2);
console.log(args);

// 使用 ts-node 执行ts文件
execSync(`ts-node ${args.join(' ')}`, { stdio: 'inherit' });
