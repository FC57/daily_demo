// @see: https://www.prettier.cn

module.exports = {
  // Specifies the maximum line break length
  printWidth: 130, // 指定每行代码的最大长度
  // Tab width in either tab characters or spaces
  tabWidth: 2, // 每个缩进级别使用 2 个空格
  // Use tabs for indentation (true: tabs, false: spaces)
  useTabs: false, // 禁止使用 tab 进行缩进
  // Use semicolons at the end of statements (true: yes, false: no)
  semi: true, // 在每个语句末尾添加分号
  // Use single quotes for strings (true: single quotes, false: double quotes)
  singleQuote: true, // 使用单引号
  // Determine whether to use quotes around property names in object literals ("<as-needed|consistent|preserve>")
  quoteProps: 'as-needed', // 对象字面量中 仅在必要时（即属性名是非法标识符时）才加引号
  // Use single quotes instead of double quotes in JSX (true: single quotes, false: double quotes)
  jsxSingleQuote: false, // JSX 中使用双引号
  // Print trailing commas in multiline objects and arrays ("<none|es5|all>")
  trailingComma: 'none', //在多行对象和数组中是否添加尾随逗号（不添加）
  // Add spaces between braces in object literals and arrays "{ foo: bar }" (true: yes, false: no)
  bracketSpacing: true, // 在对象字面量和数组的括号之间是否添加空格（是）
  // Put > of JSX elements at the end of the last line instead of on a new line (true: end of last line, false: on a new line)
  bracketSameLine: false, // 决定 JSX 元素的结束标签 > 是否放在同一行（否，单开一行）
  // Include parentheses around a sole arrow function parameter (avoid: omit parentheses, always: include parentheses)
  arrowParens: 'avoid', // 在箭头函数的单一参数周围不包含括号
  // Specify the parser to use, no need to include @prettier at the beginning of files
  requirePragma: false, // 不需要在文件开头添加一个特殊的 @format 标记来指示文件经过 Prettier 格式化
  // Insert a special @format marker at the top of the file to indicate that the file has been formatted with Prettier
  insertPragma: false, // 无需在格式化的文件顶部插入一个特殊的 @format 标记
  // Control how text is wrapped (preserve: no wrapping)
  proseWrap: 'preserve', // 保留原始的换行符，不进行自动换行
  // Define whether spaces in HTML are considered sensitive ("css": follow CSS display property default values, "strict": spaces are considered sensitive, "ignore": spaces are considered insensitive)
  htmlWhitespaceSensitivity: 'css', // html中按照 CSS 的显示属性默认值来处理空白字符
  // Define the line ending to use for formatting ("<auto|lf|crlf|cr>")
  endOfLine: 'auto', // 自动检测并使用适当的行结束符
  // These two options can be used to format code starting and ending at given character offsets (rangeStart: start, rangeEnd: end)
  // 0-Infinity 格式化整个文件
  rangeStart: 0, // 格式化起始字符偏移量
  rangeEnd: Infinity // 格式化结束字符偏移量
};
