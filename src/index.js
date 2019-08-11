const extendConf = function (conf) {
    // make sure obyte boot file is registered
    conf.boot.push('~@quasar/quasar-app-extension-obyte/src/boot/obyte.js')
    console.log(` App Extension (obyte) Info: 'Adding Obyte boot reference to your quasar.conf.js'`)

    // Add the required environment variables
    if (!conf.build.env) {
        conf.build.env = {}
    }
    conf.build.env.OBYTE_API = process.env.OBYTE_API
    conf.build.env.OBYTE_TESTNET_API = process.env.OBYTE_TESTNET_API

    // make sure boot & component files transpile
    conf.build.transpileDependencies.push(/quasar-app-extension-obyte[\\/]src/)

}

/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

module.exports = function (api) {
    // quasar compatibility check
    api.compatibleWith('@quasar/app', '^1.0.0')

    // extend quasar.conf
    api.extendQuasarConf(extendConf)
}
