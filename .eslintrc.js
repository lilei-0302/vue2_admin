module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 禁用所有规则
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'indent': 'off',
    'quotes': 'off',
    // 其他规则都禁用
  },
}
