  
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    "parser": "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  plugins: ['vue'],
  rules: {
    'standard/no-callback-literal': 0
  }
}