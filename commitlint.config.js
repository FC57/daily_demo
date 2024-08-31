// @see https://cz-git.qbb.sh/zh/guide/
// cz-git 中文官网，可联合 commitlint，仅使用该配置即可，否则需要单独使用配置 cz.config.js

const { readdirSync } = require('node:fs');
const { resolve } = require('node:path');

// 获取
const scopes = readdirSync(resolve(__dirname, '.'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !/^(node\_modules|\.git)$/.test(dirent.name))
  .map(dirent => dirent.name.trim());

/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [commit => commit.includes('init')], // 排除校验提示信息中包含 init
  extends: ['@commitlint/config-conventional'], // 沿用继承提交规范
  // 校验规则
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    // set [level,applicable,value]
    // 级别：0-禁用 1-警告 2-错误
    // 适用：always-总是 never-反向，取相反之意
    // 值：配置的值
    'body-leading-blank': [2, 'always'], // body 前需要空行，body 是详细的描述，更改的影响和目的等
    'footer-leading-blank': [1, 'always'], // footer 前需要空行，footer 通常是关闭 issue等
    'header-max-length': [2, 'always', 100], // 提交头部最大长度，提交头部样式 类型:简短提交变更内容
    'subject-empty': [2, 'never'], // 提交信息不能为空
    'type-empty': [2, 'never'], // 提交类型不能为空
    'subject-case': [0], // 提交信息大小写不限制
    // 提交类型枚举
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新特性
        'fix', // 修复
        'docs', // 文档变更
        'style', // 格式调整
        'refactor', // 重构（不包含 bug 修复和功能新增）
        'perf', // 性能优化
        'test', // 测试
        'build', // 构建（升级包或者修改构建工具的配置）
        'ci', // 集成（脚本变更）
        'chore', // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
        'revert', // 版本回退
        'wip', // 正在开发中
        'workflow', // 工作流程改进
        'types' // 类型定义文件修改
      ]
    ]
  },
  // 提示词
  prompt: {
    // 定义常用的 commit message 别名，下面是默认值
    // alias: { fd: 'docs: fix typos' },
    // 命令行提问信息
    messages: {
      type: "Select the type of change that you're committing:",
      scope: 'Denote the SCOPE of this change (optional):',
      customScope: 'Denote the SCOPE of this change:',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
      customFooterPrefix: 'Input ISSUES prefix:',
      footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
      generatingByAI: 'Generating your AI commit subject...',
      generatedSelectByAI: 'Select suitable subject by AI generated:',
      confirmCommit: 'Are you sure you want to proceed with the commit above?'
      // 中文版
      // type: "选择你要提交的类型 :",
      // scope: "选择一个提交范围（可选）:",
      // customScope: "请输入自定义的提交范围 :",
      // subject: "填写简短精炼的变更描述 :\n",
      // body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      // breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      // footerPrefixsSelect: "选择关联issue前缀（可选）:",
      // customFooterPrefixs: "输入自定义issue前缀 :",
      // footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      // confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      { value: 'feat', name: 'feat:     ✨  A new feature', emoji: '✨' },
      { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: '🐛' },
      { value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: '📝' },
      {
        value: 'style',
        name: 'style:    💄  Changes that do not affect the meaning of the code',
        emoji: '💄'
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️'
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  A code change that improves performance',
        emoji: '⚡️'
      },
      {
        value: 'test',
        name: 'test:     ✅  Adding missing tests or correcting existing tests',
        emoji: '✅'
      },
      {
        value: 'build',
        name: 'build:    📦️   Changes that affect the build system or external dependencies',
        emoji: '📦️'
      },
      {
        value: 'ci',
        name: 'ci:       🎡  Changes to our CI configuration files and scripts',
        emoji: '🎡'
      },
      {
        value: 'chore',
        name: "chore:    🔨  Other changes that don't modify src or test files",
        emoji: '🔨'
      },
      { value: 'revert', name: 'revert:   ⏪️  Reverts a previous commit', emoji: '⏪️' },
      { value: 'wip', name: 'wip:      🕔  work in process', emoji: '🕔' },
      { value: 'workflow', name: 'workflow: 📋  workflow improvements', emoji: '📋' },
      { value: 'type', name: 'type:     🔰  type definition file changes', emoji: '🔰' }
    ],
    useEmoji: true, // 使用表情符
    scopes: [...scopes] // 提交范围

    // 注释的配置本身就是默认值

    // emojiAlign: 'center', // emoji 表情位置 <left> type(scope): <center> subject <right>
    // useAI: false, // 是否使用 OpenAI API 自动生成提交信息 subject
    // aiNumber: 1, // 默认1，如果大于 1 ，则会让 OpenAI 返回指定的多个选项，并开启选择模式
    // themeColorCode: '', 设置终端交互部件的主题色，默认青色
    // allowCustomScopes: true, // 是否在选择 模块范围 显示自定义选项(custom)
    // allowEmptyScopes: true, // 是否在选择 模块范围 显示为空选项(empty)
    // customScopesAlign: 'bottom', // 设置 选择范围 中 为空选项(empty) 和 自定义选项(custom) 的 位置
    // customScopesAlias: 'custom',// 自定义 选择范围 中 自定义选项(custom) 在命令行中显示的 名称
    // emptyScopesAlias: 'empty',// 自定义 选择范围 中 为空选项(empty) 在命令行中显示的 名称
    // upperCaseSubject: false,// 是否自动将简短描述(subject)第一个字符进行大写处理
    // markBreakingChangeMode: false, // 当你想添加 ! 标识于头部，表明该 commit 为重大变更时，请使用该选项
    // allowBreakingChanges: ['feat', 'fix'], // 允许出现 重大变更(BREAKING CHANGES)的特定 type
    // breaklineNumber: 100, // 字符超过数量换行
    // breaklineChar: '|',// 描述换行字符
    // skipQuestions: [], // 自定义选择指定的问题不显示
    // issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],// 自定义选择issue前缀
    // customIssuePrefixAlign: 'top', // 设置 选择 issue 前缀 中 跳过选项(skip) 和 自定义选项(custom) 的 位置
    // emptyIssuePrefixAlias: 'skip',// 自定义 选择 issue 前缀 中 跳过选项(skip) 在命令行中显示的 名称
    // customIssuePrefixAlias: 'custom',// 自定义 选择 issue 前缀 中 自定义选项(custom) 在命令行中显示的 名称
    // allowCustomIssuePrefix: true, // 是否在选择 ISSUE 前缀 显示自定义选项(custom)
    // allowEmptyIssuePrefix: true, // 是否在选择 ISSUE 前缀 显示为跳过选项(skip)
    // confirmColorize: true, // 确定提交中模板 commit message 是否着色
    // scopeOverrides: undefined, // 自定义选择了特定类型后 覆盖模块范围 命令行显示信息
    // defaultBody: '', // 详细描述显示默认值
    // defaultIssues: '', // 输入ISSUE 显示默认值
    // defaultScope: '', // 如果 defaultScope 与 scopes 选择范围列表项中的 value 相匹配就会进行星标置顶操作
    // defaultSubject: '' // 简短描述中显示默认值
  }
};
