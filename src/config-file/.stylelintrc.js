// stylelint-prettier作为stylelint的插件，
// 作用机制与上述eslint的eslint-pluing-prettier插件几乎一致
module.exports = {
  extends: [
      'stylelint-config-prettier',
  ],
  "rules": {
    "color-hex-case": "upper",
    "function-parentheses-newline-inside": "never-multi-line",
    "number-leading-zero": "never",

  }
}
