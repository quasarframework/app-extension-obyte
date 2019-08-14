# @quasar/obyte
===
![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-obyte.svg)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-obyte.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-obyte.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-obyte.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-obyte)

This is an extension aimed to ease the interactions with the Obyte blockchain using the library [obytejs](https://github.com/bonustrack/obyte.js).

## Install
```bash
quasar ext add @quasar/obyte
```
Quasar CLI will retrieve it from NPM and install the extension.

## Environment variables

This extension uses 2 environment variables. You can set either

```bash
OBYTE_API="wss://..."
```
for the main net

or, for the test net

```bash
OBYTE_TESTNET_API="wss://..."
```

Notice the quotes, don't forget them.

## Uninstall
```bash
quasar ext remove @quasar/obyte
```

## Demo
There is a demo located at `test/app`. To run it:
```bash
$ git clone git@github.com:quasarframework/app-extension-obyte.git
$ cd test/app
$ yarn
$ quasar dev
```

## Info
The obyte client is now available as a Vue prototype. Also, we have included the utility library `bitcore-mnemonic`, which is a Class constructor. See the following example (from the demo) to see how you can use them together.

```js
import { toWif, getChash160 } from 'obyte/lib/utils'
export default {
  methods: {
    async loadWitnesses () {
      this.witnesses = ['loading']
      this.witnesses = await this.$obyte.api.getWitnesses()
    },
    generateNewAddress () {
      this.loading = true
      this.mnemonic = new this.$Mnemonic()
      while (!this.$Mnemonic.isValid(this.mnemonic.toString())) {
        this.mnemonic = new this.$Mnemonic()
      }
      const xPrivKey = this.mnemonic.toHDPrivateKey()
      const { privateKey } = xPrivKey.derive(path)
      const privKeyBuf = privateKey.bn.toBuffer({ size: 32 })
      const wif = toWif(privKeyBuf, testnet)
      const pubkey = privateKey.publicKey.toBuffer().toString('base64')
      const definition = ['sig', { pubkey }]
      const address = getChash160(definition)

      this.addressInformation = `
        \nSeed:\n ${this.mnemonic.phrase}
        \nPath:\n ${path}
        \nWIF:\n ${wif}
        \nPublic key:\n ${pubkey}
        \nAddress:\n ${address}
        `
    }
  }
}
```

![sample](https://raw.github.com/quasarframework/app-extension-obyte/master/doc/art/newWallet-sample.png)

## Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).

## Thanks
Thanks to the Obyte Foundation for providing a grant in the context of the FirstByte Project to aid the development of both this App Extension and the underlying technologies. https://obyte.org/

# License
(c) 2019 - Daniel Thompson-Yvetot, Razvan Stoenescu and Contributors

MIT

