const path = require('path')
const fs = require('fs-extra')

module.exports = (api) => {
  this._api = api
  this._quasarConfPath = path.join(this._api.appDir, 'quasar.conf.js')
  this._quasarConf = require(this._quasarConfPath)(this._api.ctx)
  this._quasarConfFileData = fs.readFileSync(this._quasarConfPath, 'utf8')
  if (typeof this._quasarConf.obyte === 'undefined') {

    this._quasarConfFileData = this._quasarConfFileData.replace(`return {`, `return {
    // custom block added by @quasar/obyte
    obyte: {
      obyte_api: '',
      testnet: false
    },`)

    fs.writeFileSync(this._quasarConfPath, this._quasarConfFileData, 'utf8')
  }
  api.onExitLog(`
  Thanks for installing @quasar/obyte
  Please consider contributing to Quasar: https://donate.quasar.dev
  `)
}
