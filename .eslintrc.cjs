// @see: http://eslint.cn

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  /* Specify how to parse the syntax */
  parser: '@typescript-eslint/parser', // ts 语法解析
  /* Configuration for parsing syntax with lower priority than 'parser' */ // 优先级低于 parser的解析
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  /* Extend existing rules */
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    // 0 - 关闭; 1 - 警告; 2 - 错误

    'no-var': 2, // Require using let or const instead of var 不能使用var关键字
    'no-multiple-empty-lines': [2, { max: 1 }], // Disallow multiple empty lines 禁止多个空行
    // 不允许在定义函数/类/变量之前使用它们
    'no-use-before-define': 0, // Disallow using functions/classes/variables before they are defined
    // et声明但从未重新分配的变量，这些变量应该是const
    'prefer-const': 2, // This rule is aimed at marking variables that are declared using let but never reassigned, and should be const instead

    // typeScript (https://typescript-eslint.io/rules)
    // 不允许未使用的变量
    '@typescript-eslint/no-unused-vars': 2, // Disallow unused variables
    // 不允许使用@ts-ignore
    '@typescript-eslint/prefer-ts-expect-error': 2, // Disallow the use of @ts-ignore
    // 不允许使用@ts-<directive>注释或要求在指令后进行描述
    '@typescript-eslint/ban-ts-comment': 2, // Disallow using @ts-<directive> comments or require descriptions after directives
    // 允许显示类型
    '@typescript-eslint/no-inferrable-types': 0, // Allowing explicit types that can be easily inferred may add unnecessary verbosity
    // 允许使用自定义TypeScript模块和命名空间
    '@typescript-eslint/no-namespace': 0, // Disallow using custom TypeScript modules and namespaces
    // 可以使用显示类型 any
    '@typescript-eslint/no-explicit-any': 0, // Disallow the use of the any type
    // 可以使用不推荐的类型，如 object
    '@typescript-eslint/ban-types': 0, // Disallow specific types
    // 允许在ts文件中使用require导入语句，不强制使用 import
    '@typescript-eslint/no-var-requires': 0, // Disallow the use of require statements in import statements
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 2, // Disallow empty functions
    // 允许在代码中使用非空断言操作符 !
    '@typescript-eslint/no-non-null-assertion': 0 // Disallow non-null assertion postfix operators (!)
  }
};
